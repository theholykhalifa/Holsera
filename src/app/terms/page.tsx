import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms of use for the Holsera website: a pre-launch informational site offering no live services, accounts, or transactions.',
  alternates: { canonical: '/terms/' },
};

export default function TermsPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Terms of Use</h1>
          <p className="lead hero__lead">
            The plain terms for a pre-launch site: everything here is informational, no
            service is being offered, and nothing on this page forms a contract.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container container--narrow">
          <div className="prose">
            <p className="mono-label">Last updated: October 2026</p>

            <h2>1. What this site is</h2>
            <p>
              This is the public website of Holsera, a venture in development. It describes a
              product that is being designed and built. It is informational: no Holsera
              service is live, and nothing here constitutes an offer of service, an account,
              or a functioning transaction platform.
            </p>

            <h2>2. “Planned” and “In development” mean exactly that</h2>
            <p>
              Capabilities shown as “Planned” or “In development” are design targets. Console
              and product views are labeled mockups. Do not rely on any feature shown here as
              an available capability. Only items explicitly marked “Available” are usable
              today.
            </p>

            <h2>3. No professional advice</h2>
            <p>
              Content on this site — including descriptions of escrow-style workflows,
              security posture, and fraud-signal design — is general information about a
              product concept. It is not legal, financial, regulatory, or security-compliance
              advice, and it should not be treated as such.
            </p>

            <h2>4. Intellectual property</h2>
            <p>
              The Holsera name, logo, tagline, and site content belong to Holsera. Brand
              assets may be used by press and partners within the guidelines on the
              <Link href="/press/"> Press Kit</Link> page. Any other use requires permission.
            </p>

            <h2>5. Third-party links</h2>
            <p>
              This site may link to third-party websites (for example, hosting infrastructure
              or, once published, regulatory references). Holsera does not control those
              sites and is not responsible for their content or practices.
            </p>

            <h2>6. No warranties</h2>
            <p>
              The site is provided “as is” and “as available,” without warranties of any
              kind, express or implied — including accuracy of descriptions, which describe
              intentions for a product still in development, and may legitimately change.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Holsera will not be liable
              for any indirect, incidental, or consequential loss arising from use of, or
              inability to use, this informational website.
            </p>

            <h2>8. Governing law</h2>
            <p>
              The governing jurisdiction for these terms will be stated here once the legal
              entity and its registration are confirmed. Until then, no jurisdiction is
              claimed and no regulatory filings are implied.
            </p>

            <h2>9. Changes</h2>
            <p>
              These terms may be updated as the venture progresses — for example, when a
              service actually launches, at which point service-specific terms will be
              introduced and clearly separated from this page.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms: see the <Link href="/contact/">Contact</Link> page
              for the current status of contact channels.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
