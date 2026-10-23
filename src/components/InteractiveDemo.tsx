'use client';

import { useState } from 'react';
import Icon from './Icon';
import {
  demoEvents,
  demoScenario,
  getVerdict,
  type DemoEvent,
  type CheckResult,
} from '@/lib/demoData';

const PERSISTENT_LABEL =
  'Interactive concept demo — simulated data; no real funds moved.';

/**
 * Interactive concept demo: a fictional transaction visitors can walk
 * through event by event, inspecting the actor, timestamp, evidence
 * and rule evaluation behind each state change — including simulating
 * a missing delivery confirmation to see why a release is blocked.
 *
 * Entirely client-side, fictional, and labelled as such. Nothing is
 * transmitted, stored, or processed.
 */
export default function InteractiveDemo() {
  const [selectedId, setSelectedId] = useState('terms');
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(true);

  const selected: DemoEvent = (() => {
    const base = demoEvents.find((e) => e.id === selectedId) ?? demoEvents[0];
    if (base.id !== 'delivered' || deliveryConfirmed) return base;

    // Simulated missing delivery confirmation: strip the evidence and
    // fail the dependent rule so the record reads honestly.
    return {
      ...base,
      evidence: ['— no delivery confirmation on record —'],
      checks: base.checks.map((c) =>
        c.rule === 'Delivery note evidence attached'
          ? {
              ...c,
              result: 'fail' as CheckResult,
              detail: 'Simulated: the signed delivery note was never attached, so this condition cannot be verified.',
            }
          : c,
      ),
      nextReason:
        'Blocked: INSPECTION cannot open without delivery evidence. The transaction stays in DELIVERY_RECORDED until the condition is resolved.',
    };
  })();

  const verdict = getVerdict(deliveryConfirmed);

  return (
    <div className="demo-panel">
      {/* Persistent honesty label */}
      <p className="demo-banner" role="note">
        <Icon name="alert" size={15} />
        {PERSISTENT_LABEL}
      </p>

      <div className="demo-body">
        {/* Scenario header */}
        <div className="flex-between demo-scenario">
          <div>
            <span className="mono-label">Simulated transaction</span>
            <h2>{demoScenario.title}</h2>
            <p className="muted small">{demoScenario.parties}</p>
          </div>
          <span className="demo-amount">{demoScenario.amount}</span>
        </div>
        <p className="muted small demo-conditions">{demoScenario.conditions}</p>

        {/* Timeline explorer */}
        <div
          className="demo-timeline"
          role="group"
          aria-label="Transaction events — select one to inspect"
        >
          {demoEvents.map((e, i) => (
            <button
              key={e.id}
              type="button"
              className={`demo-step${e.id === 'delivered' && !deliveryConfirmed ? ' demo-step--missing' : ''}`}
              aria-pressed={selectedId === e.id}
              onClick={() => setSelectedId(e.id)}
            >
              <span className="demo-step__index">{String(i + 1).padStart(2, '0')}</span>
              {e.label}
            </button>
          ))}
        </div>
        <div
          className="demo-progress"
          aria-hidden="true"
        >
          <div
            className="demo-progress__fill"
            style={{ width: `${((demoEvents.findIndex((e) => e.id === selectedId) + 1) / demoEvents.length) * 100}%` }}
          />
        </div>

        {/* Event detail */}
        <div className="demo-detail demo-detail--enter" key={selected.id} aria-live="polite">
          <div className="demo-detail__head">
            <div>
              <span className="mono-label">{selected.state}</span>
              <h3>{selected.label}</h3>
            </div>
            <div className="demo-meta">
              <span>
                <Icon name="users" size={13} /> {selected.actor}
              </span>
              <span>
                <Icon name="clock" size={13} /> {selected.timestamp}
              </span>
            </div>
          </div>

          <p className="demo-summary">{selected.summary}</p>

          <span className="mono-label">Evidence on record</span>
          <ul className="demo-evidence">
            {selected.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {selected.checks.length > 0 ? (
            <>
              <span className="mono-label">Rule evaluation</span>
              <div className="demo-checks">
                {selected.checks.map((c) => (
                  <div key={c.rule} className={`demo-check demo-check--${c.result}`}>
                    <span className="demo-check__result">{c.result}</span>
                    <div>
                      <strong>{c.rule}</strong>
                      <span className="demo-check__detail">{c.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          <p className="demo-next">{selected.nextReason}</p>
        </div>

        {/* Simulation control */}
        <div className="demo-switch-row">
          <input
            id="demo-delivery"
            type="checkbox"
            className="demo-switch"
            checked={deliveryConfirmed}
            onChange={(e) => setDeliveryConfirmed(e.target.checked)}
          />
          <label htmlFor="demo-delivery">
            Delivery confirmation evidence is present{' '}
            <span className="muted small">(uncheck to simulate it going missing)</span>
          </label>
        </div>

        {/* Release verdict */}
        <div
          className={`demo-verdict demo-verdict--enter demo-verdict--${verdict.approved ? 'approved' : 'blocked'}`}
          key={verdict.headline}
          aria-live="polite"
        >
          <div className="demo-verdict__head">
            <Icon name={verdict.approved ? 'check' : 'alert'} size={18} />
            <h3>{verdict.headline}</h3>
          </div>
          <ul className="demo-verdict__conditions">
            {verdict.conditions.map((c) => (
              <li key={c.text}>
                <span className={`demo-check__result demo-check--${c.result}`}>
                  {c.result === 'pass' ? 'met' : c.result === 'fail' ? 'failed' : 'pending'}
                </span>
                {c.text}
              </li>
            ))}
          </ul>
          <p>{verdict.reason}</p>
        </div>

        <p className="form-note demo-footnote">
          {PERSISTENT_LABEL} All parties, amounts, references and timestamps are fictional.
          Holsera does not process payments or hold funds.
        </p>
      </div>
    </div>
  );
}
