// landing.test.mjs — acceptance contract for the Fitcheck launch landing page.
// The conductor (Task 9) owns this test; the build must satisfy it. Run: node --test
//
// buildLanding() (from build.mjs) returns the full landing HTML (brand tokens inlined). These
// assertions encode "builds + renders + on-brand + complete" so ship-battery's tests gate is real.

import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { buildLanding } from './build.mjs';

const html = buildLanding();

test('buildLanding returns a non-empty HTML document', () => {
  assert.equal(typeof html, 'string');
  assert.ok(html.length > 1500, 'a real landing page, not a stub');
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html[\s>]/i);
});

test('all 7 brand-config sections are present (by id)', () => {
  for (const id of ['hero', 'problem', 'solution', 'how-it-works', 'pricing', 'faq', 'cta']) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing section #${id}`);
  }
});

test('hero carries the brand tagline + ROI-framed voice', () => {
  assert.match(html, /Let every shopper become your product model/, 'brand tagline (brand-spec)');
});

test('on-brand: the brand palette is in the output (tokens inlined)', () => {
  for (const hex of ['#FF6B35', '#1A1A2E', '#16213E']) {
    assert.match(html, new RegExp(hex, 'i'), `missing brand color ${hex}`);
  }
});

test('pricing shows only the monthly and yearly subscription offer', () => {
  assert.match(html, /\$99/, 'monthly price');
  assert.match(html, /\$799/, 'yearly price');
  assert.match(html, /Save \$389/i, 'annual saving');
  assert.equal((99 * 12) - 799, 389, 'annual saving arithmetic');
  assert.doesNotMatch(html, /\$[1-9],000|\$1[0-9],000/, 'retired launch pricing');
});

test('commercial truth stays aligned on every named product surface', () => {
  const readSource = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
  const surfaces = {
    cinematic: readSource('./src/components/CinematicLanding.tsx'),
    cta: readSource('./src/components/CTASection.tsx'),
    booking: readSource('./src/components/BookingForm.tsx'),
    footer: readSource('./src/components/Footer.tsx'),
    content: readSource('./content/copy.md'),
    social: readSource('./public/assets/og.svg'),
  };
  const unsupportedCommercialTruth = /\$(?:1,000|3,000|7,500|10,000|15,000)|30%/i;

  assert.match(surfaces.cinematic, /price:\s*99,/, 'cinematic product uses monthly price');
  assert.match(surfaces.cinematic, /cta:\s*"EXPLORE FITCHECK PLANS"/, 'cinematic product uses approved CTA');
  assert.match(surfaces.cta, /Start monthly for \$99 or choose yearly for \$799/, 'CTA section states both plans');
  assert.match(surfaces.booking, /Book a Fitcheck call/, 'booking form uses approved support CTA');
  assert.match(surfaces.footer, /Explore plans/, 'footer uses approved plan CTA');
  assert.match(surfaces.content, /\*\*price:\*\* \$99 \/ month/, 'content states monthly price');
  assert.match(surfaces.content, /\*\*price:\*\* \$799 \/ year/, 'content states yearly price');
  assert.match(surfaces.content, /\*\*reassurance:\*\* Choose monthly flexibility or yearly value\./, 'content matches builder reassurance');
  assert.match(surfaces.social, />Explore Fitcheck plans</, 'social art uses approved plan CTA');

  for (const [name, source] of Object.entries(surfaces)) {
    assert.doesNotMatch(source, unsupportedCommercialTruth, `${name} excludes retired prices and unsupported 30% claims`);
  }
});

test('booking form is present and opens Cal.com prefill (FR-011)', () => {
  assert.match(html, /<form[\s>]/i, 'a booking form');
  assert.match(html, /type=["']email["']/i, 'an email field');
  assert.match(html, /cal\.com\/thoughtseedlabs\/30min/i, 'Cal.com booking base URL');
  assert.match(html, /Book a Fitcheck call/i, 'subscription-support CTA');
});

test('no placeholder / lorem / TODO leftovers in the output', () => {
  assert.doesNotMatch(html, /lorem ipsum|placeholder|\bTODO\b|\bFIXME\b|xxxxx|\bTBD\b/i);
});
