import Link from 'next/link';
import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Icon, { type IconName } from '@/components/Icon';
import MockupFrame from '@/components/MockupFrame';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import WorkflowStepper from '@/components/WorkflowStepper';
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

const problemIcons: IconName[] = ['users', 'layers', 'alert', 'clock'];
const segmentIcons: IconName[] = ['store', 'building', 'truck', 'code'];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero: purpose ---------- */}
      <section className="hero">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Transaction trust infrastructure</span>
              <h1 className="hero__title">
                Trust, <span className="accent">Engineered</span> Into Every Transaction.
              </h1>
              <p className="lead hero__lead">
                Holsera is building the trust layer for digital commerce: structured
                transaction workflows, fraud-prevention signals, and escrow-style release
                logic — so counterparties can move forward on evidence, not assumption.
              </p>
              <div className="btn-row">
                <Link href="/platform/" className="btn btn--primary">
                  Explore the platform
                  <Icon name="arrow-right" size={17} />
                </Link>
                <Link href="/how-it-works/" className="btn btn--secondary">
                  How it works
                </Link>
              </div>
              <div className="hero__meta">
                <span>Secure transaction workflows</span>
                <span>Fraud-prevention signals</span>
                <span>Escrow-style release logic</span>
              </div>
            </div>

            <Reveal className="hero__visual">
              <MockupFrame title="Transaction workflow — mockup">
                <div className="flex-between" style={{ marginBottom: '0.9rem' }}>
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
                <div style={{ marginTop: '1rem' }}>
                  <span className="mono-label">Audit trail</span>
                  <div className="ui-row" style={{ marginTop: '0.5rem', display: 'block' }}>
                    {mockupTx.trail.map((line) => (
                      <div className="ui-meta" key={line} style={{ lineHeight: 1.7 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </MockupFrame>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The problem ---------- */}
      <section className="section section--soft" aria-labelledby="problem">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="problem"
              eyebrow="The problem"
              title="Digital trust breaks between agreement and settlement"
              lead="Two parties agree on a transaction — then the record scatters across inboxes, chats, and tools. When something goes wrong, nobody can reconstruct what happened."
            />
          </Reveal>
          <div className="grid grid--4">
            {problemPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 60}>
                <article className="card">
                  <span className="card__icon">
                    <Icon name={problemIcons[i]} />
                  </span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The solution ---------- */}
      <section className="section" aria-labelledby="solution">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="solution"
              eyebrow="The approach"
              title="One workflow. One record. Shared truth."
              lead="Holsera proposes replacing ad-hoc coordination with an explicit, rule-driven transaction workflow that both sides — and any reviewer — can inspect."
            />
          </Reveal>
          <div className="grid grid--2">
            {solutionPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 60}>
                <article className="card card--interactive">
                  <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{pillar.title}</h3>
                    <StatusBadge status={pillar.status} />
                  </div>
                  <p>{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>Design-stage description.</strong> These are the capabilities Holsera is
            being engineered to provide. Nothing on this site processes payments, holds
            funds, verifies identities, or collects sensitive customer data.
          </div>
        </div>
      </section>

      {/* ---------- Capabilities & status ---------- */}
      <section className="section section--soft" aria-labelledby="capabilities">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="capabilities"
              eyebrow="Capabilities"
              title="What we’re building — and exactly where it stands"
              lead="Every capability carries an explicit status. Nothing is presented as live unless it is marked Available."
            />
          </Reveal>
          <div className="grid grid--3">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 3) * 60}>
                <article className="card">
                  <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{cap.title}</h3>
                    <StatusBadge status={cap.status} />
                  </div>
                  <p>{cap.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="muted small" style={{ marginTop: '1.5rem' }}>
            {capabilityFootnote}
          </p>
        </div>
      </section>

      {/* ---------- Workflow preview ---------- */}
      <section className="section" aria-labelledby="workflow">
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
          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <p className="muted small" style={{ maxWidth: '62ch' }}>
              Conceptual workflow — no payments, custody, or identity verification are
              operational on this website.
            </p>
            <Link href="/how-it-works/" className="btn btn--secondary btn--sm">
              Read the full workflow
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Target segments ---------- */}
      <section className="section section--soft" aria-labelledby="segments">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="segments"
              eyebrow="Who we’re building for"
              title="Customer segments we aim to serve"
              lead="These are target segments for the product — not a list of existing customers. Holsera does not publish customer names, logos, or testimonials without verified, attributable sources."
            />
          </Reveal>
          <div className="grid grid--4">
            {segments.map((seg, i) => (
              <Reveal key={seg.title} delay={i * 60}>
                <article className="card card--interactive">
                  <span className="card__icon">
                    <Icon name={segmentIcons[i]} />
                  </span>
                  <h3>{seg.title}</h3>
                  <p>{seg.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '1.75rem' }}>
            <Link href="/solutions/" className="btn btn--ghost">
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
