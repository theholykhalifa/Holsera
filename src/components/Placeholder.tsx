import type { ReactNode } from 'react';

/**
 * Marks an UNCONFIRMED detail (dashed underline, hover tooltip).
 * Editable placeholders live in src/lib/site.config.ts and
 * src/lib/content.ts — never replace one with an unverified claim.
 */
export default function Placeholder({
  children,
  title = 'Placeholder — replace with confirmed details before launch',
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <span className="ph" title={title}>
      {children}
    </span>
  );
}
