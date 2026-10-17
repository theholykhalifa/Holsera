import Link from 'next/link';
import Icon from './Icon';

interface Props {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

/** Full-bleed closing band — the site's single brand-gradient moment. */
export default function CtaBand({ title, text, primary, secondary }: Props) {
  return (
    <section className="cta-deep">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="btn-row btn-row--center">
          <Link href={primary.href} className="btn btn--primary">
            {primary.label}
            <Icon name="arrow-right" size={17} />
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn btn--secondary">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
