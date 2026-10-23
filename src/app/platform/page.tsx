import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import MockupFrame from '@/components/MockupFrame';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { platformModules } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'The Holsera platform: workflow engine, trust and evidence layer, fraud signals, escrow-style release logic, and a planned integration surface.',
  alternates: { canonical: '/platform/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

function ArchitectureConcept() {
  const box = {
    fill: 'var(--bg)',
    stroke: 'var(--line-strong)',
    strokeWidth: 1.2,
  } as const;

  return (
    <div className="mockup">
      <div className="mockup__frame">
        <div className="mockup__body">
          <svg
            viewBox="0 0 780 320"
            width="100%"
            role="img"
            aria-label="Architecture concept: your product connects to the Holsera workflow layer, which connects to planned external providers."
            style={{ display: 'block' }}
          >
            {/* Your product */}
            <rect x="24" y="110" width="170" height="100" rx="10" style={box} />
            <text x="109" y="152" textAnchor="middle" fontSize="15" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Your product
            </text>
            <text x="109" y="176" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              API / embedded flows
            </text>

            {/* Arrows in */}
            <path d="M204 160 H246" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#arr)" />
            <path d="M548 160 H590" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* Holsera layer */}
            <rect x="254" y="48" width="286" height="224" rx="12" fill="rgba(26,109,244,0.06)" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="397" y="80" textAnchor="middle" fontSize="15" fontWeight="600" style={{ fill: 'var(--text)' }}>
              Holsera trust layer
            </text>
            <rect x="278" y="98" width="238" height="46" rx="8" style={box} />
            <text x="397" y="126" textAnchor="middle" fontSize="13" style={{ fill: 'var(--text-2)' }}>
              Workflow engine
            </text>
            <rect x="278" y="154" width="238" height="46" rx="8" style={box} />
            <text x="397" y="182" textAnchor="middle" fontSize="13" style={{ fill: 'var(--text-2)' }}>
              Evidence &amp; audit trail
            </text>
            <rect x="278" y="210" width="238" height="46" rx="8" style={box} />
            <text x="397" y="238" textAnchor="middle" fontSize="13" style={{ fill: 'var(--text-2)' }}>
              Fraud signals
            </text>

            {/* Providers */}
            <rect x="598" y="48" width="158" height="224" rx="12" fill="var(--bg-soft)" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="6 5" />
            <text x="677" y="76" textAnchor="middle" fontSize="13" fontWeight="600" style={{ fill: 'var(--text-2)' }}>
              Connected providers
            </text>
            <text x="677" y="94" textAnchor="middle" fontSize="10.5" style={{ fill: 'var(--text-3)' }}>
              (planned connections)
            </text>
            <text x="677" y="132" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              Payment rails
            </text>
            <text x="677" y="172" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              Identity / KYC
            </text>
            <text x="677" y="212" textAnchor="middle" fontSize="12" style={{ fill: 'var(--text-3)' }}>
              Ledger / export
            </text>
          </svg>
        </div>
      </div>
      <div className="mockup__caption">
        <span className="mockup-label">Architecture concept</span>
        <p>Illustrative diagram — external integrations are planned, not live.</p>
      </div>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Platform</span>
          <h1>Composable building blocks for transaction trust</h1>
          <p className="lead hero__lead">
            Holsera is designed as layers: a workflow engine that carries every
            transaction through explicit states, a trust layer that keeps evidence and
            reasons, fraud signals that explain themselves, and release logic that only
            moves when conditions are met.
          </p>
          <div className="btn-row">
            <Link href="/how-it-works/" className="btn btn--primary">
              See the workflow
              <Icon name="arrow-right" size={17} />
            </Link>
            <Link href="/security-trust/" className="btn btn--secondary">
              Security &amp; trust
            </Link>
          </div>
        </div>
        <div className="container hero__visual">
          <Reveal>
            <MockupFrame>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span className="mono-label">Review queue</span>
                <span className="ui-chip ui-chip--wait">Mock data</span>
              </div>
              <div className="ui-row">
                <span className="ui-row__label">
                  <span className="ui-id">TX-0042</span>
                  <span className="ui-meta">Condition pending</span>
                </span>
                <span className="ui-chip ui-chip--wait">Hold</span>
              </div>
              <div className="ui-row">
                <span className="ui-row__label">
                  <span className="ui-id">TX-0043</span>
                  <span className="ui-meta">Signal flagged · reason attached</span>
                </span>
                <span className="ui-chip">Review</span>
              </div>
              <div className="ui-row">
                <span className="ui-row__label">
                  <span className="ui-id">TX-0044</span>
                  <span className="ui-meta">Conditions satisfied</span>
                </span>
                <span className="ui-chip ui-chip--done">Release ready</span>
              </div>
            </MockupFrame>
          </Reveal>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="architecture">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="architecture"
                eyebrow="Architecture"
                title="Your product stays yours — the trust layer sits in the middle"
                lead="Holsera is designed to embed into existing products through a planned API surface, while keeping the workflow record in one inspectable place."
              />
            </Reveal>
            <Reveal>
              <ArchitectureConcept />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--soft" aria-labelledby="blocks">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="blocks"
              eyebrow="Building blocks"
              title="Platform modules"
              lead="Each module has a clear scope and an explicit development status."
            />
          </Reveal>
          <div className="rule-grid rule-grid--3">
            {platformModules.map((mod, i) => (
              <Reveal key={mod.title} delay={(i % 3) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <div className="rule-cell__head">
                    <h3>{mod.title}</h3>
                    <StatusBadge status={mod.status} />
                  </div>
                  <p>{mod.text}</p>
                  <ul className="ticks" style={{ marginTop: '0.5rem' }}>
                    {mod.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>No live interfaces.</strong> This website exposes no APIs, sandboxes,
            or dashboards. Anything shown in an interface frame is a labelled mockup of
            the intended product.
          </div>
        </div>
      </section>

      <CtaBand
        title="See how a transaction actually moves"
        text="The How It Works page walks through each stage — who acts, what is recorded, and which parts are still planned."
        primary={{ href: '/how-it-works/', label: 'How it works' }}
        secondary={{ href: '/contact/', label: 'Talk to us' }}
      />
    </>
  );
}
