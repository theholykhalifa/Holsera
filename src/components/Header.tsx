'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/nav';
import Icon from './Icon';
import { asset } from '@/lib/asset';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Header gains a soft shadow once the page scrolls under it; the thin
  // brand line tracks reading progress (0 at top, 1 at bottom).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link href="/" className="brand brand--header" aria-label="Holsera — home">
          {/* Official horizontal lockups — swaps with data-theme. Falls back to CSS if assets missing. */}
          <img
            src={asset('/brand/logo-horizontal-dark.png')}
            alt="Holsera"
            width={142}
            height={28}
            className="lockup__img lockup__img--on-dark brand__lockup-img"
            decoding="async"
          />
          <img
            src={asset('/brand/logo-horizontal.png')}
            alt="Holsera"
            width={142}
            height={28}
            className="lockup__img lockup__img--on-light brand__lockup-img"
            decoding="async"
          />
        </Link>

        <nav
          id="site-nav"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link href="/contact/" className="btn btn--primary btn--sm header-cta">
            Contact us
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
