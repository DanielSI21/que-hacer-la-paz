import type { TourismPlace } from "../content/types";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { ExternalLink } from "./ExternalLink";
import { ResponsiveImage } from "./ResponsiveImage";

interface Props {
  place: TourismPlace;
  /** El primer card de la seccion puede mostrarse a mayor ancho. */
  featured?: boolean;
}

export function PlaceCard({ place, featured = false }: Props) {
  const { t } = useLanguage();
  const headingId = `${place.slug}-heading`;

  return (
    <article
      className={`card${featured ? " card--featured" : ""}`}
      aria-labelledby={headingId}
    >
      <div className={`card__media card__media--${place.image?.preset ?? "card"}`}>
        {place.image ? (
          <ResponsiveImage
            slug={place.image.slug}
            alt={place.image.alt}
            preset={place.image.preset}
          />
        ) : (
          <p className="card__nophoto">
            <strong>{t.labels.noPhoto}</strong>
            <span>{t.labels.noPhotoDetail}</span>
          </p>
        )}
        <p className="card__category">{t.labels.category[place.category]}</p>
      </div>

      <div className="card__body">
        <ul className="tags" aria-label={place.name}>
          {place.tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="card__title" id={headingId}>
          {place.name}
          {place.region ? <span className="card__region"> · {place.region}</span> : null}
        </h3>

        <p className="card__text">{place.shortDescription}</p>

        {place.estimatedDriveTime ? (
          <p className="card__meta">
            <span className="card__meta-label">{t.labels.driveTime}:</span>{" "}
            {place.estimatedDriveTime}
          </p>
        ) : null}

        {place.image?.disclaimer ? (
          <p className="card__disclaimer">
            <strong>{t.labels.illustrative}:</strong> {place.image.disclaimer}
          </p>
        ) : null}

        <details className="disclosure">
          <summary className="disclosure__summary">
            {t.labels.practical}
            <span className="disclosure__chevron" aria-hidden="true" />
          </summary>
          <div className="disclosure__content">
            {place.fullDescription ? <p>{place.fullDescription}</p> : null}

            {place.highlights.length > 0 ? (
              <>
                <h4 className="disclosure__subtitle">{t.labels.highlights}</h4>
                <ul className="bullets">
                  {place.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {place.practicalNote ? <p className="disclosure__note">{place.practicalNote}</p> : null}
            {place.dynamicInformation ? <DynamicNotice variant="banner" /> : null}

            <p className="disclosure__verified">
              {t.labels.lastVerified} {place.lastVerified}
            </p>
          </div>
        </details>

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
      </div>
    </article>
  );
}
