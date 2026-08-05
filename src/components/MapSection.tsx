import { useMemo, useRef, useState } from "react";
import { getMapPoints, mapEmbedUrl } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";

export function MapSection() {
  const { lang, t } = useLanguage();
  const section = t.sections.map;
  const points = useMemo(() => getMapPoints(lang), [lang]);
  const [activeSlug, setActiveSlug] = useState(points[0]?.slug ?? "");
  // El iframe de Google Maps solo se inserta cuando la persona lo pide.
  const [mapLoaded, setMapLoaded] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const active = points.find((point) => point.slug === activeSlug) ?? points[0];

  const select = (slug: string) => {
    setActiveSlug(slug);
    setMapLoaded(true);
  };

  /** Flechas del teclado para recorrer la lista de puntos. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const buttons = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []
    );
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();

    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = current + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = current - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;

    buttons[(next + buttons.length) % buttons.length]?.focus();
  };

  if (!active) return null;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="shell"
    >
      <div className="map">
        <div className="map__list-wrap">
          <h3 className="map__list-title" id="map-points-title">
            {t.labels.mapPointsLabel}
          </h3>
          <p className="map__hint">{t.labels.mapHint}</p>
          <ul
            className="map__list"
            role="list"
            aria-labelledby="map-points-title"
            ref={listRef}
            onKeyDown={onKeyDown}
          >
            {points.map((point) => (
              <li key={point.slug}>
                <button
                  type="button"
                  className={`map__point${point.slug === activeSlug ? " is-active" : ""}`}
                  aria-pressed={point.slug === activeSlug}
                  onClick={() => select(point.slug)}
                >
                  <span className="map__point-category">{t.labels.category[point.category]}</span>
                  <span className="map__point-name">{point.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="map__viewer">
          <div className="map__frame">
            {mapLoaded ? (
              <iframe
                key={`${active.slug}-${lang}`}
                title={`${t.labels.mapFrameTitle} ${active.name}`}
                src={mapEmbedUrl(active.query, lang)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <button type="button" className="map__placeholder" onClick={() => setMapLoaded(true)}>
                <span className="map__placeholder-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                {t.floatingMapCta}
              </button>
            )}
          </div>

          <div className="map__actions" aria-live="polite">
            <p className="map__current">{active.name}</p>
            <ul className="card__links">
              <li>
                <ExternalLink className="link" href={active.mapUrl}>
                  {t.labels.openMap}
                </ExternalLink>
              </li>
              {active.appleMapsUrl ? (
                <li>
                  <ExternalLink className="link" href={active.appleMapsUrl}>
                    {t.labels.openAppleMaps}
                  </ExternalLink>
                </li>
              ) : null}
              {active.directionsUrl ? (
                <li>
                  <ExternalLink className="link" href={active.directionsUrl}>
                    {t.labels.directions}
                  </ExternalLink>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
