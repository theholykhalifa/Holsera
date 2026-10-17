import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Icon, { type IconName } from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { segments } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'How Holsera intends to serve marketplaces, B2B commerce, service economies, and FinTech builders — by target segment, with no fabricated customer claims.',
  alternates: { canonical: '/solutions/' },
};

const segmentIcons: IconName[] = ['store', 'building', 'truck', 'code'];

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

      <section className="section section--tight" aria-labelledby="segments">
        <div className="container">
          <SectionHeading
            id="segments"
            eyebrow="By segment"
            title="Where Holsera fits"
            lead="Every “approach” item below describes intended functionality for a product still in development."
          />
          <div className="grid grid--2">
            {segments.map((seg, i) => (
              <Reveal key={seg.title} delay={(i % 2) * 70}>
                <article className="card" style={{ height: '100%' }}>
                  <span className="card__icon">
                    <Icon name={segmentIcons[i]} />
                  </span>
                  <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{seg.title}</h3>
                    <span className="badge badge--planned">Planned</span>
                  </div>
                  <p>{seg.summary}</p>

                  <div style={{ marginTop: '1.25rem' }}>
                    <span className="mono-label">Challenges</span>
                    <div className="tag-list" style={{ marginTop: '0.6rem' }}>
                      {seg.challenges.map((c) => (
                        <span className="tag" key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <span className="mono-label">Our approach</span>
                    <ul className="ticks" style={{ marginTop: '0.6rem' }}>
                      {seg.approach.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="callout" style={{ marginTop: '2rem' }}>
            <strong>No invented social proof.</strong> This site publishes no customer
            logos, testimonials, metrics, or case studies. Customer-story pages will be
            added only when real, attributable material exists.
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
