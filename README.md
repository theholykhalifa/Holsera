# Holsera — Website

**Trust, Engineered Into Every Transaction.**

Enterprise-grade marketing/product site for Holsera, a cybersecurity & FinTech project
focused on digital transaction trust, secure workflows, fraud prevention, and escrow
technology. Dark-first with an accessible light mode, built as a fully static export.

## Quick start

```bash
npm install        # once
npm run dev        # development server (http://localhost:3000)
npm run build      # production build -> static site in out/
npm run serve      # preview the static export locally
```

The site is a **static export** (`output: 'export'`) — the `out/` folder can be hosted on
any static host (no Node server required). **Do not publish before the placeholder
checklist below is completed.**

## Pages

| Route             | Purpose                                                            |
| ----------------- | ------------------------------------------------------------------ |
| `/`               | Purpose, problem, solution, capabilities + status, workflow, segments, next steps |
| `/platform/`      | Architecture concept, platform modules, console mockup             |
| `/how-it-works/`  | Five-stage workflow, transaction states table, record explanation   |
| `/solutions/`     | Target customer segments — challenges & intended approach           |
| `/security-trust/`| Design principles, honest security posture table, explicit non-claims |
| `/about/`         | Mission, founding-story placeholder, working standards              |
| `/contact/`       | Front-end demo form (no backend), placeholder contact channels      |
| `404`             | Custom not-found page                                               |

Plus SEO plumbing: per-page titles/descriptions/canonicals, `sitemap.xml`, `robots.txt`,
Open Graph + Twitter cards with a generated `opengraph-image.png`, and a favicon.

## Tech

- **Next.js 15** (App Router) + **React 19** + **TypeScript** — static export
- **Montserrat** via `next/font` (self-hosted at build, zero render-blocking requests)
- Plain CSS design system in `src/app/globals.css` (CSS variables, dark/light tokens)
- No UI framework, no analytics, no backend, no external requests at runtime

## Brand assets

Official logo files live in `public/brand/`:

```
public/brand/logo-mark.png            # H mark (transparent, trimmed)
public/brand/logo-horizontal.png      # lockup for LIGHT theme (transparent, trimmed)
public/brand/logo-horizontal-dark.png # lockup for DARK theme (white wordmark — generated)
public/brand/logo-3d.png              # glass H only (glow + wordmark removed — generated)
public/brand/originals/               # untouched originals the script starts from
```

Regenerate the processed variants after changing any source file:

```bash
node scripts/brand-prep.mjs
```

The script is idempotent: it always restarts from `public/brand/originals/`, removes
backgrounds, trims, generates the dark lockup variant (per the official "Dark
Background" usage panel), crops the 3D mark, and writes `src/app/icon.png` +
`src/app/opengraph-image.png`.

## Honesty system (keep this intact)

This site must never fabricate claims. The machinery for that:

- **`src/lib/site.config.ts`** — every unconfirmed company detail (domain, email,
  location, legal entity, founding year) as `[square-bracket]` placeholders.
- **`src/lib/content.ts`** — capabilities, workflow steps, and security posture with
  explicit `Status` labels (`planned` / `in-development` / `available` / `unconfirmed`)
  and honesty rules documented at the top of the file.
- **`<Placeholder>`** — renders dashed-underline editable placeholders.
- **`<StatusBadge>`** — renders a capability's development status.
- **`<MockupFrame>`** — every interface illustration is wrapped in this and labelled
  "Interface mockup"; conceptual diagrams are labelled "concept".
- Footer + pre-launch strip state plainly that Planned features are design targets and
  that no certifications or guarantees are claimed.

**Before launch, replace placeholders ONLY with verified facts.**

## Hard rules (compliance)

- No payment processing, escrow custody, identity verification, or sensitive
  data collection — the contact form validates locally and **transmits nothing**.
- No fabricated testimonials, partners, metrics, licences, certifications, or customer
  names. Customer-story/pricing/docs pages are intentionally absent until real material
  exists.
- Do not mark any capability `available` without evidence.

## Pre-launch placeholder checklist

- [ ] `site.url` — real production domain (currently `https://holsera.example`)
- [ ] `site.contact.email` / `location` / `responseTime`
- [ ] `site.company.legalName` / `founded`
- [ ] Founding story & team (About page)
- [ ] Security posture rows (audit, certifications, pen test, disclosure address)
- [ ] Capability statuses in `src/lib/content.ts` (confirm with the team)
- [ ] Real contact backend (authorised, tested, legally reviewed) before enabling submits
- [ ] Social profiles (`site.social`) when they exist

## Scripts

| Script                          | Purpose                                              |
| ------------------------------- | ---------------------------------------------------- |
| `scripts/brand-prep.mjs`        | Process logo files (backgrounds, variants, icon, OG) |
| `scripts/screenshot.mjs`        | Visual QA: screenshots every page in both themes     |
| `scripts/preview-logos.mjs`     | Brand-asset QA sheet (dark/light comparison)         |

Screenshot output: `scripts/screenshots/*.png`.

## Project structure

```
public/brand/          logo assets (+ originals/)
src/app/               layout, pages, styles, metadata routes
src/components/        Header, Footer, Logo system, MockupFrame, StatusBadge,
                       WorkflowStepper, ContactForm, Reveal, Icon, ...
src/lib/               site.config.ts · nav.ts · content.ts
scripts/               brand-prep · screenshot · preview-logos
out/                   static export (generated — safe to delete/regenerate)
```
