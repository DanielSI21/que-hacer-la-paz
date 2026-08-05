import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { LANGS } from "../content/types";

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menu movil con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top">
          <span className="site-header__mark" aria-hidden="true" />
          <span>
            La Paz
            <small>Baja California Sur</small>
          </span>
        </a>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{t.navLabel}</span>
          <span className={`burger${open ? " burger--open" : ""}`} aria-hidden="true" />
        </button>

        <nav
          id="main-nav"
          className={`site-nav${open ? " site-nav--open" : ""}`}
          aria-label={t.navLabel}
        >
          <ul className="site-nav__list">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a className="site-nav__link" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <fieldset className="lang-switch">
            <legend className="visually-hidden">{t.languageLabel}</legend>
            {LANGS.map((option) => (
              <label
                key={option}
                className={`lang-switch__option${lang === option ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="lang"
                  value={option}
                  checked={lang === option}
                  onChange={() => setLang(option)}
                />
                <span aria-hidden="true">{option.toUpperCase()}</span>
                <span className="visually-hidden">{t.languageName[option]}</span>
              </label>
            ))}
          </fieldset>
        </nav>
      </div>
    </header>
  );
}
