import type { WorkflowStep } from '@/lib/content';
import StatusBadge from './StatusBadge';

interface Props {
  steps: WorkflowStep[];
  variant?: 'vertical' | 'flow';
}

export default function WorkflowStepper({ steps, variant = 'vertical' }: Props) {
  return (
    <ol className={`stepper${variant === 'flow' ? ' stepper--flow' : ''}`}>
      {steps.map((step) => (
        <li className="step" key={step.title}>
          <div className="step__title">
            {step.title}
            <StatusBadge status={step.status} />
          </div>
          <p className="step__body">{step.text}</p>
          <div className="step__meta">
            <span>
              <b>Actor:</b> {step.actor}
            </span>
            <span>
              <b>Record:</b> {step.record}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
