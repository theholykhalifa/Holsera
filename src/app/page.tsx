import Link from 'next/link';
import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Icon from '@/components/Icon';
import LaunchSignup from '@/components/LaunchSignup';
import MockupFrame from '@/components/MockupFrame';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import TrustStats from '@/components/TrustStats';
import TrustNetwork from '@/components/TrustNetwork';
import WorkflowStepper from '@/components/WorkflowStepper';
import { Patch, Relay, Settle } from '@lucasmarkes/hairline/react';
import {
  capabilities,
  capabilityFootnote,
  mockupTx,
  problemPoints,
  segments,
  solutionPillars,
  workflowSteps,
} from '@/lib/content';

/** Homepage inherits title/description from the root layout. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero: statement + trust-network visual ---------- */}
      <section className="hero hero--home">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Transaction trust infrastructure</span>
            <h1 className="hero__title">Trust, engineered into every transaction.</h1>
            <p className="lead hero__lead">
              Holsera is building the trust layer for digital commerce: structured
              transaction workflows, fraud-prevention signals, and escrow-style release
              logic — so counterparties can move forward on evidence, not assumption.
            </p>
            <div className="btn-row">
              <Link href="/platform/" className="btn btn--primary btn--lg">
                Explore the platform
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link href="/contact/" className="btn btn--secondary btn--lg">
                Discuss a partnership
              </Link>
            </div>
            <div className="hero__spec">
              <span>Secure workflows</span>
              <span>Fraud signals</span>
              <span>Release logic</span>
            </div>
          </div>

          <div className="hero__viz">
            <Reveal variant="scale" delay={150}>
              <TrustNetwork />
            </Reveal>
          </div>
        </div>

        <div className="container container--wide hero__visual">
          <Reveal variant="scale">
            <MockupFrame>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span className="ui-id">
                  {mockupTx.id} · {mockupTx.caption}
                </span>
                <span className="ui-chip ui-chip--wait">Illustrative</span>
              </div>
              {mockupTx.rows.map((row) => (
                <div className="ui-row" key={row.label}>
                  <span className="ui-row__label">{row.label}</span>
                  <span className={`ui-chip${row.tone === 'done' ? ' ui-chip--done' : ''}`}>
                    {row.chip}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: '1.25rem' }}>
                <span className="mono-label">Audit trail</span>
                <div style={{ marginTop: '0.5rem' }}>
                  {mockupTx.trail.map((line) => (
                    <div className="ui-meta" key={line}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </MockupFrame>
          </Reveal>
        </div>
      </section>

      {/* ---------- The problem: inverted band ---------- */}
      <section className="band band--deep" aria-labelledby="problem">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="problem"
              eyebrow="The problem"
              title="Digital trust breaks between agreement and settlement"
              lead="Two parties agree on a transaction — then the record scatters across inboxes, chats, and tools. When something goes wrong, nobody can reconstruct what happened."
            />
          </Reveal>
          <div className="rule-grid rule-grid--4">
            {problemPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The cost of broken trust: animated stats ---------- */}
      <TrustStats />

      {/* ---------- The solution: three pillars with figures ---------- */}
      <section className="band" aria-labelledby="solution">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="solution"
              eyebrow="The approach"
              title="One workflow. One record. Shared truth."
              lead="Holsera proposes replacing ad-hoc coordination with an explicit, rule-driven transaction workflow that both sides — and any reviewer — can inspect."
              center
            />
          </Reveal>
          <div className="pillar-grid">
            <Reveal className="pillar" delay={0}>
              <article className="figure-card">
                <div className="figure-card__viz">
                  <Figure
                    F={Settle}
                    hue="blue"
                    label="Animated line drawing: twelve crooked tiles slide into an ordered tree around a central hub as the pointer nears"
                  />
                </div>
                <div className="figure-card__head">
                  <h3>{solutionPillars[0].title}</h3>
                  <StatusBadge status={solutionPillars[0].status} />
                </div>
                <p>{solutionPillars[0].text}</p>
              </article>
            </Reveal>
            <Reveal className="pillar" delay={80}>
              <article className="figure-card">
                <div className="figure-card__viz">
                  <Figure
                    F={Relay}
                    hue="green"
                    label="Animated line drawing: a path of tiles lights up hop by hop from a hub to a leaf, tracing a route"
                  />
                </div>
                <div className="figure-card__head">
                  <h3>{solutionPillars[1].title}</h3>
                  <StatusBadge status={solutionPillars[1].status} />
                </div>
                <p>{solutionPillars[1].text}</p>
              </article>
            </Reveal>
            <Reveal className="pillar" delay={160}>
              <article className="figure-card">
                <div className="figure-card__viz">
                  <Figure
                    F={Patch}
                    hue="amber"
                    label="Animated line drawing: a patch panel where the cable under the pointer lifts and neighbouring cables lean away"
                  />
                </div>
                <div className="figure-card__head">
                  <h3>{solutionPillars[2].title}</h3>
                  <StatusBadge status={solutionPillars[2].status} />
                </div>
                <p>{solutionPillars[2].text}</p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <div className="callout" style={{ marginTop: '2rem' }}>
              <strong>Design-stage description.</strong> These are the capabilities
              Holsera is being engineered to provide. Nothing on this site processes
              payments, holds funds, verifies identities, or collects sensitive
              customer data.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Capabilities: hairline rule-grid ---------- */}
      <section className="band band--soft" aria-labelledby="capabilities">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="capabilities"
              eyebrow="Capabilities"
              title="What we’re building — and exactly where it stands"
              lead="Every capability carries an explicit status. Nothing is presented as live unless it is marked Available."
            />
          </Reveal>
          <div className="rule-grid rule-grid--3">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 3) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <div className="rule-cell__head">
                    <h3>{cap.title}</h3>
                    <StatusBadge status={cap.status} />
                  </div>
                  <p>{cap.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="muted small" style={{ marginTop: '1.75rem' }}>
            {capabilityFootnote}
          </p>
        </div>
      </section>

      {/* ---------- Workflow preview ---------- */}
      <section className="band" aria-labelledby="workflow">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="workflow"
              eyebrow="Transaction workflow"
              title="How a transaction moves through Holsera"
              lead="Five explicit stages, every transition recorded with an actor and a reason."
            />
          </Reveal>
          <Reveal>
            <WorkflowStepper steps={workflowSteps} variant="flow" />
          </Reveal>
          <div
            className="flex-between"
            style={{ marginTop: '2rem', justifyContent: 'flex-start', gap: '2rem' }}
          >
            <p className="muted small" style={{ maxWidth: '62ch' }}>
              Conceptual workflow — no payments, custody, or identity verification are
              operational on this website.
            </p>
            <Link href="/how-it-works/" className="arrow-link">
              Read the full workflow
              <Icon name="arrow-right" size={15} />
            </Link>
            <Link href="/demo/" className="arrow-link">
              Try the interactive demo
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Launch signup: mid-page capture ---------- */}
      <LaunchSignup />

      {/* ---------- Target segments ---------- */}
      <section className="band band--soft" aria-labelledby="segments">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="segments"
              eyebrow="Who we’re building for"
              title="Customer segments we aim to serve"
              lead="These are target segments for the product — not a list of existing customers. Holsera does not publish customer names, logos, or testimonials without verified, attributable sources."
            />
          </Reveal>
          <div className="rule-grid rule-grid--2">
            {segments.map((seg, i) => (
              <Reveal key={seg.title} delay={i * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{seg.title}</h3>
                  <p>{seg.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link href="/solutions/" className="arrow-link">
              See solutions by segment
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Next steps ---------- */}
      <CtaBand
        title="Start with your transaction problem"
        text="Tell us where trust breaks in your workflows today. We’ll share what Holsera is building, what is still planned, and where your use case fits."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/security-trust/', label: 'Our security approach' }}
      />
    </>
  );
}
