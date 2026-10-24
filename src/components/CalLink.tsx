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
const ORIGIN = 'https://app.cal.com';
const namespace = 'holsera';

/**
 * Namespaced API handle. Both the root `window.Cal` and each `Cal.ns[name]`
 * entry are callable and carry their own command queue.
 */
type CalFn = ((...a: unknown[]) => void) & {
  q?: unknown[][];
  ns?: Record<string, CalFn>;
};

const getCal = (): CalFn | undefined => (window as unknown as { Cal?: CalFn }).Cal;

const currentTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const calUrl = () => {
  const u = site.booking.username.trim();
  const ev = site.booking.event.trim() || '30min';
  return u ? `https://cal.com/${encodeURIComponent(u)}/${encodeURIComponent(ev)}` : null;
};

/**
 * Install the queueing loader — a faithful port of Cal.com's own snippet.
 *
 * embed.js does NOT define `window.Cal` itself; it requires a pre-existing
 * callable holding a command queue (it throws "Cal is not defined" otherwise)
 * and drains that queue once loaded. It also instantiates a namespace the
 * moment it sees `Cal("init", <ns>, …)` — via `initNamespace`, which reads
 * `globalCal.ns[ns]` — so the namespace entry and its queue MUST already
 * exist before the script runs, or embed.js crashes with "Cannot convert
 * undefined or null to object" and the modal silently never opens.
 *
 * So: install a function that (a) creates the namespace queue on first
 * `init`, and (b) self-injects embed.js exactly once, on its first call.
 */
/**
 * Install Cal.com's command queue and inject embed.js — a faithful port of
 * their own snippet, deferred until the visitor shows intent.
 *
 * embed.js does NOT define `window.Cal`; it REQUIRES a pre-existing callable
 * holding a command queue (it throws "Cal is not defined. This shouldn't
 * happen" otherwise) and drains that queue on load. It also instantiates a
 * namespace the instant it sees `Cal("init", <ns>, …)` — via `initNamespace`,
 * which reads `globalCal.ns[ns]` — so both the namespace entry and its queue
 * MUST exist before the script runs, or it dies with "Cannot convert
 * undefined or null to object" and the modal silently never opens.
 *
 * The namespace's queue doubles as the readiness signal: embed.js drains it
 * and swaps `push` for immediate execution, so "empty" means "taken over".
 */
function installCalLoader(): CalFn {
  const w = window as unknown as { Cal?: CalFn };
  if (w.Cal) return w.Cal;

  const makeNsApi = (): CalFn => {
    const api = ((...a: unknown[]) => {
      api.q?.push(a);
    }) as CalFn;
    api.q = [];
    return api;
  };

  const CalFnImpl = function Cal(...args: unknown[]) {
    CalFnImpl.q?.push(args);
    // Cal("init", "ns", config) — create the namespace queue up front so the
    // script's initNamespace can construct it without choking.
    const [first, second] = args;
    if (first === 'init' && typeof second === 'string' && second) {
      CalFnImpl.ns = CalFnImpl.ns ?? {};
      CalFnImpl.ns[second] = CalFnImpl.ns[second] ?? makeNsApi();
    }
  } as CalFn;

  CalFnImpl.q = [];
  CalFnImpl.ns = {};
  w.Cal = CalFnImpl;

  // Prime the namespace and issue init BEFORE the script arrives, so both are
  // queued rather than lost. Only then fetch — the whole point is that nothing
  // is requested until the visitor reaches for the booking link.
  CalFnImpl.ns[namespace] = makeNsApi();
  CalFnImpl('init', namespace, { origin: ORIGIN });

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = `${ORIGIN}/embed/embed.js`;
  script.async = true;
  document.head.appendChild(script);

  return CalFnImpl;
}

/**
 * Resolve once embed.js has drained the namespace queue.
 *
 * Readiness is not the script's load event (it can settle first) and not
 * `Cal.ns` (our loader owns that) — it is "our buffered init has been
 * consumed", which only embed.js's own processQueue does.
 */
function loadCalEmbed(): Promise<CalFn> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('no window'));
      return;
    }

    const Cal = installCalLoader();
    const drained = () => {
      const nsApi = Cal.ns?.[namespace];
      return Boolean(nsApi && nsApi.q && nsApi.q.length === 0);
    };

    // Already taken over: the queue is empty and push executes immediately.
    if (drained()) {
      resolve(Cal);
      return;
    }

    const deadline = Date.now() + 10000;
    const tick = setInterval(() => {
      if (drained()) {
        clearInterval(tick);
        resolve(Cal);
      } else if (Date.now() > deadline) {
        clearInterval(tick);
        reject(new Error('timeout'));
      }
    }, 100);
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
    if (loadedRef.current) return;
    if (loadingRef.current) return;
    loadingRef.current = true;

    loadCalEmbed()
      .then((cal) => {
        loadedRef.current = true;
        // The namespace API queues this if embed.js is still arriving, and
        // executes it directly once it has drained the queue.
        cal.ns?.[namespace]?.('ui', {
          theme: currentTheme(),
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

    const cal = getCal();
    if (cal && loadedRef.current) {
      e.preventDefault();
      const ev = site.booking.event.trim() || '30min';
      const nsApi = cal.ns?.[namespace];
      // Re-assert the theme in case it changed since the modal was primed.
      nsApi?.('ui', { theme: currentTheme() });
      nsApi?.('modal', {
        calLink: `${site.booking.username.trim()}/${ev}`,
      });
      return;
    }
    // Not loaded yet: default anchor behaviour — navigate to the public
    // booking page. ensureLoaded() has usually started the fetch on hover,
    // so the next click opens the modal instead.
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
