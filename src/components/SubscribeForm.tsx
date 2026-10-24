'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  SUBSCRIBE_IFRAME_NAME,
  mailingListLive,
  subscribe,
} from '@/lib/subscribe';

/**
 * Shared mailing-list form (launch band, developer preview, early access).
 *
 * Two honest modes, driven by site.mailingList.username:
 *
 *  - DEMO (username empty): validates locally, transmits nothing, and says
 *    so plainly in the submit result — the site's original contract.
 *  - LIVE (username set): submits to Buttondown's add-only embed endpoint
 *    (see src/lib/subscribe.ts for why that needs no secret key on a static
 *    site). Success is claimed only on evidence of a real accepted POST, and
 *    the wording stays truthful under Buttondown's double opt-in: the
 *    address is not on the list until the subscriber confirms by email.
 *
 * A honeypot field filters naive bots. The footnote names the processor
 * (Buttondown) and links the Privacy Policy — nothing about the
 * transmission is hidden or invented.
 */
export default function SubscribeForm({
  inputId,
  ctaLabel,
  placeholder,
  ariaLabel,
  source,
  emptyError = 'Please enter your email address.',
  note,
}: {
  inputId: string;
  ctaLabel: string;
  placeholder?: string;
  ariaLabel?: string;
  /** Extra Buttondown tag for attribution, e.g. "dev-preview". */
  source?: string;
  emptyError?: string;
  /** Override the standard footnote (rarely needed). */
  note?: ReactNode;
}) {
  const live = mailingListLive();
  const [error, setError] = useState('');
  const [state, setState] = useState<
    'idle' | 'submitting' | 'success' | 'demo' | 'failed'
  >('idle');
  const [email, setEmail] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Capture before any await — React nulls e.currentTarget after dispatch.
    const form = e.currentTarget;
    const fd = new FormData(form);
    const value = String(fd.get('email') ?? '').trim();
    const honeypot = String(fd.get('website') ?? '');
    setError('');
    setEmail(value);

    if (!value) {
      setError(emptyError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!live) {
      // Demo mode: nothing leaves the browser.
      form.reset();
      setState('demo');
      return;
    }

    if (honeypot) {
      // Bot filled the hidden field: stay quiet, claim nothing.
      form.reset();
      setState('success');
      return;
    }

    setState('submitting');
    const result = await subscribe(value, { source, iframeName: SUBSCRIBE_IFRAME_NAME });
    if (result.ok) {
      form.reset();
      setState('success');
    } else if (result.reason === 'rejected') {
      setState('failed');
      setError(
        'The mailing-list endpoint rejected that address. It may be closed, or the address may be invalid — please try another or contact us.'
      );
    } else {
      setState('failed');
      setError(
        'Could not reach the mailing-list endpoint (network or browser restriction). Please try again, or contact us directly.'
      );
    }
  };

  return (
    <div className="subscribe">
      {state === 'success' ? (
        <p className="form-status" role="status" aria-live="polite">
          <strong>Almost done — check your inbox.</strong>{' '}
          {live ? (
            <>
              A confirmation email is on its way to <span className="mono-inline">{email}</span>{' '}
              (double opt-in: nothing joins the list until you click the link in it). Your
              address is processed by Buttondown, our mailing-list provider, and is used
              only for Holsera product updates — every email carries an unsubscribe link.
            </>
          ) : (
            <>
              This site is running in demo mode — nothing was transmitted or stored. When
              the mailing list opens, this form connects to an authorised endpoint and
              this message changes to a real confirmation.
            </>
          )}
        </p>
      ) : (
        <>
          <form className="signup__form" onSubmit={onSubmit} noValidate>
            <input
              id={`${inputId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={placeholder ?? 'you@company.com'}
              aria-label={ariaLabel ?? 'Email address'}
              required
            />
            <button
              type="submit"
              className="btn btn--primary"
              disabled={state === 'submitting'}
            >
              {state === 'submitting' ? 'Joining…' : ctaLabel}
            </button>
            {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
            <input
              className="subscribe__hp"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </form>
          {error ? (
            <span className="signup__error" role="alert">
              {error}
            </span>
          ) : null}
        </>
      )}

      <p className="form-note">
        {note ??
          (live ? (
            <>
              Subscribing sends your email and a source tag to Buttondown, our
              mailing-list provider — see the <Link href="/privacy/">Privacy Policy</Link>.
              Never send financial or identity details here.
            </>
          ) : (
            'Demo form — no data is transmitted or stored. Never send financial or identity details here.'
          ))}
      </p>

      {/* Fallback target for the cross-document POST if fetch() is blocked. */}
      {live ? (
        <iframe
          name={SUBSCRIBE_IFRAME_NAME}
          title="Mailing-list subscription target"
          className="subscribe__frame"
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
