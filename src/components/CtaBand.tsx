import Link from 'next/link';
import Icon from './Icon';

interface Props {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export default function CtaBand({ title, text, primary, secondary }: Props) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
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
      </div>
    </section>
  );
}
