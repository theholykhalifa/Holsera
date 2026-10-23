import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Icon from '@/components/Icon';
import LaunchSignup from '@/components/LaunchSignup';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import {
  earlyAccessBenefits,
  earlyAccessExpectations,
  earlyAccessNote,
} from '@/lib/content';
import { Rail } from '@lucasmarkes/hairline/react';

export const metadata: Metadata = {
  title: 'Early access',
  description:
    'The Holsera early-access program: what participants get, what is expected, and what is honestly not promised yet. A pre-launch program for a product still in development — no dates, metrics, or customers claimed.',
  alternates: { canonical: '/early-access/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function EarlyAccessPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Early access</span>
            <h1>Help shape the workflow before it hardens</h1>
            <p className="lead hero__lead">
              Holsera is a product in development, built by one founder. Early access is a
              pre-launch program: a way to stay in the loop, see the design while it can
              still change, and tell us where trust breaks in your own transactions.
            </p>
            <div className="callout" style={{ marginTop: '2rem', maxWidth: '70ch' }}>
              <strong>Read this honestly.</strong> {earlyAccessNote}
            </div>
            <div className="btn-row" style={{ marginTop: '2rem' }}>
              <Link href="#join" className="btn btn--primary">
                Join the list
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link href="/demo/" className="btn btn--secondary">
                Try the concept demo
              </Link>
            </div>
          </div>
          <div className="hero__viz hero__viz--security">
            <Reveal variant="scale" delay={120}>
              <div className="figure-frame">
                <Figure
                  F={Rail}
                  hue="green"
                  label="Animated line drawing: a rail where a carriage travels along a track past stations, tracing the path a transaction takes"
                />
                <span className="figure-frame__caption">
                  A rail with stations ahead — early access is about the path being built,
                  not a destination already reached.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="benefits">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="benefits"
              eyebrow="What you get"
              title="What early access offers"
              lead="These are the stated benefits of the program. They describe how participants will be treated — not features of a product that does not exist yet."
            />
          </Reveal>
          <div className="rule-grid rule-grid--2">
            {earlyAccessBenefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--soft" aria-labelledby="expectations">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="expectations"
              eyebrow="What to expect"
              title="What the program is — and is not"
              lead="Being straightforward about the boundaries saves everyone disappointment later."
            />
          </Reveal>
          <div className="rule-grid rule-grid--2">
            {earlyAccessExpectations.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div id="join">
        <LaunchSignup
          ctaLabel="Request early access"
          note="Demo form — no data is transmitted or stored. When a real endpoint is authorised, this will say so before collecting anything."
        />
      </div>

      <CtaBand
        title="Not ready to join?"
        text="The interactive concept demo walks through a full transaction with simulated data — no sign-up, no real funds."
        primary={{ href: '/demo/', label: 'Try the demo' }}
        secondary={{ href: '/security-trust/', label: 'Security approach' }}
      />
    </>
  );
}
