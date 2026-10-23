/**
 * Holsera site content — single source of truth for everything the
 * pages render that could change as the product matures.
 *
 * HONESTY RULES — keep these intact when editing:
 *   - Every capability/status below is a PLACEHOLDER pending team
 *     confirmation. Nothing here may claim a certification, audit,
 *     metric, customer, partner, or shipped feature without evidence.
 *   - Status 'planned'          = design target, not built yet
 *   - Status 'unconfirmed'      = nobody has confirmed this detail yet
 *   - Status 'in-development' / 'available' — only set with real proof.
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
    text: 'Agreements live in email and chat, payments in one tool, and delivery proof in another — so the true state of a transaction is hard to reconstruct.',
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
    text: 'Every transaction moves through explicit, rule-driven states — agreed terms, checks, conditions, release — instead of scattered messages.',
    status: 'planned',
  },
  {
    title: 'A trust layer for both sides',
    text: 'Verification hooks, evidence capture, and an append-only record give counterparties a shared version of the truth.',
    status: 'planned',
  },
  {
    title: 'Fraud signals, not fraud promises',
    text: 'Configurable risk indicators surface anomalies for review — with reasons attached, never black-box verdicts.',
    status: 'planned',
  },
  {
    title: 'Escrow-style release logic',
    text: 'Funds or authorizations are released only when agreed conditions are met — designed as hold-and-release rules, not as custody on this site.',
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
    text: 'Define the conditions under which a transaction advances, holds, or returns — with every transition recorded.',
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
    text: 'Planned hooks for identity and business verification through authorised providers — never self-hosted sensitive data collection.',
    status: 'planned',
  },
  {
    title: 'Integration surface',
    text: 'APIs and webhooks so platforms can embed trust workflows into their own product experience.',
    status: 'planned',
  },
];

export const capabilityFootnote =
  'Holsera is pre-launch. Status labels above are maintained in the project source and updated as development progresses — no capability is presented as live unless marked Available.';

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
    text: 'Configurable rules run before anything moves: counterparty checks, workflow policy, and fraud signals — each result kept with its reasons.',
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
    text: 'When conditions are met — or an authorised reviewer approves an exception — the release instruction is executed and logged.',
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
/* Industry solution pages (one detailed page per segment)             */
/* ------------------------------------------------------------------ */
export interface IndustrySolution {
  slug: string;
  title: string;
  lead: string;
  challenge: string;
  status: Status;
  heroFigure: 'Settle' | 'Relay' | 'Patch' | 'Hub' | 'Rail' | 'Query';
  heroHue: 'blue' | 'green' | 'amber' | 'ice';
  figureCaption: string;
  painPoints: { title: string; text: string }[];
  workflow: { step: string; detail: string }[];
  outcomes: string[];
  notYet: string[];
}

export const industrySolutions: IndustrySolution[] = [
  {
    slug: 'marketplaces',
    title: 'Trust infrastructure for marketplaces',
    lead: 'Your buyers and sellers do not trust each other — they trust you. Every disputed transaction lands on your support team, your margins, and your reputation.',
    challenge:
      'When a platform only sees the payment and not the delivery, it adjudicates disputes with incomplete evidence. The record of what actually happened is scattered across messages, listings, and payment receipts.',
    status: 'planned',
    heroFigure: 'Settle',
    heroHue: 'blue',
    figureCaption:
      'Tiles sliding into an ordered tree around a hub — the shape of many scattered transactions resolving into one shared record.',
    painPoints: [
      {
        title: 'Non-delivery and chargeback disputes',
        text: 'A buyer claims non-delivery; a seller claims the buyer is defrauding them. Without a delivery-linked record, the platform guesses — and often absorbs the loss to keep both sides.',
      },
      {
        title: 'Onboarding parties they have never worked with',
        text: 'Every new seller is an unknown. Trust signals help, but reputation scores do not reconstruct what happened in a specific transaction when it goes wrong.',
      },
      {
        title: 'Manual escalation of contested transactions',
        text: 'Contested transactions become support tickets, and each one is rebuilt by hand from message threads — slow for the parties and expensive for the platform.',
      },
    ],
    workflow: [
      { step: 'Order placed', detail: 'The transaction opens with its agreement, price, and delivery terms attached as the record both sides see.' },
      { step: 'Funds committed', detail: 'Payment is committed under the agreement terms — held by a licensed provider, not by Holsera.' },
      { step: 'Delivery confirmed', detail: 'Carrier or completion attestation is attached by reference, with an integrity hash over the evidence.' },
      { step: 'Release conditions met', detail: 'The release engine evaluates the agreement mechanically and releases — or blocks with a stated reason.' },
    ],
    outcomes: [
      'A per-order record both buyer and seller can inspect — not a support thread only your team can read.',
      'Delivery-linked release conditions, so payment follows verified delivery rather than a promise.',
      'Contested transactions arrive with structured evidence attached, instead of being reconstructed by hand.',
    ],
    notYet: [
      'Holsera does not yet process real marketplace transactions — this is a design description.',
      'It does not replace your existing payments; money still moves through licensed providers.',
      'Delivery attestation depends on carrier and provider integrations that are still planned.',
    ],
  },
  {
    slug: 'b2b-commerce',
    title: 'Milestone workflows for B2B commerce',
    lead: 'High-value orders, payment terms spread across email and ERP, and a reconciliation process that only starts after something already disagrees.',
    challenge:
      'In B2B, the transaction record lives in several systems at once — a purchase order in one, an invoice in another, delivery notes in email. When they disagree, the cost is discovered late and settled by argument.',
    status: 'planned',
    heroFigure: 'Relay',
    heroHue: 'green',
    figureCaption:
      'A path lighting up hop by hop — each milestone recorded as it is reached, not reconstructed after the fact.',
    painPoints: [
      {
        title: 'Payment terms spread across email and ERP',
        text: 'The terms that govern a release often exist in three places and match in none of them. When a milestone is reached, nobody is certain which version governs.',
      },
      {
        title: 'Slow reconciliation when records disagree',
        text: 'Disagreement between systems is found late, when payment is already due — and resolving it means reconstructing what each system believed and when.',
      },
      {
        title: 'Exposure when a counterparty defaults',
        text: 'Without a clear, agreed record of what was delivered and what is owed, a default becomes a dispute with no shared starting point.',
      },
    ],
    workflow: [
      { step: 'Agreement recorded', detail: 'Milestones, terms, and hold conditions are attached as the release rules — the same source both parties see.' },
      { step: 'Milestone reached', detail: 'Each milestone is confirmed with its evidence recorded as an event, attributed and timestamped.' },
      { step: 'Conditions held or released', detail: 'Payment releases per milestone as conditions are satisfied; unmet conditions hold the next tranche with a stated reason.' },
      { step: 'Review bundle exported', detail: 'The full sequence — agreements, evidence, decisions — is exportable as a reconstructable record for reconciliation or audit.' },
    ],
    outcomes: [
      'One reconstructable record per transaction, instead of four systems that must be reconciled by hand.',
      'Release conditions tied to the agreement itself, so payment follows verified milestones.',
      'A shared starting point when a counterparty disputes or defaults — both sides read the same record.',
    ],
    notYet: [
      'Holsera does not yet run production B2B workflows — this is a design description.',
      'ERP and invoicing integrations are planned, not connected today.',
      'It does not provide trade credit, insurance, or legal advice on payment terms.',
    ],
  },
  {
    slug: 'service-gig',
    title: 'Verified progress for service & gig work',
    lead: 'Work delivered over time, payment that should follow verified progress, and disputes that usually come down to two different versions of what was agreed.',
    challenge:
      'In service and gig work, scope shifts as the work happens. When payment depends on completion and completion is contested, the parties have no shared record of what changed or what was actually delivered.',
    status: 'planned',
    heroFigure: 'Patch',
    heroHue: 'amber',
    figureCaption:
      'A patch panel where the cable under the pointer lifts — each connection made deliberately, each one visible and reversible.',
    painPoints: [
      {
        title: 'Disputes over scope and completion',
        text: 'The worker says the scope grew; the client says the original scope was not finished. Without a recorded agreement and its changes, the dispute is unresolvable from evidence.',
      },
      {
        title: 'Partial deliveries and revisions',
        text: 'Work arrives in pieces, and each revision changes what "done" means. A single payment decision at the end cannot see the history that led there.',
      },
      {
        title: 'Trust between newly matched parties',
        text: 'Newly matched parties have no history with each other. The cautious path — pay only on full completion — hurts the worker; the trusting path — pay upfront — risks the client.',
      },
    ],
    workflow: [
      { step: 'Scope agreed', detail: 'The engagement opens with its scope and milestones recorded as the shared reference both sides work from.' },
      { step: 'Progress confirmed', detail: 'Each delivery or milestone is confirmed and recorded as an attributed event, so revisions are visible rather than argued.' },
      { step: 'Partial release', detail: 'Payment can release against verified milestones, so the worker is not paid only at the very end and the client is not exposed upfront.' },
      { step: 'Dispute evidence structured', detail: 'A contested engagement arrives with its agreement, confirmations, and changes already structured — not reconstructed from messages.' },
    ],
    outcomes: [
      'Scope and its changes recorded as they happen, so completion disputes have evidence instead of memory.',
      'Milestone-based release, so neither party carries all the risk to the very end.',
      'A clear state both sides see, so newly matched parties do not have to rely on reputation alone.',
    ],
    notYet: [
      'Holsera does not yet run production service workflows — this is a design description.',
      'It does not verify work quality or arbitrate disputes — it structures the evidence and holds the release logic.',
      'Payment still moves through licensed providers; Holsera does not hold funds.',
    ],
  },
  {
    slug: 'fintech-builders',
    title: 'Transaction-trust primitives for FinTech builders',
    lead: 'You are embedding escrow, review, and release logic into your own product — and discovering that the hard part is not moving money, it is reconstructing what happened.',
    challenge:
      'Teams building transaction flows find that payment integration is the easy half. The hard half is the state machine, the evidence trail, the review queue, and the audit record — the parts that only matter when something goes wrong.',
    status: 'planned',
    heroFigure: 'Hub',
    heroHue: 'ice',
    figureCaption:
      'Tiles arranged around a central hub — composable primitives you wire into your own flow, rather than a flow imposed on you.',
    painPoints: [
      {
        title: 'Building escrow and review logic from scratch',
        text: 'Every team rebuilding a state machine for releases, holds, and exceptions is solving the same problem — and the failure modes only surface in production.',
      },
      {
        title: 'Keeping compliance evidence organised',
        text: 'Evidence that would satisfy a reviewer is scattered across logs and storage buckets, assembled only when it is urgently needed.',
      },
      {
        title: 'Speed versus control trade-offs',
        text: 'Shipping fast means hard-coding release rules; adding control later means re-architecting the flow your product already depends on.',
      },
    ],
    workflow: [
      { step: 'Define the workflow', detail: 'Compose transaction states and release conditions declaratively, instead of hard-coding them into application logic.' },
      { step: 'Subscribe to events', detail: 'Every state change emits a signed, replayable event, so your systems stay in sync without polling the transaction record.' },
      { step: 'Evaluate policy mechanically', detail: 'Release rules are evaluated against the record, and a blocked transition returns its reason instead of failing silently.' },
      { step: 'Export the audit trail', detail: 'Each transaction carries an append-only, actor-attributed history you can export as a review bundle.' },
    ],
    outcomes: [
      'Composable workflow primitives (planned API), so you assemble a flow instead of rebuilding a state machine.',
      'An event stream for every state change, designed to be signed and replayable.',
      'Policy over hard-coded rules, so adding control does not mean re-architecting what already ships.',
    ],
    notYet: [
      'No API is live today — see the developer preview for the shape being designed.',
      'These are design targets for a product in development, not documentation of a shipped library.',
      'Holsera does not provide legal, compliance, or regulatory advice.',
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
    text: 'Where checks, evidence, and the audit trail live — the shared source of truth for both counterparties.',
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
    text: 'Hold-and-release rules that define when value may move — designed to connect to licensed providers, not to hold funds itself.',
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
    text: 'TLS for data in transit and encryption at rest are requirements the production system must satisfy before launch — not claims made here.',
  },
  {
    title: 'Data minimisation',
    text: 'Workflows should carry only the data a decision actually needs; sensitive documents should never be collected through this website.',
  },
  {
    title: 'Auditability by default',
    text: 'Every state change is an event with an actor, timestamp, and reason — so behaviour can be reconstructed, not argued about.',
  },
  {
    title: 'Separation of duties',
    text: 'Sensitive actions — like exception releases — are designed for dual control so no single actor can move a transaction alone.',
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
    detail: '[Placeholder — no audit is claimed until a completed report exists]',
    status: 'unconfirmed',
  },
  {
    item: 'Certifications (e.g. SOC 2, ISO 27001)',
    detail: '[Placeholder — none claimed; add only after certification is granted]',
    status: 'unconfirmed',
  },
  {
    item: 'Penetration testing',
    detail: '[Placeholder — scope and cadence to be confirmed]',
    status: 'unconfirmed',
  },
  {
    item: 'Responsible disclosure policy',
    detail: 'A disclosure channel is intended to be published before launch.',
    status: 'planned',
  },
  {
    item: 'Bug bounty programme',
    detail: '[Placeholder — to be confirmed]',
    status: 'unconfirmed',
  },
  {
    item: 'Data processing agreements',
    detail: '[Placeholder — legal terms to be prepared with counsel]',
    status: 'unconfirmed',
  },
];

export const noClaimsNote =
  'This site does not claim certifications, audits, licences, guarantees, or metrics that have not been independently verified and confirmed.';

/* ------------------------------------------------------------------ */
/* Threat model (Security & Trust trust-center expansion)               */
/* ------------------------------------------------------------------ */
export interface ThreatActor {
  actor: string;
  capability: 'low' | 'moderate' | 'high';
  motive: string;
  realistic: string;
}

export interface Asset {
  asset: string;
  why: string;
  handling: string;
  status: Status;
}

export interface ThreatScenario {
  scenario: string;
  vector: string;
  designResponse: string;
  status: Status;
}

export interface TrustControl {
  control: string;
  covers: string;
  status: Status;
}

export const threatActors: ThreatActor[] = [
  {
    actor: 'Opportunistic fraudster',
    capability: 'low',
    motive: 'Quick money from impersonation, fake listings, or payment redirection.',
    realistic:
      'Most real-world fraud. Works at volume, targets the weakest party in a transaction, and rarely touches the platform directly.',
  },
  {
    actor: 'Organised fraud ring',
    capability: 'moderate',
    motive: 'Structured, repeatable fraud — account takeovers, synthetic identities, colluding buyers or sellers.',
    realistic:
      'Coordinates across many transactions. Defended by per-party history, review queues, and dual control on exceptions.',
  },
  {
    actor: 'Malicious insider',
    capability: 'moderate',
    motive: 'Move a single high-value transaction, or exfiltrate records.',
    realistic:
      'The reason auditability and separation of duties are design requirements, not afterthoughts. No single actor should complete an exception alone.',
  },
  {
    actor: 'External attacker (technical)',
    capability: 'high',
    motive: 'Compromise the system to alter records, release funds, or steal data.',
    realistic:
      'Attacks the integration and evidence layers. Defended by least privilege, signed webhooks, integrity hashes, and independent testing before launch.',
  },
];

export const assets: Asset[] = [
  {
    asset: 'Transaction record & audit log',
    why: 'The single source of truth both parties and any reviewer rely on. If it is wrong or altered, every downstream decision is wrong.',
    handling:
      'Append-only, actor-attributed, integrity-hashed so tampering is detectable. Designed to be reconstructable end to end.',
    status: 'planned',
  },
  {
    asset: 'Evidence & attachments',
    why: 'Documents and confirmations that justify a state change or a release decision.',
    handling:
      'Stored by reference in your systems where possible; Holsera records an integrity hash rather than centralising sensitive documents.',
    status: 'planned',
  },
  {
    asset: 'Release & payment decisions',
    why: 'The action that moves value. The highest-impact moment in the workflow.',
    handling:
      'Declaratively gated by the agreement, evaluated mechanically, and dual-controlled for exceptions.',
    status: 'planned',
  },
  {
    asset: 'Party identity & access',
    why: 'Who is allowed to act, and on which transactions.',
    handling:
      'Least privilege by default; identity verification via authorised providers rather than this site collecting sensitive data itself.',
    status: 'planned',
  },
];

export const threatScenarios: ThreatScenario[] = [
  {
    scenario: 'Altered or forged transaction record',
    vector: 'Someone rewrites history so a blocked transition looks approved, or an approval looks like a rejection.',
    designResponse:
      'Append-only log with integrity hashes over each entry and its evidence. A rewrite breaks the chain and is detectable on replay.',
    status: 'planned',
  },
  {
    scenario: 'Unauthorised release of funds',
    vector: 'A single compromised or coerced actor tries to push an exception release through.',
    designResponse:
      'Separation of duties: exception releases require dual control, and every release records actor, reason, and the rule evaluation that allowed it.',
    status: 'planned',
  },
  {
    scenario: 'Compromised integration webhook',
    vector: 'A forged or replayed event tells the state engine a payment settled when it did not.',
    designResponse:
      'Signed, idempotent webhooks with explicit state transitions. An unexpected or replayed event fails closed into a visible review state, not a silent one.',
    status: 'planned',
  },
  {
    scenario: 'Social-engineering a party out of band',
    vector: 'A fraudster contacts one party directly with changed payment details and pressure to skip the workflow.',
    designResponse:
      'The workflow is the record. Out-of-band changes that are not recorded through the platform are, by design, not reflected in the transaction state — and the UI states its reasons when a transition is blocked.',
    status: 'planned',
  },
];

export const trustControls: TrustControl[] = [
  {
    control: 'Append-only, integrity-hashed audit log',
    covers: 'Record tampering; post-hoc disputes',
    status: 'planned',
  },
  {
    control: 'Dual control on exception releases',
    covers: 'Malicious or coerced insider',
    status: 'planned',
  },
  {
    control: 'Signed, idempotent, fail-closed webhooks',
    covers: 'Forged or replayed integration events',
    status: 'planned',
  },
  {
    control: 'Least privilege by default',
    covers: 'Over-broad access; blast radius',
    status: 'planned',
  },
  {
    control: 'Explainable risk signals + human review queue',
    covers: 'Organised and opportunistic fraud',
    status: 'planned',
  },
  {
    control: 'Identity & payment via authorised providers',
    covers: 'Regulatory exposure; sensitive-data handling',
    status: 'planned',
  },
];

export const threatModelNote =
  'This is a design-stage threat model: it describes what Holsera is being engineered to defend against, not controls that have been independently audited or certified. No certification, audit, or penetration-test result is claimed on this site.';

/* ------------------------------------------------------------------ */
/* Three-pillar positioning                                             */
/* ------------------------------------------------------------------ */
export interface Pillar {
  name: string;
  what: string;
  includes: string[];
}

export const threePillars: Pillar[] = [
  {
    name: 'Trust infrastructure',
    what:
      'The shared record both sides rely on: an append-only transaction history with actor-attributed evidence, so what happened can be reconstructed rather than argued about.',
    includes: [
      'Structured transaction workflows',
      'Evidence attached by reference with integrity hashes',
      'Audit trail exportable for review',
    ],
  },
  {
    name: 'Risk intelligence',
    what:
      'Signals that explain themselves. Anomalies surface with the data that triggered them, and anything uncertain routes to human review — with the decision written back into the record.',
    includes: [
      'Explainable risk signals, no silent flags',
      'Human review queue with recorded rationale',
      'Per-party history informing each evaluation',
    ],
  },
  {
    name: 'Transaction orchestration',
    what:
      'The state machine that moves a transaction through explicit, agreement-defined conditions — coordinating payment commitment, delivery evidence, and release without holding funds itself.',
    includes: [
      'Declarative release conditions per agreement',
      'Dual control reserved for exceptions',
      'Planned connections to licensed payment providers',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Founder page — design convictions and the honest build story        */
/* ------------------------------------------------------------------ */
export interface Conviction {
  title: string;
  text: string;
}

export const founderConvictions: Conviction[] = [
  {
    title: 'Trust is engineered, not promised',
    text:
      'A trust claim with no mechanism behind it is marketing. The conviction driving Holsera is that trust should be a property of the system — produced by append-only records, dual control, and reasons a reviewer can reconstruct — not a sentence on a landing page.',
  },
  {
    title: 'Say what is designed, built, and unknown',
    text:
      'Most product pages describe an imagined finished system. Holsera labels every capability as planned, in development, or available, and refuses to call anything available without proof. That discipline is the point, not a limitation.',
  },
  {
    title: 'The weak party in a transaction deserves the stronger default',
    text:
      'Fraud targets whoever has less leverage and less context. The workflow is designed so the cautious path — evidence recorded, release gated, reasons stated — is also the easy path, so protection does not depend on the wary party winning an argument.',
  },
  {
    title: 'One person building it is a fact, not a facade',
    text:
      'Holsera is a team of one. No invented customers, no headcount theatre. Every part of it is built by the founder, and the site says so plainly.',
  },
];

export const buildStory: string[] = [
  'Holsera began with a recurring observation: online transactions between parties who will never meet in person break down in the same few places every time — unclear commitments, unverifiable evidence, and a release decision that no one can reconstruct after the fact.',
  'The early work was not a product but a model: what a transaction record would have to contain, who would be allowed to change it, and how a blocked decision could explain itself instead of failing silently. That model became the state engine and audit-log design described on the architecture page.',
  'It is still built by one person. The founder writes the code, designs the interface, and maintains this site. The pre-launch status is deliberate — shipping a claimable product is the only thing that lets the labels change from planned to available.',
];

/* ------------------------------------------------------------------ */
/* Alternatives — generic categories, honest trade-offs, no naming      */
/* ------------------------------------------------------------------ */
export interface Alternative {
  category: string;
  bestFor: string;
  gap: string;
  holseraAngle: string;
}

export const alternatives: Alternative[] = [
  {
    category: 'Payment processors',
    bestFor: 'Moving money once both sides already trust each other.',
    gap:
      'They settle a payment; they do not hold the agreement, the evidence, or the conditional release logic that decides whether payment should happen at all.',
    holseraAngle:
      'Holsera is designed to sit before settlement — carrying the workflow, the record, and the gated release — while money still moves through licensed providers.',
  },
  {
    category: 'Traditional escrow services',
    bestFor: 'A single high-value deal where a human agent can manage the release.',
    gap:
      'Release is often gated by a manual agent and a dispute process, so it is slow, hard to reconstruct, and does not scale to repeat or low-margin transactions.',
    holseraAngle:
      'Holsera proposes a declarative release engine: rules evaluated mechanically against an append-only record, with dual control reserved for genuine exceptions.',
  },
  {
    category: 'Marketplace trust & safety tooling',
    bestFor: 'Platforms policing many small transactions between strangers.',
    gap:
      'Trust signals (ratings, badges, fraud scoring) usually describe reputation; they do not give the two parties a shared, verifiable transaction record.',
    holseraAngle:
      'Holsera is designed to be the record itself — evidence, state, and reasons — rather than a reputation score layered on top of an opaque flow.',
  },
  {
    category: 'Contract & e-signature tools',
    bestFor: 'Getting an agreement signed and stored.',
    gap:
      'The signed document is a snapshot at signature time; what happens after — delivery, acceptance, exceptions — lives outside it and is rarely reconstructable.',
    holseraAngle:
      'Holsera treats the agreement as the source of release conditions that stay live for the life of the transaction, not a PDF that goes dormant once signed.',
  },
  {
    category: 'Spending & treasury dashboards',
    bestFor: 'Seeing where money went after it moved.',
    gap:
      'They are descriptive and post-hoc; they do not gate a transaction before value moves, and they carry no shared view for the counterparty.',
    holseraAngle:
      'Holsera is designed to act before the money moves — a decision layer both sides and any reviewer can inspect, not a report that explains the damage later.',
  },
];

export const alternativesNote =
  'These are generic categories of solutions, not named competitors, and the trade-offs above are Holsera’s own design framing rather than independently verified comparisons. Holsera is a product in development and does not yet process real transactions. Treat this as positioning, not a benchmark.';

/* ------------------------------------------------------------------ */
/* Developer preview                                                    */
/* ------------------------------------------------------------------ */
export interface DevSurface {
  area: string;
  shape: string;
  status: Status;
}

export const devSurfaces: DevSurface[] = [
  {
    area: 'Transactions API',
    shape:
      'Create a transaction from an agreement, attach evidence by reference, read state and the reasons behind it. Idempotent by design so retries never double-apply a transition.',
    status: 'planned',
  },
  {
    area: 'Webhooks',
    shape:
      'Signed, replayable events on every state transition — payment committed, evidence attached, release held for review — so your systems stay in sync without polling.',
    status: 'planned',
  },
  {
    area: 'Policy / release rules',
    shape:
      'Declaratively express release conditions against the transaction record. The engine evaluates them mechanically and returns a reason when a transition is blocked.',
    status: 'planned',
  },
  {
    area: 'Audit & event log',
    shape:
      'An append-only, actor-attributed event history per transaction, exportable as a review bundle with integrity references over each entry.',
    status: 'planned',
  },
];

export const devPreviewNote =
  'This is a description of interfaces being designed — not documentation of a shipped API. No endpoint is live, no key has been issued, and nothing on this page can be called today. It exists so integrators can tell us whether the shape matches what their systems need, which is exactly the kind of feedback that shapes what gets built.';

/* ------------------------------------------------------------------ */
/* Early-access program                                                 */
/* ------------------------------------------------------------------ */
export interface EarlyAccessBenefit {
  title: string;
  text: string;
}

export const earlyAccessBenefits: EarlyAccessBenefit[] = [
  {
    title: 'Shape the workflow before it hardens',
    text:
      'Early participants see the transaction model while it is still a design, not a shipped product. Feedback at this stage actually changes what gets built — later, the cost of change only goes up.',
  },
  {
    title: 'A direct line to the person building it',
    text:
      'Holsera is built by one founder. There is no support queue between you and the decision-maker — questions and edge cases go straight to the person writing the code.',
  },
  {
    title: 'Transparency by default',
    text:
      'Participants get the same honest status labels this site uses: what is planned, what is in development, and what is genuinely available. No feature is described as shipped before it is.',
  },
  {
    title: 'Priority when access opens',
    text:
      'When a working preview becomes available, early-access members are contacted first. This is a stated intention of the program, not a claim about a date or a queue position.',
  },
];

export interface EarlyAccessExpectation {
  title: string;
  text: string;
}

export const earlyAccessExpectations: EarlyAccessExpectation[] = [
  {
    title: 'This is a pre-launch program',
    text:
      'There is no product to log into yet. Joining means you will be told when a real preview exists — it does not grant access to something running today.',
  },
  {
    title: 'No payment, no commitment',
    text:
      'The program is free and imposes no obligation. It is a way to stay in the loop and, if you choose, to tell us where trust breaks in your own transaction flows.',
  },
  {
    title: 'Feedback is welcome, not required',
    text:
      'Some members will want to shape the product; others just want to know when it ships. Both are fine. Nothing you say is used as a testimonial or case study without asking you first.',
  },
  {
    title: 'Your details are not stored yet',
    text:
      'This site has no backend, so the form below does not transmit or store anything. When a real endpoint is authorised, it will be stated clearly before any data is collected.',
  },
];

export const earlyAccessNote =
  'This page describes an early-access program for a product still in development. It does not promise a launch date, a preview date, a cohort size, or any feature. Nothing here should be read as a commitment beyond what is written above. No certifications, metrics, or customers are claimed.';

/* ------------------------------------------------------------------ */
/* Illustrative mockup data — clearly labelled as a mockup in the UI    */
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
    'workflow.created — terms snapshot stored',
    'policy.evaluated — 4 rules, 0 flags',
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
