import type { CSSProperties } from 'react';

/**
 * Trust-layer console — the homepage hero visual.
 *
 * A premium, animated topology view: glowing party nodes with icons,
 * curved flow paths with travelling evidence/state pulses, slow orbit
 * rings, and a live-cycling state pipeline (AGREED → … → RELEASED).
 *
 * Pure SVG + CSS + two SMIL pulses — no JS, static-export safe.
 * Decorative: aria-hidden, copy carries the meaning. All motion is
 * disabled under prefers-reduced-motion (the frame still reads as a
 * polished static diagram).
 */

const EDGES = [
  { id: 'e1', d: 'M 168 118 Q 215 205 262 228' },
  { id: 'e2', d: 'M 432 118 Q 385 205 338 228' },
  { id: 'e3', d: 'M 168 338 Q 220 262 262 248' },
  { id: 'e4', d: 'M 432 338 Q 380 262 338 248' },
] as const;

const STEPS = ['Agreed', 'Funded', 'In transit', 'Confirmed', 'Released'];

export default function TrustNetwork() {
  return (
    <figure className="trust-net" aria-hidden="true">
      <div className="trust-net__frame">
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tn-core" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d2f6b" />
              <stop offset="100%" stopColor="#0a47e7" />
            </linearGradient>
            <linearGradient id="tn-core-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
            </linearGradient>
            <radialGradient id="tn-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(26,109,244,0.38)" />
              <stop offset="100%" stopColor="rgba(26,109,244,0)" />
            </radialGradient>
            <filter id="tn-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* Ambient core glow */}
          <circle cx="300" cy="238" r="150" fill="url(#tn-glow)" />

          {/* Slow orbit rings */}
          <ellipse className="tn-orbit tn-orbit--1" cx="300" cy="238" rx="205" ry="128" />
          <ellipse className="tn-orbit tn-orbit--2" cx="300" cy="238" rx="252" ry="158" />

          {/* Edge glow underlay + core lines */}
          <g>
            {EDGES.map((e) => (
              <path key={`${e.id}-glow`} className="tn-edge-glow" d={e.d} filter="url(#tn-soft)" />
            ))}
            {EDGES.map((e) => (
              <path key={e.id} className="tn-edge" d={e.d} />
            ))}
            {EDGES.map((e) => (
              <path key={`${e.id}-flow`} className="tn-flow" d={e.d} />
            ))}
          </g>

          {/* Travelling evidence/state pulses */}
          <g>
            <circle className="tn-pulse" r="3.5">
              <animateMotion dur="4.6s" begin="0s" repeatCount="indefinite" path={EDGES[0].d} />
            </circle>
            <circle className="tn-pulse" r="3.5">
              <animateMotion dur="5.4s" begin="-2.1s" repeatCount="indefinite" path={EDGES[1].d} />
            </circle>
            <circle className="tn-pulse tn-pulse--rev" r="3.5">
              <animateMotion dur="5s" begin="-1.2s" repeatCount="indefinite" path={EDGES[2].d} />
            </circle>
            <circle className="tn-pulse" r="3.5">
              <animateMotion dur="5.8s" begin="-3s" repeatCount="indefinite" path={EDGES[3].d} />
            </circle>
          </g>

          {/* Edge label chips — mid-edge, clear of the node pills */}
          <g>
            <rect className="tn-chip" x="182" y="182" width="52" height="17" rx="8.5" />
            <text className="tn-chip__text" x="208" y="193.5" textAnchor="middle">state</text>
            <rect className="tn-chip" x="368" y="182" width="56" height="17" rx="8.5" />
            <text className="tn-chip__text" x="396" y="193.5" textAnchor="middle">signals</text>
            <rect className="tn-chip" x="178" y="290" width="58" height="17" rx="8.5" />
            <text className="tn-chip__text" x="207" y="301.5" textAnchor="middle">release</text>
            <rect className="tn-chip" x="364" y="290" width="64" height="17" rx="8.5" />
            <text className="tn-chip__text" x="396" y="301.5" textAnchor="middle">evidence</text>
          </g>

          {/* Party nodes — glowing icon badges + label pills */}
          <g>
            {/* Buyer */}
            <circle className="tn-badge-halo" cx="152" cy="80" r="34" filter="url(#tn-soft)" />
            <circle className="tn-badge" cx="152" cy="80" r="27" />
            <g className="tn-badge-icon" transform="translate(141 69)">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </g>
            <rect className="tn-pill" x="104" y="116" width="96" height="36" rx="9" />
            <text className="tn-pill__name" x="152" y="131" textAnchor="middle">Buyer</text>
            <text className="tn-pill__sub" x="152" y="144" textAnchor="middle">initiates</text>

            {/* Seller */}
            <circle className="tn-badge-halo" cx="448" cy="80" r="34" filter="url(#tn-soft)" />
            <circle className="tn-badge" cx="448" cy="80" r="27" />
            <g className="tn-badge-icon" transform="translate(437 69)">
              <rect x="1" y="5" width="14" height="12" rx="1" />
              <path d="M15 9h4l3 4v4h-7" />
              <circle cx="6" cy="18.5" r="2" />
              <circle cx="18" cy="18.5" r="2" />
            </g>
            <rect className="tn-pill" x="400" y="116" width="96" height="36" rx="9" />
            <text className="tn-pill__name" x="448" y="131" textAnchor="middle">Seller</text>
            <text className="tn-pill__sub" x="448" y="144" textAnchor="middle">delivers</text>

            {/* Payment provider */}
            <circle className="tn-badge-halo" cx="152" cy="340" r="34" filter="url(#tn-soft)" />
            <circle className="tn-badge" cx="152" cy="340" r="27" />
            <g className="tn-badge-icon" transform="translate(141 329)">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </g>
            <rect className="tn-pill" x="86" y="368" width="132" height="26" rx="8" />
            <text className="tn-pill__name" x="152" y="378" textAnchor="middle">Payment provider</text>
            <text className="tn-pill__sub" x="152" y="388" textAnchor="middle">settles</text>

            {/* Verification */}
            <circle className="tn-badge-halo" cx="448" cy="340" r="34" filter="url(#tn-soft)" />
            <circle className="tn-badge" cx="448" cy="340" r="27" />
            <g className="tn-badge-icon" transform="translate(437 329)">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </g>
            <rect className="tn-pill" x="396" y="368" width="104" height="26" rx="8" />
            <text className="tn-pill__name" x="448" y="378" textAnchor="middle">Verification</text>
            <text className="tn-pill__sub" x="448" y="388" textAnchor="middle">attests</text>
          </g>

          {/* Center — the Holsera trust layer */}
          <g>
            <rect
              className="tn-core-halo"
              x="218"
              y="200"
              width="164"
              height="76"
              rx="18"
              filter="url(#tn-soft)"
            />
            <rect className="tn-core" x="222" y="204" width="156" height="68" rx="16" />
            <g className="tn-core-icon" transform="translate(238 226)">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </g>
            <text className="tn-core-name" x="316" y="235" textAnchor="middle">Holsera</text>
            <text className="tn-core-sub" x="316" y="254" textAnchor="middle">trust layer</text>
          </g>
        </svg>

        {/* Live state pipeline (CSS-cycled) */}
        <div className="tn-pipe">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="tn-pipe__step"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="tn-pipe__dot" />
              <span className="tn-pipe__label">{step}</span>
            </div>
          ))}
        </div>

        <figcaption className="trust-net__caption">
          <span className="mono-label">Trust-layer topology · live concept feed</span>
          <span className="ui-chip ui-chip--wait">Illustrative</span>
        </figcaption>
      </div>
    </figure>
  );
}
