'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant = 'up' | 'fade' | 'scale' | 'left' | 'right';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Motion style. Default 'up' (fade + rise). */
  variant?: Variant;
}

/**
 * Restrained scroll reveal, in themed variants:
 *   up    — fade + rise (default)
 *   fade  — pure fade
 *   scale — fade + rise + slight scale + blur-to-sharp (feature visuals)
 *   left / right — horizontal slide (editorial rows)
 *
 * Gated behind html.js (added by an inline head script) so content is
 * fully visible without JavaScript, and disabled entirely by
 * prefers-reduced-motion in CSS.
 */
export default function Reveal({ children, className, delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = variant === 'up' ? '' : ` reveal--${variant}`;

  return (
    <div
      ref={ref}
      className={`reveal${variantClass}${visible ? ' is-visible' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
