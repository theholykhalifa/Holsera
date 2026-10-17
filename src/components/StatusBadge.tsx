import { statusLabel, type Status } from '@/lib/content';

interface Props {
  status: Status;
  className?: string;
}

/**
 * Renders the development status of a capability.
 * 'planned'      = design target, not built yet
 * 'unconfirmed'  = nobody has confirmed this detail yet
 * 'in-development'/'available' — only used once backed by evidence.
 */
export default function StatusBadge({ status, className }: Props) {
  return (
    <span className={`badge badge--${status}${className ? ` ${className}` : ''}`}>
      {statusLabel[status]}
    </span>
  );
}
