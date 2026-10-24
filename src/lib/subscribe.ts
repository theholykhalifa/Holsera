import { site } from './site.config';

/**
 * Mailing-list submission (Buttondown) — transport layer.
 *
 * The forms POST to Buttondown's *embed-subscribe* endpoint, the same one
 * their own embeddable form uses. It is public by design and strictly
 * add-only: a caller can append a subscriber, but cannot read, modify, or
 * delete the list. That add-only property is what makes it safe to call
 * from a static site with no backend and no secret key.
 *
 *   POST https://buttondown.com/api/emails/embed-subscribe/<username>
 *   body: email=<address>&tag=<tag>
 *
 * Double opt-in (Buttondown's default) means an address only joins the list
 * after the subscriber confirms by email — so neither a typo nor a hostile
 * submission can silently put someone on a list.
 *
 * Transport:
 *  1. PRIMARY — a cross-origin POST via fetch(). Success is judged from the
 *     real HTTP status, so the UI never claims delivery it did not get.
 *  2. FALLBACK — if fetch() is blocked (some browsers/extensions disallow
 *     cross-origin XHR), the same fields POST through a form targeting a
 *     hidden iframe. A cross-document POST is not subject to CORS, so it
 *     still reaches the endpoint; the caller confirms via the visible
 *     "check your inbox" wording, which double opt-in makes truthful.
 */

export const BUTTONDOWN_EMBED_URL = (username: string) =>
  `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}`;

/** Hidden iframe target name — keeps the page put during the fallback POST. */
export const SUBSCRIBE_IFRAME_NAME = 'holsera-subscribe-target';

/** True when the forms should submit for real; false = honest demo mode. */
export const mailingListLive = () => site.mailingList.username.trim().length > 0;

/**
 * Compose the tag Buttondown records, so signups are attributable by source.
 * e.g. "holsera-website" or "holsera-website,dev-preview".
 */
export const subscribeTag = (source?: string) =>
  [site.mailingList.tag, source].filter(Boolean).join(',');

export type SubscribeResult =
  | { ok: true; via: 'fetch' | 'iframe' }
  | { ok: false; reason: 'network' | 'rejected' | 'demo' };

/**
 * Attempt a live subscription.
 *
 * Returns ok:true only on evidence: either a 2xx from fetch(), or a
 * fallback that reached the iframe stage (no exception thrown before the
 * POST). Any thrown fetch error short-circuits to the iframe; a thrown
 * iframe setup error surfaces as a network failure so the UI says so.
 */
export async function subscribe(
  email: string,
  { source, iframeName }: { source?: string; iframeName?: string }
): Promise<SubscribeResult> {
  if (!mailingListLive()) return { ok: false, reason: 'demo' };

  const username = site.mailingList.username.trim();
  const url = BUTTONDOWN_EMBED_URL(username);
  const body = new URLSearchParams();
  body.set('email', email);
  const tag = subscribeTag(source);
  if (tag) body.set('tag', tag);

  // --- PRIMARY: fetch, judged on real status ---
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      // The response is opaque-ish cross-origin; rely on status only.
    });
    if (res.ok) return { ok: true, via: 'fetch' };
    // A 4xx/5xx (bad address, list closed, endpoint wrong) is a real answer.
    return { ok: false, reason: 'rejected' };
  } catch {
    // Blocked by CORS/extension/network — fall through to the iframe.
  }

  // --- FALLBACK: cross-document POST via hidden iframe ---
  try {
    const frame = document.querySelector<HTMLIFrameElement>(
      `iframe[name="${iframeName}"]`
    );
    if (!frame || !iframeName) return { ok: false, reason: 'network' };

    // Point a throwaway form at the iframe and submit it.
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.target = iframeName;
    form.style.display = 'none';
    for (const [k, v] of body.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    form.remove();
    return { ok: true, via: 'iframe' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
