import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { Vault } from '@lucasmarkes/hairline/react';
import { noClaimsNote, securityPosture, securityPrinciples } from '@/lib/content';

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
