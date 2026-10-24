import SubscribeForm from './SubscribeForm';

/**
 * Developer-preview waitlist form.
 * Thin shell around SubscribeForm — demo mode while
 * site.mailingList.username is empty, live Buttondown submission once set.
 */
export default function DevWaitlist() {
  return (
    <div className="dev-waitlist">
      <SubscribeForm
        inputId="dev-waitlist"
        ctaLabel="Request preview access"
        placeholder="you@company.com"
        ariaLabel="Work email address"
        source="dev-preview"
        emptyError="Please enter your work email address."
      />
    </div>
  );
}
