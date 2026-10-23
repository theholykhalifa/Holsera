import type { ComponentType, CSSProperties } from 'react';

/**
 * Themed wrapper for @lucasmarkes/hairline figures (MIT-licensed,
 * bundled — no runtime external requests).
 *
 * The site uses `data-theme="dark" | "light"` on <html>, which the
 * library's theme:"auto" reads directly. We override its stroke colors
 * with site tokens and give each figure its own accent hue so the set
 * doesn't read as one flat color:
 *   blue  — brand bright (#1A6DF4)
 *   green — the "available" status green
 *   amber — the "unconfirmed" status amber
 *   ice   — focus-ring blue
 *
 * `play: true` walks the figure through its motion until a pointer or
 * focus arrives; the library rests figures under prefers-reduced-motion.
 * `plate` must equal the solid surface the figure sits on (the library
 * uses it to mask what is behind strokes).
 */

export type FigureHue = 'blue' | 'green' | 'amber' | 'ice';

const HUES: Record<FigureHue, string> = {
  blue: 'var(--brand-bright)',
  green: 'var(--badge-available-fg)',
  amber: 'var(--badge-unconfirmed-fg)',
  ice: 'var(--focus-ring)',
};

interface FigureComponentProps {
  play?: boolean;
  intensity?: number;
  label?: string;
  style?: CSSProperties;
  className?: string;
}

export default function Figure({
  F,
  hue = 'blue',
  label,
  intensity = 0.55,
  plate = 'var(--bg-soft)',
  className,
}: {
  /** A figure component from @lucasmarkes/hairline/react */
  F: ComponentType<FigureComponentProps>;
  hue?: FigureHue;
  /** Accessible name for the figure (replaces the library default) */
  label: string;
  intensity?: number;
  /** Solid surface color the figure sits on */
  plate?: string;
  className?: string;
}) {
  const style = {
    '--hairline-hi': HUES[hue],
    '--hairline-mid': 'var(--text-3)',
    '--hairline-edge': 'var(--text-3)',
    '--hairline-lo': 'var(--line)',
    '--hairline-plate': plate,
  } as CSSProperties;

  return <F play intensity={intensity} label={label} style={style} className={className} />;
}
