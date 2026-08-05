import { getPlace } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { ExternalLink } from "./ExternalLink";
import { ResponsiveImage } from "./ResponsiveImage";
import { Section } from "./Section";

export function HotelSection() {
  const { lang, t } = useLanguage();
  const hotel = getPlace(lang, "la-concha");
  if (!hotel) return null;

  const section = t.sections.hotel;

  return (
    <Section id={section.id} eyebrow={section.eyebrow} title={section.title} intro={section.intro} tone="sand">
      <div className="hotel">
        <figure className="hotel__figure">
          {hotel.image ? (
            <ResponsiveImage
              slug={hotel.image.slug}
              alt={hotel.image.alt}
              preset={hotel.image.preset}
            />
          ) : null}
          {hotel.image?.disclaimer ? (
            <figcaption className="hotel__caption">{hotel.image.disclaimer}</figcaption>
          ) : null}
        </figure>

        <div className="hotel__body">
          <h3 className="hotel__name">{hotel.name}</h3>
          <p className="hotel__lead">{hotel.shortDescription}</p>
          <p>{hotel.fullDescription}</p>

          <h4 className="hotel__subtitle">{t.labels.highlights}</h4>
          <ul className="chips">
            {hotel.highlights.map((item) => (
              <li className="chip" key={item}>
                {item}
              </li>
            ))}
          </ul>

          {hotel.practicalNote ? (
            <p className="hotel__accessibility">
              <strong>{t.labels.practical}:</strong> {hotel.practicalNote}
            </p>
          ) : null}

          <dl className="details">
            {hotel.address ? (
              <div className="details__row">
                <dt>{t.labels.address}</dt>
                <dd>{hotel.address}</dd>
              </div>
            ) : null}
            {hotel.phone ? (
              <div className="details__row">
                <dt>{t.labels.phone}</dt>
                <dd>
                  <a className="link" href={`tel:${hotel.phone.replace(/\s/g, "")}`}>
                    {hotel.phone}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <ul className="card__links">
            {hotel.officialUrl ? (
              <li>
                <ExternalLink className="link" href={hotel.officialUrl}>
                  {t.labels.official}
                </ExternalLink>
              </li>
            ) : null}
            <li>
              <ExternalLink className="link" href={hotel.mapUrl}>
                {t.labels.openMap}
              </ExternalLink>
            </li>
            {hotel.appleMapsUrl ? (
              <li>
                <ExternalLink className="link" href={hotel.appleMapsUrl}>
                  {t.labels.openAppleMaps}
                </ExternalLink>
              </li>
            ) : null}
          </ul>

          <DynamicNotice variant="banner" />
        </div>
      </div>
    </Section>
  );
}
