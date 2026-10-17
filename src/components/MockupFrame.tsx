import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Window bar title — kept generic on purpose. */
  title?: string;
  /** Caption shown under the frame. */
  caption?: string;
  className?: string;
}

/**
 * Browser-style frame used for every interface illustration.
 * ALWAYS renders an "Interface mockup" label — Holsera has no real
 * product screenshots yet, and conceptual UI must never be presented
 * as a live product.
 */
export default function MockupFrame({
  children,
  title = 'Holsera console',
  caption = 'Conceptual interface. Not a live product screenshot.',
  className,
}: Props) {
  return (
    <div className={`mockup${className ? ` ${className}` : ''}`}>
      <div className="mockup__frame">
        <div className="mockup__bar" aria-hidden="true">
          <span className="mockup__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mockup__title">{title}</span>
        </div>
        <div className="mockup__body">{children}</div>
      </div>
      <div className="mockup__caption">
        <span className="mockup-label">Interface mockup</span>
        <p>{caption}</p>
      </div>
    </div>
  );
}
