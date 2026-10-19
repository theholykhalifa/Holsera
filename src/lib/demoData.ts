/**
 * Fictional data for the interactive concept demo (/demo/).
 *
 * Every value here is INVENTED for illustration. The demo exists to
 * explain how structured transaction state, evidence and conditional
 * release logic are intended to work — nothing here reflects a real
 * transaction, party, provider or amount.
 */

export type CheckResult = 'pass' | 'fail' | 'pending';

export interface DemoRuleCheck {
  rule: string;
  result: CheckResult;
  detail: string;
}

export interface DemoEvent {
  id: string;
  label: string;
  state: string;
  actor: string;
  timestamp: string;
  summary: string;
  evidence: string[];
  checks: DemoRuleCheck[];
  nextReason: string;
}

export interface DemoVerdict {
  approved: boolean;
  headline: string;
  reason: string;
  conditions: { text: string; result: CheckResult }[];
}

export const demoScenario = {
  title: 'CNC lathe purchase',
  parties: 'Meridian Fabrication (buyer) · Torrance Industrial Supply (seller)',
  amount: '$18,400',
  conditions:
    'Delivery to the buyer’s site within 5 business days · serial number must match the agreement · 3-day inspection window before release.',
};

export const demoEvents: DemoEvent[] = [
  {
    id: 'terms',
    label: 'Terms agreed',
    state: 'AGREEMENT_RECORDED',
    actor: 'Buyer & Seller',
    timestamp: 'Day 1 · 09:14',
    summary:
      'Both parties sign the structured agreement. The itemised order, delivery conditions and release conditions are recorded as the transaction’s source of truth.',
    evidence: ['Signed agreement (record hash)', 'Itemised order — 1 × CNC lathe VL-400'],
    checks: [
      {
        rule: 'Counterparties identified',
        result: 'pass',
        detail: 'Both parties recorded against the agreement before anything moves.',
      },
      {
        rule: 'Amount matches order',
        result: 'pass',
        detail: '$18,400 agrees with the itemised order total.',
      },
    ],
    nextReason:
      'Next state: FUNDS_COMMITTED — the transaction cannot advance until funds are committed against these exact terms.',
  },
  {
    id: 'funds',
    label: 'Funds committed',
    state: 'FUNDS_COMMITTED',
    actor: 'Payment provider (authorised)',
    timestamp: 'Day 1 · 09:22',
    summary:
      'The buyer’s payment provider confirms the committed amount is held against this transaction reference. In this concept, Holsera records the commitment — it does not hold funds itself.',
    evidence: ['Provider authorisation record (ref. TXN-2291-A)'],
    checks: [
      {
        rule: 'Provider is on the authorised list',
        result: 'pass',
        detail: 'Commitment recorded by a provider configured for this workflow.',
      },
      {
        rule: 'Committed amount = agreed amount',
        result: 'pass',
        detail: '$18,400 committed — matches the agreement exactly.',
      },
    ],
    nextReason:
      'Next state: IN_TRANSIT — the seller is now cleared to dispatch against a funded transaction.',
  },
  {
    id: 'shipped',
    label: 'Shipment dispatched',
    state: 'IN_TRANSIT',
    actor: 'Seller',
    timestamp: 'Day 2 · 16:40',
    summary:
      'The seller dispatches the goods and attaches carrier evidence to the transaction record.',
    evidence: ['Carrier tracking — NR-88412', 'Dispatch note (seller-attached)'],
    checks: [
      {
        rule: 'Shipment matches the order',
        result: 'pass',
        detail: 'Dispatched item and quantity agree with the itemised order.',
      },
    ],
    nextReason:
      'Next state: DELIVERY_RECORDED — advancing requires delivery confirmation evidence.',
  },
  {
    id: 'delivered',
    label: 'Delivery confirmed',
    state: 'DELIVERY_RECORDED',
    actor: 'Carrier + Buyer',
    timestamp: 'Day 4 · 11:05',
    summary:
      'Delivery is confirmed at the buyer’s site. The attached evidence is what the release evaluation will later depend on.',
    evidence: ['Signed delivery note', 'Site photographs', 'Serial-number check — VL-400-77120'],
    checks: [
      {
        rule: 'Delivered within the 5-day window',
        result: 'pass',
        detail: 'Day 4 delivery — inside the Day-1 + 5 business-day condition.',
      },
      {
        rule: 'Delivery note evidence attached',
        result: 'pass',
        detail: 'Signed delivery note attached by the carrier and acknowledged by the buyer.',
      },
      {
        rule: 'Serial number matches the agreement',
        result: 'pass',
        detail: 'VL-400-77120 matches the serial recorded in the agreement.',
      },
    ],
    nextReason:
      'Next state: INSPECTION — the 3-day inspection window opens when delivery evidence is on record.',
  },
  {
    id: 'inspection',
    label: 'Inspection window',
    state: 'INSPECTION',
    actor: 'Buyer',
    timestamp: 'Day 4–7',
    summary:
      'The buyer has a defined window to inspect and raise a dispute. Raising a dispute is a state change in its own right — with its own evidence requirements — rather than an off-platform argument.',
    evidence: ['No dispute records attached'],
    checks: [
      {
        rule: 'No dispute raised within window',
        result: 'pass',
        detail: 'Inspection window closed on schedule with no dispute record.',
      },
      {
        rule: 'Window duration matches agreement',
        result: 'pass',
        detail: '3-day window as defined in the agreement.',
      },
    ],
    nextReason:
      'Next state: RELEASE_EVALUATION — the policy engine evaluates every release condition against the record.',
  },
  {
    id: 'release',
    label: 'Release decision',
    state: 'RELEASE_EVALUATION',
    actor: 'Policy engine (conceptual)',
    timestamp: 'Day 7 · 12:00',
    summary:
      'The release decision is evaluated mechanically from the record: funds committed, delivery evidence present, conditions met, window closed without dispute.',
    evidence: ['Evaluation input: full transaction record'],
    checks: [],
    nextReason:
      'The verdict below is derived entirely from the transaction record — flip the delivery-evidence condition to see how the decision changes.',
  },
];

/**
 * Returns event 4 adapted to the delivery-evidence condition, and the
 * resulting release verdict. With evidence present the release is
 * approved; without it, the release is blocked and the reason says
 * exactly which condition failed.
 */
export function getVerdict(deliveryConfirmed: boolean): DemoVerdict {
  if (deliveryConfirmed) {
    return {
      approved: true,
      headline: 'Release approved',
      reason:
        'Every release condition evaluates from the record: funds committed against the agreed amount, delivery confirmed inside the window with signed evidence, serial number matched, and the inspection window closed without dispute.',
      conditions: [
        { text: 'Funds committed ($18,400 matches agreement)', result: 'pass' },
        { text: 'Delivery confirmed within 5 business days', result: 'pass' },
        { text: 'Signed delivery note + site photos on record', result: 'pass' },
        { text: 'Serial number matches agreement', result: 'pass' },
        { text: 'Inspection window closed without dispute', result: 'pass' },
      ],
    };
  }

  return {
    approved: false,
    headline: 'Release blocked',
    reason:
      'One required condition has no evidence on record, so the release is blocked and the reason is explicit: the signed delivery confirmation attached at DELIVERY_RECORDED is missing. Funds stay committed and the transaction remains auditable while the counterparties resolve it.',
    conditions: [
      { text: 'Funds committed ($18,400 matches agreement)', result: 'pass' },
      { text: 'Delivery confirmed within 5 business days', result: 'pending' },
      { text: 'Signed delivery note + site photos on record', result: 'fail' },
      { text: 'Serial number matches agreement', result: 'pending' },
      { text: 'Inspection window closed without dispute', result: 'pending' },
    ],
  };
}
