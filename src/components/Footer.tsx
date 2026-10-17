import Link from 'next/link';
import { asset } from '@/lib/asset';
import { allPages } from '@/lib/nav';
import { site } from '@/lib/site.config';
import Placeholder from './Placeholder';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Link href="/" className="brand brand--footer" aria-label="Holsera — home">
              <img
                src={asset('/brand/logo-mark.png')}
                alt=""
                width={25}
                height={40}
                decoding="async"
                className="brand__mark"
              />
              <span className="brand__text">
                <span className="brand__name">HOLSERA</span>
                <span className="brand__tag">{site.tagline}</span>
              </span>
            </Link>
            <p className="muted small" style={{ marginTop: '1rem', maxWidth: '42ch' }}>
              Transaction-trust infrastructure for digital commerce: secure workflows,
              fraud signals, and escrow-style release logic — in development.
            </p>
            <p className="small" style={{ marginTop: '0.75rem' }}>
              <span className="badge badge--planned">{site.stage.badge}</span>
            </p>
          </div>

          <div>
            <h4>Site</h4>
            <ul className="footer-links">
              {allPages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>
                <Placeholder>{site.contact.email}</Placeholder>
              </li>
              <li>
                <Placeholder>{site.contact.location}</Placeholder>
              </li>
              <li>
                <Link href="/security-trust/">Security &amp; Trust</Link>
              </li>
              {site.social.length > 0 ? (
                site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))
              ) : null}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {site.company.legalName}. All rights reserved.
          </span>
          <span>
            Pre-launch site — capabilities shown as “Planned” are design targets, not live
            features. No certifications or guarantees are claimed.
          </span>
        </div>
      </div>
    </footer>
  );
}
