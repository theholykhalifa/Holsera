import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { buildStory, founderConvictions } from '@/lib/content';
import { Branches } from '@lucasmarkes/hairline/react';

const pad = (i: number) => String(i + 1).padStart(2, '0');

export const metadata: Metadata = {
  title: 'Founder',
  description:
    'Khalifa is the founder and CEO of Holsera, driven by a vision to redefine digital trust through cybersecurity and secure transaction technology.',
  alternates: { canonical: '/founder/' },
};

export default function FounderPage() {
  return (
    <>
      {/* ---------- Hero: the short profile ---------- */}
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Founder &amp; CEO</span>
          <h1>Khalifa — Founder &amp; CEO of Holsera</h1>
          <p className="lead hero__lead">
            Khalifa is the founder and CEO of Holsera, driven by a vision to redefine
            digital trust through cybersecurity and secure transaction technology.
            Focused on bridging the gap between digital convenience and security, he
            leads Holsera&apos;s mission to make online transactions safer, more
            transparent, and more reliable through integrated cybersecurity, escrow
            solutions, and fraud prevention.
          </p>
          <div className="btn-row">
            <Link href="/about/" className="btn btn--primary">
              About Holsera
              <Icon name="arrow-right" size={17} />
            </Link>
            <Link href="/contact/" className="btn btn--secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Profile + editable details ---------- */}
      <section className="band band--tight" aria-labelledby="profile">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <div className="asset-card">
                <div className="monogram" aria-hidden="true">
                  K
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p className="asset-card__name">Khalifa</p>
                  <span className="mono-label">Founder &amp; CEO · Holsera</span>
                </div>
                <div className="mockup__caption">
                  <span className="mockup-label">Profile</span>
                  <p>Photograph and full name to be supplied before launch.</p>
                </div>
              </div>
            </Reveal>
            <Reveal className="stack">
              <SectionHeading
                id="profile"
                eyebrow="Profile"
                title="The person behind the mission"
              />
              <div className="placeholder-block">
                <b>Editable placeholders — founder details.</b> Replace each item with
                confirmed information before launch, and never with unverified claims.
                <br />
                <br />
                <span className="ph">[Full name — to be supplied]</span>
                <br />
                <span className="ph">[Location — to be supplied]</span>
                <br />
                <span className="ph">[Email — to be supplied]</span>
                <br />
                <span className="ph">[LinkedIn / professional profiles — to be supplied]</span>
                <br />
                <span className="ph">
                  [Certifications &amp; professional background — to be supplied]
                </span>
                <br />
                <span className="ph">[Photograph — to be supplied]</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Design convictions ---------- */}
      <section className="band" aria-labelledby="convictions">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="convictions"
              eyebrow="Convictions"
              title="Four positions the product takes on purpose"
              lead="These are not slogans. They are the design decisions the founder keeps returning to when a trade-off forces a choice."
            />
          </Reveal>
          <div className="rule-grid rule-grid--2">
            {founderConvictions.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Long-form biography ---------- */}
      <section className="band band--soft" aria-labelledby="biography">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeading
              id="biography"
              eyebrow="Biography"
              title="Trust, as something you build — not something you promise"
            />
          </Reveal>
          <Reveal>
            <div className="prose">
              <p>
                Khalifa is the Founder and CEO of Holsera, a technology venture built
                around a fundamental belief: trust should be engineered into every
                digital transaction.
              </p>
              <p>
                With a strong interest in cybersecurity, digital innovation, and secure
                financial technology, Khalifa founded Holsera with a clear vision — to
                help create a digital environment where businesses and individuals can
                interact with greater confidence, security, and transparency.
              </p>
              <p>
                His vision brings together cybersecurity, secure payments, escrow
                technology, and fraud prevention to address one of the most important
                challenges in the digital economy: establishing trust between parties
                who may never meet in person.
              </p>
              <p>
                Founded in 2020 by Khalifa, Holsera has since grown into the venture
                described across this site — a product still in development, presented
                with explicit statuses rather than marketing claims. It remains, today, a
                team of one: the founder builds every part of it personally.
              </p>
              <p>
                As the driving force behind Holsera, Khalifa focuses on building a
                company where security is not an afterthought, but a core principle
                embedded in every product, process, and user experience. His approach
                combines long-term strategic thinking with a commitment to developing
                practical technologies that solve real-world problems.
              </p>
              <p>
                For Khalifa, Holsera represents more than a technology company. It is a
                long-term mission to make digital commerce safer, more reliable, and
                more accessible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it is being built ---------- */}
      <section className="band band--tight" aria-labelledby="build-story">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="build-story"
                eyebrow="The build"
                title="How Holsera is actually being built"
              />
              <div className="figure-frame">
                <Figure
                  F={Branches}
                  hue="ice"
                  label="Animated line drawing: branches diverging from a trunk and recombining, tracing the path a change takes through a system"
                />
                <span className="figure-frame__caption">
                  One trunk, many branches — a single founder holding the whole system in
                  view at once.
                </span>
              </div>
            </Reveal>
            <div className="stack">
              {buildStory.map((para, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="build-story__para">{para}</p>
                </Reveal>
              ))}
              <Reveal>
                <div className="callout" style={{ marginTop: '0.5rem' }}>
                  <strong>Why this is stated openly.</strong> A solo founder is a real
                  constraint with real trade-offs. Hiding it would be the first break in
                  the trust this site is asking you to extend.
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Vision statement ---------- */}
      <section className="band band--deep band--tight" aria-label="Vision">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <p className="pull-quote">Build technology people can trust.</p>
            <span className="mono-label">The vision behind Holsera</span>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Holsera is pre-launch — and that is deliberate"
        text="No fabricated traction, no invented customers. If transaction trust matters to your business, the most useful thing you can send is a concrete picture of where trust breaks in your workflows today."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/security-trust/', label: 'Security approach' }}
      />
    </>
  );
}
