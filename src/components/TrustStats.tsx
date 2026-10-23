'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

/**
 * "The cost of broken trust" band.
 *
 * All figures are REAL, publicly reported statistics with named
 * sources — this site's honesty rules require it. They describe the
 * fraud landscape, not claims about Holsera's product. Animated in a
 * restrained, corporate way: counters count up once on scroll; bars
 * grow once; everything renders statically under reduced motion.
 */

// FTC Consumer Sentinel Network, reported US fraud losses ($ billions)
const FTC_LOSSES: { year: string; value: number }[] = [
  { year: '2020', value: 3.3 },
  { year: '2021', value: 5.9 },
  { year: '2022', value: 8.8 },
  { year: '2023', value: 10.0 },
  { year: '2024', value: 12.5 },
];
const MAX_LOSS = 12.5;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function CountUp({
  value,
  decimals = 1,
  prefix = '',
  suffix = '',
  active,
  duration = 1500,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration]);

  return (
    <>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}

export default function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band band--deep" aria-labelledby="stats-title">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Why this matters</span>
          <h2 id="stats-title">The cost of broken trust</h2>
          <p className="lead">
            Fraud is not a fringe risk — it is a large, measurable, growing cost of doing
            business without shared, verifiable transaction records.
          </p>
        </Reveal>

        <div className="stats-grid" ref={ref}>
          <Reveal className="stats-card" delay={0}>
            <span className="stats-card__number stats-card__number--blue">
              <CountUp value={1.03} decimals={2} prefix="$" suffix="T" active={active} />
            </span>
            <span className="stats-card__label">
              estimated lost to scammers globally in a single year
            </span>
            <span className="stats-card__source">Global Anti-Scam Alliance, 2024</span>
          </Reveal>

          <Reveal className="stats-card" delay={80}>
            <span className="stats-card__number stats-card__number--green">
              <CountUp value={12.5} decimals={1} prefix="$" suffix="B" active={active} />
            </span>
            <span className="stats-card__label">
              reported by US consumers lost to fraud in 2024 — up 25% in one year
            </span>
            <span className="stats-card__source">US FTC, Consumer Sentinel Network</span>
          </Reveal>

          <Reveal className="stats-card" delay={160}>
            <span className="stats-card__number stats-card__number--amber">
              <CountUp value={5.7} decimals={1} prefix="$" suffix="B" active={active} />
            </span>
            <span className="stats-card__label">
              the largest reported category: investment scams, often promoted on social media
            </span>
            <span className="stats-card__source">US FTC, 2024</span>
          </Reveal>
        </div>

        {/* Reported-losses bar chart */}
        <Reveal className="stats-chart-wrap" delay={120}>
          <div className="stats-chart-head">
            <span className="mono-label">US consumer fraud losses reported to the FTC, by year</span>
            <span className="mono-label">US$ billions</span>
          </div>
          <div className="stats-chart" role="img" aria-label="Bar chart of US consumer fraud losses reported to the FTC: 3.3 billion dollars in 2020, 5.9 in 2021, 8.8 in 2022, 10.0 in 2023, and 12.5 in 2024 — a near-quadrupling in four years.">
            {FTC_LOSSES.map((d, i) => (
              <div className="stats-bar-col" key={d.year}>
                <span className="stats-bar__value">{d.value.toFixed(1)}</span>
                <div
                  className={`stats-bar${i === FTC_LOSSES.length - 1 ? ' stats-bar--last' : ''}`}
                  style={{
                    height: active ? `${(d.value / MAX_LOSS) * 100}%` : '0%',
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
                <span className="stats-bar__year">{d.year}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Did you know */}
        <div className="fact-grid">
          <Reveal className="fact-card" delay={0}>
            <span className="fact-card__tag">Did you know</span>
            <p>
              People aged 20–29 <strong>report losing money to fraud more often</strong>{' '}
              than those over 70 — but older adults lose far larger amounts when they do.
            </p>
            <span className="stats-card__source">US FTC, data spotlight</span>
          </Reveal>
          <Reveal className="fact-card" delay={80}>
            <span className="fact-card__tag">Did you know</span>
            <p>
              Imposter scams — someone pretending to be a bank, a government agency or a
              known company — cost US consumers{' '}
              <strong>nearly $3 billion in 2024</strong> alone.
            </p>
            <span className="stats-card__source">US FTC, 2024</span>
          </Reveal>
          <Reveal className="fact-card" delay={160}>
            <span className="fact-card__tag">Keep in mind</span>
            <p>
              The FTC states reported figures capture{' '}
              <strong>only a fraction of actual harm</strong> — most victims never file a
              report. The real numbers are higher.
            </p>
            <span className="stats-card__source">US FTC, annual report note</span>
          </Reveal>
        </div>

        <p className="stats-sources">
          Sources: U.S. Federal Trade Commission, Consumer Sentinel Network (2025 release)
          and data spotlights; Global Anti-Scam Alliance, <em>Global State of Scams
          Report</em> (2024). Reported figures describe the fraud landscape — they are not
          claims about Holsera&rsquo;s product, which is in development.
        </p>
      </div>
    </section>
  );
}
