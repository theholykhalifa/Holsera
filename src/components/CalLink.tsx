'use client';

import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { site } from '@/lib/site.config';

/**
 * Booking link backed by Cal.com.
 *
 * Behaviour is config-driven by site.booking:
 *  - username empty  → renders a plain internal link to /contact/ (the
 *    honest fallback while no scheduling account exists).
 *  - username set    → renders an anchor to the real cal.com booking page.
 *    On first user intent (hover, focus, or click) it injects Cal.com's
 *    embed script ONCE and opens the scheduler as a modal in-place; if the
 *    script is blocked or still loading, the same anchor simply navigates
 *    to the public booking URL in a new tab. Either way the visitor reaches
 *    a real scheduler — the page never claims a booking that did not happen.
 *
 * No third-party script is fetched at page load — only after intent — which
 * keeps the "no runtime third-party requests until you act" property the
 * rest of this site holds.
 *
 * A Cal.com booking link is public by design (that is what a scheduling
 * page IS), so no secret key is involved and nothing sensitive is exposed.
 */
const SCRIPT_ID = 'cal-com-embed';

const calUrl = () => {
  const u = site.booking.username.trim();
  const ev = site.booking.event.trim() || '30min';
  return u ? `https://cal.com/${encodeURIComponent(u)}/${encodeURIComponent(ev)}` : null;
};

const namespace = 'holsera';

function loadCalEmbed(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'));
    const w = window as unknown as { Cal?: (...a: unknown[]) => void & { ns?: Record<string, unknown> } };
    if (w.Cal) return resolve();
    if (document.getElementById(SCRIPT_ID)) {
      // Already requested earlier; poll briefly for readiness.
      const t = setInterval(() => {
        if (w.Cal) {
          clearInterval(t);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(t);
        reject(new Error('timeout'));
      }, 8000);
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('blocked'));
    document.head.appendChild(script);
  });
}

export default function CalLink({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const url = calUrl();
  const loadedRef = useRef(false);
  const loadingRef = useRef(false);

  const ensureLoaded = useCallback(() => {
    const w = window as unknown as { Cal?: (...a: unknown[]) => void };
    if (loadedRef.current || w.Cal) {
      loadedRef.current = true;
      return;
    }
    if (loadingRef.current) return;
    loadingRef.current = true;
    loadCalEmbed()
      .then(() => {
        loadedRef.current = true;
        const c = window as unknown as {
          Cal?: ((...a: unknown[]) => void) & { ns?: Record<string, (...a: unknown[]) => void> };
        };
        c.Cal?.('init', namespace, { origin: 'https://app.cal.com' });
        const theme =
          document.documentElement.getAttribute('data-theme') === 'light'
            ? 'light'
            : 'dark';
        c.Cal?.ns?.[namespace]?.('ui', {
          theme,
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      })
      .catch(() => {
        // Script blocked or timed out: leave loadedRef false so a later
        // intent retries, and let the plain anchor navigate to cal.com.
        loadingRef.current = false;
      });
  }, []);

  // Intent is the anchor's own hover/focus — no window-level listeners and
  // no preconnect, so nothing at all is fetched (or even connected) to a
  // third party until the visitor actually reaches for this link.

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (!url) return; // internal /contact/ link — let it navigate
    const w = window as unknown as { Cal?: (...a: unknown[]) => void & { ns?: Record<string, unknown> } };
    if (w.Cal && loadedRef.current) {
      e.preventDefault();
      const ev = site.booking.event.trim() || '30min';
      const c = window as unknown as {
        Cal?: ((...a: unknown[]) => void) & { ns?: Record<string, (...a: unknown[]) => void> };
      };
      const theme =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? 'light'
          : 'dark';
      c.Cal?.ns?.[namespace]?.('ui', { theme });
      c.Cal?.ns?.[namespace]?.('modal', {
        calLink: `${site.booking.username.trim()}/${ev}`,
      });
    }
    // else: default anchor behaviour — navigate to the public booking page.
  };

  if (!url) {
    // Not configured: plain internal link to the honest fallback page.
    return (
      <Link href="/contact/" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={ensureLoaded}
      onFocus={ensureLoaded}
    >
      {children}
    </a>
  );
}
