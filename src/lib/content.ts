/**
 * Holsera site content â single source of truth for everything the
 * pages render that could change as the product matures.
 *
 * âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
 * â HONESTY RULES â keep these intact when editing:                     â
 * â â¢ Every capability/status below is a PLACEHOLDER pending team       â
 * â   confirmation. Nothing here may claim a certification, audit,      â
 * â   metric, customer, partner, or shipped feature without evidence.  â
 * â â¢ Status 'planned'      = design target, not built yet              â
 * â â¢ Status 'unconfirmed'  = nobody has confirmed this detail yet      â
 * â â¢ Status 'in-development'/'available' â only set with real proof    â
 * âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
 */

export type Status = 'planned' | 'in-development' | 'available' | 'unconfirmed';

export const statusLabel: Record<Status, string> = {
  planned: 'Planned',
  'in-development': 'In development',
  available: 'Available',
  unconfirmed: 'To be confirmed',
};

/* ------------------------------------------------------------------ */
/* Homepage: the transaction-trust problem                             */
/* ------------------------------------------------------------------ */
export interface ProblemPoint {
  title: string;
  text: string;
}

export const problemPoints: ProblemPoint[] = [
  {
    title: 'Trust gaps between counterparties',
    text: 'Businesses transact with parties they have never worked before, with little shared verification and no neutral record of what was agreed.',
  },
  {
    title: 'Fragmented workflows',
    text: 'Agreements live in email and chat, payments in one tool, and delivery proof in another â so the true state of a transaction is hard to reconstruct.',
  },
  {
    title: 'Fraud and dispute exposure',
    text: 'Non-delivery, unauthorized transactions, and synthetic identities shift risk onto the party that can least afford it.',
  },
  {
    title: 'Slow, manual reconciliation',
    text: 'When something goes wrong, evidence is scattered. Rebuilding what happened takes days of manual archaeology.',
  },
];

/* ------------------------------------------------------------------ */
/* Homepage: the proposed solution                                     */
/* ------------------------------------------------------------------ */
export interface SolutionPillar {
  title: string;
  text: string;
  status: Status;
}

export const solutionPillars: SolutionPillar[] = [
  {
    title: 'Structured transaction workflows',
    text: 'Every transaction moves through explicit, rule-driven states â agreed terms, checks, conditions, release â instead of scattered messages.',
    status: 'planned',
  },
  {
    title: 'A trust layer for both sides',
    text: 'Verification hooks, evidence capture, and an append-only record give counterparties a shared version of the truth.',
    status: 'planned',
  },
  {
    title: 'Fraud signals, not fraud promises',
    text: 'Configurable risk indicators surface anomalies for review â with reasons attached, never black-box verdicts.',
    status: 'planned',
  },
  {
    title: 'Escrow-style release logic',
    text: 'Funds or authorizations are released only when agreed conditions are met â designed as hold-and-release rules, not as custody on this site.',
    status: 'planned',
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities with explicit status                                   */
/* ------------------------------------------------------------------ */
export interface Capability {
  title: string;
  text: string;
  status: Status;
}

export const capabilities: Capability[] = [
  {
    title: 'Transaction workflow engine',
    text: 'Compose transaction states, conditions, and approvals as an auditable flow rather than ad-hoc coordination.',
    status: 'planned',
  },
  {
    title: 'Hold-and-release rules',
    text: 'Define the conditions under which a transaction advances, holds, or returns â with every transition recorded.',
    status: 'planned',
  },
  {
    title: 'Fraud signal monitoring',
    text: 'Evaluate behavioural and transactional indicators, flag anomalies, and route them to a human review queue.',
    status: 'planned',
  },
  {
    title: 'Evidence & audit trail',
    text: 'Capture the who, what, and when of every step so disputes can be reconstructed from a single record.',
    status: 'planned',
  },
  {
    title: 'Counterparty checks',
    text: 'Planned hooks for identity and business verification through authorised providers â never self-hosted sensitive data collection.',
    status: 'planned',
  },
  {
    title: 'Integration surface',
    text: 'APIs and webhooks so platforms can embed trust workflows into their own product experience.',
    status: 'planned',
  },
];

export const capabilityFootnote =
  'Holsera is pre-launch. Status labels above are maintained in the project source and updated as development progresses â no capability is presented as live unless marked Available.';

/* ------------------------------------------------------------------ */
/* Transaction workflow (How It Works)                                 */
/* ------------------------------------------------------------------ */
export interface WorkflowStep {
  title: string;
  text: string;
  actor: string;
  record: string;
  status: Status;
}

export const workflowSteps: WorkflowStep[] = [
  {
    title: 'Terms agreed',
    text: 'Both sides confirm scope, amount, and the conditions under which the transaction may advance or release.',
    actor: 'Parties / platform',
    record: 'Terms snapshot',
    status: 'planned',
  },
  {
    title: 'Checks evaluated',
    text: 'Configurable rules run before anything moves: counterparty checks, workflow policy, and fraud signals â each result kept with its reasons.',
    actor: 'Holsera trust layer',
    record: 'Check results + reasons',
    status: 'planned',
  },
  {
    title: 'Conditions tracked',
    text: 'The workflow tracks delivery, confirmation, or milestone evidence against the agreed conditions, holding when something is off.',
    actor: 'Both sides',
    record: 'Milestones & evidence',
    status: 'planned',
  },
  {
    title: 'Release decision',
    text: 'When conditions are met â or an authorised reviewer approves an exception â the release instruction is executed and logged.',
    actor: 'Reviewer / rules engine',
    record: 'Approval trail',
    status: 'planned',
  },
  {
    title: 'Settlement & reconciliation',
    text: 'Value moves through connected providers; events and exports line up with your ledger for reconciliation.',
    actor: 'Connected providers',
    record: 'Exportable audit record',
    status: 'planned',
  },
];

/* ------------------------------------------------------------------ */
/* Target customer segments (Solutions)                                */
/* ------------------------------------------------------------------ */
export interface Segment {
  title: string;
  summary: string;
  challenges: string[];
  approach: string[];
}

export const segments: Segment[] = [
  {
    title: 'Marketplaces & platforms',
    summary: 'Platforms where buyers and sellers transact with each other, and the platform carries the reputation risk.',
    challenges: [
      'Non-delivery and chargeback disputes',
      'Onboarding parties they have never worked with',
      'Manual escalation of contested transactions',
    ],
    approach: [
      'Delivery-linked release conditions per order',
      'Shared evidence record for both sides',
      'Review queues with reasons attached',
    ],
  },
  {
    title: 'B2B commerce & wholesale',
    summary: 'Companies transacting high-value orders across invoices, purchase orders, and delivery milestones.',
    challenges: [
      'Payment terms spread across email and ERP',
      'Slow reconciliation when records disagree',
      'Exposure when a counterparty defaults',
    ],
    approach: [
      'Milestone-based workflows tied to documents',
      'One reconstructable record per transaction',
      'Hold rules until conditions are satisfied',
    ],
  },
  {
    title: 'Service & gig economies',
    summary: 'Marketplaces where work is delivered over time and payment should follow verified progress.',
    challenges: [
      'Disputes over scope and completion',
      'Partial deliveries and revisions',
      'Trust between newly matched parties',
    ],
    approach: [
      'Milestone release tied to confirmations',
      'Structured dispute evidence from day one',
      'Clear state visible to both sides',
    ],
  },
  {
    title: 'FinTech & platform builders',
    summary: 'Product teams embedding transaction-trust flows into their own applications.',
    challenges: [
      'Building escrow and review logic from scratch',
      'Keeping compliance evidence organised',
      'Speed versus control trade-offs',
    ],
    approach: [
      'Composable workflow primitives (planned API)',
      'Event streams for every state change',
      'Configurable policy instead of hard-coded rules',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Platform building blocks                                            */
/* ------------------------------------------------------------------ */
export interface PlatformModule {
  title: string;
  text: string;
  points: string[];
  status: Status;
}

export const platformModules: PlatformModule[] = [
  {
    title: 'Workflow engine',
    text: 'The core state machine that carries a transaction from agreement to close.',
    points: ['Configurable states & transitions', 'Condition and approval rules', 'Idempotent, replayable events'],
    status: 'planned',
  },
  {
    title: 'Trust & evidence layer',
    text: 'Where checks, evidence, and the audit trail live â the shared source of truth for both counterparties.',
    points: ['Append-only event log', 'Evidence capture per step', 'Reason codes on every decision'],
    status: 'planned',
  },
  {
    title: 'Fraud signals',
    text: 'Indicator evaluation and review tooling designed to surface risk, not to make unexplained calls.',
    points: ['Configurable signal rules', 'Human review queues', 'Explained outcomes only'],
    status: 'planned',
  },
  {
    title: 'Escrow-style release logic',
    text: 'Hold-and-release rules that define when value may move â designed to connect to licensed providers, not to hold funds itself.',
    points: ['Condition-based release', 'Dual-control exceptions', 'No custody on this site'],
    status: 'planned',
  },
  {
    title: 'Integration surface',
    text: 'The planned developer interface for embedding Holsera flows into other products.',
    points: ['REST-style APIs (concept)', 'Webhooks for state changes', 'Sandbox-first workflow (planned)'],
    status: 'unconfirmed',
  },
  {
    title: 'Operations console',
    text: 'The interface teams use to monitor, review, and resolve transactions.',
    points: ['Live workflow status', 'Review & escalation queues', 'Exportable records'],
    status: 'planned',
  },
];

/* ------------------------------------------------------------------ */
/* Security & Trust                                                    */
/* ------------------------------------------------------------------ */
export interface SecurityPrinciple {
  title: string;
  text: string;
}

export const securityPrinciples: SecurityPrinciple[] = [
  {
    title: 'Least privilege by default',
    text: 'Components and people get the minimum access required for their function, reviewed as the system evolves.',
  },
  {
    title: 'Encryption as a design requirement',
    text: 'TLS for data in transit and encryption at rest are requirements the production system must satisfy before launch â not claims made here.',
  },
  {
    title: 'Data minimisation',
    text: 'Workflows should carry only the data a decision actually needs; sensitive documents should never be collected through this website.',
  },
  {
    title: 'Auditability by default',
    text: 'Every state change is an event with an actor, timestamp, and reason â so behaviour can be reconstructed, not argued about.',
  },
  {
    title: 'Separation of duties',
    text: 'Sensitive actions â like exception releases â are designed for dual control so no single actor can move a transaction alone.',
  },
  {
    title: 'Secure development lifecycle',
    text: 'Threat modelling, review, and testing are intended parts of the development process, with independent verification planned before launch.',
  },
];

export interface PostureRow {
  item: string;
  detail: string;
  status: Status;
}

export const securityPosture: PostureRow[] = [
  {
    item: 'Independent security audit',
    detail: '[Placeholder â no audit is claimed until a completed report exists]',
    status: 'unconfirmed',
  },
  {
    item: 'Certifications (e.g. SOC 2, ISO 27001)',
    detail: '[Placeholder â none claimed; add only after certification is granted]',
    status: 'unconfirmed',
  },
  {
    item: 'Penetration testing',
    detail: '[Placeholder â scope and cadence to be confirmed]',
    status: 'unconfirmed',
  },
  {
    item: 'Responsible disclosure policy',
    detail: 'A disclosure channel is intended to be published before launch.',
    status: 'planned',
  },
  {
    item: 'Bug bounty programme',
    detail: '[Placeholder â to be confirmed]',
    status: 'unconfirmed',
  },
  {
    item: 'Data processing agreements',
    detail: '[Placeholder â legal terms to be prepared with counsel]',
    status: 'unconfirmed',
  },
];

export const noClaimsNote =
  'This site does not claim certifications, audits, licences, guarantees, or metrics that have not been independently verified and confirmed.';

/* ------------------------------------------------------------------ */
/* Illustrative mockup data â clearly labelled as a mockup in the UI    */
/* ------------------------------------------------------------------ */
export const mockupTx = {
  id: 'TX-0042',
  caption: 'Illustrative transaction record',
  rows: [
    { label: 'Terms agreed', chip: 'Recorded', tone: 'done' },
    { label: 'Counterparty checks', chip: 'Pending', tone: 'wait' },
    { label: 'Delivery confirmation', chip: 'Not started', tone: 'wait' },
    { label: 'Release decision', chip: 'Blocked by conditions', tone: 'wait' },
  ],
  trail: [
    'workflow.created â terms snapshot stored',
    'policy.evaluated â 4 rules, 0 flags',
    'awaiting counterparty confirmation',
  ],
};

/* ------------------------------------------------------------------ */
/* Architecture page — the five designed layers                        */
/* ------------------------------------------------------------------ */
export interface ArchitectureLayer {
  title: string;
  status: Status;
  scope: 'your systems' | 'holsera' | 'external';
  text: string;
  points: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    title: 'Application & API integration layer',
    status: 'planned',
    scope: 'holsera',
    text: 'The surface your software talks to. Your product keeps its own interfaces and data stores; the integration layer exposes transaction state, evidence references and decisions to the systems you already run.',
    points: [
      'API-first: every workflow action available as an authenticated call (planned)',
      'Webhook events for state transitions, with signed payloads (planned)',
      'Idempotent operations, so retries never double-apply a state change (design target)',
      'Evidence passed by reference — documents stay in your storage, Holsera records their integrity hash (design target)',
    ],
  },
  {
    title: 'Transaction state & policy engine',
    status: 'planned',
    scope: 'holsera',
    text: 'The core state machine. Each transaction moves through explicit states under the conditions defined in the agreement, and every transition records the actor, the reason and the rule evaluation that allowed it.',
    points: [
      'Per-agreement state models, not one hard-coded flow (design target)',
      'Declarative release conditions evaluated mechanically against the record (design target)',
      'Blocked transitions state their reason — no silent failures (design target)',
      'Deterministic replay: the sequence of states can be reconstructed from the log (design target)',
    ],
  },
  {
    title: 'Evidence & audit-log layer',
    status: 'planned',
    scope: 'holsera',
    text: 'One append-only home for what happened. Attachments, confirmations and evaluations are recorded with actor, timestamp and integrity references, so any reviewer can reconstruct a transaction end to end.',
    points: [
      'Append-only event log per transaction (design target)',
      'Actor-attributed: every record answers "who" and "why" (design target)',
      'Integrity hashes over evidence, so tampering is detectable (design target)',
      'Exportable audit bundle for dispute or compliance review (planned)',
    ],
  },
  {
    title: 'Risk-signal evaluation & human review',
    status: 'planned',
    scope: 'holsera',
    text: 'Signals explain themselves. Automated checks surface anomalies with reasons, and anything uncertain routes to a human review queue — with the decision and its justification written back into the record.',
    points: [
      'Explainable signals: each flag carries the data that triggered it (design target)',
      'Human review queue for flagged transitions (planned)',
      'Decisions recorded with reviewer, rationale and evidence consulted (design target)',
      'No silent auto-rejections — a held transaction is a visible state, not a dead end (design target)',
    ],
  },
  {
    title: 'External payment & verification providers',
    status: 'planned',
    scope: 'external',
    text: 'Holsera is designed to orchestrate — not replace — regulated services. Payment rails, identity verification and delivery attestation stay with authorised third parties, connected through the integration layer when it exists.',
    points: [
      'Payment commitment and settlement remain with licensed providers (design principle)',
      'Identity verification via authorised KYC providers (planned)',
      'Carrier / delivery attestations attached as evidence by reference (planned)',
      'Provider actions recorded as first-class events in the audit log (design target)',
    ],
  },
];
