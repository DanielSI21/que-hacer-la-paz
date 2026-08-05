/** Tipos del modelo de contenido. Los componentes solo consumen estos tipos. */

export type Lang = "es" | "en";

export const LANGS: readonly Lang[] = ["es", "en"] as const;

/** Cadena disponible en los dos idiomas de la landing. */
export type Localized<T = string> = Record<Lang, T>;

export type PlaceCategory =
  | "hotel"
  | "beach"
  | "day-trip"
  | "restaurant"
  | "activity"
  | "excursion";

/** Presets de recorte que produce scripts/process-local-images.mjs. */
export type ImagePreset = "hero" | "wide" | "card";

export interface PlaceImage {
  /** Nombre base de los archivos en /public/images. */
  slug: string;
  preset: ImagePreset;
  alt: string;
  /** Nota visible cuando la foto solo es ilustrativa del tema, no del lugar. */
  disclaimer?: string;
}

/** Un punto de interes ya resuelto en un idioma. */
export interface TourismPlace {
  slug: string;
  name: string;
  category: PlaceCategory;
  /** Etiqueta de region o zona, p. ej. "Los Cabos". */
  region?: string;
  shortDescription: string;
  fullDescription?: string;
  highlights: string[];
  practicalNote?: string;
  estimatedDriveTime?: string;
  address?: string;
  phone?: string;
  mapUrl: string;
  directionsUrl?: string;
  /** Enlace universal a Apple Maps (funciona tambien fuera de iOS). */
  appleMapsUrl?: string;
  officialUrl?: string;
  reservationUrl?: string;
  /** Enlaces oficiales adicionales con etiqueta propia. */
  extraLinks?: { label: string; url: string }[];
  image?: PlaceImage;
  tags: string[];
  lastVerified: string;
  /** true cuando horarios, cupos, costos o accesos pueden cambiar. */
  dynamicInformation?: boolean;
}

export interface ItineraryStop {
  time: string;
  title: string;
  detail?: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  summary: string;
  note?: string;
  stops: ItineraryStop[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MapPoint {
  slug: string;
  name: string;
  category: PlaceCategory;
  /** Texto de busqueda usado por el mapa embebido y por los enlaces. */
  query: string;
  mapUrl: string;
  directionsUrl?: string;
  appleMapsUrl?: string;
}

export interface VideoResource {
  slug: string;
  title: string;
  description: string;
  /** Pagina del archivo, con autoria y licencia. */
  sourceUrl: string;
  /** Archivo de video reproducible (WebM). */
  fileUrl: string;
  license: string;
  licenseUrl: string;
  author: string;
  durationNote?: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface ActivityItem {
  title: string;
  text: string;
  /** Aviso propio de la actividad, p. ej. la restriccion estacional de Los Islotes. */
  note?: string;
}

/** Boton de accion; sin `url` se muestra como sugerencia, no como enlace. */
export interface ActionItem {
  label: string;
  url?: string;
}

/** Contenido completo de la seccion dedicada a Isla Espiritu Santo. */
export interface EspirituSantoContent {
  title: string;
  subtitle: string;
  description: string;
  imageAlt: string;
  galleryAlt1: string;
  galleryAlt2: string;
  quickFactsTitle: string;
  quickFacts: QuickFact[];
  activitiesTitle: string;
  activities: ActivityItem[];
  howToGetThereTitle: string;
  howToGetThere: string[];
  actions: ActionItem[];
  receptionHint: string;
  checklistTitle: string;
  checklistIntro: string;
  checklistItems: string[];
  checklistTip: string;
  packingTitle: string;
  packingItems: string[];
  packingAvoid: string;
  responsibleTitle: string;
  responsibleText: string;
  responsibleNote: string;
  dynamicChecklistTitle: string;
  dynamicChecklistIntro: string;
  dynamicChecklistItems: string[];
}

export interface SourceLink {
  label: string;
  url: string;
  description: string;
}

/** Todas las cadenas de interfaz de un idioma. */
export interface UiStrings {
  htmlLang: string;
  meta: { title: string; description: string };
  skipToContent: string;
  languageLabel: string;
  languageName: Record<Lang, string>;
  nav: NavItem[];
  navLabel: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
    scrollHint: string;
  };
  floatingMapCta: string;
  sections: Record<
    | "hotel"
    | "beaches"
    | "dayTrips"
    | "espirituSanto"
    | "restaurants"
    | "malecon"
    | "itineraries"
    | "map"
    | "videos"
    | "faq"
    | "cta",
    { id: string; eyebrow: string; title: string; intro: string }
  >;
  labels: {
    highlights: string;
    practical: string;
    driveTime: string;
    address: string;
    phone: string;
    openMap: string;
    openAppleMaps: string;
    directions: string;
    official: string;
    moreInfo: string;
    lastVerified: string;
    externalLink: string;
    noPhoto: string;
    noPhotoDetail: string;
    illustrative: string;
    miniTour: string;
    miniTourSteps: string[];
    mapPointsLabel: string;
    mapFrameTitle: string;
    mapHint: string;
    watchVideo: string;
    videoLicense: string;
    itineraryNote: string;
    category: Record<PlaceCategory, string>;
  };
  dynamicNotice: { short: string; long: string };
  cta: { title: string; body: string; primary: string; secondary: string };
  footer: {
    sourcesTitle: string;
    sourcesIntro: string;
    imagesTitle: string;
    imagesIntro: string;
    imagesPending: string;
    disclaimerTitle: string;
    disclaimer: string;
    credit: string;
    backToTop: string;
  };
}
