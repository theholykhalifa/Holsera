import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import { asset } from '@/lib/asset';
import { LogoLockup } from '@/components/Logo';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site.config';
import { threePillars } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Holsera',
  description:
    'Why Holsera exists: the purpose behind transaction-trust infrastructure, the stage the project is at, and the standards we hold ourselves to.',
  alternates: { canonical: '/about/' },
};

const values = [
  {
    title: 'Precision over hype',
    text: 'We use exact words: designed, planned, implemented, verified. Each one means something different, and we do not trade them.',
  },
  {
    title: 'Evidence over assertion',
    text: 'A claim without a source is a placeholder. Placeholders stay visible until real evidence replaces them.',
  },
  {
    title: 'Engineering restraint',
    text: 'Boring, auditable systems beat clever ones. Every moving part must justify itself.',
  },
];

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function AboutPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">About Holsera</span>
          <h1>Digital commerce runs on trust it rarely earns</h1>
          <p className="lead hero__lead">
            Holsera exists to engineer that trust into the transaction itself — into its
            workflow, its record, and its release conditions — instead of leaving it to
            goodwill, memory, and scattered messages.
          </p>
          <div className="btn-row">
            <a href="#story" className="btn btn--primary">
              Our story
            </a>
            <a href="#values" className="btn btn--secondary">
              How we work
            </a>
          </div>
        </div>
        <div className="container" style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <Reveal>
            <div className="asset-card">
              <LogoLockup width={430} />
              <img
                src={asset('/brand/logo-3d.png')}
                alt="Holsera three-dimensional mark"
                width={140}
                height={185}
                className="asset-3d"
                decoding="async"
              />
              <div className="mockup__caption">
                <span className="mockup-label">Brand asset</span>
                <p>Official Holsera mark &amp; lockup, per the brand guidelines.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band--soft" id="story" aria-labelledby="story-h">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="story-h"
                eyebrow="Our story"
                title="Built on a Belief. Driven by Trust."
              />
              <p className="lead" style={{ color: 'var(--text-2)' }}>
                Every great company begins with a problem worth solving. Holsera began with
                a simple belief: the digital world should be a place where people can do
                business with confidence, not uncertainty.
              </p>
            </Reveal>
            <Reveal>
              <div className="prose">
                <p>
                  Founded in 2020 by Khalifa, Holsera was born from a vision to make digital
                  transactions safer, more reliable, and more trustworthy. As commerce
                  increasingly moved online, the opportunities grew — but so did the risks.
                  Fraud, compromised data, unreliable transactions, and the absence of
                  meaningful trust between strangers created barriers to the digital
                  economy&apos;s full potential.
                </p>
                <p>
                  We believed technology could do more than simply connect people. It could
                  protect them. That belief became the foundation of Holsera.
                </p>
                <p>
                  From the beginning, our vision extended beyond conventional
                  cybersecurity. We saw an opportunity to bring security and trust together,
                  combining cybersecurity principles with secure transaction
                  infrastructure, escrow technology, fraud prevention, and digital trust
                  solutions. Our goal was to help build an environment where buyers and
                  sellers could interact with greater confidence, where security was
                  integrated into the transaction itself rather than treated as an
                  afterthought.
                </p>
                <p>
                  Holsera was envisioned not merely as a service provider, but as the
                  foundation of a more secure digital ecosystem — one designed around the
                  protection of people, businesses, and the value they exchange.
                </p>
                <p>
                  Building that vision requires more than technology. It demands
                  discipline, accountability, and a long-term commitment to earning trust.
                  These principles continue to shape our approach: security by design,
                  transparency by principle, and innovation guided by responsibility.
                </p>
                <p>
                  As we look toward the future, our ambition remains clear: to help
                  redefine how trust works in the digital economy. Through the convergence
                  of cybersecurity, secure payments, escrow infrastructure, and intelligent
                  fraud prevention, Holsera aims to make safer digital interactions the
                  standard rather than the exception.
                </p>
                <p>
                  We are building for a world where trust does not have to be assumed — it
                  can be engineered.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Three-pillar positioning ---------- */}
      <section className="band band--deep" aria-labelledby="pillars">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="pillars"
              eyebrow="What we are building"
              title="Three pillars, one system"
              lead="Holsera positions on three pillars. Each describes a layer of the same transaction workflow — and each is a design target for a product in development."
            />
          </Reveal>
          <div className="pillar-grid">
            {threePillars.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <article className="figure-card">
                  <span className="rule-cell__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.name}</h3>
                  <p>{p.what}</p>
                  <ul className="ticks" style={{ marginTop: '0.5rem' }}>
                    {p.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="callout" style={{ marginTop: '2rem' }}>
              <strong>Design-stage positioning.</strong> These pillars describe what
              Holsera is being engineered to provide. Statuses are stated per capability
              across this site; no pillar implies a shipped feature.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Leadership: founder short profile ---------- */}
      <section className="band" aria-labelledby="leadership">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="leadership"
                eyebrow="Leadership"
                title="Khalifa — Founder &amp; CEO"
              />
              <Link href="/founder/" className="arrow-link">
                Read the full founder profile
                <Icon name="arrow-right" size={15} />
              </Link>
            </Reveal>
            <Reveal>
              <div className="prose">
                <p>
                  <strong style={{ color: 'var(--text)' }}>Khalifa</strong> is the
                  founder and CEO of Holsera, driven by a vision to redefine digital
                  trust through cybersecurity and secure transaction technology.
                </p>
                <p>
                  Focused on bridging the gap between digital convenience and security,
                  he leads Holsera&apos;s mission to make online transactions safer,
                  more transparent, and more reliable through integrated
                  cybersecurity, escrow solutions, and fraud prevention.
                </p>
                <p>
                  Holsera is, today, a team of one. Every line of the product, every
                  design decision, and every word on this site is Khalifa&apos;s — a
                  deliberate stage, not an accident of growth. The first teammates will
                  be announced here when they exist.
                </p>
                <p>
                  His vision is simple: build technology people can trust.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--soft" id="values" aria-labelledby="values-h">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="values-h"
              eyebrow="How we work"
              title="Standards we hold ourselves to"
            />
          </Reveal>
          <div className="rule-grid rule-grid--3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>Company details.</strong> Legal entity: {site.company.legalName} ·
            Location:{' '}
            <span className="ph" title="Placeholder — replace with confirmed details before launch">
              {site.contact.location}
            </span>
          </div>
        </div>
      </section>

      <CtaBand
        title="Working on the same problem?"
        text="Whether you build a marketplace, a payment flow, or a platform — if trust breaks between agreement and settlement, we should talk."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/platform/', label: 'Explore the platform' }}
      />
    </>
  );
}
