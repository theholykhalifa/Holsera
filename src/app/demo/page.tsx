import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import InteractiveDemo from '@/components/InteractiveDemo';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Interactive concept demo',
  description:
    'Walk a fictional transaction through Holsera: inspect each event’s actor, timestamp, evidence and rule evaluation — then simulate a missing delivery confirmation to see why a release is approved or blocked. Simulated data only; no real funds moved.',
  alternates: { canonical: '/demo/' },
};

export default function DemoPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Interactive concept demo</span>
          <h1>Walk a transaction through Holsera</h1>
          <p className="lead hero__lead">
            This demo shows how structured transaction state, evidence and conditional
            release logic are meant to work together. Click any event to inspect the
            record behind it — then remove the delivery confirmation and watch the
            release decision change, with the reason stated explicitly.
          </p>
        </div>
      </section>

      <section className="band band--tight" aria-label="Interactive demo">
        <div className="container container--wide">
          <InteractiveDemo />
        </div>
      </section>

      <section className="band band--soft" aria-labelledby="demo-limits">
        <div className="container">
          <SectionHeading
            id="demo-limits"
            eyebrow="Reading the demo honestly"
            title="What this demonstrates — and what it doesn’t"
            lead="The demo exists to communicate a design. It is not evidence of a working product, and every figure in it is invented."
          />
          <div className="rule-grid rule-grid--2">
            <article className="rule-cell">
              <span className="rule-cell__index">01</span>
              <h3>What it demonstrates</h3>
              <p>
                How explicit states, actor-attributed evidence and mechanical release
                conditions turn “trust me” into an inspectable record — and how a blocked
                release states its reason instead of disappearing into an email thread.
              </p>
            </article>
            <article className="rule-cell">
              <span className="rule-cell__index">02</span>
              <h3>What it does not demonstrate</h3>
              <p>
                A live product. No payments are processed, no funds are held or moved, no
                identity is verified, and no data leaves your browser. Every capability
                shown is planned or in development — see the platform page for exact
                statuses.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to map this to your own workflow?"
        text="Tell us where trust breaks between agreement and settlement today. We’ll walk through which parts of this demo your use case would touch."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/how-it-works/', label: 'Read the full workflow' }}
      />
    </>
  );
}
