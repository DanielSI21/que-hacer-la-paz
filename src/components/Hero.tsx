import { getPlace } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";
import { ResponsiveImage } from "./ResponsiveImage";

export function Hero() {
  const { lang, t } = useLanguage();
  const balandra = getPlace(lang, "balandra");
  const alt = balandra?.image?.alt ?? "";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <ResponsiveImage slug="hero-balandra" alt={alt} preset="hero" priority />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero__title" id="hero-title">
          {t.hero.title}
        </h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>

        <div className="hero__actions">
          <a className="button button--primary" href="#playas">
            {t.hero.primaryCta}
          </a>
          <a className="button button--ghost" href="#mapa">
            {t.hero.secondaryCta}
          </a>
          <a className="button button--link" href="#itinerarios">
            {t.hero.tertiaryCta}
          </a>
        </div>
      </div>

      <p className="hero__scroll" aria-hidden="true">
        {t.hero.scrollHint}
      </p>
      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
          <path d="M0 64c180 44 360 56 540 36s360-72 540-72 300 28 360 42v50H0Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
