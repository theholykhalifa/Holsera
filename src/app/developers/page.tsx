import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import DevWaitlist from '@/components/DevWaitlist';
import Figure from '@/components/Figure';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { devPreviewNote, devSurfaces } from '@/lib/content';
import { Terminal } from '@lucasmarkes/hairline/react';

export const metadata: Metadata = {
  title: 'Developer preview',
  description:
    'The shape of the Holsera API being designed — transactions, webhooks, release rules, and the audit log — described honestly as planned interfaces, not a shipped product. Join the developer preview to shape them.',
  alternates: { canonical: '/developers/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function DevelopersPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Developer preview</span>
            <h1>An API designed in the open — before it ships</h1>
            <p className="lead hero__lead">
              Holsera is being built API-first. This page describes the shape of the
              interfaces being designed — how a transaction, its evidence, and its release
              rules would look to your systems — so integrators can tell us whether it
              matches what they actually need.
            </p>
            <div className="callout" style={{ marginTop: '2rem', maxWidth: '70ch' }}>
              <strong>Status.</strong> {devPreviewNote}
            </div>
            <div className="btn-row" style={{ marginTop: '2rem' }}>
              <Link href="/architecture/" className="btn btn--primary">
                Read the architecture
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
                  F={Terminal}
                  hue="green"
                  label="Animated line drawing: a terminal window where a cursor types a command and a stack of output lines builds up"
                />
                <span className="figure-frame__caption">
                  API-first by design — every workflow action is meant to be an
                  authenticated call, not a button in a UI.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="surfaces">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="surfaces"
              eyebrow="Designed surfaces"
              title="What the API is being designed to expose"
              lead="Each surface below is a design target for a product in development. None is live, and none is documented as shipped."
            />
          </Reveal>
          <div className="list-rows">
            {devSurfaces.map((s, i) => (
              <Reveal key={s.area} delay={i * 60}>
                <div className="list-row">
                  <span className="list-row__index">{pad(i)}</span>
                  <div className="list-row__head">
                    <h3>{s.area}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p>{s.shape}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--deep band--tight" aria-labelledby="dev-waitlist">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="eyebrow">Shape it with us</span>
            <h2 id="dev-waitlist">Join the developer preview</h2>
            <p className="lead">
              If you build transaction flows and want the interfaces to fit your systems,
              say so. Integrator feedback is what turns a designed surface into a shipped
              one.
            </p>
            <div style={{ marginTop: '1.75rem' }}>
              <DevWaitlist />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Prefer to see it running first?"
        text="The interactive concept demo walks through a full transaction with simulated data — no sign-up, no real funds."
        primary={{ href: '/demo/', label: 'Try the demo' }}
        secondary={{ href: '/how-it-works/', label: 'How it works' }}
      />
    </>
  );
}
