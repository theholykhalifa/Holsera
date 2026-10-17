import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How the Holsera website handles data: no analytics, no tracking, no stored form submissions, and a contact form that transmits nothing.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="lead hero__lead">
            The short version: this website is a static pre-launch site. It collects no
            analytics, sets no tracking cookies, and its contact form transmits nothing.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container container--narrow">
          <div className="prose">
            <p className="mono-label">Last updated: October 2026</p>

            <h2>Scope</h2>
            <p>
              This policy applies to the Holsera website (the site you are reading). Holsera
              is a pre-launch venture; no Holsera product or service is live, so there are no
              accounts, dashboards, or customer data to describe. If that changes, this
              policy will be updated before those services go live.
            </p>

            <h2>What this site does not do</h2>
            <ul>
              <li>No analytics or tracking scripts of any kind.</li>
              <li>No advertising or third-party marketing pixels.</li>
              <li>No accounts, logins, or user profiles.</li>
              <li>No payment collection and no financial data handling.</li>
              <li>No identity verification and no document upload.</li>
            </ul>

            <h2>The contact form</h2>
            <p>
              The form on the <Link href="/contact/">Contact</Link> page is a front-end
              demonstration. It is not connected to any backend, mailbox, or database, and
              information entered into it is <strong>not transmitted or stored</strong>. It
              exists to show the intended interaction, not to receive messages.
            </p>

            <h2>Technical data and hosting</h2>
            <p>
              The site is hosted as a static website on GitHub Pages. Like any web server,
              GitHub processes standard technical request data (such as IP address, user
              agent, and request time) for delivery and security purposes, under
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">
                {' '}
                GitHub’s Privacy Statement
              </a>
              . This site has no visibility into or control over those standard server logs.
            </p>

            <h2>Local preferences</h2>
            <p>
              If you switch between dark and light appearance, that preference is stored in
              your own browser (localStorage). It never leaves your device and can be cleared
              at any time through your browser settings.
            </p>

            <h2>Cookies</h2>
            <p>
              This site sets no cookies of its own. Third-party services used for hosting may
              process technical data as described above.
            </p>

            <h2>Your rights</h2>
            <p>
              Because this site does not collect personal data, there is nothing of yours
              stored here to access, correct, or delete. If you contact Holsera through a
              channel that does transmit (once one is published), you may request access to
              or deletion of that correspondence.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              Any meaningful change — for example, adding analytics or a functional contact
              backend — will be reflected on this page with an updated date before the change
              takes effect.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy: the contact channel will be published here when it
              exists. Until then, the status of contact channels is described on the
              <Link href="/contact/"> Contact</Link> page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
