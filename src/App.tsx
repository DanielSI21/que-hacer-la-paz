import { getPlaces } from "./content/content";
import { useLanguage } from "./i18n/useLanguage";
import { EspirituSantoSection } from "./components/EspirituSantoSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCta } from "./components/FinalCta";
import { Hero } from "./components/Hero";
import { HotelSection } from "./components/HotelSection";
import { ItinerariesSection } from "./components/ItinerariesSection";
import { MaleconSection } from "./components/MaleconSection";
import { MapSection } from "./components/MapSection";
import { PlaceGrid } from "./components/PlaceGrid";
import { RestaurantSection } from "./components/RestaurantSection";
import { Section } from "./components/Section";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StructuredData } from "./components/StructuredData";

export default function App() {
  const { lang, t } = useLanguage();
  const beaches = getPlaces(lang, "beach");
  const dayTrips = getPlaces(lang, "day-trip");

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.skipToContent}
      </a>
      <StructuredData />
      <SiteHeader />

      <main id="contenido">
        <Hero />
        <HotelSection />

        <Section
          id={t.sections.beaches.id}
          eyebrow={t.sections.beaches.eyebrow}
          title={t.sections.beaches.title}
          intro={t.sections.beaches.intro}
          tone="shell"
        >
          <PlaceGrid places={beaches} featureFirst />
        </Section>

        <Section
          id={t.sections.dayTrips.id}
          eyebrow={t.sections.dayTrips.eyebrow}
          title={t.sections.dayTrips.title}
          intro={t.sections.dayTrips.intro}
          tone="sand"
        >
          <PlaceGrid places={dayTrips} />
        </Section>

        <RestaurantSection />
        <MaleconSection />
        <ItinerariesSection />
        <EspirituSantoSection />
        <MapSection />
        <FaqSection />
        <FinalCta />
        
      </main>

      <SiteFooter />

      <a className="floating-map" href="#mapa">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        {t.floatingMapCta}
      </a>
    </>
  );
}
