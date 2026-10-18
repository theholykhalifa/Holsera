/**
 * Central configuration for the Holsera website.
 *
 * ┌────────────────────────────────────────────────────────────────────┐
 * │ Anything written in [square brackets] is an UNCONFIRMED PLACEHOLDER│
 * │ and must be replaced with real details before the site is public.  │
 * │ Never replace a placeholder with an unverified claim.              │
 * └────────────────────────────────────────────────────────────────────┘
 */

export const site = {
  name: 'Holsera',
  tagline: 'Trust, Engineered Into Every Transaction.',

  /**
   * Production URL of the deployed site.
   * Currently the GitHub Pages address (subpath included) — this IS a
   * confirmed URL, derived from the repository the user pushed to.
   * TODO: replace with the real custom domain before wide promotion,
   * and remember to update NEXT_PUBLIC_BASE_PATH handling if the site
   * stops living under /Holsera/ (see next.config.mjs).
   */
  url: 'https://theholykhalifa.github.io/Holsera',

  description:
    'Holsera is building transaction-trust infrastructure for digital commerce — secure transaction workflows, fraud-prevention signals, and escrow-style release logic, engineered for reliability.',

  themeColor: '#0A47E7',

  /** Product stage shown in the header strip and footer. */
  stage: {
    badge: 'Pre-launch preview',
    note:
      'Holsera is in development. Features shown as “Planned” or “In development” are design targets, not live capabilities.',
  },

  contact: {
    /** TODO: replace with the real contact address. */
    email: '[contact email — to be confirmed]',
    location: '[company location — to be confirmed]',
    responseTime: '[response-time target — to be confirmed]',
  },

  company: {
    /** Confirmed by the founder: the company trades as "Holsera".
     *  Update here if a distinct registered legal name is published later. */
    legalName: 'Holsera',
    /** Confirmed first-party: founded in 2020 by Khalifa. */
    founded: '2020',
  },

  /** Add real profiles here when they exist; the footer hides this list when empty. */
  social: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof site;
