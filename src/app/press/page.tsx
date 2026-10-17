import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/asset';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site.config';

export const metadata: Metadata = {
  title: 'Press Kit',
  description:
    'Holsera brand assets: downloadable logos, color palette, boilerplate text, and the editorial rules for describing the venture honestly.',
  alternates: { canonical: '/press/' },
};

const colors = [
  { name: 'Brand Blue', hex: '#0A47E7', use: 'Primary — CTAs, links, accents' },
  { name: 'Signal Blue', hex: '#1A6DF4', use: 'Secondary — gradients, highlights' },
  { name: 'Deep Navy', hex: '#071E3D', use: 'Inverted bands, dark surfaces' },
  { name: 'Midnight', hex: '#050B14', use: 'Dark canvas background' },
];

const assets = [
  {
    file: 'logo-horizontal.png',
    name: 'Horizontal lockup — dark ink',
    use: 'For light backgrounds',
    previewClass: 'asset-tile__preview--light',
    height: 34,
  },
  {
    file: 'logo-horizontal-dark.png',
    name: 'Horizontal lockup — light ink',
    use: 'For dark backgrounds',
    previewClass: 'asset-tile__preview--dark',
    height: 34,
  },
  {
    file: 'logo-mark.png',
    name: 'Mark only',
    use: 'App icons, avatars, small sizes',
    previewClass: 'asset-tile__preview--dark',
    height: 72,
  },
  {
    file: 'logo-3d.png',
    name: '3D mark',
    use: 'Illustrative use only — headers, hero art',
    previewClass: 'asset-tile__preview--dark',
    height: 88,
  },
];

export default function PressPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Press &amp; Brand</span>
          <h1>Press kit</h1>
          <p className="lead hero__lead">
            Everything needed to reference Holsera accurately — logos, colors, boilerplate,
            and one firm rule: describe the venture exactly as it is. {site.tagline}
          </p>
          <div className="btn-row">
            <a href={asset('/brand/logo-horizontal-dark.png')} download className="btn btn--primary">
              Download logo pack
            </a>
            <Link href="/founder/" className="btn btn--secondary">
              Founder profile
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Logos ---------- */}
      <section className="band band--tight" aria-labelledby="logos">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="logos"
              eyebrow="Assets"
              title="Logos"
              lead="Pre-processed with clean transparency — usable directly on dark or light backgrounds. Do not recolor, stretch, or add effects."
            />
          </Reveal>
          <Reveal>
            <div className="asset-downloads">
              {assets.map((a) => (
                <a
                  key={a.file}
                  className="asset-tile"
                  href={asset(`/brand/${a.file}`)}
                  download
                >
                  <div className={`asset-tile__preview ${a.previewClass}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/brand/${a.file}`)}
                      alt={a.name}
                      height={a.height}
                      style={{ maxWidth: '100%', objectFit: 'contain' }}
                      decoding="async"
                    />
                  </div>
                  <div className="asset-tile__meta">
                    <div className="asset-tile__name">{a.name}</div>
                    <div className="asset-tile__use">
                      {a.use} · PNG · download
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Palette ---------- */}
      <section className="band band--soft" aria-labelledby="palette">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="palette"
              eyebrow="Colors"
              title="Brand palette"
              lead="Four colors define the system. Blue carries action; navy carries authority; the page canvas is near-black."
            />
          </Reveal>
          <Reveal>
            <div className="palette">
              {colors.map((c) => (
                <div className="swatch" key={c.hex}>
                  <div className="swatch__chip" style={{ background: c.hex }} />
                  <div className="swatch__meta">
                    <span className="swatch__name">{c.name}</span>
                    <div className="swatch__hex">
                      {c.hex} — {c.use}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Boilerplate ---------- */}
      <section className="band" aria-labelledby="boilerplate">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="boilerplate"
                eyebrow="Copy"
                title="Boilerplate"
                lead="Approved descriptions for articles and listings. Trim the long version if space is short."
              />
            </Reveal>
            <Reveal className="stack">
              <div className="placeholder-block" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <b style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                  SHORT
                </b>
                Holsera is building transaction-trust infrastructure for digital commerce:
                secure workflows, fraud signals, and escrow-style release logic — currently
                in development.
              </div>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }} />
              <div className="placeholder-block" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <b style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                  LONG
                </b>
                Holsera is a pre-launch technology venture founded by Khalifa, building
                transaction-trust infrastructure for digital commerce. Its intended platform
                combines secure transaction workflows, escrow-style release logic, and fraud
                signals in one system, designed so that businesses and individuals can
                interact with greater confidence, security, and transparency. The company is
                in development; capabilities are published with explicit statuses rather
                than marketing claims. Tagline: {site.tagline}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Editorial rules ---------- */}
      <section className="band band--soft" aria-labelledby="rules">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeading
              id="rules"
              eyebrow="Guidelines"
              title="How to describe Holsera accurately"
            />
          </Reveal>
          <Reveal>
            <div className="prose">
              <ul>
                <li>
                  <strong>Call it pre-launch.</strong> Holsera is in development. It is not
                  live, and no capability shown on the site is available for use.
                </li>
                <li>
                  <strong>No implied traction.</strong> There are no published customers,
                  partners, certifications, or metrics — please do not imply any.
                </li>
                <li>
                  <strong>Not a financial institution.</strong> Holsera is a technology
                  venture; it is not a bank and holds no financial-services licenses.
                </li>
                <li>
                  <strong>Mockups are mockups.</strong> Product and console views are
                  labeled mockups and should be captioned as such when republished.
                </li>
                <li>
                  <strong>Assets unmodified.</strong> Use logos as provided, on backgrounds
                  with sufficient contrast, with clear space around them.
                </li>
              </ul>
              <p>
                Attribution to “Holsera” or “Holsera (in development)” is appreciated.
                Questions about accuracy: see the <Link href="/contact/">Contact</Link> page.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
