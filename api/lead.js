// api/lead.js — Fitcheck lead capture (Vercel serverless function).
//
// Accepts a reservation/interest submission from the landing's form so the UI can show its success
// state on the live preview. This is intentionally minimal: it acknowledges the lead and returns.
// Durable persistence (Cloudflare KV) + the GTM reply loop is the gated production piece — and every
// real send is idempotency-keyed + cost-governed upstream. No secrets, no external calls here.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method not allowed' });
    return;
  }
  // Production: persist {name, email, store} to KV (idempotency-keyed) → hand off to the GTM loop.
  res.status(200).json({
    ok: true,
    message: "Thanks — we'll be in touch about your 48-hour launch.",
  });
}
