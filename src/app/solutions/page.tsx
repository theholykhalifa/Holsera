import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { alternatives, alternativesNote, segments } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'How Holsera intends to serve marketplaces, B2B commerce, service economies, and FinTech builders — by target segment, with no fabricated customer claims.',
  alternates: { canonical: '/solutions/' },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

export default function SolutionsPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">Solutions</span>
          <h1>Built around how your transactions actually fail</h1>
          <p className="lead hero__lead">
            Different segments break trust in different places. Below is where Holsera
            intends to help, segment by segment. These are target audiences for a product
            in development — not a roster of existing customers.
          </p>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="segments">
        <div className="container">
          <SectionHeading
            id="segments"
            eyebrow="By segment"
            title="Where Holsera fits"
            lead="Every “approach” item below describes intended functionality for a product still in development."
          />
          <div className="list-rows">
            {segments.map((seg, i) => (
              <Reveal key={seg.title} delay={i * 60}>
                <div className="list-row">
                  <span className="list-row__index">{pad(i)}</span>
                  <div className="list-row__head">
                    <h3>{seg.title}</h3>
                    <span className="badge badge--planned">Planned</span>
                  </div>
                  <p>{seg.summary}</p>
                  <div
                    className="grid grid--2"
                    style={{ marginTop: '0.75rem', gap: '2rem' }}
                  >
                    <div>
                      <span className="mono-label">Challenges</span>
                      <div className="tag-list" style={{ marginTop: '0.75rem' }}>
                        {seg.challenges.map((c) => (
                          <span className="tag" key={c}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="mono-label">Our approach</span>
                      <ul className="ticks" style={{ marginTop: '0.75rem' }}>
                        {seg.approach.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="callout" style={{ marginTop: '2.5rem' }}>
            <strong>No invented social proof.</strong> This site publishes no customer
            logos, testimonials, metrics, or case studies. Customer-story pages will be
            added only when real, attributable material exists.
          </div>
        </div>
      </section>

      {/* ---------- How Holsera compares (by category) ---------- */}
      <section className="band band--soft" aria-labelledby="alternatives">
        <div className="container">
          <SectionHeading
            id="alternatives"
            eyebrow="The landscape"
            title="How this differs from what already exists"
            lead="Most existing tools each solve one slice — moving money, holding an agreement, scoring reputation, reporting after the fact. The comparison below is by category, because Holsera is not trying to out-feature any single product."
          />
          <div className="alt-grid">
            {alternatives.map((alt, i) => (
              <Reveal key={alt.category} delay={(i % 3) * 60}>
                <article className="alt-card">
                  <h3 className="alt-card__cat">{alt.category}</h3>
                  <div className="alt-card__row">
                    <span className="mono-label">Best for</span>
                    <p>{alt.bestFor}</p>
                  </div>
                  <div className="alt-card__row">
                    <span className="mono-label">Where it leaves a gap</span>
                    <p>{alt.gap}</p>
                  </div>
                  <div className="alt-card__row alt-card__row--angle">
                    <span className="mono-label">Holsera’s angle</span>
                    <p>{alt.holseraAngle}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="callout" style={{ marginTop: '2.5rem' }}>
            <strong>Read this as positioning.</strong> {alternativesNote}
          </div>
        </div>
      </section>

      <CtaBand
        title="Does your segment match what Holsera is building?"
        text="If your transactions stall between agreement and settlement, we want to understand exactly where — that shapes what gets built."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/how-it-works/', label: 'See the workflow' }}
      />
    </>
  );
}
