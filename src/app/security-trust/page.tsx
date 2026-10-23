import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { Vault } from '@lucasmarkes/hairline/react';
import {
  assets,
  noClaimsNote,
  securityPosture,
  securityPrinciples,
  threatActors,
  threatModelNote,
  threatScenarios,
  trustControls,
} from '@/lib/content';

const capabilityLabel: Record<string, string> = {
  low: 'Low capability',
  moderate: 'Moderate capability',
  high: 'High capability',
};

export const metadata: Metadata = {
  title: 'Security & Trust',
  description:
    'Holsera’s security approach: the principles guiding the design, the current posture with honest placeholders, and an explicit list of what is not being claimed.',
  alternates: { canonical: '/security-trust/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

const notClaimed = [
  'Certifications (SOC 2, ISO 27001, or any other) — none claimed',
  'Completed independent audits or penetration tests — none claimed',
  'Uptime, volume, or performance metrics — none published',
  'Security “guarantees” — no system guarantees anything; we state controls, not absolutes',
  'Licences or regulatory registrations — none claimed',
];

export default function SecurityPage() {
  return (
    <>
            <section className="hero hero--page">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Security & Trust</span>
            <h1>Trust is a claim that must be earned — so we state ours precisely</h1>
            <p className="lead hero__lead">
              This page separates three things clearly: the principles guiding Holsera’s
              design, the posture we can honestly describe today, and the claims we are
              deliberately not making.
            </p>
            <div className="callout" style={{ marginTop: '2rem', maxWidth: '70ch' }}>
              <strong>Our standing rule.</strong> {noClaimsNote}
            </div>
          </div>
          <div className="hero__viz hero__viz--security">
            <Reveal variant="scale" delay={120}>
              <div className="figure-frame">
                <Figure
                  F={Vault}
                  hue="ice"
                  label="Animated line drawing: a vault door with a dial and three bolts — the pointer turns the dial and the bolts draw back on the correct combination"
                />
                <span className="figure-frame__caption">
                  Security is a mechanism, not a mood — designed so the strong path is the
                  default one.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="principles">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="principles"
              eyebrow="Design principles"
              title="Principles guiding the engineering"
              lead="These are design requirements for the system being built — not descriptions of certified practice."
            />
          </Reveal>
          <div className="rule-grid rule-grid--3">
            {securityPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 60}>
                <article className="rule-cell">
                  <span className="rule-cell__index">{pad(i)}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--soft" aria-labelledby="posture">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="posture"
              eyebrow="Current posture"
              title="What exists, what is planned, what is unconfirmed"
              lead="An honest ledger of security items. Placeholders stay visible until real evidence replaces them."
            />
          </Reveal>
          <Reveal>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {securityPosture.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>{row.detail}</td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Threat model: what the design defends against ---------- */}
      <section className="band" aria-labelledby="threat-model">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="threat-model"
              eyebrow="Threat model"
              title="What the design is meant to defend against"
              lead="Before naming controls, it helps to name the threats. This is the design-stage picture of who might attack a transaction workflow, what they would be after, and how the system is being engineered to respond."
            />
          </Reveal>

          {/* Assets */}
          <Reveal>
            <h3 className="threat-subhead">What is at stake</h3>
          </Reveal>
          <div className="rule-grid rule-grid--2">
            {assets.map((a, i) => (
              <Reveal key={a.asset} delay={(i % 2) * 60}>
                <article className="rule-cell">
                  <div className="threat-cell__head">
                    <h3>{a.asset}</h3>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="threat-cell__why">{a.why}</p>
                  <p className="threat-cell__response">{a.handling}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Threat actors */}
          <Reveal>
            <h3 className="threat-subhead">Who might attack</h3>
          </Reveal>
          <div className="threat-actors">
            {threatActors.map((t, i) => (
              <Reveal key={t.actor} delay={(i % 4) * 60}>
                <article className="threat-actor">
                  <div className="threat-actor__head">
                    <h3>{t.actor}</h3>
                    <span
                      className={`threat-capability threat-capability--${t.capability}`}
                    >
                      {capabilityLabel[t.capability]}
                    </span>
                  </div>
                  <p className="threat-actor__motive">
                    <span className="mono-label">Motive</span>
                    {t.motive}
                  </p>
                  <p className="threat-actor__realistic">
                    <span className="mono-label">Realistic? </span>
                    {t.realistic}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Scenarios → responses */}
          <Reveal>
            <h3 className="threat-subhead">Scenarios and the designed response</h3>
          </Reveal>
          <div className="threat-scenarios">
            {threatScenarios.map((s, i) => (
              <Reveal key={s.scenario} delay={(i % 2) * 60}>
                <article className="threat-scenario">
                  <div className="threat-scenario__head">
                    <span className="threat-scenario__num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3>{s.scenario}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="threat-scenario__vector">
                    <span className="mono-label">Vector</span>
                    {s.vector}
                  </p>
                  <p className="threat-scenario__response">
                    <span className="mono-label">Design response</span>
                    {s.designResponse}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Controls coverage */}
          <Reveal>
            <h3 className="threat-subhead">Which designed controls cover them</h3>
          </Reveal>
          <Reveal>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Control</th>
                    <th scope="col">Covers</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trustControls.map((c) => (
                    <tr key={c.control}>
                      <td>{c.control}</td>
                      <td>{c.covers}</td>
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <div className="callout" style={{ marginTop: '2rem' }}>
              <strong>Read this honestly.</strong> {threatModelNote}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="not-claimed">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeading
              id="not-claimed"
              eyebrow="Explicitly"
              title="What this site does not claim"
            />
            <ul className="ticks">
              {notClaimed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="placeholder-block" style={{ marginTop: '1.75rem' }}>
              <b>Disclosure channel:</b>{' '}
              <span className="ph" title="Placeholder — replace with confirmed details before launch">
                [security contact address — to be confirmed]
              </span>{' '}
              — a responsible-disclosure channel is planned for publication before launch.
              Until then, use the contact form and select “Security disclosure”.
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Security question before anything else?"
        text="Ask us directly. We will tell you what is designed, what is implemented, and what is still unconfirmed — in those exact words."
        primary={{ href: '/contact/', label: 'Contact us' }}
        secondary={{ href: '/platform/', label: 'See the platform' }}
      />
    </>
  );
}
