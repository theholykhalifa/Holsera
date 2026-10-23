'use client';

import { useState, type FormEvent } from 'react';
import Reveal from './Reveal';

/**
 * Waitlist form used by the launch band and the early-access page.
 * Mirrors ContactForm's honesty contract: validates locally and NEVER
 * transmits or stores anything — there is intentionally no backend. The
 * submit result states this plainly. Do not wire real submission until a
 * backend, security controls, testing and legal authorisation exist.
 */
export default function LaunchSignup({
  ctaLabel = 'Notify me',
  note,
}: {
  ctaLabel?: string;
  note?: string;
} = {}) {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <section className="signup" aria-labelledby="signup-title">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Get notified at launch</span>
          <h2 id="signup-title">Be first through the door</h2>
          <p className="lead">
            Holsera is in active development. Leave your email and we&rsquo;ll tell you
            what ships, what is still planned, and what we learn along the way.
          </p>

          {sent ? (
            <p className="form-status" role="status" aria-live="polite">
              <strong>Nothing was sent — yet.</strong> Your email passed local validation,
              but this site has no backend, so nothing is stored or transmitted. Once the
              launch list opens, this form will connect to an authorised endpoint.
            </p>
          ) : (
            <>
              <form className="signup__form" onSubmit={onSubmit} noValidate>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn--primary">
                  {ctaLabel}
                </button>
              </form>
              {error ? (
                <span className="signup__error" role="alert">
                  {error}
                </span>
              ) : null}
            </>
          )}

          <p className="form-note signup__note">
            {note ??
              'Demo form — no data is transmitted or stored. Never send financial or identity details here.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
