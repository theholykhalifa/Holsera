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

export const allPages: NavLink[] = [...navLinks, { href: '/contact/', label: 'Contact' }];
