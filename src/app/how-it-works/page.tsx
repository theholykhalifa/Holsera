import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import MockupFrame from '@/components/MockupFrame';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatusBadge from '@/components/StatusBadge';
import WorkflowStepper from '@/components/WorkflowStepper';
import { workflowSteps, type Status } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How a transaction moves through Holsera: agreed terms, evaluated checks, tracked conditions, a logged release decision, and reconciliation — every stage recorded.',
  alternates: { canonical: '/how-it-works/' },
};

interface StateRow {
  state: string;
  desc: string;
  status: Status;
}

const states: StateRow[] = [
  {
    state: 'Draft',
    desc: 'Terms are being composed; nothing has been agreed yet.',
    status: 'planned',
  },
  {
    state: 'Checks',
    desc: 'Counterparty checks and policy rules run; every result is stored with its reasons.',
    status: 'planned',
  },
  {
    state: 'Awaiting conditions',
    desc: 'Waiting on delivery, confirmation, or milestone evidence from one or both sides.',
    status: 'planned',
  },
  {
    state: 'On hold',
    desc: 'A failed condition or fraud signal paused the workflow for human review.',
    status: 'planned',
  },
  {
    state: 'Released',
    desc: 'Conditions satisfied — or an authorised reviewer approved an exception — and the release instruction was logged.',
    status: 'planned',
  },
  {
    state: 'Closed',
    desc: 'Settlement reconciled with connected providers; the full record is exportable.',
    status: 'planned',
  },
  {
    state: 'Cancelled',
    desc: 'The parties or a policy ended the transaction before release.',
    status: 'planned',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h1>From agreement to settlement — with a record at every step</h1>
          <p className="lead hero__lead">
            A Holsera transaction moves through five explicit stages. Each stage names
            who acts, what is checked, and what gets written to the audit trail — so
            disputes are reconstructed from data, not from memory.
          </p>
          <div className="callout" style={{ marginTop: '2rem', maxWidth: '70ch' }}>
            <strong>Conceptual workflow.</strong> This page describes the system Holsera
            is engineering. No payment processing, escrow custody, identity verification,
            or customer-data collection is operational on this website.
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="stages">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeading
              id="stages"
              eyebrow="The five stages"
              title="Every transaction, the same explicit path"
            />
          </Reveal>
          <Reveal>
            <WorkflowStepper steps={workflowSteps} variant="vertical" />
          </Reveal>
        </div>
      </section>

      <section className="band band--soft" aria-labelledby="states">
        <div className="container">
          <Reveal>
            <SectionHeading
              id="states"
              eyebrow="Workflow states"
              title="The states a transaction can be in"
              lead="State is explicit and inspectable — there is no “somewhere in an inbox”."
            />
          </Reveal>
          <Reveal>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col">Meaning</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((row) => (
                    <tr key={row.state}>
                      <td>{row.state}</td>
                      <td>{row.desc}</td>
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

      <section className="band" aria-labelledby="record">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__side">
              <SectionHeading
                id="record"
                eyebrow="The record"
                title="One transaction, one reconstructable story"
                lead="Every transition is an event: who did it, when, and why. Both counterparties and any authorised reviewer see the same trail."
              />
              <ul className="ticks">
                <li>Terms snapshot captured at agreement time</li>
                <li>Reason codes attached to every automated decision</li>
                <li>Evidence linked to the milestone it proves</li>
                <li>Exportable trail for reconciliation and disputes</li>
              </ul>
            </Reveal>
            <Reveal>
              <MockupFrame>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <span className="ui-id">TX-0042 · Transaction detail</span>
                  <span className="ui-chip ui-chip--wait">Mockup</span>
                </div>
                <div className="ui-row">
                  <span className="ui-row__label">Terms snapshot</span>
                  <span className="ui-chip ui-chip--done">Recorded</span>
                </div>
                <div className="ui-row">
                  <span className="ui-row__label">Policy evaluation · 4 rules</span>
                  <span className="ui-chip ui-chip--done">Passed</span>
                </div>
                <div className="ui-row">
                  <span className="ui-row__label">Delivery confirmation</span>
                  <span className="ui-chip ui-chip--wait">Awaiting</span>
                </div>
                <div className="ui-row">
                  <span className="ui-row__label">Release instruction</span>
                  <span className="ui-chip ui-chip--wait">Blocked by conditions</span>
                </div>
                <div style={{ marginTop: '1.25rem' }}>
                  <span className="mono-label">Events</span>
                  <div style={{ marginTop: '0.5rem' }}>
                    <div className="ui-meta">workflow.created — terms snapshot stored</div>
                    <div className="ui-meta">policy.evaluated — 4 rules, 0 flags</div>
                    <div className="ui-meta">condition.waiting — delivery confirmation</div>
                  </div>
                </div>
              </MockupFrame>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Where does your workflow break today?"
        text="Map your current transaction process against these five stages — then talk to us about what Holsera would change."
        primary={{ href: '/contact/', label: 'Talk to us' }}
        secondary={{ href: '/platform/', label: 'Back to platform' }}
      />
    </>
  );
}
