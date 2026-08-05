import { ESPIRITU_SANTO } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { ExternalLink } from "./ExternalLink";
import { ResponsiveImage } from "./ResponsiveImage";
import { Section } from "./Section";

export function EspirituSantoSection() {
  const { lang, t } = useLanguage();
  const content = ESPIRITU_SANTO[lang];
  const section = t.sections.espirituSanto;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={content.title}
      intro={content.subtitle}
      tone="deep"
    >
      <div className="espiritu">
        <figure className="espiritu__figure">
          <ResponsiveImage slug="espiritu-santo-main" alt={content.imageAlt} preset="wide" />
        </figure>

        <div className="espiritu__gallery" aria-hidden="true">
          <ResponsiveImage slug="espiritu-santo-1" alt="" preset="card" />
          <ResponsiveImage slug="espiritu-santo-2" alt="" preset="card" />
        </div>
      </div>

      <p className="espiritu__description">{content.description}</p>

      <h3 className="espiritu__subtitle">{content.quickFactsTitle}</h3>
      <dl className="quickfacts">
        {content.quickFacts.map((fact) => (
          <div className="quickfacts__row" key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <h3 className="espiritu__subtitle">{content.activitiesTitle}</h3>
      <ul className="espiritu-activities" role="list">
        {content.activities.map((activity) => (
          <li className="espiritu-activity" key={activity.title}>
            <h4 className="espiritu-activity__title">{activity.title}</h4>
            <p className="espiritu-activity__text">{activity.text}</p>
            {activity.note ? <p className="notice notice--banner">{activity.note}</p> : null}
          </li>
        ))}
      </ul>

      <h3 className="espiritu__subtitle">{content.howToGetThereTitle}</h3>
      {content.howToGetThere.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <ul className="card__links">
        {content.actions.map((action) => (
          <li key={action.label}>
            {action.url ? (
              <ExternalLink className="link" href={action.url}>
                {action.label}
              </ExternalLink>
            ) : (
              action.label
            )}
          </li>
        ))}
      </ul>
      <p className="espiritu__hint">{content.receptionHint}</p>

      <div className="espiritu-columns">
        <div>
          <h3 className="espiritu__subtitle">{content.checklistTitle}</h3>
          <p>{content.checklistIntro}</p>
          <ul className="bullets">
            {content.checklistItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="espiritu__tip">{content.checklistTip}</p>
        </div>

        <div>
          <h3 className="espiritu__subtitle">{content.packingTitle}</h3>
          <ul className="bullets">
            {content.packingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="espiritu__tip">{content.packingAvoid}</p>
        </div>
      </div>

      <div className="espiritu-responsible">
        <h3 className="espiritu__subtitle">{content.responsibleTitle}</h3>
        <p>{content.responsibleText}</p>
        <p className="espiritu__tip">{content.responsibleNote}</p>
      </div>

      <div className="disclosure__note espiritu-dynamic">
        <h3 className="espiritu__subtitle">{content.dynamicChecklistTitle}</h3>
        <p>{content.dynamicChecklistIntro}</p>
        <ul className="bullets">
          {content.dynamicChecklistItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <DynamicNotice variant="banner" />
    </Section>
  );
}
