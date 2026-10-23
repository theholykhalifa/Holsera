'use client';

import { useState, type FormEvent } from 'react';

/**
 * Developer-preview waitlist form.
 * Mirrors LaunchSignup's honesty contract: validates locally and NEVER
 * transmits or stores anything — there is intentionally no backend. The
 * submit result states this plainly. Do not wire real submission until a
 * backend, security controls, testing and legal authorisation exist.
 */
export default function DevWaitlist() {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    setError('');

    if (!email) {
      setError('Please enter your work email address.');
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
    <div className="dev-waitlist">
      {sent ? (
        <p className="form-status" role="status" aria-live="polite">
          <strong>Nothing was sent — yet.</strong> Your email passed local validation, but
          this site has no backend, so nothing is stored or transmitted. When the
          developer preview opens, this form will connect to an authorised endpoint.
        </p>
      ) : (
        <>
          <form className="signup__form" onSubmit={onSubmit} noValidate>
            <input
              id="dev-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-label="Work email address"
            />
            <button type="submit" className="btn btn--primary">
              Request preview access
            </button>
          </form>
          {error ? (
            <span className="signup__error" role="alert">
              {error}
            </span>
          ) : null}
        </>
      )}
      <p className="form-note">Demo form — no data is transmitted or stored.</p>
    </div>
  );
}
