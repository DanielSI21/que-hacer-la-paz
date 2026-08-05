import { createContext } from "react";
import type { Lang, UiStrings } from "../content/types";

export interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UiStrings;
}

export const LanguageContext = createContext<LanguageValue | null>(null);
