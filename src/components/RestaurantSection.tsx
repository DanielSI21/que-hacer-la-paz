import { getPlaces } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { ExternalLink } from "./ExternalLink";
import { ResponsiveImage } from "./ResponsiveImage";
import { Section } from "./Section";

export function RestaurantSection() {
  const { lang, t } = useLanguage();
  const restaurants = getPlaces(lang, "restaurant");
  const section = t.sections.restaurants;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="shell"
    >
      <ul className="restaurants" role="list">
        {restaurants.map((place) => (
          <li className="restaurant" key={place.slug}>
            <article aria-labelledby={`${place.slug}-name`}>
              {place.image ? (
                <div className="restaurant__media">
                  <ResponsiveImage
                    slug={place.image.slug}
                    alt={place.image.alt}
                    preset={place.image.preset}
                  />
                </div>
              ) : null}

              <h3 className="restaurant__name" id={`${place.slug}-name`}>
                {place.name}
              </h3>

              <ul className="tags tags--compact" aria-label={place.name}>
                {place.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="restaurant__text">{place.shortDescription}</p>
              {place.fullDescription ? (
                <p className="restaurant__detail">{place.fullDescription}</p>
              ) : null}

              <dl className="details details--compact">
                {place.address ? (
                  <div className="details__row">
                    <dt>{t.labels.address}</dt>
                    <dd>{place.address}</dd>
                  </div>
                ) : null}
                {place.phone ? (
                  <div className="details__row">
                    <dt>{t.labels.phone}</dt>
                    <dd>
                      <a className="link" href={`tel:${place.phone.replace(/\s/g, "")}`}>
                        {place.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              {place.practicalNote ? (
                <p className="restaurant__note">{place.practicalNote}</p>
              ) : null}

              <ul className="card__links">
                <li>
                  <ExternalLink className="link" href={place.mapUrl}>
                    {t.labels.openMap}
                  </ExternalLink>
                </li>
                {place.appleMapsUrl ? (
                  <li>
                    <ExternalLink className="link" href={place.appleMapsUrl}>
                      {t.labels.openAppleMaps}
                    </ExternalLink>
                  </li>
                ) : null}
                {place.directionsUrl ? (
                  <li>
                    <ExternalLink className="link" href={place.directionsUrl}>
                      {t.labels.directions}
                    </ExternalLink>
                  </li>
                ) : null}
                {place.officialUrl ? (
                  <li>
                    <ExternalLink className="link" href={place.officialUrl}>
                      {t.labels.official}
                    </ExternalLink>
                  </li>
                ) : null}
                {place.extraLinks?.map((link) => (
                  <li key={link.url}>
                    <ExternalLink className="link" href={link.url}>
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>

              {place.dynamicInformation ? <DynamicNotice /> : null}
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
