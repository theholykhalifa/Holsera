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

  /**
   * Mailing list (Buttondown).
   * ------------------------------------------------------------------
   * These forms submit to Buttondown's embed-subscribe endpoint, which is
   * PUBLIC BY DESIGN and add-only: it can only append a subscriber, cannot
   * read or delete the list, and needs no secret key. That is what makes it
   * safe to call from a static site with no backend.
   *
   * `username` is your Buttondown account name (buttondown.com/<username>).
   * While it is an empty string, every form on this site runs in DEMO mode:
   * it validates locally and states, in the UI, that nothing is sent. Flipping
   * it to a real username switches the same forms to live submission.
   *
   * TODO(owner): create the Buttondown account, then set `username` below.
   */
  mailingList: {
    provider: 'Buttondown' as const,
    /** TODO: set to your Buttondown username; '' keeps forms in demo mode. */
    username: '',
    /** Tag applied to every signup so source is attributable in Buttondown. */
    tag: 'holsera-website',
  },

  /**
   * Booking (Cal.com).
   * ------------------------------------------------------------------
   * "Book a call" opens your Cal.com scheduling page so a visitor picks a
   * real time — no backend, no secret key (a Cal.com booking link is public).
   * `username` is your Cal.com handle (cal.com/<username>). While it is an
   * empty string, CalLink falls back to a normal link to /contact/.
   *
   * TODO(owner): create the Cal.com account, then set `username` below.
   */
  booking: {
    provider: 'Cal.com' as const,
    /** TODO: set to your Cal.com username; '' points booking links to /contact/. */
    username: '',
    /** Event type slug on your Cal.com account; every account has "30min". */
    event: '30min',
  },
} as const;

export type SiteConfig = typeof site;
