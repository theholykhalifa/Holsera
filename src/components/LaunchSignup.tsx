'use client';

import Reveal from './Reveal';
import SubscribeForm from './SubscribeForm';

/**
 * Waitlist form used by the launch band and the early-access page.
 *
 * Submission behaviour lives in SubscribeForm: demo mode while
 * site.mailingList.username is empty (validates locally, transmits nothing,
 * and says so), live Buttondown submission once it is set. Do not wire a
 * different backend without re-reading that component's honesty contract.
 */
export default function LaunchSignup({
  ctaLabel = 'Notify me',
  source,
}: {
  ctaLabel?: string;
  source?: string;
} = {}) {
  return (
    <section className="signup" aria-labelledby="signup-title">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Get notified at launch</span>
          <h2 id="signup-title">Be first through the door</h2>
          <p className="lead">
            Holsera is in active development. Leave your email and we&rsquo;ll tell you
            what ships, what is still planned, and what we learn along the way.
          </p>

          <SubscribeForm
            inputId="launch-signup"
            ctaLabel={ctaLabel}
            source={source}
          />
        </Reveal>
      </div>
    </section>
  );
}
