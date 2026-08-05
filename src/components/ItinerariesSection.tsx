import { ITINERARIES } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { DynamicNotice } from "./DynamicNotice";
import { Section } from "./Section";

export function ItinerariesSection() {
  const { lang, t } = useLanguage();
  const section = t.sections.itineraries;
  const itineraries = ITINERARIES[lang];

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="sand"
    >
      <ul className="itineraries" role="list">
        {itineraries.map((itinerary) => (
          <li key={itinerary.slug}>
            <article className="itinerary" aria-labelledby={`${itinerary.slug}-title`}>
              <h3 className="itinerary__title" id={`${itinerary.slug}-title`}>
                {itinerary.title}
              </h3>
              <p className="itinerary__summary">{itinerary.summary}</p>

              <ol className="timeline">
                {itinerary.stops.map((stop) => (
                  <li className="timeline__item" key={`${stop.time}-${stop.title}`}>
                    <p className="timeline__time">{stop.time}</p>
                    <div className="timeline__body">
                      <p className="timeline__title">{stop.title}</p>
                      {stop.detail ? <p className="timeline__detail">{stop.detail}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>

              {itinerary.note ? (
                <p className="itinerary__note">
                  <strong>{t.labels.itineraryNote}:</strong> {itinerary.note}
                </p>
              ) : null}

              <DynamicNotice />
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
