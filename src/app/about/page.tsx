import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Icon, { type IconName } from '@/components/Icon';
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

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'eye',
    title: 'Precision over hype',
    text: 'We use exact words: designed, planned, implemented, verified. Each one means something different, and we do not trade them.',
  },
  {
    icon: 'file-text',
    title: 'Evidence over assertion',
    text: 'A claim without a source is a placeholder. Placeholders stay visible until real evidence replaces them.',
  },
  {
    icon: 'workflow',
    title: 'Engineering restraint',
    text: 'Boring, auditable systems beat clever ones. Every moving part must justify itself.',
  },
];

const valueIcons: IconName[] = values.map((v) => v.icon);

export default function AboutPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <div className="split">
            <div>
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
                  <Icon name="arrow-right" size={17} />
                </a>
                <a href="#values" className="btn btn--secondary">
                  How we work
                </a>
              </div>
            </div>

            <Reveal>
              <div className="card asset-card">
                <LogoLockup width={430} />
                <img
                  src={asset('/brand/logo-3d.png')}
                  alt="Holsera three-dimensional mark"
                  width={140}
                  height={173}
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
        </div>
      </section>

      <section className="section section--soft" id="story" aria-labelledby="story-h">
        <div className="container">
          <div className="split">
            <Reveal>
              <SectionHeading
                id="story-h"
                eyebrow="Our story"
                title="From observation to infrastructure"
              />
              <p className="lead" style={{ color: 'var(--text-2)' }}>
                The same pattern kept appearing: capable teams losing days to disputes that a
                better record would have prevented in minutes. Holsera started as an attempt
                to turn that record into infrastructure.
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

      <section className="section" id="values" aria-labelledby="values-h">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="values-h"
              eyebrow="How we work"
              title="Standards we hold ourselves to"
            />
          </Reveal>
          <div className="grid grid--3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <article className="card">
                  <span className="card__icon">
                    <Icon name={valueIcons[i]} />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>Company details are placeholders for now.</strong> Legal entity:{' '}
            <span className="ph" title="Placeholder — replace with confirmed details before launch">
              {site.company.legalName}
            </span>{' '}
            · Location:{' '}
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
