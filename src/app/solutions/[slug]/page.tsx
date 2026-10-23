import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import Figure from '@/components/Figure';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import { Hub, Patch, Relay, Settle } from '@lucasmarkes/hairline/react';
import { industrySolutions, type IndustrySolution } from '@/lib/content';

// Static export: enumerate every industry page so it is prerendered.
export function generateStaticParams() {
  return industrySolutions.map((s) => ({ slug: s.slug }));
}

const FIGURES = {
  Settle: Settle,
  Relay: Relay,
  Patch: Patch,
  Hub: Hub,
} as const;

const pad = (i: number) => String(i + 1).padStart(2, '0');

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = industrySolutions.find((s) => s.slug === slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.lead,
    alternates: { canonical: `/solutions/${solution.slug}/` },
  };
}

export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution: IndustrySolution | undefined = industrySolutions.find(
    (s) => s.slug === slug
  );
  if (!solution) notFound();

  const FigureComponent = FIGURES[solution.heroFigure as keyof typeof FIGURES];

  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">
              <Link href="/solutions/" className="crumb">
                Solutions
              </Link>{' '}
              / Industry
            </span>
            <h1>{solution.title}</h1>
            <p className="lead hero__lead">{solution.lead}</p>
            <div className="callout" style={{ marginTop: '2rem', maxWidth: '70ch' }}>
              <strong>Status.</strong> {solution.challenge}
            </div>
            <div className="btn-row" style={{ marginTop: '2rem' }}>
              <Link href="/contact/" className="btn btn--primary">
                Talk to us
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
                  F={FigureComponent}
                  hue={solution.heroHue}
                  label={`Animated line drawing representing ${solution.title}`}
                />
                <span className="figure-frame__caption">
                  {solution.figureCaption}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="pain">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="pain"
              eyebrow="Where it breaks"
              title="How trust actually fails here"
              lead="These are the recurring breakdowns this workflow is designed around. They are structural observations, not measured statistics."
            />
          </Reveal>
          <div className="rule-grid rule-grid--3">
            {solution.painPoints.map((p, i) => (
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

      <section className="band band--soft" aria-labelledby="flow">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="flow"
              eyebrow="The designed workflow"
              title="How the workflow would handle it"
              lead="An explicit, rule-driven sequence both sides — and any reviewer — can inspect."
            />
          </Reveal>
          <div className="workflow-steps">
            {solution.workflow.map((s, i) => (
              <Reveal key={s.step} delay={i * 60}>
                <div className="workflow-step">
                  <span className="workflow-step__num">{pad(i)}</span>
                  <div>
                    <h3>{s.step}</h3>
                    <p>{s.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="outcomes">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="outcomes"
                eyebrow="What it is designed to deliver"
                title="The intended outcome"
                lead="What this workflow is engineered to produce — stated as design intent, not as verified results."
              />
              <div className="callout">
                <strong>Keep in mind.</strong> Holsera is a product in development. Nothing
                on this page describes a system in production.
              </div>
            </Reveal>
            <div className="stack">
              <Reveal>
                <ul className="ticks">
                  {solution.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <div className="not-yet">
                  <span className="mono-label">Explicitly not yet</span>
                  <ul className="ticks ticks--warn">
                    {solution.notYet.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Does this match where trust breaks for you?"
        text="If this describes your transaction flow, tell us where it breaks specifically — that shapes what gets built."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/solutions/', label: 'All solutions' }}
      />
    </>
  );
}
