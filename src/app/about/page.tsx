import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import { asset } from '@/lib/asset';
import { LogoLockup } from '@/components/Logo';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site.config';

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
                title="From observation to infrastructure"
              />
              <p className="lead" style={{ color: 'var(--text-2)' }}>
                The same pattern kept appearing: capable teams losing days to disputes
                that a better record would have prevented in minutes. Holsera started as
                an attempt to turn that record into infrastructure.
              </p>
            </Reveal>
            <Reveal>
              <div className="placeholder-block">
                <b>Editable placeholder — founding details.</b> The full founding story,
                founder names, and company history should be supplied by the Holsera team
                before launch. Nothing here may be invented on their behalf.
                <br />
                <br />
                <span className="ph">[Founding story — to be supplied]</span>
                <br />
                <span className="ph">[Founders / team — to be supplied]</span>
                <br />
                <span className="ph">[Founded — {site.company.founded}]</span>
              </div>
            </Reveal>
          </div>
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
