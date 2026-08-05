import { useLanguage } from "../i18n/useLanguage";
import { ResponsiveImage } from "./ResponsiveImage";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="cta" id="planear" aria-labelledby="cta-title">
      <div className="cta__media" aria-hidden="true">
        <ResponsiveImage slug="malecon-alt" alt="" preset="wide" />
      </div>
      <div className="cta__body">
        <h2 className="cta__title" id="cta-title">
          {t.cta.title}
        </h2>
        <p className="cta__text">{t.cta.body}</p>
        <div className="cta__actions">
          <a className="button button--primary" href="#itinerarios">
            {t.cta.primary}
          </a>
          <a className="button button--ghost" href="#mapa">
            {t.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
