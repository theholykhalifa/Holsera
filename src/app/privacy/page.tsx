import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How the Holsera website handles data: no analytics or tracking cookies. The mailing-list form sends your email to Buttondown; booking is handled by Cal.com. The contact message form transmits nothing.',
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
            The short version: this is a static pre-launch site with no analytics and no
            tracking cookies. Two things can transmit data, and both are named below: the
            mailing-list signup (to Buttondown) and meeting booking (to Cal.com). The
            contact <em>message</em> form transmits nothing.
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

            <h2>The mailing-list signup</h2>
            <p>
              The waitlist and early-access forms on this site submit your email address
              (and a tag noting which page you signed up from) to{' '}
              <a href="https://buttondown.com">Buttondown</a>, our mailing-list processor.
              Buttondown stores the address and uses it to send the Holsera newsletter and
              related updates. Subscription uses double opt-in: Buttondown sends a
              confirmation email, and your address is only added once you click the link in
              it. Every email carries an unsubscribe link. See{' '}
              <a href="https://buttondown.com/legal/privacy">Buttondown&rsquo;s privacy policy</a>{' '}
              for how they handle your data.
            </p>

            <h2>Meeting booking</h2>
            <p>
              The &ldquo;Book a call&rdquo; links open a scheduling page provided by{' '}
              <a href="https://cal.com">Cal.com</a>. Cal.com&rsquo;s scheduling script is
              only loaded once you interact with one of those links &mdash; not on page
              load. If you choose to book, the details you enter (such as your name, email,
              and the time you pick) go to Cal.com to create the appointment. See{' '}
              <a href="https://cal.com/privacy">Cal.com&rsquo;s privacy policy</a> for how
              they handle your data.
            </p>

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
              This site sets no cookies of its own. Two third parties may set their own
              cookies when you use their features: GitHub Pages (hosting, as described
              above), and Cal.com — whose scheduling widget loads only when you interact
              with a booking link. Buttondown is only contacted when you submit a signup
              form. You can manage or block third-party cookies through your browser
              settings.
            </p>

            <h2>Your rights</h2>
            <p>
              Nothing is stored on this site itself — it is a static website, so there is
              no local database to access, correct, or delete. For data held by our
              processors: newsletter subscriptions are held by Buttondown, where you can
              unsubscribe from any email or request access and deletion under{' '}
              <a href="https://buttondown.com/legal/privacy">their policy</a>; appointments
              are held by Cal.com under{' '}
              <a href="https://cal.com/privacy">their policy</a>. Messages entered in the
              contact form are never transmitted anywhere, so there is nothing to delete.
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
