import { LAST_VERIFIED, SOURCES } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { ExternalLink } from "./ExternalLink";

export function SiteFooter() {
  const { lang, t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="site-footer" id="fuentes">
      {/* <div className="site-footer__inner">
        <section className="site-footer__block" aria-labelledby="footer-sources">
          <h2 className="site-footer__title" id="footer-sources">
            {f.sourcesTitle}
          </h2>
          <p className="site-footer__intro">{f.sourcesIntro}</p>
          <ul className="sources" role="list">
            {SOURCES[lang].map((source) => (
              <li className="source" key={source.url}>
                <ExternalLink className="link link--strong" href={source.url}>
                  {source.label}
                </ExternalLink>
                <span className="source__description">{source.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer__block" aria-labelledby="footer-images">
          <h2 className="site-footer__title" id="footer-images">
            {f.imagesTitle}
          </h2>
          <p className="site-footer__intro">{f.imagesIntro}</p>
          <p className="site-footer__pending">{f.imagesPending}</p>
        </section>

        <section className="site-footer__block" aria-labelledby="footer-disclaimer">
          <h2 className="site-footer__title" id="footer-disclaimer">
            {f.disclaimerTitle}
          </h2>
          <p className="site-footer__disclaimer">{f.disclaimer}</p>
          <p className="site-footer__verified">
            {t.labels.lastVerified} {LAST_VERIFIED}
          </p>
        </section>
      </div> */}

      <div className="site-footer__bar">
        <p>{f.credit}</p>
        <a className="link" href="#top">
          {f.backToTop}
        </a>
      </div>
    </footer>
  );
}
