import { FAQ } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { Section } from "./Section";

export function FaqSection() {
  const { lang, t } = useLanguage();
  const section = t.sections.faq;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="shell"
      headingExtra={<DynamicNotice variant="banner" />}
    >
      <div className="faq">
        {FAQ[lang].map((item) => (
          <details className="disclosure disclosure--faq" key={item.question}>
            <summary className="disclosure__summary">
              {item.question}
              <span className="disclosure__chevron" aria-hidden="true" />
            </summary>
            <div className="disclosure__content">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
