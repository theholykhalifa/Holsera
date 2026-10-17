import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="hero hero--page">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This page doesn’t exist</h1>
        <p className="lead hero__lead">
          The link may be out of date, or the page hasn’t been published yet.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn--primary">
            Back to home
          </Link>
          <Link href="/contact/" className="btn btn--secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
