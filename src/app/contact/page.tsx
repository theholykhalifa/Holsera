import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site.config';
import Placeholder from '@/components/Placeholder';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to the Holsera team about transaction trust, secure workflows, fraud signals, or escrow-style release logic. Pre-launch — demo form, no data transmitted.',
  alternates: { canonical: '/contact/' },
};

const channels = [
  { icon: 'mail' as const, label: 'Email', value: site.contact.email },
  { icon: 'pin' as const, label: 'Location', value: site.contact.location },
  { icon: 'clock' as const, label: 'Response time', value: site.contact.responseTime },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Tell us where trust breaks in your transactions</h1>
          <p className="lead hero__lead">
            Holsera is pre-launch. The most useful thing you can send is a concrete picture
            of how your transaction workflows fail today — we will share honestly what is
            built, what is planned, and what is still unconfirmed.
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="contact-form">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <SectionHeading
                id="contact-form"
                eyebrow="Send a message"
                title="Reach the team"
                lead="Front-end demo form — it validates locally and transmits nothing."
              />
              <ContactForm />
            </Reveal>

            <Reveal className="stack">
              <div className="card">
                <h3>Direct channels</h3>
                <ul className="footer-links" style={{ marginTop: '1rem', gap: '0.9rem' }}>
                  {channels.map((ch) => (
                    <li key={ch.label} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', marginTop: 2 }}>
                        <Icon name={ch.icon} size={17} />
                      </span>
                      <span>
                        <span className="mono-label" style={{ display: 'block' }}>
                          {ch.label}
                        </span>
                        <Placeholder>{ch.value}</Placeholder>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="callout">
                <strong>Do not send sensitive data.</strong> No financial, identity, or
                account documents should be shared through this form — it has no backend and
                no data-processing authorisation yet.
              </div>

              <div className="card">
                <h3>Security disclosure</h3>
                <p>
                  To report a vulnerability, choose <strong>“Security disclosure”</strong>{' '}
                  in the topic selector. A dedicated disclosure channel is{' '}
                  <span className="ph" title="Placeholder — replace with confirmed details before launch">
                    [planned before launch]
                  </span>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
