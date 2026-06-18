// api/lead.js — Fitcheck lead capture (Vercel serverless function).
//
// Captures lead submissions (name, email, store URL) and persists them.
// Idempotency-keyed by email to prevent duplicates.
//
// Storage backends (in order of preference):
//   1. AWS DynamoDB — when DYNAMODB_TABLE + AWS_REGION are configured.
//   2. Local filesystem fallback (/tmp/fitcheck-leads/leads.json).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

// AWS SDK is loaded lazily so the file fallback still works when the package
// is not installed or AWS is not configured.
let docClientPromise = null;

const LEADS_DIR = "/tmp/fitcheck-leads";
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

function dynamoEnabled() {
  return Boolean(DYNAMODB_TABLE && AWS_REGION);
}

async function getDocClient() {
  if (!dynamoEnabled()) return null;
  if (!docClientPromise) {
    docClientPromise = (async () => {
      const [{ DynamoDBClient }, { DynamoDBDocumentClient }] = await Promise.all([
        import("@aws-sdk/client-dynamodb"),
        import("@aws-sdk/lib-dynamodb"),
      ]);
      const client = new DynamoDBClient({ region: AWS_REGION });
      return DynamoDBDocumentClient.from(client);
    })();
  }
  return docClientPromise;
}

function validateEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 500);
}

function idempotencyKey(email) {
  return crypto.createHash("sha256").update(email.toLowerCase().trim()).digest("hex").slice(0, 16);
}

function sendJson(res, statusCode, obj) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

async function loadLeads() {
  try {
    const data = await readFile(path.join(LEADS_DIR, "leads.json"), "utf8");
    return JSON.parse(data);
  } catch {
    return { leads: [], index: {} };
  }
}

async function saveLeads(db) {
  await mkdir(LEADS_DIR, { recursive: true });
  await writeFile(path.join(LEADS_DIR, "leads.json"), JSON.stringify(db, null, 2));
}

async function isDuplicateInDynamo(id) {
  try {
    const client = await getDocClient();
    if (!client) return false;
    const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
    const result = await client.send(
      new GetCommand({
        TableName: DYNAMODB_TABLE,
        Key: { id },
        ProjectionExpression: "id",
      }),
    );
    return Boolean(result.Item);
  } catch (err) {
    console.error("DynamoDB duplicate check failed:", err);
    return false;
  }
}

async function saveLeadToDynamo(lead) {
  try {
    const client = await getDocClient();
    if (!client) return false;
    const { PutCommand } = await import("@aws-sdk/lib-dynamodb");
    await client.send(
      new PutCommand({
        TableName: DYNAMODB_TABLE,
        Item: lead,
        ConditionExpression: "attribute_not_exists(id)",
      }),
    );
    return true;
  } catch (err) {
    // ConditionalCheckFailedException means the lead already exists — treat as duplicate.
    if (err.name === "ConditionalCheckFailedException") {
      return { duplicate: true };
    }
    console.error("DynamoDB save failed:", err);
    return false;
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const { name, email, store, message } = req.body || {};

    if (!email || !validateEmail(email)) {
      sendJson(res, 400, { ok: false, error: "A valid email address is required." });
      return;
    }

    const cleanEmail = sanitize(email).toLowerCase();
    const key = idempotencyKey(cleanEmail);

    const lead = {
      id: key,
      name: sanitize(name),
      email: cleanEmail,
      store: sanitize(store),
      message: sanitize(message),
      createdAt: new Date().toISOString(),
      source: "landing-page",
    };

    // Try DynamoDB first if configured.
    if (dynamoEnabled()) {
      const alreadyExists = await isDuplicateInDynamo(key);
      if (alreadyExists) {
        sendJson(res, 200, {
          ok: true,
          message: "Thanks — we already have your details. We'll be in touch about your 48-hour launch.",
          duplicate: true,
        });
        return;
      }

      const saveResult = await saveLeadToDynamo(lead);
      if (saveResult === true || (saveResult && saveResult.duplicate)) {
        sendJson(res, 200, {
          ok: true,
          message: "Thanks — we'll be in touch about your 48-hour launch.",
          duplicate: Boolean(saveResult.duplicate),
        });
        return;
      }

      // If DynamoDB save failed for a non-duplicate reason, fall through to
      // filesystem storage so the lead is not lost.
      console.warn("DynamoDB save failed; falling back to filesystem storage.");
    }

    // Filesystem fallback (also used for local development / dry runs).
    const db = await loadLeads();

    if (db.index[key]) {
      sendJson(res, 200, {
        ok: true,
        message: "Thanks — we already have your details. We'll be in touch about your 48-hour launch.",
        duplicate: true,
      });
      return;
    }

    db.leads.push(lead);
    db.index[key] = true;
    await saveLeads(db);

    sendJson(res, 200, {
      ok: true,
      message: "Thanks — we'll be in touch about your 48-hour launch.",
    });
  } catch (err) {
    console.error("Lead capture error:", err);
    sendJson(res, 500, { ok: false, error: "Something went wrong. Please try again." });
  }
}
