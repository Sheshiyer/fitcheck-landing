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

test('commercial truth stays aligned across React, content, and social surfaces', () => {
  const readSource = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
  const productSurfaces = [
    './src/components/CinematicLanding.tsx',
    './src/components/CTASection.tsx',
    './src/components/BookingForm.tsx',
    './src/components/Footer.tsx',
    './content/copy.md',
    './public/assets/og.svg',
  ].map(readSource).join('\n');

  assert.match(productSurfaces, /\$99/, 'monthly price reaches product surfaces');
  assert.match(productSurfaces, /\$799/, 'yearly price reaches product surfaces');
  assert.match(productSurfaces, /Explore Fitcheck plans/i, 'plan CTA reaches social/content surfaces');
  assert.match(productSurfaces, /Book a Fitcheck call/i, 'support CTA reaches product surfaces');
  assert.doesNotMatch(productSurfaces, /\$(?:1,000|3,000|7,500|10,000|15,000)/, 'retired launch prices are absent');
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
