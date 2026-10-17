interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
  id?: string;
}

export default function SectionHeading({ eyebrow, title, lead, center, id }: Props) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id}>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
