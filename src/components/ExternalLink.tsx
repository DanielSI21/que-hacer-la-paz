import type { ReactNode } from "react";
import { useLanguage } from "../i18n/useLanguage";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Todo enlace que sale del sitio se abre en una pestana nueva con
 * rel="noopener noreferrer" y avisa del comportamiento a lectores de pantalla.
 */
export function ExternalLink({ href, children, className }: Props) {
  const { t } = useLanguage();
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="visually-hidden"> ({t.labels.externalLink})</span>
      <svg className="link-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M6 3h7v7M13 3 6.5 9.5M11 10.5V13H3V5h2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
