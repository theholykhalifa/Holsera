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
   * TODO: replace with the real production domain before launch.
   * Used for canonical URLs, sitemap, and social sharing metadata.
   */
  url: 'https://holsera.example',

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
    legalName: '[legal entity name — to be confirmed]',
    founded: '[founding year — to be confirmed]',
  },

  /** Add real profiles here when they exist; the footer hides this list when empty. */
  social: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof site;
