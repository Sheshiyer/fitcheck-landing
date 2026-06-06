// build.mjs — assembles the Fitcheck launch landing page (zero dependencies).
//
// buildLanding() reads the SHARED brand tokens + local styles + lead-capture JS,
// inlines them, assembles the 7 brand-config sections with grounded copy, and
// returns one self-contained HTML string. Run as main → writes dist/index.html.
//
// Aesthetic: Modern Minimalism · Sophisticated Elegance · Static Refinement.
// Voice: direct, confident, pragmatic, founder-to-founder. Outcomes first.

import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = (rel) => readFileSync(resolve(__dirname, rel), 'utf8');

// ---- Sources to inline (shared tokens FIRST so the palette ships) ----------
const BRAND_TOKENS = read('./shared/brand-tokens.css'); // brand tokens (vendored into this repo)
const STYLES = read('./src/styles.css');
const LEAD_JS = read('./src/lead-capture.js');
const LOGO_DARK = read('./assets/logo-dark.svg'); // inline header logo (dark lockup)

// ---- Grounded copy (mirrors content/copy.md; no invented claims) -----------
const BRAND = 'Fitcheck';
const TAGLINE = 'Let every shopper become your product model';

const HERO = {
  eyebrow: 'Virtual try-on, done for you — built for Shopify fashion',
  subhead:
    'Fitcheck renders your best-sellers on real, diverse bodies so shoppers see the fit before they buy — more confidence at the product page, more add-to-carts, fewer fit-driven returns.',
  ctaPrimary: 'Reserve your launch — $1,000 refundable',
  ctaSecondary: 'Book a pilot',
  reassurance: 'Live on your store in 48 hours. No developers. No manual exports.'
};

const PROBLEM = {
  kicker: 'The product page is where fashion sales are won or lost',
  heading: "Shoppers can't picture the fit on their own body",
  body:
    'A flat photo on a single model leaves most shoppers guessing. Guessing means hesitation, abandoned carts, and returns that quietly erase your margin. The options on the market each fall short:',
  cards: [
    {
      h: 'Basic try-on apps',
      p: 'Look cheap and break trust at the exact moment the shopper is deciding to buy.'
    },
    {
      h: 'Enterprise solutions',
      p: 'Slow to deploy and priced for brands far larger than yours.'
    },
    {
      h: 'API-only tools',
      p: 'Hand you a toolkit and a backlog — you still need developers to ship anything.'
    }
  ]
};

const SOLUTION = {
  kicker: 'One done-for-you launch, framed around revenue',
  heading: 'We launch virtual try-on for you — outcomes first, novelty never',
  body:
    "Fitcheck is a managed launch service, not another plugin you have to figure out. We start with personalized demo renders of your own products as the hook, stand up a pilot widget on your best-selling SKUs, and go live in 48 hours — Shopify-first, so there's no manual export and nothing for your team to maintain.",
  points: [
    'Personalized demo renders of your real catalog, so you see the quality before you commit.',
    'A pilot widget on your best-sellers — the styles where confidence moves the most revenue.',
    'A 48-hour launch, fully managed, with everything framed in add-to-cart and return-rate terms.'
  ]
};

const HOW = {
  kicker: 'Three steps. Live in 48 hours.',
  heading: 'From catalog to confident shoppers — without lifting a finger',
  steps: [
    {
      t: 'We render your best-sellers',
      p: 'Send us your top styles. We generate try-on renders across diverse body types, so every shopper sees someone like them in the fit.'
    },
    {
      t: 'The pilot widget goes live',
      p: 'We install a clean try-on widget on your selected SKUs — Shopify-first, no developer time, no manual product exports.'
    },
    {
      t: 'Shoppers try on and buy',
      p: 'Shoppers preview the fit on their own body, gain confidence, and add to cart — with fit-driven returns trending down.'
    }
  ]
};

const PRICING = {
  kicker: 'Pricing built around your launch',
  heading: 'Pick the launch that fits your catalog',
  reservation:
    'Start with a <strong>$1,000 refundable reservation</strong> — credited toward your Pilot once you approve the demo renders.',
  tiers: [
    {
      name: 'Pilot',
      price: '$3,000',
      summary: 'Prove the lift on your best-sellers.',
      featured: false,
      cta: 'Start a Pilot',
      features: [
        'Personalized demo renders of your catalog',
        'Try-on widget on selected SKUs',
        '500 try-on credits',
        'Basic conversion analytics',
        '48-hour launch'
      ]
    },
    {
      name: 'Premium',
      price: '$7,500',
      summary: 'Scale try-on and capture the demand.',
      featured: true,
      badge: 'Most popular',
      cta: 'Choose Premium',
      features: [
        'Everything in Pilot',
        '2,000 try-on credits',
        'Lead capture on try-on',
        'A/B testing',
        'Klaviyo integration',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: '$10,000–$15,000',
      summary: 'Multi-store and bespoke, with a team behind you.',
      featured: false,
      cta: 'Talk to us',
      features: [
        'Everything in Premium',
        'Unlimited try-on credits',
        'Multi-store support',
        'Custom integrations',
        'Dedicated success manager'
      ]
    }
  ]
};

const FAQ = {
  kicker: 'Straight answers',
  heading: 'What founders ask before they reserve',
  items: [
    {
      q: 'How fast can we go live?',
      a: 'Forty-eight hours from approved demo renders to a live pilot widget on your selected SKUs. We run the launch end to end.'
    },
    {
      q: 'Do we need developers?',
      a: 'No. Fitcheck is done-for-you and Shopify-first — no code to write, no manual product exports, nothing for your team to maintain.'
    },
    {
      q: 'What does this do to returns?',
      a: 'When shoppers can preview fit on their own body, fit-driven returns typically trend down — we target a 15–25% reduction on the styles in your pilot.'
    },
    {
      q: 'What happens to shopper photos?',
      a: 'Shopper photos are ephemeral by default — used to generate the try-on and not retained beyond it. Privacy is a default, not an upsell.'
    },
    {
      q: 'How do the renders actually work?',
      a: 'We generate try-on imagery of your real products on diverse bodies and tune it to your catalog. You approve the quality on your own SKUs before anything goes live.'
    }
  ]
};

const CTA = {
  kicker: 'Your launch slot is one form away',
  heading: 'Reserve your Fitcheck launch',
  body:
    "Lock in your 48-hour launch with a $1,000 refundable reservation — credited toward your Pilot once you approve the demo renders. Tell us where to send the renders.",
  form: {
    nameLabel: 'Your name',
    emailLabel: 'Work email',
    storeLabel: 'Shopify store URL',
    submit: 'Reserve your launch — $1,000 refundable',
    fineprint:
      "Refundable until you approve the demo renders. We'll reply within one business day."
  }
};

// ---- HTML escaping (copy is trusted, but escape defensively) ---------------
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const TICK = '<span class="tick" aria-hidden="true">✓</span>';

// ---- Section builders ------------------------------------------------------
function heroSection() {
  const swatches = Array.from({ length: 6 }, () => '<div class="swatch"></div>').join('');
  return `
  <section id="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">${esc(HERO.eyebrow)}</span>
          <h1 class="hero-title" id="hero-title">${esc(TAGLINE)}</h1>
          <p class="hero-sub">${esc(HERO.subhead)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#cta">${esc(HERO.ctaPrimary)}</a>
            <a class="btn btn-secondary" href="#cta">${esc(HERO.ctaSecondary)}</a>
          </div>
          <p class="hero-reassure">${esc(HERO.reassurance)}</p>
        </div>
        <figure class="hero-visual">
          <img src="/assets/hero.webp" width="896" height="1200" alt="A shopper modeling an outfit — a Fitcheck virtual try-on render" fetchpriority="high" decoding="async" />
        </figure>
      </div>
    </div>
  </section>`;
}

function problemSection() {
  const cards = PROBLEM.cards
    .map((c) => `
        <article class="card">
          <h3>${esc(c.h)}</h3>
          <p>${esc(c.p)}</p>
        </article>`)
    .join('');
  return `
  <section id="problem">
    <div class="container">
      <div class="section-head">
        <span class="kicker">${esc(PROBLEM.kicker)}</span>
        <h2 class="section-title">${esc(PROBLEM.heading)}</h2>
        <p class="lead">${esc(PROBLEM.body)}</p>
      </div>
      <div class="cards">${cards}
      </div>
    </div>
  </section>`;
}

function solutionSection() {
  const points = SOLUTION.points
    .map((p) => `
        <li>${TICK}<span>${esc(p)}</span></li>`)
    .join('');
  return `
  <section id="solution">
    <div class="container">
      <div class="section-head">
        <span class="kicker">${esc(SOLUTION.kicker)}</span>
        <h2 class="section-title">${esc(SOLUTION.heading)}</h2>
        <p class="lead">${esc(SOLUTION.body)}</p>
      </div>
      <ul class="feature-list">${points}
      </ul>
    </div>
  </section>`;
}

function howSection() {
  const steps = HOW.steps
    .map((s, i) => `
        <article class="step">
          <span class="step-num" aria-hidden="true">${i + 1}</span>
          <h3>${esc(s.t)}</h3>
          <p>${esc(s.p)}</p>
        </article>`)
    .join('');
  return `
  <section id="how-it-works">
    <div class="container">
      <div class="section-head">
        <span class="kicker">${esc(HOW.kicker)}</span>
        <h2 class="section-title">${esc(HOW.heading)}</h2>
      </div>
      <div class="steps">${steps}
      </div>
    </div>
  </section>`;
}

function pricingSection() {
  const tiers = PRICING.tiers
    .map((t) => {
      const badge = t.featured && t.badge
        ? `<span class="tier-badge">${esc(t.badge)}</span>`
        : '';
      const feats = t.features
        .map((f) => `<li>${TICK}<span>${esc(f)}</span></li>`)
        .join('');
      return `
        <article class="tier${t.featured ? ' featured' : ''}">
          ${badge}
          <h3 class="tier-name">${esc(t.name)}</h3>
          <p class="tier-price">${esc(t.price)}</p>
          <p class="tier-summary">${esc(t.summary)}</p>
          <ul class="tier-features">${feats}</ul>
          <a class="btn ${t.featured ? 'btn-primary' : 'btn-ghost-light'}" href="#cta">${esc(t.cta)}</a>
        </article>`;
    })
    .join('');
  return `
  <section id="pricing">
    <div class="container">
      <div class="section-head">
        <span class="kicker">${esc(PRICING.kicker)}</span>
        <h2 class="section-title">${esc(PRICING.heading)}</h2>
      </div>
      <div class="price-grid">${tiers}
      </div>
      <p class="reservation-note">${PRICING.reservation}</p>
    </div>
  </section>`;
}

function faqSection() {
  const items = FAQ.items
    .map((it) => `
        <details class="faq-item">
          <summary>${esc(it.q)}</summary>
          <div class="faq-answer">${esc(it.a)}</div>
        </details>`)
    .join('');
  return `
  <section id="faq">
    <div class="container">
      <div class="section-head">
        <span class="kicker">${esc(FAQ.kicker)}</span>
        <h2 class="section-title">${esc(FAQ.heading)}</h2>
      </div>
      <div class="faq-list">${items}
      </div>
    </div>
  </section>`;
}

function ctaSection() {
  const f = CTA.form;
  return `
  <section id="cta">
    <div class="container">
      <div class="cta-grid">
        <div class="cta-copy">
          <span class="kicker">${esc(CTA.kicker)}</span>
          <h2 class="section-title">${esc(CTA.heading)}</h2>
          <p class="lead">${esc(CTA.body)}</p>
        </div>
        <div class="lead-card">
          <div id="lead-status" class="form-status" role="status" aria-live="polite" hidden></div>
          <form id="lead-form" class="lead-form" action="/api/lead" method="post" novalidate>
            <div class="field">
              <label for="lead-name">${esc(f.nameLabel)}</label>
              <input id="lead-name" name="name" type="text" autocomplete="name"
                     required aria-describedby="err-name" />
              <span id="err-name" class="field-error" aria-live="polite"></span>
            </div>
            <div class="field">
              <label for="lead-email">${esc(f.emailLabel)}</label>
              <input id="lead-email" name="email" type="email" autocomplete="email"
                     inputmode="email" required aria-describedby="err-email" />
              <span id="err-email" class="field-error" aria-live="polite"></span>
            </div>
            <div class="field">
              <label for="lead-store">${esc(f.storeLabel)}</label>
              <input id="lead-store" name="store" type="url" autocomplete="url"
                     inputmode="url" required aria-describedby="err-store" />
              <span id="err-store" class="field-error" aria-live="polite"></span>
            </div>
            <button type="submit" class="btn btn-primary">${esc(f.submit)}</button>
            <p class="form-fineprint">${esc(f.fineprint)}</p>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function topbar() {
  return `
  <header class="topbar">
    <div class="container">
      <a class="brandmark" href="#hero" aria-label="${esc(BRAND)} — home">${LOGO_DARK}</a>
      <a class="btn btn-primary topbar-cta" href="#cta">Reserve your launch</a>
    </div>
  </header>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container">
      <span>&copy; ${year} ${esc(BRAND)} — virtual try-on launch for Shopify fashion brands.</span>
      <a href="#cta">Reserve your launch</a>
    </div>
  </footer>`;
}

// ---- Top-level assembly ----------------------------------------------------
function tryonGallery() {
  return `
  <section id="gallery" class="gallery">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Real bodies, real fit</span>
        <h2 class="section-title">One garment, every body</h2>
        <p class="lead">Fitcheck renders your best-sellers on diverse shoppers — so every customer can picture the fit on a body like theirs before they buy.</p>
      </div>
      <div class="gallery-grid">
        <figure><img src="/assets/example-1.webp" width="896" height="1200" alt="A plus-size shopper modeling a midi dress — a Fitcheck try-on render" loading="lazy" decoding="async" /></figure>
        <figure><img src="/assets/example-2.webp" width="896" height="1200" alt="A shopper modeling a knit sweater and trousers — a Fitcheck try-on render" loading="lazy" decoding="async" /></figure>
        <figure><img src="/assets/example-3.webp" width="896" height="1200" alt="A shopper modeling activewear — a Fitcheck try-on render" loading="lazy" decoding="async" /></figure>
      </div>
    </div>
  </section>`;
}

export function buildLanding() {
  const sections = [
    heroSection(),
    problemSection(),
    solutionSection(),
    tryonGallery(),
    howSection(),
    pricingSection(),
    faqSection(),
    ctaSection()
  ].join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(BRAND)} — ${esc(TAGLINE)}</title>
  <meta name="description" content="${esc(HERO.subhead)}" />
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="#1A1A2E" />
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml" />
  <link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(BRAND)} — ${esc(TAGLINE)}" />
  <meta property="og:description" content="${esc(HERO.subhead)}" />
  <meta property="og:image" content="https://fitcheck-landing-gamma.vercel.app/assets/og.png" />
  <meta property="og:url" content="https://fitcheck-landing-gamma.vercel.app/" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(BRAND)} — ${esc(TAGLINE)}" />
  <meta name="twitter:description" content="${esc(HERO.subhead)}" />
  <meta name="twitter:image" content="https://fitcheck-landing-gamma.vercel.app/assets/og.png" />
  <style>
/* ---- shared/brand-tokens.css (inlined) ---- */
${BRAND_TOKENS}
/* ---- web/landing/src/styles.css (inlined) ---- */
${STYLES}
  </style>
</head>
<body>
  <a class="skip-link" href="#hero">Skip to content</a>
${topbar()}
  <main>
${sections}
  </main>
${footer()}
  <script>
${LEAD_JS}
  </script>
</body>
</html>
`;
}

// ---- Run as main → write dist/index.html -----------------------------------
const isMain =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const html = buildLanding();
  const outDir = resolve(__dirname, 'dist');
  mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, 'index.html');
  writeFileSync(outFile, html, 'utf8');
  cpSync(resolve(__dirname, 'assets'), resolve(outDir, 'assets'), { recursive: true }); // logo · favicons · og.png → dist/assets/
  console.log(`[build] wrote ${outFile} (${html.length.toLocaleString()} bytes)`);
}
