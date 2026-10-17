import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Caption shown under the frame. */
  caption?: string;
  className?: string;
}

/**
 * Frame used for every interface illustration. No browser chrome —
 * the concept is stated in the caption row instead. ALWAYS renders an
 * "Interface mockup" label — Holsera has no real product screenshots
 * yet, and conceptual UI must never be presented as a live product.
 */
export default function MockupFrame({
  children,
  caption = 'Conceptual interface. Not a live product screenshot.',
  className,
}: Props) {
  return (
    <div className={`mockup${className ? ` ${className}` : ''}`}>
      <div className="mockup__frame">
        <div className="mockup__body">{children}</div>
      </div>
      <div className="mockup__caption">
        <span className="mockup-label">Interface mockup</span>
        <p>{caption}</p>
      </div>
    </div>
  );
}
