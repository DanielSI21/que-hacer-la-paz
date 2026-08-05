import { useEffect } from "react";
import { FAQ, getPlaces } from "../content/content";
import { useLanguage } from "../i18n/useLanguage";

/**
 * Datos estructurados: solo tipos que podemos sostener con la informacion
 * disponible. No se declaran calificaciones, precios ni disponibilidad, ni el
 * tipo Hotel, porque esta pagina no representa oficialmente al establecimiento.
 */
export function StructuredData() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const beaches = getPlaces(lang, "beach");
    const dayTrips = getPlaces(lang, "day-trip");
    const restaurants = getPlaces(lang, "restaurant");
    const activities = getPlaces(lang, "activity");
    const excursions = getPlaces(lang, "excursion");
    const pageUrl = `${window.location.origin}/guia-la-paz`;

    const attraction = (slug: string) => `${pageUrl}#${slug}`;

    const graph = [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "La Paz", item: window.location.origin },
          { "@type": "ListItem", position: 2, name: t.meta.title, item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        name: t.sections.beaches.title,
        itemListElement: [...beaches, ...dayTrips, ...excursions].map((place, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: place.name,
          url: attraction(place.slug),
        })),
      },
      ...[...beaches, ...dayTrips, ...activities, ...excursions].map((place) => ({
        "@type": "TouristAttraction",
        "@id": attraction(place.slug),
        name: place.name,
        description: place.shortDescription,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Baja California Sur",
          addressCountry: "MX",
        },
        ...(place.officialUrl ? { sameAs: [place.officialUrl] } : {}),
      })),
      ...restaurants.map((place) => ({
        "@type": "Restaurant",
        "@id": attraction(place.slug),
        name: place.name,
        description: place.shortDescription,
        ...(place.phone ? { telephone: place.phone } : {}),
        address: {
          "@type": "PostalAddress",
          ...(place.address ? { streetAddress: place.address } : {}),
          addressRegion: "Baja California Sur",
          addressCountry: "MX",
        },
        ...(place.officialUrl ? { sameAs: [place.officialUrl] } : {}),
      })),
      {
        "@type": "FAQPage",
        mainEntity: FAQ[lang].map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
    return () => script.remove();
  }, [lang, t]);

  return null;
}
