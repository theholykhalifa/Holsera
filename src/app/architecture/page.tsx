import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { architectureLayers } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Technical architecture',
  description:
    'How Holsera is designed to fit into existing systems: the application and API integration layer, transaction state and policy engine, evidence and audit-log layer, risk-signal evaluation with human review, and external payment and verification providers — with proposed components clearly distinguished from anything implemented.',
  alternates: { canonical: '/architecture/' },
};

const box = {
  fill: 'var(--bg)',
  stroke: 'var(--line-strong)',
  strokeWidth: 1.2,
} as const;

/**
 * Layer-stack diagram: your systems on top, the Holsera boundary in the
 * middle, external providers below. Themed with site tokens so it stays
 * correct in both light and dark modes. Deliberately labelled a concept.
 */
function ArchitectureStack() {
  return (
    <div className="mockup">
      <div className="mockup__frame">
        <div className="mockup__body">
          <svg
            viewBox="0 0 780 640"
            width="100%"
            role="img"
            aria-label="Proposed architecture: your applications connect through the Holsera integration layer to the transaction state and policy engine, the evidence and audit-log layer, and risk-signal evaluation with human review. External payment and verification providers connect from below."
            style={{ display: 'block' }}
          >
            {/* ---- Your systems ---- */}
            <rect x="40" y="20" width="700" height="88" rx="12" style={box} />
            <text x="390" y="56" textAnchor="middle" fontSize="15" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Your applications & systems
            </text>
            <text x="390" y="80" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              storefronts · ERPs · ops consoles · mobile apps
            </text>

            {/* Connector */}
            <path d="M390 108 V150" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#arch-arr)" />
            <path d="M420 150 V108" stroke="var(--line-strong)" strokeWidth="1.4" markerEnd="url(#arch-arr-dim)" />
            <defs>
              <marker id="arch-arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill="var(--accent)" />
              </marker>
              <marker id="arch-arr-dim" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill="var(--line-strong)" />
              </marker>
            </defs>
            <text x="448" y="134" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              REST + WEBHOOKS (PLANNED)
            </text>

            {/* ---- Holsera boundary ---- */}
            <rect x="40" y="156" width="700" height="344" rx="14" fill="rgba(26,109,244,0.05)" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="390" y="190" textAnchor="middle" fontSize="14" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Holsera trust layer
            </text>

            {/* L1 integration */}
            <rect x="80" y="208" width="620" height="58" rx="9" style={box} />
            <text x="104" y="234" fontSize="13" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Application & API integration layer
            </text>
            <text x="104" y="252" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              AUTH · IDEMPOTENCY · SIGNED EVENTS
            </text>
            <text x="676" y="242" fontSize="10.5" textAnchor="end" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              PLANNED
            </text>

            {/* L2 state & policy */}
            <rect x="80" y="282" width="620" height="58" rx="9" style={box} />
            <text x="104" y="308" fontSize="13" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Transaction state & policy engine
            </text>
            <text x="104" y="326" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              EXPLICIT STATES · RELEASE CONDITIONS
            </text>
            <text x="676" y="316" fontSize="10.5" textAnchor="end" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              PLANNED
            </text>

            {/* L3 evidence */}
            <rect x="80" y="356" width="302" height="58" rx="9" style={box} />
            <text x="104" y="382" fontSize="13" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Evidence & audit-log layer
            </text>
            <text x="104" y="400" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              APPEND-ONLY · HASH-ANCHORED
            </text>

            {/* L4 risk + review */}
            <rect x="398" y="356" width="302" height="58" rx="9" style={box} />
            <text x="422" y="382" fontSize="13" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Risk signals & human review
            </text>
            <text x="422" y="400" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              EXPLAINABLE · REVIEW QUEUE
            </text>

            {/* Core note strip */}
            <rect x="80" y="430" width="620" height="50" rx="9" fill="transparent" stroke="var(--line)" strokeDasharray="5 5" />
            <text x="390" y="460" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              Every layer writes to the same transaction record — states, evidence, evaluations and decisions.
            </text>

            {/* Connector to providers */}
            <path d="M390 500 V542" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#arch-arr)" />
            <text x="418" y="526" fontSize="11" style={{ fill: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              ORCHESTRATED VIA API (PLANNED)
            </text>

            {/* ---- External providers ---- */}
            <rect x="40" y="548" width="700" height="72" rx="12" fill="var(--bg-soft)" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="6 5" />
            <text x="390" y="578" textAnchor="middle" fontSize="14" fontWeight="600" style={{ fill: 'var(--text-2)' }}>
              External payment & verification providers
            </text>
            <text x="390" y="600" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              licensed payment rails · identity / KYC · carrier attestation — regulated third parties, not Holsera
            </text>
          </svg>
        </div>
      </div>
      <div className="mockup__caption">
        <span className="mockup-label">Proposed architecture — concept</span>
        <p>
          Illustrative. No component shown is operational; statuses below give the
          honest detail.
        </p>
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Technical architecture</span>
          <h1>How Holsera is designed to fit into your systems</h1>
          <p className="lead hero__lead">
            Five designed layers: an integration surface your software talks to, a
            state-and-policy engine, an append-only evidence and audit log, explainable
            risk signals with human review, and orchestration of — never replacement of —
            authorised payment and verification providers.
          </p>
          <div className="btn-row">
            <Link href="/demo/" className="btn btn--primary">
              Try the interactive demo
              <Icon name="arrow-right" size={17} />
            </Link>
            <Link href="/platform/" className="btn btn--secondary">
              Platform modules
            </Link>
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="stack">
        <div className="container container--wide">
          <Reveal>
            <SectionHeading
              id="stack"
              eyebrow="The stack"
              title="One trust layer between your product and your providers"
              lead="Holsera sits in the middle: your applications keep their interfaces, regulated services keep their licences, and the transaction record lives in one inspectable place."
            />
          </Reveal>
          <Reveal variant="scale">
            <ArchitectureStack />
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="layers">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="layers"
              eyebrow="Layer by layer"
              title="What each layer is designed to do"
              lead="Every layer is a design target. Statuses state exactly where each one stands — nothing here is presented as live."
            />
          </Reveal>
          <div className="list-rows">
            {architectureLayers.map((layer, i) => (
              <Reveal key={layer.title} delay={i * 60}>
                <div className="list-row">
                  <span className="list-row__index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="list-row__head">
                    <h3>{layer.title}</h3>
                    <StatusBadge status={layer.status} />
                  </div>
                  <p>{layer.text}</p>
                  <ul className="ticks" style={{ marginTop: '0.35rem' }}>
                    {layer.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proposed vs implemented ---------- */}
      <section className="band band--soft" aria-labelledby="status-split">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="status-split"
              eyebrow="Read this honestly"
              title="Proposed architecture vs. what exists today"
              lead="This page describes engineering direction. Here is the exact line between design and implementation."
            />
          </Reveal>
          <div className="rule-grid rule-grid--2">
            <Reveal>
              <article className="rule-cell">
                <span className="rule-cell__index">01</span>
                <h3>What exists today</h3>
                <p>
                  This website, its design system, and the written architecture you are
                  reading — plus early design work on the workflow model. Nothing here
                  processes transactions, stores evidence, or evaluates risk.
                </p>
              </article>
            </Reveal>
            <Reveal delay={60}>
              <article className="rule-cell">
                <span className="rule-cell__index">02</span>
                <h3>What is proposed</h3>
                <p>
                  The five layers above. Each carries a status and a dated roadmap will
                  appear here as components reach real milestones. Until then, treat every
                  item as design intent, not capability.
                </p>
              </article>
            </Reveal>
          </div>
          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>No live interfaces.</strong> This site exposes no APIs, sandboxes or
            dashboards. Every interface frame anywhere on the site is a labelled mockup or
            an interactive concept demo with simulated data.
          </div>
        </div>
      </section>

      <CtaBand
        title="Building something that needs this plumbing?"
        text="If you run marketplaces, B2B flows or service platforms, tell us where state, evidence and release logic live today. Technical dialogue now shapes what gets built first."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/security-trust/', label: 'Security approach' }}
      />
    </>
  );
}
