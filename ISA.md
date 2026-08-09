---
task: "Repair Fitcheck landing navigation, storytelling, and subscription pricing"
project: fitcheck-landing
effort: E4
effort_source: classifier
phase: complete
progress: 24/24
mode: interactive
started: 2026-08-10T02:13:00+05:30
updated: 2026-08-10T02:19:00+05:30
---

## Problem

The landing page opens with a compelling cinematic asset, but its navigation is tied to that temporary overlay and the rest of the sales story has no persistent wayfinding. The pricing surface still describes large one-time launch tiers rather than the requested recurring subscription offer.

## Vision

Fitcheck feels like a single considered product experience: a cinematic first encounter gives way to clearly sequenced product proof, with navigation always within reach and a confident, Apple-like choice between two simple plans.

## Out of Scope

- No external billing, checkout, Apple Pay, App Store, or Apple ID integration.
- No generated visual assets, video re-rendering, or brand redefinition.
- No change to legal/support/physical routes or production deployment.

## Principles

- Existing photographic and cinematic assets remain the visual source of truth.
- Navigation explains location and preserves escape routes without competing with the hero.
- Price choices state their cadence and savings directly; no hidden math.

## Constraints

- Preserve the Vite, React, Tailwind, and Motion stack.
- Use only repository-owned visual assets for the revised content flow.
- Keep hash navigation and reduced-motion behavior functional.
- Retain the existing dark Fitcheck palette and orange accent.

## Goal

Ship a coherent Fitcheck landing page with persistent accessible navigation, ordered scroll delivery of existing assets and sections, and a responsive $99 monthly / $799 yearly pricing selector that truthfully presents the annual $389 saving.

## Criteria

- [x] ISC-1: The desktop header exposes links for How It Works, Pricing, FAQ, and Physical.
- [x] ISC-2: The header has a visible CTA linking to `#cta`.
- [x] ISC-3: Header navigation remains available after the cinematic hero overlay exits.
- [x] ISC-4: The mobile header exposes a labelled menu trigger.
- [x] ISC-5: Every mobile navigation link closes the menu after activation.
- [x] ISC-6: Each landing-page navigation hash resolves to an existing section ID.
- [x] ISC-7: The product story renders in hero, lifestyle, problem, solution, how-it-works, pricing, FAQ, and CTA order.
- [x] ISC-8: Existing local Fitcheck images are used by the storytelling sections.
- [x] ISC-9: The cinematic hero still uses its existing video asset.
- [x] ISC-10: Pricing presents a Monthly option priced at `$99` with `/month` cadence.
- [x] ISC-11: Pricing presents a Yearly option priced at `$799` with `/year` cadence.
- [x] ISC-12: Yearly pricing states the computed `$389` annual saving.
- [x] ISC-13: The yearly saving percentage is displayed as `33%` (rounded from 32.7%).
- [x] ISC-14: A labelled monthly/yearly control changes the selected plan presentation.
- [x] ISC-15: The selected price CTA links to `#cta`.
- [x] ISC-16: The annual choice is visually distinguished without relying only on color.
- [x] ISC-17: Pricing no longer contains `$3,000`, `$7,500`, or `$10,000–$15,000`.
- [x] ISC-18: Anti: no subscription wording claims Apple billing or Apple ID support.
- [x] ISC-19: Anti: no remote asset is added for the content sections.
- [x] ISC-20: Antecedent: typography, palette, border treatments, and imagery remain recognizably Fitcheck.
- [x] ISC-21: The project TypeScript/Vite build exits successfully.
- [x] ISC-22: Browser capture of the landing route completes without a fatal render error.
- [x] ISC-23: Reduced-motion users retain usable navigation and readable prices.
- [x] ISC-24: The build output does not require new environment variables.

## Test Strategy

| isc | type | check | threshold | tool |
| --- | --- | --- | --- | --- |
| ISC-1..6 | UI structure | inspect navigation and targets | links and IDs present | source + browser snapshot |
| ISC-7..9 | content delivery | inspect component order and asset paths | exact order / local assets retained | source grep |
| ISC-10..17 | pricing | inspect rendered plan control and copy | exact requested prices and savings | source + screenshot |
| ISC-18..20 | regression / brand | inspect claims, paths, and rendered styles | no prohibited claim or remote section asset | source + screenshot |
| ISC-21..24 | build and UI | production build and local route probe | exits 0 / page captures | npm + Chrome headless |

## Features

| name | description | satisfies | depends_on | parallelizable |
| --- | --- | --- | --- | --- |
| PersistentNavigation | Stable site header and responsive menu | ISC-1..6, ISC-23 | — | false |
| StoryDelivery | Ordered component stack and asset continuity | ISC-7..9, ISC-19..20 | PersistentNavigation | false |
| SubscriptionPricing | Monthly/yearly selector with annual savings | ISC-10..18 | PersistentNavigation | true |
| Validation | Build and rendered route evidence | ISC-21..24 | all | false |

## Decisions

- 2026-08-10 02:13: The linked Scroll World repository is a reusable cinematic-skill package, while this Fitcheck checkout is the runnable site containing the requested existing assets.
- 2026-08-10 02:13: “Appleid” is interpreted as an Apple-like, transparent annual-price presentation; this task does not authorize a payment-platform integration.
- 2026-08-10 02:13: The external advisor command could not authenticate because its OAuth session was expired; implementation is bounded to inspectable local UI changes and fresh browser/build evidence.
- 2026-08-10 02:19: Navigation is a separate fixed shell instead of cinematic-overlay state, preventing wayfinding from disappearing as the hero progresses.

## Changelog

- 2026-08-10 | conjectured: the GitHub link would provide a runnable Scroll World site.
  refuted by: the repository contains only the `scroll-world` skill and reference scripts, with no package manifest or assets.
  learned: Fitcheck is the actual runnable target; Scroll World informs its cinematic behavior rather than supplying an application.
  criterion now: ISC-8, ISC-9, and ISC-19 constrain the delivery to Fitcheck-owned assets.

## Verification

- ISC-1..6: source inspection — `Navbar.tsx` has persistent desktop/mobile links, labelled toggle, CTA, and matching targets.
- ISC-7..9: source inspection — `App.tsx` preserves ordered sections; cinematic and content components use existing Fitcheck assets.
- ISC-10..18: source inspection — `PricingSection.tsx` renders $99/month, $799/year, $389 saving, 33% label, and no Apple billing claim.
- ISC-12..13: arithmetic probe — `99 * 12 - 799 = 389`; rounded saving percentage is `33`.
- ISC-21: build probe — `npm run build` exited 0 on 2026-08-10.
- ISC-22: live probe — local Vite home route returned HTTP 200 and rendered a captured Fitcheck hero.
- ISC-23..24: source/build probe — reduced-motion CSS remains and no environment configuration was added.
