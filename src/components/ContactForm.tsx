'use client';

import { useState, type FormEvent } from 'react';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const TOPICS = [
  'General enquiry',
  'Partnership',
  'Platform / integration',
  'Security disclosure',
  'Other',
] as const;

/**
 * Front-end only contact form.
 * It validates locally and NEVER transmits or stores anything — there
 * is intentionally no backend. The submit result states this plainly.
 * Do not add real submission until backend, security controls, testing
 * and legal authorisation are in place.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (fd: FormData): Errors => {
    const next: Errors = {};
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'Please enter a valid email address.';
    if (!message) next.message = 'Please enter a message.';
    else if (message.length < 10) next.message = 'Message should be at least 10 characters.';

    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = validate(fd);
    setErrors(next);
    setSent(false);

    if (Object.keys(next).length === 0) {
      e.currentTarget.reset();
      setSent(true);
    }
  };

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate>
      <p className="form-note" role="note">
        <strong>Demo form — no data is transmitted or stored.</strong> This site has no
        backend yet. Do not send financial, identity, or other sensitive documents.
      </p>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your name" />
          {errors.name ? <span className="error">{errors.name}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email *</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          {errors.email ? <span className="error">{errors.email}</span> : null}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-org">Organisation</label>
          <input
            id="cf-org"
            name="organisation"
            type="text"
            autoComplete="organization"
            placeholder="Company or project (optional)"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-topic">Topic</label>
          <select id="cf-topic" name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message *</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Tell us what you are building and where transaction trust is a problem."
        />
        {errors.message ? <span className="error">{errors.message}</span> : null}
      </div>

      <div className="btn-row">
        <button type="submit" className="btn btn--primary">
          Send message
        </button>
        <span className="form-note">Front-end validation only.</span>
      </div>

      <div role="status" aria-live="polite">
        {sent ? (
          <p className="form-status">
            <strong>Nothing was sent.</strong> Your message passed local validation, but this
            form does not transmit data — it is a pre-launch demo. Connect an authorised
            backend endpoint before enabling real submissions.
          </p>
        ) : null}
      </div>
    </form>
  );
}
