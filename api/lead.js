// api/lead.js — Fitcheck lead capture (Vercel serverless function).
//
// Captures lead submissions (name, email, store URL) and persists them.
// Idempotency-keyed by email to prevent duplicates.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const LEADS_DIR = "/tmp/fitcheck-leads";

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

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const { name, email, store, message } = req.body || {};

    // Validate required fields
    if (!email || !validateEmail(email)) {
      res.status(400).json({ ok: false, error: "A valid email address is required." });
      return;
    }

    const cleanEmail = sanitize(email).toLowerCase();
    const key = idempotencyKey(cleanEmail);

    // Load existing leads
    const db = await loadLeads();

    // Idempotency check — don't store duplicates
    if (db.index[key]) {
      res.status(200).json({
        ok: true,
        message: "Thanks — we already have your details. We'll be in touch about your 48-hour launch.",
        duplicate: true,
      });
      return;
    }

    // Store the lead
    const lead = {
      id: key,
      name: sanitize(name),
      email: cleanEmail,
      store: sanitize(store),
      message: sanitize(message),
      createdAt: new Date().toISOString(),
      source: "landing-page",
    };

    db.leads.push(lead);
    db.index[key] = true;
    await saveLeads(db);

    res.status(200).json({
      ok: true,
      message: "Thanks — we'll be in touch about your 48-hour launch.",
    });
  } catch (err) {
    console.error("Lead capture error:", err);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
}
