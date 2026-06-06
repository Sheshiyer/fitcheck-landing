<div align="center">

# Fitcheck

### Let every shopper become your product model

**Done-for-you AI virtual try-on launch service for Shopify fashion brands.**
Personalized demo renders, a pilot widget on your best-sellers, and a 48-hour launch — sold on outcomes (confidence, add-to-cart, fewer returns), not AI novelty.

![Static](https://img.shields.io/badge/build-zero--dependency_static-FF6B35?style=flat-square)
![Node](https://img.shields.io/badge/Node-%E2%89%A518-1A1A2E?style=flat-square&logo=node.js&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000?style=flat-square&logo=vercel&logoColor=white)
![Accessibility](https://img.shields.io/badge/WCAG_AA-0_contrast_failures-16213E?style=flat-square)

</div>

---

This repo is the **Fitcheck launch landing page** — a zero-dependency static site. The page is assembled by a small Node build that inlines the brand tokens and styles into a single self-contained `index.html`.

## What's here

```
📦 fitcheck-landing
├── 📄 build.mjs            # assembles the 7 sections + inlines tokens/styles → dist/index.html
├── 📂 src/
│   ├── 📄 styles.css       # landing styles (consumes the brand tokens)
│   └── 📄 lead-capture.js  # progressive-enhancement reservation form
├── 📂 shared/
│   └── 📄 brand-tokens.css # brand palette + type tokens (the source of truth)
├── 📂 content/
│   └── 📄 copy.md          # editable source copy for every section
├── 📂 api/
│   └── 📄 lead.js          # serverless lead-capture endpoint (acknowledges the reservation)
├── 📄 landing.test.mjs     # acceptance test: sections · palette · pricing · no placeholders
└── 📄 vercel.json          # build: `node build.mjs` → serve `dist/`
```

## Develop

```bash
node build.mjs     # → dist/index.html (self-contained)
node --test        # acceptance contract (7 checks)
open dist/index.html
```

## Brand

| | |
|---|---|
| **Voice** | direct · confident · pragmatic · founder-to-founder · ROI-first |
| **Palette** | `#FF6B35` action · `#1A1A2E` navy · `#16213E` tech |
| **Aesthetic** | Modern Minimalism — clean, refined, restrained motion |

## Deploy

Connected to Vercel — every push to `main` builds (`node build.mjs`) and ships `dist/` to the edge.

<div align="center">

**Live on your store in 48 hours. No developers required.**

</div>
