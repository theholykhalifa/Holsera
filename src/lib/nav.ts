export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/platform/', label: 'Platform' },
  { href: '/how-it-works/', label: 'How It Works' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/security-trust/', label: 'Security & Trust' },
  { href: '/about/', label: 'About' },
  { href: '/founder/', label: 'Founder' },
];

/** Footer "Site" column — primary pages plus contact and resources. */
export const footerSiteLinks: NavLink[] = [
  ...navLinks,
  { href: '/contact/', label: 'Contact' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/press/', label: 'Press Kit' },
];

/** Footer "Legal" column. */
export const footerLegalLinks: NavLink[] = [
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms' },
];

/** Every page on the site — drives the sitemap. */
export const allPages: NavLink[] = [...footerSiteLinks, ...footerLegalLinks];
