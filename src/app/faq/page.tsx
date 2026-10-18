import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about Holsera: what it is, whether it is live, who is behind it, and how transactions are designed to work.',
  alternates: { canonical: '/faq/' },
};

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: 'What is Holsera?',
    a: (
      <>
        Holsera is a transaction-trust venture in development. It is being designed to help
        digital businesses manage secure transaction workflows, escrow-style release logic,
        and fraud signals in one place. It is pre-launch: the website describes the intended
        product and its design targets, not a live service.
      </>
    ),
  },
  {
    q: 'Is Holsera live? Can I use it today?',
    a: (
      <>
        No. Holsera is pre-launch and in active development. Anything on this site marked
        “Planned” or “In development” is a design target, not a working feature. Nothing on
        this site processes real transactions.
      </>
    ),
  },
  {
    q: 'Does Holsera process payments or hold customer funds?',
    a: (
      <>
        Not at this stage. There is no live payment processing, no escrow custody, and no
        identity verification operating today. The console views shown on this site are
        labeled mockups because they represent the product being designed.
      </>
    ),
  },
  {
    q: 'Is Holsera a bank or a licensed financial institution?',
    a: (
      <>
        No. Holsera is a technology venture building software. It is not a bank, and it does
        not currently hold any financial-services licenses or registrations. If and when
        licensing becomes required for a capability, that capability will not launch before
        the required approvals are in place — and the position will be stated on the
        <Link href="/security-trust/"> Security &amp; Trust</Link> page.
      </>
    ),
  },
  {
    q: 'Who is behind Holsera?',
    a: (
      <>
        Holsera is founder-led — and currently a team of one. Khalifa is the Founder
        and CEO, and today builds the product alone, by choice and by stage. You can
        read his profile on the <Link href="/founder/">Founder</Link> page. Teammates
        will be announced when they exist; nothing will be implied before then.
      </>
    ),
  },
  {
    q: 'How is a transaction designed to work on Holsera?',
    a: (
      <>
        The intended design is a five-stage lifecycle — verify, intent, state machine,
        secure release, and record. Each stage has defined states and transitions so that
        what happened, what is pending, and what was released are always clear. The full
        explanation is on the <Link href="/how-it-works/">How It Works</Link> page.
      </>
    ),
  },
  {
    q: 'When will Holsera launch?',
    a: (
      <>
        There is no launch date yet, and this site deliberately does not publish one. A date
        will be announced only when it is real and the product behind it is ready to be
        demonstrated honestly.
      </>
    ),
  },
  {
    q: 'Do you have customers, partners, or certifications?',
    a: (
      <>
        Not yet — or at least, none that would be published here without verification.
        Holsera’s position is that no customer logos, partner marks, certification badges,
        or metrics appear on this site until they are real and documented. That is a
        standing editorial rule, not a temporary state.
      </>
    ),
  },
  {
    q: 'How will you handle security?',
    a: (
      <>
        Security is being treated as a design principle rather than a checklist added late:
        least privilege, encryption in transit and at rest, tamper-evident transaction
        records, and explicit security non-claims where verification does not yet exist.
        The current posture is published on the{' '}
        <Link href="/security-trust/">Security &amp; Trust</Link> page.
      </>
    ),
  },
  {
    q: 'How can I contact you?',
    a: (
      <>
        The <Link href="/contact/">Contact</Link> page describes the current channel status.
        Its form is a front-end demonstration only — it does not transmit anything yet. A
        real contact address will be published here when it exists.
      </>
    ),
  },
  {
    q: 'Can I use the Holsera logo or brand assets?',
    a: (
      <>
        Yes, within the published guidelines. Downloadable logos, colors, and boilerplate
        text are available on the <Link href="/press/">Press Kit</Link> page. The one firm
        rule: do not present Holsera as a live service, and do not imply certifications,
        customers, or partnerships that do not exist.
      </>
    ),
  },
];

const faqText: [string, string][] = [
  [
    'What is Holsera?',
    'Holsera is a transaction-trust venture in development, designed to help digital businesses manage secure transaction workflows, escrow-style release logic, and fraud signals in one place. It is pre-launch: the website describes the intended product and its design targets, not a live service.',
  ],
  [
    'Is Holsera live? Can I use it today?',
    'No. Holsera is pre-launch and in active development. Anything marked “Planned” or “In development” is a design target, not a working feature. Nothing on this site processes real transactions.',
  ],
  [
    'Does Holsera process payments or hold customer funds?',
    'Not at this stage. There is no live payment processing, no escrow custody, and no identity verification operating today. Console views shown on the site are labeled mockups because they represent the product being designed.',
  ],
  [
    'Is Holsera a bank or a licensed financial institution?',
    'No. Holsera is a technology venture building software. It is not a bank and does not currently hold financial-services licenses or registrations. If and when licensing becomes required for a capability, that capability will not launch before required approvals are in place.',
  ],
  [
    'Who is behind Holsera?',
    'Holsera is founder-led — and currently a team of one. Khalifa is the Founder and CEO, and today builds the product alone, by choice and by stage. Teammates will be announced when they exist; nothing will be implied before then.',
  ],
  [
    'How is a transaction designed to work on Holsera?',
    'The intended design is a five-stage lifecycle — verify, intent, state machine, secure release, and record. Each stage has defined states and transitions so that what happened, what is pending, and what was released are always clear.',
  ],
  [
    'When will Holsera launch?',
    'There is no launch date yet, and the site deliberately does not publish one. A date will be announced only when it is real and the product behind it is ready to be demonstrated honestly.',
  ],
  [
    'Do you have customers, partners, or certifications?',
    'Not yet — or at least, none that would be published without verification. No customer logos, partner marks, certification badges, or metrics appear on the site until they are real and documented.',
  ],
  [
    'How will you handle security?',
    'Security is being treated as a design principle: least privilege, encryption in transit and at rest, tamper-evident transaction records, and explicit security non-claims where verification does not yet exist.',
  ],
  [
    'How can I contact you?',
    'The Contact page describes the current channel status. Its form is a front-end demonstration only and does not transmit anything yet. A real contact address will be published when it exists.',
  ],
  [
    'Can I use the Holsera logo or brand assets?',
    'Yes, within the published guidelines, available on the Press Kit page. The one firm rule: do not present Holsera as a live service, and do not imply certifications, customers, or partnerships that do not exist.',
  ],
];

const jsonLdFixed = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqText.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={jsonLdFixed} />

      <section className="hero hero--page">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h1>Straight answers, before you ask twice</h1>
          <p className="lead hero__lead">
            The questions a pre-launch company should answer honestly — including the ones
            where the honest answer is “not yet.”
          </p>
        </div>
      </section>

      <section className="band band--tight" aria-label="Frequently asked questions">
        <div className="container container--narrow">
          <Reveal>
            <div className="faq-list">
              {faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="The answer you need is not here?"
        text="If your question is about timelines, capabilities, or fit, the fastest path is a direct question — it will get a direct answer."
        primary={{ href: '/contact/', label: 'Ask a question' }}
        secondary={{ href: '/security-trust/', label: 'Security approach' }}
      />
    </>
  );
}
