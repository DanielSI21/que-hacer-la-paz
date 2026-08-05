import { useLanguage } from "../i18n/useLanguage";

/**
 * Aviso obligatorio para lugares con `dynamicInformation`: horarios, cupos,
 * costos y accesos pueden cambiar.
 */
export function DynamicNotice({ variant = "inline" }: { variant?: "inline" | "banner" }) {
  const { t } = useLanguage();
  const text = variant === "banner" ? t.dynamicNotice.long : t.dynamicNotice.short;

  return (
    <p className={`notice notice--${variant}`}>
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="notice__icon">
        <circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 5.8v5M10 13.6v.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span>
        {variant === "inline" ? (
          <>
            <span className="visually-hidden">{t.dynamicNotice.long}</span>
            <span aria-hidden="true">{text}</span>
          </>
        ) : (
          text
        )}
      </span>
    </p>
  );
}
