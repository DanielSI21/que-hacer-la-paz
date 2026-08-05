import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Variante visual de fondo. */
  tone?: "sand" | "shell" | "deep";
  headingExtra?: ReactNode;
}

export function Section({ id, eyebrow, title, intro, children, tone = "shell", headingExtra }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={headingId}>
      <div className="section__inner">
        <header className="section__header">
          <p className="section__eyebrow">{eyebrow}</p>
          <h2 className="section__title" id={headingId}>
            {title}
          </h2>
          {intro ? <p className="section__intro">{intro}</p> : null}
          {headingExtra}
        </header>
        {children}
      </div>
    </section>
  );
}
