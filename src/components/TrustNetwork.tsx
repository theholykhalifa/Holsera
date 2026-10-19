/**
 * Decorative trust-network diagram for the homepage hero.
 *
 * Pure SVG + CSS — no JavaScript, no canvas, works in the static
 * export. The flow lines are conceptual: transaction state, evidence,
 * release signals and risk signals moving through the Holsera trust
 * layer. It is a topology illustration, NOT a live system — hence the
 * "Illustrative" chip.
 *
 * Accessibility: the whole figure is aria-hidden; the surrounding copy
 * carries the meaning. All motion is CSS-only and disabled under
 * prefers-reduced-motion.
 */
export default function TrustNetwork() {
  return (
    <figure className="trust-net" aria-hidden="true">
      <div className="trust-net__frame">
        <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tn-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(26,109,244,0.30)" />
              <stop offset="100%" stopColor="rgba(26,109,244,0)" />
            </radialGradient>
          </defs>

          {/* Ambient glow behind the trust layer */}
          <circle cx="260" cy="200" r="118" fill="url(#tn-glow)" />

          {/* Base edges: trust layer ↔ parties */}
          <g className="tn-edge-group">
            <line className="tn-edge" x1="260" y1="200" x2="110" y2="72" />
            <line className="tn-edge" x1="260" y1="200" x2="410" y2="72" />
            <line className="tn-edge" x1="260" y1="200" x2="95" y2="318" />
            <line className="tn-edge" x1="260" y1="200" x2="425" y2="318" />
          </g>

          {/* Animated flow pulses travelling along the edges */}
          <g>
            <line className="tn-flow tn-flow--1" x1="260" y1="200" x2="110" y2="72" />
            <line className="tn-flow tn-flow--2" x1="260" y1="200" x2="410" y2="72" />
            <line className="tn-flow tn-flow--3" x1="260" y1="200" x2="95" y2="318" />
            <line className="tn-flow tn-flow--4" x1="260" y1="200" x2="425" y2="318" />
          </g>

          {/* Edge labels */}
          <g className="tn-labels">
            <text className="tn-edge-label" x="150" y="114" textAnchor="middle">state</text>
            <text className="tn-edge-label" x="366" y="114" textAnchor="middle">signals</text>
            <text className="tn-edge-label" x="136" y="286" textAnchor="middle">release</text>
            <text className="tn-edge-label" x="362" y="286" textAnchor="middle">evidence</text>
          </g>

          {/* Connection points on the trust layer */}
          <g>
            <circle className="tn-dot" cx="230" cy="174" r="3" />
            <circle className="tn-dot" cx="290" cy="174" r="3" />
            <circle className="tn-dot" cx="227" cy="223" r="3" />
            <circle className="tn-dot" cx="293" cy="223" r="3" />
          </g>

          {/* Pulse ring emanating from the trust layer */}
          <circle className="tn-ring" cx="260" cy="200" r="44" />

          {/* Satellite nodes */}
          <g>
            <rect className="tn-node-rect" x="56" y="50" width="108" height="44" rx="10" />
            <text className="tn-node-name" x="110" y="69" textAnchor="middle">Buyer</text>
            <text className="tn-node-sub" x="110" y="84" textAnchor="middle">initiates</text>

            <rect className="tn-node-rect" x="356" y="50" width="108" height="44" rx="10" />
            <text className="tn-node-name" x="410" y="69" textAnchor="middle">Seller</text>
            <text className="tn-node-sub" x="410" y="84" textAnchor="middle">delivers</text>

            <rect className="tn-node-rect" x="41" y="296" width="108" height="44" rx="10" />
            <text className="tn-node-name" x="95" y="315" textAnchor="middle">Payment provider</text>
            <text className="tn-node-sub" x="95" y="330" textAnchor="middle">settles</text>

            <rect className="tn-node-rect" x="371" y="296" width="108" height="44" rx="10" />
            <text className="tn-node-name" x="425" y="315" textAnchor="middle">Verification</text>
            <text className="tn-node-sub" x="425" y="330" textAnchor="middle">attests</text>
          </g>

          {/* Center: the Holsera trust layer */}
          <g>
            <rect className="tn-center-rect" x="185" y="164" width="150" height="72" rx="14" />
            <text className="tn-center-name" x="260" y="196" textAnchor="middle">Holsera</text>
            <text className="tn-center-sub" x="260" y="216" textAnchor="middle">trust layer</text>
          </g>
        </svg>

        <figcaption className="trust-net__caption">
          <span className="mono-label">Trust-layer topology</span>
          <span className="ui-chip ui-chip--wait">Illustrative</span>
        </figcaption>
      </div>
    </figure>
  );
}
