import { VIDEOS } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";

/**
 * Los videos con licencia libre no se empotran: se enlazan a su pagina de
 * origen y al archivo, para no cargar decenas de MB en la visita inicial.
 */
export function VideoSection() {
  const { lang, t } = useLanguage();
  const section = t.sections.videos;

  return (
    <Section
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      tone="deep"
    >
      <ul className="videos" role="list">
        {VIDEOS[lang].map((video) => (
          <li className="video" key={video.slug}>
            <article aria-labelledby={`${video.slug}-title`}>
              <h3 className="video__title" id={`${video.slug}-title`}>
                {video.title}
              </h3>
              <p className="video__text">{video.description}</p>
              <p className="video__meta">
                {video.author} · {t.labels.videoLicense}{" "}
                <ExternalLink className="link" href={video.licenseUrl}>
                  {video.license}
                </ExternalLink>
                {video.durationNote ? ` · ${video.durationNote}` : null}
              </p>
              <ul className="card__links">
                <li>
                  <ExternalLink className="link" href={video.sourceUrl}>
                    {t.labels.watchVideo}
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink className="link" href={video.fileUrl}>
                    WebM
                  </ExternalLink>
                </li>
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
