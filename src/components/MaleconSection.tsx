import { getPlace } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { ExternalLink } from "./ExternalLink";
import { ResponsiveImage } from "./ResponsiveImage";
import { Section } from "./Section";

export function MaleconSection() {
  const { lang, t } = useLanguage();
  const malecon = getPlace(lang, "malecon");
  if (!malecon) return null;

  const section = t.sections.malecon;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="deep"
    >
      <div className="malecon">
        <figure className="malecon__figure">
          {malecon.image ? (
            <ResponsiveImage
              slug={malecon.image.slug}
              alt={malecon.image.alt}
              preset={malecon.image.preset}
            />
          ) : null}
        </figure>

        <div className="malecon__body">
          <p className="malecon__lead">{malecon.shortDescription}</p>
          <p>{malecon.fullDescription}</p>

          <h3 className="malecon__subtitle">{t.labels.highlights}</h3>
          <ul className="activities" role="list">
            {malecon.highlights.map((item) => (
              <li className="activity" key={item}>
                <span className="activity__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="malecon__subtitle">{t.labels.miniTour}</h3>
          <ol className="minitour">
            {t.labels.miniTourSteps.map((step) => (
              <li className="minitour__step" key={step}>
                {step}
              </li>
            ))}
          </ol>

          <ul className="card__links">
            <li>
              <ExternalLink className="link" href={malecon.mapUrl}>
                {t.labels.openMap}
              </ExternalLink>
            </li>
            {malecon.appleMapsUrl ? (
              <li>
                <ExternalLink className="link" href={malecon.appleMapsUrl}>
                  {t.labels.openAppleMaps}
                </ExternalLink>
              </li>
            ) : null}
            {malecon.officialUrl ? (
              <li>
                <ExternalLink className="link" href={malecon.officialUrl}>
                  {t.labels.official}
                </ExternalLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </Section>
  );
}
