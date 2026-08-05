/**
 * Contenido de la landing, separado por completo de los componentes.
 *
 * Reglas aplicadas a este archivo:
 * - No se publican precios, reseñas ni coordenadas.
 * - Los horarios y accesos que pueden cambiar viven bajo `dynamicInformation`
 *   y la interfaz muestra el aviso correspondiente.
 * - Los enlaces de mapa se construyen con búsquedas por nombre, no con
 *   coordenadas inventadas.
 * - Solo se enlazan sitios oficiales verificados el 5 de agosto de 2026.
 */
import type {
  EspirituSantoContent,
  FaqItem,
  ImagePreset,
  Itinerary,
  Lang,
  MapPoint,
  PlaceCategory,
  SourceLink,
  TourismPlace,
  UiStrings,
  VideoResource,
} from "./types";

export const LAST_VERIFIED = "2026-08-05";

/** Origen de todas las rutas: el hotel donde se hospeda el visitante. */
const HOTEL_QUERY =
  "La Concha Beach Resort, Carretera a Pichilingue km 5, La Paz, Baja California Sur";

/** Búsqueda por nombre en Google Maps (sin coordenadas). */
export const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Ruta desde el hotel hasta el destino, también por nombre. */
export const directionsFromHotel = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    HOTEL_QUERY
  )}&destination=${encodeURIComponent(query)}`;

/** Mapa embebido: acepta un texto de búsqueda, no coordenadas. */
export const mapEmbedUrl = (query: string, lang: Lang) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=${lang}&z=12&output=embed`;

/** Enlace universal a Apple Maps; funciona incluso fuera de iOS/macOS. */
export const appleMapsUrl = (query: string) =>
  `https://maps.apple.com/?q=${encodeURIComponent(query)}`;

interface LocalizedPlaceText {
  name: string;
  region?: string;
  shortDescription: string;
  fullDescription?: string;
  highlights: string[];
  practicalNote?: string;
  estimatedDriveTime?: string;
  address?: string;
  tags: string[];
  imageAlt?: string;
  imageDisclaimer?: string;
}

interface PlaceEntry {
  slug: string;
  category: PlaceCategory;
  /** Texto que se envía a Google Maps para buscar y trazar rutas. */
  mapQuery: string;
  withDirections?: boolean;
  officialUrl?: string;
  reservationUrl?: string;
  phone?: string;
  image?: { slug: string; preset: ImagePreset };
  extraLinks?: { url: string; label: Record<Lang, string> }[];
  dynamicInformation?: boolean;
  text: Record<Lang, LocalizedPlaceText>;
}

const PLACES: PlaceEntry[] = [
  /* ------------------------------------------------------------------ hotel */
  {
    slug: "la-concha",
    category: "hotel",
    mapQuery: HOTEL_QUERY,
    officialUrl: "https://www.laconcha.com/",
    phone: "+52 612 121 6161",
    image: { slug: "hotel-la-concha", preset: "wide" },
    dynamicInformation: true,
    text: {
      es: {
        name: "La Concha Beach Hotel & Club",
        shortDescription:
          "Tu base frente al mar, sobre la carretera escénica y a minutos del centro, del Malecón y de las playas del corredor de Pichilingue.",
        fullDescription:
          "La Concha Beach Hotel & Club se encuentra sobre la carretera escénica de La Paz, frente a Playa La Concha. Su ubicación permite descansar junto al mar y, al mismo tiempo, llegar fácilmente al centro, al Malecón y a las playas del corredor de Pichilingue. El hotel informa que cuenta con 96 habitaciones, alberca, restaurante, club de playa y estacionamiento. Está aproximadamente a 10 minutos del centro y a 30 minutos del Aeropuerto Internacional de La Paz.",
        highlights: [
          "Frente al mar",
          "Alberca",
          "Restaurante y beach club",
          "Estacionamiento",
          "Cerca del centro y del corredor de playas",
        ],
        practicalNote:
          "Accesibilidad: el inmueble no cuenta con elevador y se llega a las habitaciones por escaleras. El check-in aparece a las 15:00 y el check-out a las 12:00; confirma estos datos directamente con el hotel.",
        address: "Carretera Escénica / Pichilingue km 5, La Paz, B.C.S., C.P. 23010",
        tags: ["Frente al mar", "Alberca", "Beach club"],
        imageAlt: "Fachada e ingreso de La Concha Beach Hotel & Club, frente al mar en La Paz",
      },
      en: {
        name: "La Concha Beach Hotel & Club",
        shortDescription:
          "Your seafront base on the scenic road, minutes from downtown, the Malecón and the Pichilingue beach corridor.",
        fullDescription:
          "La Concha Beach Hotel & Club sits on the scenic road of La Paz, facing Playa La Concha. Its location lets you rest by the sea while staying close to downtown, the Malecón and the beaches along the Pichilingue corridor. The hotel states that it has 96 rooms, a pool, a restaurant, a beach club and parking. It is roughly 10 minutes from downtown and 30 minutes from La Paz International Airport.",
        highlights: [
          "Beachfront",
          "Swimming pool",
          "Restaurant and beach club",
          "Parking",
          "Close to downtown and the beach corridor",
        ],
        practicalNote:
          "Accessibility: the property has no elevator and rooms are reached by stairs. Check-in is listed at 3:00 pm and check-out at 12:00 pm; confirm these details directly with the hotel.",
        address: "Carretera Escénica / Pichilingue km 5, La Paz, B.C.S., 23010, Mexico",
        tags: ["Beachfront", "Pool", "Beach club"],
        imageAlt: "Facade and entrance of La Concha Beach Hotel & Club, facing the sea in La Paz",
      },
    },
  },

  /* ----------------------------------------------------------------- playas */
  {
    slug: "balandra",
    category: "beach",
    mapQuery: "Playa Balandra, La Paz, Baja California Sur",
    withDirections: true,
    officialUrl: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=9",
    image: { slug: "hero-balandra", preset: "hero" },
    dynamicInformation: true,
    extraLinks: [
      {
        url: "https://descubreanp.conanp.gob.mx/es/conanp/pasaporte-brazalete-conservacion",
        label: {
          es: "Brazalete de conservación (CONANP)",
          en: "Conservation bracelet (CONANP)",
        },
      },
      {
        url: "https://www.golapaz.com/things-to-do/beaches/balandra/",
        label: { es: "Guía turística de La Paz", en: "La Paz tourism guide" },
      },
    ],
    text: {
      es: {
        name: "Playa Balandra",
        shortDescription:
          "El paisaje más emblemático de La Paz: aguas poco profundas, arena clara, manglares y formaciones rocosas.",
        fullDescription:
          "Aguas poco profundas, arena clara, manglares y formaciones rocosas convierten a Balandra en una de las visitas esenciales de Baja California Sur. Camina por la bahía, toma fotografías de El Hongo o sube al mirador para contemplar sus diferentes tonos de azul. Balandra es un Área de Protección de Flora y Fauna con manglares, dunas y ecosistemas sensibles.",
        highlights: [
          "Caminar por el agua",
          "Kayak",
          "Fotografía",
          "Senderismo",
          "Descanso",
        ],
        practicalNote:
          "El acceso se encuentra regulado. Durante 2026 se ha manejado mediante brazalete digital y bloques de visita; las referencias recientes indican dos turnos, de 8:00 a 12:00 y de 13:00 a 17:00, con cupo limitado. Consulta la página de CONANP antes de salir, porque el esquema puede cambiar. Lleva agua, comida, sombrilla y bolsa para residuos, utiliza solamente senderos autorizados, no subas a El Hongo ni camines sobre dunas o vegetación, y llega con anticipación.",
        estimatedDriveTime: "25-35 min desde el hotel",
        tags: ["Naturaleza", "Fotografía", "Acceso regulado"],
        imageAlt:
          "Vista de Playa Balandra con aguas turquesa poco profundas, arena clara y cerros del desierto alrededor de la bahía",
      },
      en: {
        name: "Balandra Beach",
        shortDescription:
          "The most iconic landscape in La Paz: shallow water, pale sand, mangroves and rock formations.",
        fullDescription:
          "Shallow water, pale sand, mangroves and rock formations make Balandra one of the essential stops in Baja California Sur. Walk across the bay, photograph El Hongo or climb to the lookout to take in its shifting shades of blue. Balandra is a Flora and Fauna Protection Area with mangroves, dunes and fragile ecosystems.",
        highlights: [
          "Wading across the bay",
          "Kayaking",
          "Photography",
          "Hiking",
          "Relaxing",
        ],
        practicalNote:
          "Access is regulated. During 2026 it has been managed through a digital bracelet and timed entry blocks; recent references mention two slots, 8:00-12:00 and 13:00-17:00, with limited capacity. Check the CONANP page before heading out, since the scheme can change. Bring water, food, an umbrella and a bag for your trash, stay on authorized trails, do not climb El Hongo or walk on dunes or vegetation, and arrive early.",
        estimatedDriveTime: "25-35 min from the hotel",
        tags: ["Nature", "Photography", "Regulated access"],
        imageAlt:
          "Balandra Beach with shallow turquoise water, pale sand and desert hills around the bay",
      },
    },
  },
  {
    slug: "el-tecolote",
    category: "beach",
    mapQuery: "Playa El Tecolote, La Paz, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/things-to-do/beaches/el-tecolote/",
    image: { slug: "playa-tecolote", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Playa El Tecolote",
        shortDescription:
          "Playa amplia con restaurantes, palapas, renta de equipo y vistas hacia Isla Espíritu Santo.",
        fullDescription:
          "Una excelente opción para pasar varias horas frente al mar. El Tecolote combina una extensa playa con restaurantes, palapas, renta de equipos y vistas hacia Isla Espíritu Santo. En la zona hay restaurantes que ofrecen mesas, sillas y sombrillas, además de kayak, paddleboard, banana, motos acuáticas y algunos recorridos marítimos.",
        highlights: ["Familias", "Comer mariscos", "Pasar el día", "Deportes acuáticos"],
        practicalNote:
          "La señal de teléfono puede ser limitada. Está muy cerca de Balandra, por lo que ambas playas pueden combinarse el mismo día. La disponibilidad de servicios y rentas cambia según la temporada.",
        estimatedDriveTime: "30-40 min desde el hotel",
        tags: ["Familias", "Comida", "Deportes acuáticos"],
        imageAlt:
          "Aguas azules y arena de Playa El Tecolote en La Paz, con el Mar de Cortés al fondo",
      },
      en: {
        name: "El Tecolote Beach",
        shortDescription:
          "A wide beach with restaurants, palapas, gear rentals and views toward Espíritu Santo Island.",
        fullDescription:
          "A great option for spending several hours by the sea. El Tecolote combines a long beach with restaurants, palapas, equipment rentals and views toward Espíritu Santo Island. Restaurants in the area offer tables, chairs and umbrellas, along with kayaks, paddleboards, banana boats, jet skis and some boat tours.",
        highlights: ["Families", "Seafood", "A full day out", "Water sports"],
        practicalNote:
          "Phone signal can be limited. It is very close to Balandra, so both beaches can be combined in one day. Services and rentals vary by season.",
        estimatedDriveTime: "30-40 min from the hotel",
        tags: ["Families", "Food", "Water sports"],
        imageAlt:
          "Blue water and sand at El Tecolote Beach in La Paz, with the Sea of Cortez behind",
      },
    },
  },
  {
    slug: "el-saltito",
    category: "beach",
    mapQuery: "Playa El Saltito, La Paz, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/things-to-do/beaches/el-saltito/",
    image: { slug: "playa-saltito", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Playa El Saltito",
        shortDescription:
          "Más aislada y tranquila que las playas principales, con aguas turquesa y ambiente natural.",
        fullDescription:
          "Más aislada y tranquila que las playas principales, El Saltito destaca por sus aguas turquesa y su ambiente natural. Es una buena alternativa para viajeros que prefieren espacios menos concurridos. La guía municipal la ubica a aproximadamente 32 km y 38 minutos de La Paz. El acceso público fue recuperado y señalizado nuevamente durante 2025.",
        highlights: ["Tranquilidad", "Fotografía", "Picnic", "Naturaleza"],
        practicalNote:
          "Es una playa con menos infraestructura y parte del acceso puede incluir caminos sin pavimentar. Revisa las condiciones recientes del camino antes de salir y lleva todo lo necesario, incluida agua.",
        estimatedDriveTime: "40-50 min desde el hotel",
        tags: ["Tranquilidad", "Naturaleza", "Camino variable"],
        imageAlt: "Aguas turquesa y arena de Playa El Saltito, en un entorno natural poco intervenido",
      },
      en: {
        name: "El Saltito Beach",
        shortDescription:
          "More remote and quiet than the main beaches, with turquoise water and a natural setting.",
        fullDescription:
          "More remote and quieter than the main beaches, El Saltito stands out for its turquoise water and natural setting. It is a good alternative for travelers who prefer less crowded places. The municipal guide places it roughly 32 km and 38 minutes from La Paz. Public access was restored and signposted again during 2025.",
        highlights: ["Quiet", "Photography", "Picnic", "Nature"],
        practicalNote:
          "This beach has less infrastructure and part of the access may include unpaved roads. Check recent road conditions before leaving and bring everything you need, including water.",
        estimatedDriveTime: "40-50 min from the hotel",
        tags: ["Quiet", "Nature", "Variable road"],
        imageAlt: "Turquoise water and sand at El Saltito Beach, in a largely undeveloped setting",
      },
    },
  },
  {
    slug: "la-ventana",
    category: "beach",
    mapQuery: "La Ventana, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/things-to-do/beaches/",
    image: { slug: "playa-la-ventana", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "La Ventana",
        shortDescription:
          "Aventura frente al Mar de Cortés: kitesurf, windsurf y una comunidad costera relajada.",
        fullDescription:
          "Famosa por el kitesurf y el windsurf, La Ventana combina una comunidad costera relajada con escuelas, renta de equipo y paisajes dominados por Isla Cerralvo. Está a unos 47 km de La Paz.",
        highlights: ["Kitesurf", "Windsurf", "Paddleboard", "Ambiente aventurero"],
        practicalNote:
          "La temporada más conocida para viento y kitesurf suele ser de noviembre a abril. Durante el verano el agua tiende a ser más tranquila y es más apropiada para actividades como paddleboard o descanso. Confirma la disponibilidad de escuelas y renta de equipo antes de ir.",
        estimatedDriveTime: "50-65 min desde el hotel",
        tags: ["Kitesurf", "Viento", "Aventura"],
        imageAlt: "Costa de La Ventana con vista hacia Isla Cerralvo, en Baja California Sur",
      },
      en: {
        name: "La Ventana",
        shortDescription:
          "Adventure on the Sea of Cortez: kitesurfing, windsurfing and a laid-back coastal community.",
        fullDescription:
          "Known for kitesurfing and windsurfing, La Ventana pairs a relaxed coastal community with schools, gear rentals and landscapes dominated by Cerralvo Island. It sits about 47 km from La Paz.",
        highlights: ["Kitesurfing", "Windsurfing", "Paddleboarding", "Adventure vibe"],
        practicalNote:
          "The best-known wind and kitesurf season usually runs from November to April. In summer the water tends to be calmer and better suited to paddleboarding or simply relaxing. Confirm school and rental availability before you go.",
        estimatedDriveTime: "50-65 min from the hotel",
        tags: ["Kitesurf", "Wind", "Adventure"],
        imageAlt: "La Ventana coastline looking toward Cerralvo Island, Baja California Sur",
      },
    },
  },

  /* --------------------------------------------------------------- Espíritu Santo */
  {
    slug: "isla-espiritu-santo",
    category: "excursion",
    mapQuery: "Isla Espíritu Santo, Baja California Sur",
    officialUrl: "https://www.golapaz.com/places-to-visit/espiritu-santo-island/",
    image: { slug: "espiritu-santo-main", preset: "wide" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Isla Espíritu Santo",
        shortDescription:
          "Navega entre acantilados volcánicos, playas de arena blanca y aguas cristalinas en una de las áreas naturales más espectaculares del Mar de Cortés.",
        highlights: [
          "Snorkel",
          "Fotografía",
          "Naturaleza y playas",
          "Kayak o paddleboard, según el tour",
        ],
        tags: ["Área protegida", "Solo en barco", "Snorkel"],
        imageAlt: "Costa rocosa e islotes del archipiélago de Espíritu Santo vistos desde el mar",
      },
      en: {
        name: "Espíritu Santo Island",
        shortDescription:
          "Sail past volcanic cliffs, white-sand beaches and crystal-clear water in one of the most spectacular natural areas of the Sea of Cortez.",
        highlights: [
          "Snorkeling",
          "Photography",
          "Nature and beaches",
          "Kayak or paddleboard, depending on the tour",
        ],
        tags: ["Protected area", "Boat only", "Snorkeling"],
        imageAlt: "Rocky coastline and islets of the Espíritu Santo archipelago seen from the water",
      },
    },
  },

  /* -------------------------------------------------------------- escapadas */
  {
    slug: "cabo-san-lucas",
    category: "day-trip",
    mapQuery: "Marina Cabo San Lucas, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.visitloscabos.travel/things-to-do/beaches/lovers-beach/",
    image: { slug: "arco-los-cabos", preset: "wide" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Cabo San Lucas",
        region: "Los Cabos",
        shortDescription:
          "Navega hasta el Fin de la Tierra y conoce El Arco, la formación rocosa más reconocida de Los Cabos.",
        fullDescription:
          "Recorre la marina y toma una embarcación hacia El Arco, la formación rocosa más reconocida de Los Cabos. El paseo puede incluir vistas de la colonia de lobos marinos, Pelican Rock y una parada en Playa del Amor. El Arco se encuentra donde se aproximan el Pacífico y el Mar de Cortés.",
        highlights: [
          "Paseo en lancha o barco con fondo de cristal",
          "Visitar El Arco",
          "Bajar en Playa del Amor cuando las condiciones lo permitan",
          "Recorrer la Marina de Cabo San Lucas",
          "Comer antes de regresar a La Paz",
        ],
        practicalNote:
          "Playa del Amor se visita mediante barco, taxi acuático o kayak. La cercana Playa del Divorcio está expuesta al oleaje del Pacífico y no se recomienda para nadar. La operación de los paseos depende de las condiciones del mar.",
        estimatedDriveTime: "Alrededor de 2-2.5 horas por trayecto",
        tags: ["Excursión", "Mar", "Ícono"],
        imageAlt:
          "El Arco de Cabo San Lucas, formación rocosa sobre el mar, visto desde una embarcación",
      },
      en: {
        name: "Cabo San Lucas",
        region: "Los Cabos",
        shortDescription:
          "Sail to Land's End and see El Arco, the best-known rock formation in Los Cabos.",
        fullDescription:
          "Walk the marina and take a boat out to El Arco, the most recognizable rock formation in Los Cabos. The trip may include views of the sea lion colony, Pelican Rock and a stop at Lover's Beach. El Arco stands where the Pacific and the Sea of Cortez meet.",
        highlights: [
          "Boat or glass-bottom boat ride",
          "See El Arco",
          "Stop at Lover's Beach when conditions allow",
          "Walk the Cabo San Lucas Marina",
          "Eat before heading back to La Paz",
        ],
        practicalNote:
          "Lover's Beach is reached by boat, water taxi or kayak. Nearby Divorce Beach is exposed to Pacific swell and is not recommended for swimming. Boat trips depend on sea conditions.",
        estimatedDriveTime: "About 2-2.5 hours each way",
        tags: ["Day trip", "Sea", "Landmark"],
        imageAlt:
          "El Arco of Cabo San Lucas, a rock arch rising from the sea, seen from a boat",
      },
    },
  },
  {
    slug: "todos-santos",
    category: "day-trip",
    mapQuery: "Centro Histórico de Todos Santos, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/places-to-visit/todos-santos/",
    image: { slug: "todos-santos", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Todos Santos",
        region: "Pueblo Mágico",
        shortDescription:
          "Arte, historia y sabores del desierto en un centro histórico que se recorre a pie.",
        fullDescription:
          "Recorre a pie su centro histórico, visita galerías, tiendas de artesanías y cafeterías, y descubre la mezcla de arquitectura tradicional y cultura contemporánea que distingue a este Pueblo Mágico. El centro concentra galerías, tiendas, espacios culturales y restaurantes, y la gastronomía local combina productos regionales, pesca fresca y propuestas de cocina internacional.",
        highlights: [
          "Caminar por el centro histórico",
          "Visitar galerías y talleres",
          "Conocer la misión y la plaza",
          "Comprar artesanías",
          "Tomar café o pan artesanal",
        ],
        practicalNote:
          "Desde La Paz el trayecto es de aproximadamente 81 km y poco más de una hora, aunque desde el hotel puede tomar algo más. Los horarios de galerías y comercios varían.",
        estimatedDriveTime: "Poco más de 1 hora desde La Paz",
        tags: ["Cultura", "Arte", "Comida"],
        imageAlt:
          "Fachada tradicional de ladrillo en una calle del centro histórico de Todos Santos",
      },
      en: {
        name: "Todos Santos",
        region: "Pueblo Mágico",
        shortDescription:
          "Art, history and desert flavors in a historic center best explored on foot.",
        fullDescription:
          "Walk the historic center, visit galleries, craft shops and cafes, and discover the mix of traditional architecture and contemporary culture that defines this Pueblo Mágico. The center concentrates galleries, shops, cultural venues and restaurants, and local cooking combines regional produce, fresh fish and international influences.",
        highlights: [
          "Walk the historic center",
          "Visit galleries and workshops",
          "See the mission and the plaza",
          "Buy local crafts",
          "Stop for coffee or fresh bread",
        ],
        practicalNote:
          "From La Paz the drive is roughly 81 km and a little over an hour, though it can take longer from the hotel. Gallery and shop hours vary.",
        estimatedDriveTime: "A little over 1 hour from La Paz",
        tags: ["Culture", "Art", "Food"],
        imageAlt:
          "Traditional brick facade on a street in the historic center of Todos Santos",
      },
    },
  },
  {
    slug: "cerritos",
    category: "day-trip",
    mapQuery: "Playa Los Cerritos, El Pescadero, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/things-to-do/beaches/cerritos/",
    image: { slug: "playa-cerritos", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Playa Cerritos",
        region: "Pacífico",
        shortDescription:
          "Surf, arena y atardeceres del Pacífico, a poca distancia de Todos Santos.",
        fullDescription:
          "Una playa de ambiente relajado conocida por sus olas, escuelas de surf y amplias vistas al océano. Es una excelente extensión de una visita a Todos Santos. Cerritos es conocida como destino de surf para diferentes niveles y también puede disfrutarse para descansar o contemplar el atardecer.",
        highlights: [
          "Clases de surf",
          "Atardecer sobre el Pacífico",
          "Caminar por la playa",
          "Comer frente al mar",
        ],
        practicalNote:
          "Las condiciones del oleaje cambian, por lo que debe seguirse la señalización y las recomendaciones locales antes de entrar al agua.",
        estimatedDriveTime: "Se combina con Todos Santos",
        tags: ["Surf", "Atardecer", "Pacífico"],
        imageAlt:
          "Playa Cerritos con olas del Pacífico rompiendo sobre la arena y acantilados al fondo",
      },
      en: {
        name: "Cerritos Beach",
        region: "Pacific",
        shortDescription:
          "Surf, sand and Pacific sunsets, a short drive from Todos Santos.",
        fullDescription:
          "A laid-back beach known for its waves, surf schools and wide ocean views. It is an excellent extension of a Todos Santos visit. Cerritos is a surf destination for different levels and also works simply for resting or watching the sunset.",
        highlights: [
          "Surf lessons",
          "Sunset over the Pacific",
          "Beach walks",
          "Eating by the sea",
        ],
        practicalNote:
          "Surf conditions change, so follow posted signage and local advice before entering the water.",
        estimatedDriveTime: "Combine it with Todos Santos",
        tags: ["Surf", "Sunset", "Pacific"],
        imageAlt:
          "Cerritos Beach with Pacific waves breaking on the sand and cliffs in the background",
      },
    },
  },

  /* ----------------------------------------------------------- restaurantes */
  {
    slug: "la-garita",
    category: "restaurant",
    mapQuery: "La Garita, km 29 carretera La Paz - Todos Santos, Baja California Sur",
    officialUrl: "https://www.golapaz.com/things-to-do/restaurants/",
    image: { slug: "la-garita", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "La Garita",
        shortDescription:
          "Una parada clásica en carretera: comida regional, empanadas grandes, burritos de machaca y café de talega.",
        fullDescription:
          "Comida regional, empanadas grandes, burritos de machaca, café de talega y un ambiente tradicional sudcaliforniano. Está en el km 29 de la carretera La Paz-Todos Santos, una buena parada para desayunar o almorzar antes de llegar a Todos Santos o seguir hacia Cabo San Lucas por la carretera 19.",
        highlights: ["Cocina regional", "Parada de carretera", "Desayuno"],
        practicalNote: "Verifica horarios antes de salir; pueden cambiar sin aviso.",
        address: "Km 29, carretera La Paz-Todos Santos",
        tags: ["Regional", "Carretera", "Desayuno"],
        imageAlt: "Fachada de La Garita, parada de carretera en el km 29 rumbo a Todos Santos",
      },
      en: {
        name: "La Garita",
        shortDescription:
          "A classic roadside stop: regional cooking, large empanadas, machaca burritos and cloth-filtered coffee.",
        fullDescription:
          "Regional food, large empanadas, machaca burritos, café de talega and a traditional Baja Sur atmosphere. It sits at km 29 of the La Paz-Todos Santos highway, a good stop for breakfast or lunch before reaching Todos Santos or continuing to Cabo San Lucas on Highway 19.",
        highlights: ["Regional cooking", "Roadside stop", "Breakfast"],
        practicalNote: "Check opening hours before you leave; they can change without notice.",
        address: "Km 29, La Paz-Todos Santos highway",
        tags: ["Regional", "Roadside", "Breakfast"],
        imageAlt: "Facade of La Garita, a roadside stop at km 29 on the way to Todos Santos",
      },
    },
  },
  {
    slug: "azotea",
    category: "restaurant",
    mapQuery: "Azotea, Belisario Domínguez 387, La Paz, Baja California Sur",
    phone: "+52 612 221 9125",
    image: { slug: "azotea", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Azotea",
        shortDescription:
          "Atardecer, coctelería y una vista elevada de La Paz desde un rooftop en el centro.",
        fullDescription:
          "Una opción para una comida especial o una noche de cócteles en el centro. Azotea es un rooftop de ambiente casual elegante, con cocina internacional, mediterránea y Baja Med. Se anuncia como un espacio exclusivo para adultos.",
        highlights: ["Rooftop", "Coctelería", "Atardecer", "Solo adultos"],
        practicalNote:
          "El horario y la disponibilidad de reservación deben comprobarse antes de la visita. Reservaciones por teléfono.",
        address: "Belisario Domínguez 387, esquina con Miguel Hidalgo",
        tags: ["Atardecer", "Cócteles", "Centro"],
        imageAlt: "Vista desde el rooftop de Azotea, en el centro de La Paz",
      },
      en: {
        name: "Azotea",
        shortDescription:
          "Sunset, cocktails and an elevated view of La Paz from a rooftop downtown.",
        fullDescription:
          "An option for a special meal or a night of cocktails downtown. Azotea is a smart-casual rooftop with international, Mediterranean and Baja Med cooking. It is advertised as an adults-only venue.",
        highlights: ["Rooftop", "Cocktails", "Sunset", "Adults only"],
        practicalNote:
          "Opening hours and reservation availability should be checked before visiting. Reservations by phone.",
        address: "Belisario Domínguez 387, corner of Miguel Hidalgo",
        tags: ["Sunset", "Cocktails", "Downtown"],
        imageAlt: "View from the Azotea rooftop, in downtown La Paz",
      },
    },
  },
  {
    slug: "agricole",
    category: "restaurant",
    mapQuery: "Agricole, El Pescadero, Baja California Sur",
    withDirections: true,
    officialUrl: "https://agricole.mx/",
    image: { slug: "agricole", preset: "card" },
    dynamicInformation: true,
    text: {
      es: {
        name: "Agricole",
        shortDescription:
          "Tienda de campo, panadería, café y cocina farm-to-table en El Pescadero, rodeada de agricultura local.",
        fullDescription:
          "Proyecto enfocado en agricultura sostenible, provisiones orgánicas y experiencias de vida lenta en El Pescadero. Su Tienda de Campo ofrece productos frescos, panadería y café, mientras que Cocina de Campo presenta una propuesta del campo a la mesa en un ambiente al aire libre.",
        highlights: ["Farm to table", "Productos orgánicos", "Panadería", "Café"],
        practicalNote:
          "La tienda y el restaurante manejan horarios distintos. Consulta el sitio oficial y reserva Cocina de Campo antes de la visita.",
        address: "Carretera 19, El Pescadero, Baja California Sur",
        tags: ["Farm to table", "Orgánico", "El Pescadero"],
        imageAlt: "Espacio campestre de Agricole en El Pescadero, Baja California Sur",
      },
      en: {
        name: "Agricole",
        shortDescription:
          "A farm shop, bakery, café and farm-to-table kitchen in El Pescadero, surrounded by local agriculture.",
        fullDescription:
          "A project centered on sustainable farming, organic provisions and slow-living experiences in El Pescadero. Its Tienda de Campo offers fresh produce, baked goods and coffee, while Cocina de Campo serves a farm-to-table menu in an open-air setting.",
        highlights: ["Farm to table", "Organic products", "Bakery", "Coffee"],
        practicalNote:
          "The shop and restaurant follow different schedules. Check the official site and book Cocina de Campo before visiting.",
        address: "Highway 19, El Pescadero, Baja California Sur",
        tags: ["Farm to table", "Organic", "El Pescadero"],
        imageAlt: "Agricole's countryside setting in El Pescadero, Baja California Sur",
      },
    },
  },
  {
    slug: "taco-fish",
    category: "restaurant",
    mapQuery: "Taco Fish La Paz, Baja California Sur",
    officialUrl: "https://www.golapaz.com/things-to-do/restaurants/",
    dynamicInformation: true,
    text: {
      es: {
        name: "Taco Fish La Paz",
        shortDescription:
          "Tacos de pescado al estilo Baja, empanadas de marlín, ceviche y barra de salsas.",
        fullDescription:
          "Una opción casual para probar tacos de pescado y camarón, empanadas de marlín, ceviche y una barra de salsas y complementos. La ficha turística municipal lo describe como un establecimiento informal con terraza, sin reservaciones y especializado en pescados y mariscos.",
        highlights: ["Tacos de pescado", "Ceviche", "Informal", "Sin reservaciones"],
        practicalNote:
          "La información publicada señala servicio de martes a domingo durante desayuno y comida, pero debe confirmarse.",
        tags: ["Tacos", "Mariscos", "Casual"],
      },
      en: {
        name: "Taco Fish La Paz",
        shortDescription:
          "Baja-style fish tacos, marlin empanadas, ceviche and a salsa bar.",
        fullDescription:
          "A casual spot for fish and shrimp tacos, marlin empanadas, ceviche and a bar of salsas and toppings. The municipal tourism listing describes it as an informal place with a terrace, no reservations, specializing in fish and seafood.",
        highlights: ["Fish tacos", "Ceviche", "Casual", "No reservations"],
        practicalNote:
          "Published information indicates service Tuesday to Sunday for breakfast and lunch, but this should be confirmed.",
        tags: ["Tacos", "Seafood", "Casual"],
      },
    },
  },
  {
    slug: "bismarkcito",
    category: "restaurant",
    mapQuery: "Bismarkcito, Paseo Álvaro Obregón, La Paz, Baja California Sur",
    phone: "+52 612 128 9900",
    dynamicInformation: true,
    text: {
      es: {
        name: "Bismarkcito",
        shortDescription:
          "Mariscos frente al Malecón: tacos de pescado, ceviches, camarones y especialidades con langosta.",
        fullDescription:
          "Un restaurante tradicional para probar tacos de pescado, ceviches, pescado, camarones y especialidades con langosta mientras contemplas la bahía. Se ubica en Paseo Álvaro Obregón, entre Constitución e Hidalgo.",
        highlights: ["Frente al Malecón", "Mariscos", "Vista a la bahía"],
        practicalNote:
          "Las referencias actuales indican servicio de desayuno, comida y cena, con mesas frente al Malecón. Confirma horarios antes de ir.",
        address: "Paseo Álvaro Obregón, entre Constitución e Hidalgo",
        tags: ["Mariscos", "Malecón", "Tradicional"],
      },
      en: {
        name: "Bismarkcito",
        shortDescription:
          "Seafood facing the Malecón: fish tacos, ceviches, shrimp and lobster specialties.",
        fullDescription:
          "A traditional restaurant for fish tacos, ceviches, whole fish, shrimp and lobster dishes while you look out over the bay. It sits on Paseo Álvaro Obregón, between Constitución and Hidalgo.",
        highlights: ["On the Malecón", "Seafood", "Bay views"],
        practicalNote:
          "Current references indicate breakfast, lunch and dinner service with tables facing the Malecón. Confirm hours before going.",
        address: "Paseo Álvaro Obregón, between Constitución and Hidalgo",
        tags: ["Seafood", "Malecón", "Traditional"],
      },
    },
  },
  {
    slug: "jazamango",
    category: "restaurant",
    mapQuery: "Jazamango, Todos Santos, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.jazamango.mx/",
    dynamicInformation: true,
    text: {
      es: {
        name: "Jazamango",
        shortDescription:
          "Restaurante campestre farm-to-table en Todos Santos, con huerto, panadería y cocina del chef Javier Plascencia.",
        fullDescription:
          "Restaurante campestre de concepto farm-to-table, con huerto, panadería y cocina del chef Javier Plascencia. Es la recomendación natural para comer durante una escapada a Todos Santos.",
        highlights: ["Farm to table", "Huerto propio", "Panadería", "Cocina de autor"],
        practicalNote:
          "Su información oficial indica horario de miércoles a lunes, de 13:00 a 21:00; verifícalo en el sitio del restaurante antes de reservar.",
        tags: ["Farm to table", "Todos Santos", "Autor"],
      },
      en: {
        name: "Jazamango",
        shortDescription:
          "A countryside farm-to-table restaurant in Todos Santos, with a garden, bakery and cooking by chef Javier Plascencia.",
        fullDescription:
          "A countryside farm-to-table restaurant with its own garden, a bakery and cooking by chef Javier Plascencia. It is the natural lunch recommendation for a Todos Santos day trip.",
        highlights: ["Farm to table", "On-site garden", "Bakery", "Chef-driven"],
        practicalNote:
          "Its official information lists hours Wednesday to Monday, 1:00 pm to 9:00 pm; verify on the restaurant site before booking.",
        tags: ["Farm to table", "Todos Santos", "Chef-driven"],
      },
    },
  },
  {
    slug: "barracuda-cantina",
    category: "restaurant",
    mapQuery: "Barracuda Cantina, Playa Los Cerritos, El Pescadero, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.barracudacantina.com/",
    dynamicInformation: true,
    extraLinks: [
      {
        url: "https://www.golapaz.com/listing/barracuda-cantina/253/",
        label: { es: "Ficha turística", en: "Tourism listing" },
      },
    ],
    text: {
      es: {
        name: "Barracuda Cantina",
        shortDescription:
          "Tacos de pescado, ceviche, coctelería y ambiente de playa en Cerritos.",
        fullDescription:
          "Negocio familiar al aire libre ubicado en Playa Cerritos. Su sitio oficial destaca tacos de pescado local, ceviche y coctelería; también fue presentado en Las crónicas del taco.",
        highlights: ["Tacos de pescado", "Ceviche", "Coctelería", "Al aire libre"],
        practicalNote:
          "Consulta disponibilidad y horarios en su sitio oficial antes de visitarlo.",
        tags: ["Tacos", "Playa", "Cerritos"],
      },
      en: {
        name: "Barracuda Cantina",
        shortDescription:
          "Fish tacos, ceviche, cocktails and a beach atmosphere at Cerritos.",
        fullDescription:
          "A family-run open-air spot at Cerritos Beach. Its official site highlights local fish tacos, ceviche and cocktails; it was also featured on Taco Chronicles.",
        highlights: ["Fish tacos", "Ceviche", "Cocktails", "Open air"],
        practicalNote:
          "Check availability and opening hours on their official site before visiting.",
        tags: ["Tacos", "Beach", "Cerritos"],
      },
    },
  },
  {
    slug: "docecuarenta-todos-santos",
    category: "restaurant",
    mapQuery:
      "DoceCuarenta Todos Santos, Carretera 19 La Paz-Los Cabos km 51, La Cañada del Diablo, Todos Santos, Baja California Sur",
    phone: "+52 612 138 1713",
    withDirections: true,
    officialUrl: "https://docecuarenta.com/suc-todossantos/",
    image: { slug: "docecuarenta-todos-santos", preset: "card" },
    dynamicInformation: true,
    extraLinks: [
      {
        url: "https://docecuarenta.com/menu-todos_santos/",
        label: { es: "Ver menú", en: "View menu" },
      },
    ],
    text: {
      es: {
        name: "DoceCuarenta Todos Santos",
        shortDescription:
          "Café de especialidad, panadería y cocina casual en un amplio espacio rodeado de palmeras y árboles frutales.",
        fullDescription:
          "La sucursal insignia de DoceCuarenta se encuentra en La Cañada del Diablo, al norte de Todos Santos. Cuenta con una amplia zona al aire libre, una nave industrial con barra de café, área de tostado, coworking, productos de la marca y un gran mural. Es una buena parada para desayunar, tomar café o descansar durante el recorrido entre La Paz, Todos Santos y Cabo San Lucas.",
        highlights: [
          "Café de especialidad",
          "Tostador de café",
          "Panadería",
          "Coworking",
          "Terraza",
        ],
        practicalNote:
          "El sitio oficial publica horarios distintos entre semana y fines de semana. Consulta el horario y el menú vigentes antes de visitarlo.",
        address:
          "Carretera 19 La Paz-Los Cabos km 51, La Cañada del Diablo, Todos Santos",
        tags: ["Café", "Desayuno", "Panadería", "Todos Santos"],
        imageAlt:
          "Terraza y barra de café de DoceCuarenta en Todos Santos, Baja California Sur",
      },
      en: {
        name: "DoceCuarenta Todos Santos",
        shortDescription:
          "Specialty coffee, baked goods and casual food in a spacious setting surrounded by palms and fruit trees.",
        fullDescription:
          "DoceCuarenta's flagship location sits in La Cañada del Diablo, on the north side of Todos Santos. It has a large outdoor seating area and an industrial-style building containing its coffee bar, roasting area, coworking space, branded products and a large mural. It is a convenient stop for breakfast, coffee or a break while traveling between La Paz, Todos Santos and Cabo San Lucas.",
        highlights: [
          "Specialty coffee",
          "Coffee roastery",
          "Bakery",
          "Coworking",
          "Terrace",
        ],
        practicalNote:
          "The official site lists different weekday and weekend hours. Check current opening hours and the menu before visiting.",
        address:
          "Highway 19 La Paz-Los Cabos km 51, La Cañada del Diablo, Todos Santos",
        tags: ["Coffee", "Breakfast", "Bakery", "Todos Santos"],
        imageAlt:
          "Terrace and coffee bar at DoceCuarenta in Todos Santos, Baja California Sur",
      },
    },
  },
  {
    slug: "docecuarenta-la-paz",
    category: "restaurant",
    mapQuery:
      "DoceCuarenta Centro, Francisco I. Madero 1240, Zona Central, La Paz, Baja California Sur",
    phone: "+52 612 178 0067",
    officialUrl: "https://docecuarenta.com/suc-lapaz_centro/",
    image: { slug: "docecuarenta-la-paz", preset: "card" },
    dynamicInformation: true,
    extraLinks: [
      {
        url: "https://docecuarenta.com/menu-centro/",
        label: { es: "Ver menú", en: "View menu" },
      },
    ],
    text: {
      es: {
        name: "DoceCuarenta La Paz",
        shortDescription:
          "Una cafetería emblemática del centro de La Paz, conocida por su café de especialidad, panadería y ambiente relajado.",
        fullDescription:
          "La sucursal Centro es el lugar donde comenzó DoceCuarenta en 2014, originalmente como una pequeña barra de espresso. Está instalada en una propiedad histórica del centro de La Paz y ofrece café de especialidad, cold brew, panadería, desayunos y alimentos casuales. Es una buena opción para comenzar el día, trabajar un rato o hacer una pausa mientras recorres el centro.",
        highlights: [
          "Café de especialidad",
          "Panadería",
          "Desayuno",
          "Cold brew",
          "Centro histórico",
        ],
        practicalNote:
          "La carta, los precios y los horarios pueden cambiar. Consulta el menú y el horario oficial antes de la visita.",
        address: "Francisco I. Madero 1240, Zona Central, La Paz",
        tags: ["Café", "Panadería", "Desayuno", "Centro"],
        imageAlt:
          "Barra y patio de DoceCuarenta Centro en La Paz, Baja California Sur",
      },
      en: {
        name: "DoceCuarenta La Paz",
        shortDescription:
          "An iconic downtown La Paz café known for specialty coffee, baked goods and a relaxed atmosphere.",
        fullDescription:
          "The downtown branch is where DoceCuarenta began in 2014, originally as a small espresso bar. It occupies a historic property in central La Paz and serves specialty coffee, cold brew, baked goods, breakfast and casual food. It is a good place to start the day, work for a while or take a break while exploring downtown.",
        highlights: [
          "Specialty coffee",
          "Bakery",
          "Breakfast",
          "Cold brew",
          "Historic downtown",
        ],
        practicalNote:
          "The menu, prices and opening hours may change. Check the official menu and current hours before visiting.",
        address: "Francisco I. Madero 1240, Zona Central, La Paz",
        tags: ["Coffee", "Bakery", "Breakfast", "Downtown"],
        imageAlt:
          "Coffee bar and courtyard at DoceCuarenta Centro in La Paz, Baja California Sur",
      },
    },
  },
  
  /* -------------------------------------------------------------- actividad */
  {
    slug: "malecon",
    category: "activity",
    mapQuery: "Malecón de La Paz, Paseo Álvaro Obregón, La Paz, Baja California Sur",
    withDirections: true,
    officialUrl: "https://www.golapaz.com/things-to-do/attractions-tours/la-paz-malecon/",
    image: { slug: "malecon", preset: "hero" },
    text: {
      es: {
        name: "Malecón de La Paz",
        shortDescription:
          "Camina junto a la bahía, recorre las esculturas y contempla cómo cambia el cielo sobre el Mar de Cortés.",
        fullDescription:
          "El Malecón está en Paseo Álvaro Obregón y es uno de los principales espacios públicos de la ciudad. El Kiosco suele albergar actividades culturales, muestras gastronómicas y artesanías, mientras que el Muelle Fiscal y las letras monumentales son puntos especialmente fotogénicos.",
        highlights: [
          "Caminar al atardecer",
          "Patinar o andar en bicicleta",
          "Fotografiar las esculturas y las letras de La Paz",
          "Visitar el Kiosco y el Muelle Fiscal",
          "Comprar artesanías cuando haya vendedores o eventos",
          "Comer una nieve",
          "Cenar en Bismarkcito o subir a Azotea",
          "Sentarse frente a la bahía",
        ],
        tags: ["Atardecer", "Caminar", "Centro"],
        imageAlt:
          "Personas caminando al atardecer por el Malecón de La Paz junto a la bahía",
      },
      en: {
        name: "La Paz Malecón",
        shortDescription:
          "Walk along the bay, take in the sculptures and watch the sky change over the Sea of Cortez.",
        fullDescription:
          "The Malecón runs along Paseo Álvaro Obregón and is one of the city's main public spaces. The Kiosco often hosts cultural events, food showcases and crafts, while the Muelle Fiscal pier and the monumental letters are especially photogenic spots.",
        highlights: [
          "Walk at sunset",
          "Skate or cycle",
          "Photograph the sculptures and the La Paz letters",
          "Visit the Kiosco and the Muelle Fiscal",
          "Buy crafts when vendors or events are out",
          "Get an ice cream",
          "Have dinner at Bismarkcito or drinks at Azotea",
          "Sit and watch the bay",
        ],
        tags: ["Sunset", "Walking", "Downtown"],
        imageAlt: "People walking along the La Paz Malecón by the bay at sunset",
      },
    },
  },
];

/** Resuelve los lugares de una categoría en el idioma pedido. */
export function getPlaces(lang: Lang, category?: PlaceCategory): TourismPlace[] {
  return PLACES.filter((entry) => !category || entry.category === category).map((entry) => {
    const t = entry.text[lang];
    return {
      slug: entry.slug,
      name: t.name,
      category: entry.category,
      region: t.region,
      shortDescription: t.shortDescription,
      fullDescription: t.fullDescription,
      highlights: t.highlights,
      practicalNote: t.practicalNote,
      estimatedDriveTime: t.estimatedDriveTime,
      address: t.address,
      phone: entry.phone,
      mapUrl: mapSearchUrl(entry.mapQuery),
      directionsUrl: entry.withDirections ? directionsFromHotel(entry.mapQuery) : undefined,
      appleMapsUrl: appleMapsUrl(entry.mapQuery),
      officialUrl: entry.officialUrl,
      reservationUrl: entry.reservationUrl,
      extraLinks: entry.extraLinks?.map((link) => ({ url: link.url, label: link.label[lang] })),
      image: entry.image
        ? {
            slug: entry.image.slug,
            preset: entry.image.preset,
            alt: t.imageAlt ?? "",
            disclaimer: t.imageDisclaimer,
          }
        : undefined,
      tags: t.tags,
      lastVerified: LAST_VERIFIED,
      dynamicInformation: entry.dynamicInformation,
    };
  });
}

/** Un único lugar por slug. */
export function getPlace(lang: Lang, slug: string): TourismPlace | undefined {
  return getPlaces(lang).find((place) => place.slug === slug);
}

/** Puntos del mapa interactivo, en el orden en que se recorren. */
export function getMapPoints(lang: Lang): MapPoint[] {
  return PLACES.map((entry) => ({
    slug: entry.slug,
    name: entry.text[lang].name,
    category: entry.category,
    query: entry.mapQuery,
    mapUrl: mapSearchUrl(entry.mapQuery),
    directionsUrl: entry.withDirections ? directionsFromHotel(entry.mapQuery) : undefined,
    appleMapsUrl: appleMapsUrl(entry.mapQuery),
  }));
}

/* ------------------------------------------------------ Isla Espíritu Santo */
/**
 * Contenido extenso de la excursión a Isla Espíritu Santo. No se publican
 * precios ni horarios fijos, no se promete avistamiento de fauna y el aviso
 * de temporada de Los Islotes se muestra siempre, no solo en el FAQ.
 */
export const ESPIRITU_SANTO: Record<Lang, EspirituSantoContent> = {
  es: {
    title: "Isla Espíritu Santo: naturaleza en estado puro",
    subtitle:
      "Navega entre acantilados volcánicos, playas de arena blanca y aguas cristalinas dentro de una de las áreas naturales más espectaculares del Mar de Cortés.",
    description:
      "Frente a la costa de La Paz se encuentra el Archipiélago de Espíritu Santo, un paraíso natural formado por islas, islotes, bahías y playas prácticamente vírgenes. Durante el recorrido podrás navegar entre formaciones rocosas, practicar snorkel, observar aves y fauna marina y descansar en alguna de sus playas de aguas transparentes. El archipiélago forma parte del sitio natural Islas y Áreas Protegidas del Golfo de California, reconocido como Patrimonio Mundial por la UNESCO, y su visita está regulada para proteger sus ecosistemas.",
    imageAlt: "Vista panorámica de las costas rocosas de Isla Espíritu Santo desde el mar",
    galleryAlt1: "Formaciones rocosas y aguas turquesa en Isla Espíritu Santo",
    galleryAlt2: "Bahía tranquila del archipiélago de Espíritu Santo",
    quickFactsTitle: "Información rápida",
    quickFacts: [
      { label: "Tipo de experiencia", value: "Excursión marítima y ecoturismo" },
      { label: "Acceso", value: "Únicamente en embarcación" },
      { label: "Distancia", value: "Aproximadamente 25–30 km desde La Paz" },
      { label: "Duración", value: "Conviene reservar un día completo" },
      { label: "Ideal para", value: "Snorkel, fotografía, naturaleza y playas" },
      { label: "Nivel de actividad", value: "Moderado; depende del tour" },
      { label: "Protección ambiental", value: "Área Natural Protegida" },
      { label: "Permiso", value: "Requerido; normalmente lo gestiona el operador" },
      { label: "Reserva previa", value: "Altamente recomendable" },
      { label: "Precio", value: "Varía según el operador y el paquete" },
    ],
    activitiesTitle: "Qué hacer",
    activities: [
      {
        title: "Navegar alrededor del archipiélago",
        text: "Contempla los contrastes entre el desierto, los acantilados volcánicos y las aguas turquesa del Mar de Cortés.",
      },
      {
        title: "Snorkel",
        text: "Explora zonas rocosas y aguas transparentes donde existe la posibilidad de observar peces y otras especies marinas. La zona alberga una gran diversidad de aves, peces, reptiles y mamíferos marinos, aunque ningún encuentro está garantizado.",
      },
      {
        title: "Observar lobos marinos en Los Islotes",
        text: "Los Islotes albergan una importante colonia reproductiva de lobos marinos de California. Dependiendo de la temporada y de las reglas vigentes, es posible observarlos desde la embarcación o realizar actividades acuáticas autorizadas. El nado, snorkel y buceo alrededor de la colonia se restringen estacionalmente para proteger la reproducción y crianza de los lobos marinos; CONANP aplica habitualmente esta restricción del 1 de junio al 31 de agosto, periodo en el que pueden observarse desde la embarcación respetando las indicaciones oficiales.",
        note: "Aviso de temporada: las actividades con lobos marinos están sujetas a restricciones ambientales. Consulta las indicaciones de CONANP y confirma con tu operador antes de reservar.",
      },
      {
        title: "Visitar una playa",
        text: "Muchos recorridos incluyen una parada en alguna bahía o playa para descansar, nadar o comer. El sitio exacto depende de las condiciones del mar, la autorización del operador y la capacidad de cada zona. El archipiélago cuenta con numerosas playas destinadas a actividades recreativas y, en determinadas áreas, campismo regulado.",
      },
      {
        title: "Kayak o paddleboard",
        text: "Disponible en algunos recorridos, para explorar bahías tranquilas y acercarse al paisaje de una manera respetuosa.",
      },
      {
        title: "Fotografía y observación de aves",
        text: "Pelícanos, fragatas, gaviotas y otras aves marinas habitan o utilizan las islas como zonas de descanso y anidación. CONANP registra más de 50 especies de aves acuáticas y al menos 15 especies de mamíferos marinos en el archipiélago.",
      },
    ],
    howToGetThereTitle: "Cómo llegar",
    howToGetThere: [
      "Isla Espíritu Santo no tiene acceso por carretera. Para visitarla es necesario contratar una excursión marítima desde La Paz con un prestador autorizado. El punto de salida puede variar entre el Malecón, marinas privadas u otros muelles, por lo que es importante confirmar dónde abordar al realizar la reservación.",
      "La página municipal de turismo mantiene un directorio de empresas que ofrecen servicios marítimos hacia Espíritu Santo, pero conviene verificar directamente sus permisos, inclusiones y condiciones antes de recomendar una en particular.",
    ],
    actions: [
      { label: "Consultar tours", url: "https://www.golapaz.com/things-to-do/attractions-tours/" },
      { label: "Ver ubicación", url: mapSearchUrl("Isla Espíritu Santo, Baja California Sur") },
      {
        label: "Conocer reglas de conservación",
        url: "https://conanp.gob.mx/conanp/dominios/islasgc/BCS/cies.htm",
      },
    ],
    receptionHint: "¿No sabes por dónde empezar? Pregunta en la recepción del hotel.",
    checklistTitle: "Qué debe incluir el tour",
    checklistIntro: "Usa esta lista para comparar opciones antes de reservar:",
    checklistItems: [
      "Transportación marítima.",
      "Capitán y guía.",
      "Permiso o brazalete de conservación.",
      "Chaleco salvavidas.",
      "Equipo de snorkel.",
      "Comida, agua y refrigerios.",
      "Sombrilla o equipo para la parada en playa.",
      "Seguro y protocolos de seguridad.",
      "Fotografías, kayak o paddleboard, cuando se ofrezcan.",
      "Transportación desde el hotel, cuando esté incluida.",
    ],
    checklistTip:
      "Antes de reservar, confirma qué incluye el precio, el punto de salida, la duración aproximada, la política de cancelación y si el permiso de acceso está incluido.",
    packingTitle: "Qué llevar",
    packingItems: [
      "Traje de baño y toalla.",
      "Sombrero y lentes con sujetador.",
      "Camisa o rashguard de manga larga.",
      "Botella reutilizable.",
      "Protector solar y protección física contra el sol.",
      "Sandalias o calzado que pueda mojarse.",
      "Cambio de ropa.",
      "Medicamento para mareo, cuando haya sido indicado por un profesional.",
      "Bolsa impermeable para teléfono y objetos personales.",
      "Cámara acuática.",
    ],
    packingAvoid:
      "Evita llevar bocinas, desechables o alimentos con demasiado empaque.",
    responsibleTitle: "Ayúdanos a proteger Espíritu Santo",
    responsibleText:
      "No alimentes, persigas ni toques a los animales. Mantén la distancia indicada por el guía, permanece en las zonas autorizadas, no extraigas conchas, piedras o plantas y regresa todos tus residuos a La Paz.",
    responsibleNote:
      "Las actividades permitidas están orientadas al turismo de bajo impacto y deben ajustarse al programa de manejo del área protegida.",
    dynamicChecklistTitle: "Antes de reservar, verifica",
    dynamicChecklistIntro:
      "La disponibilidad y las condiciones de esta excursión cambian con frecuencia. Confirma directamente con tu operador:",
    dynamicChecklistItems: [
      "Estado del puerto y condiciones del mar.",
      "Restricciones en Los Islotes.",
      "Permisos y brazaletes vigentes.",
      "Punto y hora de salida.",
      "Límites de edad.",
      "Accesibilidad para abordar.",
      "Disponibilidad de chalecos infantiles.",
      "Comida incluida y restricciones alimentarias.",
      "Política por mal clima.",
      "Equipo de snorkel y traje de neopreno.",
      "Idioma del guía.",
    ],
  },
  en: {
    title: "Espíritu Santo Island: nature in its purest form",
    subtitle:
      "Sail past volcanic cliffs, white-sand beaches and crystal-clear water in one of the most spectacular natural areas of the Sea of Cortez.",
    description:
      "Off the coast of La Paz lies the Espíritu Santo Archipelago, a natural paradise of islands, islets, bays and largely untouched beaches. Along the way you can sail past rock formations, snorkel, watch birds and marine life, and rest on one of its clear-water beaches. The archipelago is part of the Islands and Protected Areas of the Gulf of California, a UNESCO World Heritage site, and access is regulated to protect its ecosystems.",
    imageAlt: "Panoramic view of the rocky coastline of Espíritu Santo Island from the water",
    galleryAlt1: "Rock formations and turquoise water at Espíritu Santo Island",
    galleryAlt2: "A calm bay in the Espíritu Santo archipelago",
    quickFactsTitle: "Quick facts",
    quickFacts: [
      { label: "Type of experience", value: "Boat excursion and ecotourism" },
      { label: "Access", value: "Boat only" },
      { label: "Distance", value: "About 25–30 km from La Paz" },
      { label: "Duration", value: "Best to plan a full day" },
      { label: "Great for", value: "Snorkeling, photography, nature and beaches" },
      { label: "Activity level", value: "Moderate; depends on the tour" },
      { label: "Environmental protection", value: "Protected Natural Area" },
      { label: "Permit", value: "Required; usually arranged by the operator" },
      { label: "Advance booking", value: "Highly recommended" },
      { label: "Price", value: "Varies by operator and package" },
    ],
    activitiesTitle: "What to do",
    activities: [
      {
        title: "Sail around the archipelago",
        text: "Take in the contrasts between the desert, the volcanic cliffs and the turquoise water of the Sea of Cortez.",
      },
      {
        title: "Snorkeling",
        text: "Explore rocky areas and clear water where there is a possibility of seeing fish and other marine species. The area is home to a wide diversity of birds, fish, reptiles and marine mammals, though no sighting is guaranteed.",
      },
      {
        title: "Watching sea lions at Los Islotes",
        text: "Los Islotes hosts an important breeding colony of California sea lions. Depending on the season and current rules, they may be observed from the boat or through authorized water activities. Swimming, snorkeling and diving around the colony are seasonally restricted to protect sea lion breeding and pupping; CONANP typically applies this restriction from June 1 to August 31, during which they can be observed from the boat while following official guidance.",
        note: "Seasonal notice: activities with sea lions are subject to environmental restrictions. Check CONANP's guidance and confirm with your operator before booking.",
      },
      {
        title: "Visit a beach",
        text: "Many trips include a stop at a bay or beach to rest, swim or eat. The exact spot depends on sea conditions, the operator's authorization and each area's capacity. The archipelago has numerous beaches designated for recreational use and, in certain areas, regulated camping.",
      },
      {
        title: "Kayaking or paddleboarding",
        text: "Available on some trips, to explore calm bays and approach the landscape respectfully.",
      },
      {
        title: "Photography and birdwatching",
        text: "Pelicans, frigatebirds, gulls and other seabirds live on or use the islands as resting and nesting grounds. CONANP records more than 50 waterbird species and at least 15 marine mammal species in the archipelago.",
      },
    ],
    howToGetThereTitle: "Getting there",
    howToGetThere: [
      "Espíritu Santo Island has no road access. Visiting it requires booking a boat excursion from La Paz with an authorized operator. The departure point can vary between the Malecón, private marinas or other docks, so it's important to confirm where to board when booking.",
      "The municipal tourism site keeps a directory of companies offering boat services to Espíritu Santo, but it's worth checking their permits, inclusions and conditions directly before recommending one in particular.",
    ],
    actions: [
      { label: "See tours", url: "https://www.golapaz.com/things-to-do/attractions-tours/" },
      { label: "View location", url: mapSearchUrl("Isla Espíritu Santo, Baja California Sur") },
      {
        label: "Read conservation rules",
        url: "https://conanp.gob.mx/conanp/dominios/islasgc/BCS/cies.htm",
      },
    ],
    receptionHint: "Not sure where to start? Ask at the hotel front desk.",
    checklistTitle: "What the tour should include",
    checklistIntro: "Use this list to compare options before booking:",
    checklistItems: [
      "Boat transportation.",
      "Captain and guide.",
      "Conservation permit or bracelet.",
      "Life jacket.",
      "Snorkel gear.",
      "Food, water and snacks.",
      "Umbrella or gear for the beach stop.",
      "Insurance and safety protocols.",
      "Photos, kayak or paddleboard, when offered.",
      "Hotel transportation, when included.",
    ],
    checklistTip:
      "Before booking, confirm what the price includes, the departure point, the approximate duration, the cancellation policy and whether the access permit is included.",
    packingTitle: "What to bring",
    packingItems: [
      "Swimsuit and towel.",
      "Hat and sunglasses with a strap.",
      "Long-sleeve shirt or rashguard.",
      "Reusable water bottle.",
      "Sunscreen and physical sun protection.",
      "Sandals or footwear that can get wet.",
      "A change of clothes.",
      "Motion-sickness medication, if recommended by a professional.",
      "Waterproof bag for your phone and personal items.",
      "Waterproof camera.",
    ],
    packingAvoid: "Avoid bringing speakers, disposables or heavily packaged food.",
    responsibleTitle: "Help us protect Espíritu Santo",
    responsibleText:
      "Do not feed, chase or touch the animals. Keep the distance indicated by your guide, stay in authorized areas, do not remove shells, rocks or plants, and take all your trash back to La Paz.",
    responsibleNote:
      "Permitted activities are oriented toward low-impact tourism and must follow the protected area's management program.",
    dynamicChecklistTitle: "Before you book, verify",
    dynamicChecklistIntro:
      "Availability and conditions for this excursion change often. Confirm directly with your operator:",
    dynamicChecklistItems: [
      "Port status and sea conditions.",
      "Restrictions at Los Islotes.",
      "Current permits and bracelets.",
      "Departure point and time.",
      "Age limits.",
      "Boarding accessibility.",
      "Availability of children's life jackets.",
      "Included food and dietary restrictions.",
      "Bad-weather policy.",
      "Snorkel gear and wetsuits.",
      "Guide's language.",
    ],
  },
};

/* ------------------------------------------------------------------ videos */
/**
 * Videos con licencia libre alojados en Wikimedia Commons. Se enlazan en lugar
 * de empotrarse para no penalizar la carga inicial; la página de origen incluye
 * la autoría y la licencia completas.
 */
export const VIDEOS: Record<Lang, VideoResource[]> = {
  es: [
    {
      slug: "manglar-el-conchalito",
      title: "Sobrevuelo con dron en el manglar El Conchalito",
      description:
        "Vuelo sobre el manglar El Conchalito, en La Paz, útil para mostrar los ecosistemas costeros de la bahía.",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm",
      fileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4c/Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm/Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm.480p.vp9.webm",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      author: "ProtoplasmaKid",
      durationNote: "Versión 480p, aprox. 40 MB",
    },
    {
      slug: "cabo-san-lucas-noche",
      title: "Recorrido nocturno por Cabo San Lucas (time-lapse)",
      description:
        "Time-lapse de un recorrido en auto por Cabo San Lucas de noche, para acompañar la sección de escapadas.",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:A_quick_drive_through_Cabo_San_Lucas_at_night._Timelapse.webm",
      fileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/A_quick_drive_through_Cabo_San_Lucas_at_night._Timelapse.webm",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
      author: "Kissmykumbaya",
      durationNote: "4K, aprox. 7 MB",
    },
  ],
  en: [
    {
      slug: "manglar-el-conchalito",
      title: "Drone flight over the El Conchalito mangrove",
      description:
        "A flight over the El Conchalito mangrove in La Paz, useful for showing the bay's coastal ecosystems.",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm",
      fileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4c/Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm/Sobrevuelo_con_dron_en_el_manglar_El_Conchalito.webm.480p.vp9.webm",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      author: "ProtoplasmaKid",
      durationNote: "480p version, about 40 MB",
    },
    {
      slug: "cabo-san-lucas-noche",
      title: "Night drive through Cabo San Lucas (time-lapse)",
      description:
        "A time-lapse drive through Cabo San Lucas at night, to accompany the day-trip section.",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:A_quick_drive_through_Cabo_San_Lucas_at_night._Timelapse.webm",
      fileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/A_quick_drive_through_Cabo_San_Lucas_at_night._Timelapse.webm",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      author: "Kissmykumbaya",
      durationNote: "4K, about 7 MB",
    },
  ],
};

/* ------------------------------------------------------------- itinerarios */
export const ITINERARIES: Record<Lang, Itinerary[]> = {
  es: [
    {
      slug: "dia-de-playas",
      title: "Día de playas",
      summary: "Balandra y El Tecolote por la mañana, atardecer en el Malecón.",
      note: "La hora de Balandra debe adaptarse al turno de acceso que confirmes con CONANP.",
      stops: [
        { time: "08:00", title: "Balandra", detail: "Sujeto al turno de acceso vigente." },
        { time: "12:30", title: "Comer y descansar en El Tecolote" },
        { time: "16:00", title: "Regresar al hotel" },
        { time: "18:00", title: "Atardecer en el Malecón" },
        { time: "20:00", title: "Cena en Bismarkcito o Azotea" },
      ],
    },
    {
      slug: "todos-santos-cerritos",
      title: "Todos Santos y Cerritos",
      summary:
        "Desayuno en carretera, centro histórico, comida de autor y surf al atardecer.",
      note: "Los tiempos son orientativos y dependen del tráfico y de los horarios de cada negocio.",
      stops: [
        { time: "08:30", title: "Desayuno en La Garita" },
        { time: "10:30", title: "Centro histórico de Todos Santos" },
        {
          time: "13:30",
          title: "Comida en Jazamango",
          detail: "Verifica horario y reservación.",
        },
        { time: "16:00", title: "Playa Cerritos" },
        { time: "18:00", title: "Tacos o bebidas en Barracuda y atardecer" },
        { time: "19:30", title: "Regreso a La Paz" },
      ],
    },
    {
      slug: "cabo-san-lucas",
      title: "Cabo San Lucas",
      summary: "Desayuno en carretera, marina, El Arco y Playa del Amor.",
      note: "Las horas son estimadas y no deben tomarse como garantía: dependen del tráfico, la ruta y las condiciones del mar.",
      stops: [
        { time: "06:30", title: "Salida desde el hotel" },
        { time: "07:30", title: "Desayuno en La Garita" },
        { time: "09:00", title: "Llegada a la Marina" },
        {
          time: "10:00",
          title: "Paseo al Arco y Playa del Amor",
          detail: "Sujeto a condiciones del mar.",
        },
        { time: "13:00", title: "Comida en Cabo San Lucas" },
        { time: "17:00", title: "Regreso" },
        { time: "19:00-20:00", title: "Llegada aproximada a La Paz" },
      ],
    },
  ],
  en: [
    {
      slug: "dia-de-playas",
      title: "Beach day",
      summary: "Balandra and El Tecolote in the morning, sunset on the Malecón.",
      note: "The Balandra time must match the access slot you confirm with CONANP.",
      stops: [
        { time: "08:00", title: "Balandra", detail: "Subject to the current access slot." },
        { time: "12:30", title: "Lunch and rest at El Tecolote" },
        { time: "16:00", title: "Back to the hotel" },
        { time: "18:00", title: "Sunset on the Malecón" },
        { time: "20:00", title: "Dinner at Bismarkcito or Azotea" },
      ],
    },
    {
      slug: "todos-santos-cerritos",
      title: "Todos Santos and Cerritos",
      summary: "Roadside breakfast, historic center, chef-driven lunch and sunset surf.",
      note: "Times are indicative and depend on traffic and each venue's hours.",
      stops: [
        { time: "08:30", title: "Breakfast at La Garita" },
        { time: "10:30", title: "Todos Santos historic center" },
        {
          time: "13:30",
          title: "Lunch at Jazamango",
          detail: "Check hours and book ahead.",
        },
        { time: "16:00", title: "Cerritos Beach" },
        { time: "18:00", title: "Tacos or drinks at Barracuda, then sunset" },
        { time: "19:30", title: "Drive back to La Paz" },
      ],
    },
    {
      slug: "cabo-san-lucas",
      title: "Cabo San Lucas",
      summary: "Roadside breakfast, marina, El Arco and Lover's Beach.",
      note: "Times are estimates, not guarantees: they depend on traffic, route and sea conditions.",
      stops: [
        { time: "06:30", title: "Leave the hotel" },
        { time: "07:30", title: "Breakfast at La Garita" },
        { time: "09:00", title: "Arrive at the Marina" },
        {
          time: "10:00",
          title: "Boat trip to El Arco and Lover's Beach",
          detail: "Subject to sea conditions.",
        },
        { time: "15:00", title: "Lunch in Cabo San Lucas" },
        { time: "17:00", title: "Head back" },
        { time: "19:00-20:00", title: "Approximate arrival in La Paz" },
      ],
    },
  ],
};

/* --------------------------------------------------------------------- FAQ */
export const FAQ: Record<Lang, FaqItem[]> = {
  es: [
    {
      question: "¿Necesito algo para entrar a Playa Balandra?",
      answer:
        "El acceso está regulado por tratarse de un Área de Protección de Flora y Fauna. Durante 2026 se ha manejado mediante brazalete digital y bloques de visita con cupo limitado. Consulta la página de CONANP antes de salir del hotel, porque el esquema puede cambiar.",
    },
    {
      question: "¿Puedo visitar Balandra y El Tecolote el mismo día?",
      answer:
        "Sí. Las dos playas están muy cerca entre sí, por lo que es común combinarlas: Balandra por la mañana y El Tecolote para comer y pasar la tarde.",
    },
    {
      question: "¿Qué llevo a la playa?",
      answer:
        "Agua, comida, sombrilla o sombra y una bolsa para tus residuos. En Balandra debes utilizar solamente senderos autorizados y no subir a El Hongo ni caminar sobre dunas o vegetación. En El Tecolote la señal de teléfono puede ser limitada.",
    },
    {
      question: "¿El hotel tiene elevador?",
      answer:
        "El inmueble no cuenta con elevador y se llega a las habitaciones por escaleras. Si necesitas una habitación accesible, confírmalo directamente con el hotel antes de reservar.",
    },
    {
      question: "¿Cuánto se hace de La Paz a Cabo San Lucas?",
      answer:
        "Alrededor de 2 a 2.5 horas por trayecto, sujeto a tráfico y ruta. Por eso conviene salir temprano y no comprometerse con horarios exactos de regreso.",
    },
    {
      question: "¿Cuándo hay viento en La Ventana?",
      answer:
        "La temporada más conocida para viento y kitesurf suele ir de noviembre a abril. En verano el agua tiende a estar más tranquila, lo que favorece el paddleboard o simplemente descansar.",
    },
    {
      question: "¿Puedo llegar a El Saltito en cualquier auto?",
      answer:
        "No lo damos por hecho. Es una playa con menos infraestructura y parte del acceso puede incluir caminos sin pavimentar. Revisa las condiciones recientes del camino antes de salir.",
    },
    {
      question: "¿Los horarios y costos de esta guía son definitivos?",
      answer:
        "No. Los horarios, costos, cupos y reglas de acceso pueden cambiar sin aviso. Esta guía se revisó el 5 de agosto de 2026 y siempre debes confirmar con la fuente oficial antes de tu visita.",
    },
  ],
  en: [
    {
      question: "Do I need anything to enter Balandra Beach?",
      answer:
        "Access is regulated because it is a Flora and Fauna Protection Area. During 2026 it has been managed with a digital bracelet and timed entry blocks with limited capacity. Check the CONANP page before leaving the hotel, since the scheme can change.",
    },
    {
      question: "Can I visit Balandra and El Tecolote on the same day?",
      answer:
        "Yes. The two beaches are very close to each other, so it is common to combine them: Balandra in the morning and El Tecolote for lunch and the afternoon.",
    },
    {
      question: "What should I bring to the beach?",
      answer:
        "Water, food, an umbrella or shade, and a bag for your trash. At Balandra you must stay on authorized trails and must not climb El Hongo or walk on dunes or vegetation. At El Tecolote phone signal can be limited.",
    },
    {
      question: "Does the hotel have an elevator?",
      answer:
        "The property has no elevator and rooms are reached by stairs. If you need an accessible room, confirm it directly with the hotel before booking.",
    },
    {
      question: "How long is the drive from La Paz to Cabo San Lucas?",
      answer:
        "About 2 to 2.5 hours each way, subject to traffic and route. That is why it is best to leave early and avoid committing to exact return times.",
    },
    {
      question: "When is it windy in La Ventana?",
      answer:
        "The best-known wind and kitesurf season usually runs from November to April. In summer the water tends to be calmer, which suits paddleboarding or simply relaxing.",
    },
    {
      question: "Can any car reach El Saltito?",
      answer:
        "We do not assume so. It is a beach with less infrastructure and part of the access may include unpaved roads. Check recent road conditions before setting out.",
    },
    {
      question: "Are the hours and costs in this guide final?",
      answer:
        "No. Hours, costs, capacity and access rules can change without notice. This guide was reviewed on 5 August 2026 and you should always confirm with the official source before visiting.",
    },
  ],
};

/* ------------------------------------------------------- fuentes oficiales */
export const SOURCES: Record<Lang, SourceLink[]> = {
  es: [
    {
      label: "CONANP · Balandra",
      url: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=9",
      description: "Área de Protección de Flora y Fauna Balandra.",
    },
    {
      label: "CONANP · Brazalete de conservación",
      url: "https://descubreanp.conanp.gob.mx/es/conanp/pasaporte-brazalete-conservacion",
      description: "Esquema de acceso vigente a las áreas naturales protegidas.",
    },
    {
      label: "gob.mx · Balandra",
      url: "https://www.gob.mx/conanp/documentos/area-de-proteccion-de-flora-y-fauna-balandra",
      description: "Documentación federal del área protegida.",
    },
    {
      label: "Turismo de La Paz",
      url: "https://www.golapaz.com/",
      description: "Guía oficial de destino: playas, Malecón y restaurantes.",
    },
    {
      label: "Visit Los Cabos",
      url: "https://www.visitloscabos.travel/things-to-do/beaches/lovers-beach/",
      description: "Información oficial de Playa del Amor y El Arco.",
    },
    {
      label: "La Concha Beach Hotel & Club",
      url: "https://www.laconcha.com/",
      description: "Sitio oficial del hotel.",
    },
    {
      label: "Jazamango",
      url: "https://www.jazamango.mx/",
      description: "Sitio oficial del restaurante en Todos Santos.",
    },
    {
      label: "Barracuda Cantina",
      url: "https://www.barracudacantina.com/",
      description: "Sitio oficial del restaurante en Playa Cerritos.",
    },
  ],
  en: [
    {
      label: "CONANP · Balandra",
      url: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=9",
      description: "Balandra Flora and Fauna Protection Area.",
    },
    {
      label: "CONANP · Conservation bracelet",
      url: "https://descubreanp.conanp.gob.mx/es/conanp/pasaporte-brazalete-conservacion",
      description: "Current access scheme for protected natural areas.",
    },
    {
      label: "gob.mx · Balandra",
      url: "https://www.gob.mx/conanp/documentos/area-de-proteccion-de-flora-y-fauna-balandra",
      description: "Federal documentation for the protected area.",
    },
    {
      label: "La Paz Tourism",
      url: "https://www.golapaz.com/",
      description: "Official destination guide: beaches, Malecón and restaurants.",
    },
    {
      label: "Visit Los Cabos",
      url: "https://www.visitloscabos.travel/things-to-do/beaches/lovers-beach/",
      description: "Official information on Lover's Beach and El Arco.",
    },
    {
      label: "La Concha Beach Hotel & Club",
      url: "https://www.laconcha.com/",
      description: "Official hotel website.",
    },
    {
      label: "Jazamango",
      url: "https://www.jazamango.mx/",
      description: "Official site of the restaurant in Todos Santos.",
    },
    {
      label: "Barracuda Cantina",
      url: "https://www.barracudacantina.com/",
      description: "Official site of the restaurant at Cerritos Beach.",
    },
  ],
};

/* ------------------------------------------------------- interfaz y copias */
export const UI: Record<Lang, UiStrings> = {
  es: {
    htmlLang: "es-MX",
    meta: {
      title:
        "Qué hacer en La Paz, BCS | Playas, restaurantes y excursiones desde Hotel La Concha",
      description:
        "Descubre Balandra, El Tecolote, La Ventana, Todos Santos, Cerritos, Cabo San Lucas y los mejores lugares para comer desde Hotel La Concha.",
    },
    skipToContent: "Saltar al contenido principal",
    languageLabel: "Idioma",
    languageName: { es: "Español", en: "English" },
    navLabel: "Navegación principal",
    nav: [
      { href: "#hotel", label: "Hotel" },
      { href: "#playas", label: "Playas" },
      { href: "#escapadas", label: "Escapadas" },
      { href: "#espiritu-santo", label: "Espíritu Santo" },
      { href: "#restaurantes", label: "Restaurantes" },
      { href: "#malecon", label: "Malecón" },
      { href: "#mapa", label: "Mapa" },
    ],
    hero: {
      eyebrow: "La Paz, Baja California Sur",
      title: "Descubre La Paz desde Hotel La Concha",
      subtitle:
        "Despierta frente al Mar de Cortés y descubre lo mejor de Baja California Sur. Desde Hotel La Concha podrás visitar playas de aguas turquesa, caminar por el Malecón, probar los sabores de La Paz y realizar escapadas a Todos Santos, Cerritos y Cabo San Lucas.",
      primaryCta: "Explorar playas",
      secondaryCta: "Abrir mapa",
      tertiaryCta: "Planear mi día",
      scrollHint: "Desplázate para explorar",
    },
    floatingMapCta: "Abrir mapa",
    sections: {
      hotel: {
        id: "hotel",
        eyebrow: "Tu hotel en La Paz",
        title: "Tu base frente al mar",
        intro:
          "Un punto de partida junto al Mar de Cortés, a minutos del centro y del corredor de playas.",
      },
      beaches: {
        id: "playas",
        eyebrow: "Playas recomendadas",
        title: "Cuatro formas de vivir el Mar de Cortés",
        intro:
          "Desde la bahía más fotografiada de México hasta una playa de viento para aventureros.",
      },
      dayTrips: {
        id: "escapadas",
        eyebrow: "Escapadas de un día",
        title: "Sal de la ciudad sin cambiar de hotel",
        intro: "Tres destinos que caben en un día si sales temprano y no aprietas los horarios.",
      },
      espirituSanto: {
        id: "espiritu-santo",
        eyebrow: "Excursión marítima",
        title: "Isla Espíritu Santo",
        intro:
          "Un día completo de navegación, snorkel y naturaleza en un área natural protegida, a cargo de un operador autorizado.",
      },
      restaurants: {
        id: "restaurantes",
        eyebrow: "Dónde comer",
        title: "Sabores de La Paz y del camino",
        intro:
          "De los tacos de pescado frente al Malecón a una comida de autor en Todos Santos.",
      },
      malecon: {
        id: "malecon",
        eyebrow: "Qué hacer en el Malecón",
        title: "Vive el atardecer paceño",
        intro:
          "Camina junto a la bahía, recorre las esculturas y disfruta cómo cambia el cielo sobre el mar.",
      },
      itineraries: {
        id: "itinerarios",
        eyebrow: "Itinerarios sugeridos",
        title: "Tres días ya planeados",
        intro:
          "Úsalos como punto de partida y ajústalos a los horarios que confirmes cada día.",
      },
      map: {
        id: "mapa",
        eyebrow: "Mapa interactivo",
        title: "Todos los puntos de esta guía",
        intro:
          "Elige un lugar de la lista para verlo en el mapa, abrirlo en Google Maps o trazar la ruta desde el hotel.",
      },
      videos: {
        id: "videos",
        eyebrow: "Video",
        title: "Baja California Sur en movimiento",
        intro:
          "Material con licencia libre, alojado en Wikimedia Commons. Se abre en una pestaña nueva para no afectar la carga de esta página.",
      },
      faq: {
        id: "faq",
        eyebrow: "Consejos prácticos",
        title: "Preguntas frecuentes",
        intro: "Lo que conviene resolver antes de salir del hotel.",
      },
      cta: { id: "planear", eyebrow: "Siguiente paso", title: "Planea tu día", intro: "" },
    },
    labels: {
      highlights: "Ideal para",
      practical: "Antes de ir",
      driveTime: "Tiempo estimado",
      address: "Dirección",
      phone: "Teléfono",
      openMap: "Abrir en Google Maps",
      openAppleMaps: "Abrir en Mapas",
      directions: "Cómo llegar desde el hotel",
      official: "Sitio oficial",
      moreInfo: "Más información",
      lastVerified: "Información revisada el",
      externalLink: "se abre en una pestaña nueva",
      noPhoto: "Sin fotografía disponible",
      noPhotoDetail:
        "No encontramos una imagen con licencia verificable de este lugar. Preferimos dejar el espacio vacío antes que usar la foto de otro sitio.",
      illustrative: "Imagen ilustrativa",
      miniTour: "Mini recorrido sugerido",
      miniTourSteps: ["Kiosco del Malecón", "Muelle Fiscal", "Letras de La Paz", "Nieve", "Cena"],
      mapPointsLabel: "Puntos de la guía",
      mapFrameTitle: "Mapa de",
      mapHint:
        "El mapa se carga solo cuando lo necesitas. Usa las flechas del teclado para recorrer la lista.",
      watchVideo: "Ver en Wikimedia Commons",
      videoLicense: "Licencia",
      itineraryNote: "Nota",
      category: {
        hotel: "Hotel",
        beach: "Playa",
        "day-trip": "Escapada",
        restaurant: "Restaurante",
        activity: "Actividad",
        excursion: "Excursión",
      },
    },
    dynamicNotice: {
      short: "Sujeto a cambios",
      long: "Horarios, acceso y disponibilidad sujetos a cambios. Confirma antes de visitar.",
    },
    cta: {
      title: "Arma tu día en La Paz",
      body: "Empieza por el itinerario que más se acerque a tu plan, confirma los accesos y horarios con las fuentes oficiales y ajusta el resto sobre la marcha.",
      primary: "Ver itinerarios",
      secondary: "Abrir el mapa",
    },
    footer: {
      sourcesTitle: "Fuentes oficiales",
      sourcesIntro:
        "Toda la información de esta guía proviene de estas fuentes. Consúltalas antes de tu visita.",
      imagesTitle: "Fotografías",
      imagesIntro:
        "Las fotografías de esta página fueron proporcionadas para este proyecto y se usan con fines informativos. Si eres el titular de los derechos de alguna imagen y deseas una atribución o su remoción, contáctanos.",
      imagesPending:
        "Algunos lugares aún no cuentan con fotografía propia; en esos casos se deja el espacio vacío en vez de usar una foto de otro sitio o lugar.",
      disclaimerTitle: "Aviso",
      disclaimer:
        "Esta guía es informativa y no representa oficialmente al hotel ni a los establecimientos mencionados. Horarios, costos, cupos y reglas de acceso pueden cambiar sin aviso; confirma siempre con la fuente oficial antes de tu visita. No publicamos precios ni reseñas.",
      credit: "Guía turística de La Paz, Baja California Sur",
      backToTop: "Volver al inicio",
    },
  },

  en: {
    htmlLang: "en",
    meta: {
      title:
        "What to do in La Paz, BCS | Beaches, restaurants and day trips from Hotel La Concha",
      description:
        "Discover Balandra, El Tecolote, La Ventana, Todos Santos, Cerritos, Cabo San Lucas and the best places to eat from Hotel La Concha.",
    },
    skipToContent: "Skip to main content",
    languageLabel: "Language",
    languageName: { es: "Español", en: "English" },
    navLabel: "Main navigation",
    nav: [
      { href: "#hotel", label: "Hotel" },
      { href: "#playas", label: "Beaches" },
      { href: "#escapadas", label: "Day trips" },
      { href: "#espiritu-santo", label: "Espíritu Santo" },
      { href: "#restaurantes", label: "Restaurants" },
      { href: "#malecon", label: "Malecón" },
      { href: "#mapa", label: "Map" },
    ],
    hero: {
      eyebrow: "La Paz, Baja California Sur",
      title: "Discover La Paz from Hotel La Concha",
      subtitle:
        "Wake up facing the Sea of Cortez and discover the best of Baja California Sur. From Hotel La Concha you can visit turquoise beaches, walk the Malecón, taste the flavors of La Paz and take day trips to Todos Santos, Cerritos and Cabo San Lucas.",
      primaryCta: "Explore beaches",
      secondaryCta: "Open map",
      tertiaryCta: "Plan my day",
      scrollHint: "Scroll to explore",
    },
    floatingMapCta: "Open map",
    sections: {
      hotel: {
        id: "hotel",
        eyebrow: "Your hotel in La Paz",
        title: "Your base by the sea",
        intro:
          "A starting point on the Sea of Cortez, minutes from downtown and the beach corridor.",
      },
      beaches: {
        id: "playas",
        eyebrow: "Recommended beaches",
        title: "Four ways to experience the Sea of Cortez",
        intro:
          "From the most photographed bay in Mexico to a windswept beach for adventurers.",
      },
      dayTrips: {
        id: "escapadas",
        eyebrow: "Day trips",
        title: "Leave the city without changing hotels",
        intro:
          "Three destinations that fit into one day if you start early and keep the schedule loose.",
      },
      espirituSanto: {
        id: "espiritu-santo",
        eyebrow: "Boat excursion",
        title: "Espíritu Santo Island",
        intro:
          "A full day of sailing, snorkeling and nature in a protected natural area, run by an authorized operator.",
      },
      restaurants: {
        id: "restaurantes",
        eyebrow: "Where to eat",
        title: "Flavors of La Paz and the road",
        intro: "From fish tacos facing the Malecón to a chef-driven lunch in Todos Santos.",
      },
      malecon: {
        id: "malecon",
        eyebrow: "What to do on the Malecón",
        title: "Live the La Paz sunset",
        intro:
          "Walk along the bay, take in the sculptures and watch the sky change over the sea.",
      },
      itineraries: {
        id: "itinerarios",
        eyebrow: "Suggested itineraries",
        title: "Three days already planned",
        intro:
          "Use them as a starting point and adjust them to the hours you confirm each day.",
      },
      map: {
        id: "mapa",
        eyebrow: "Interactive map",
        title: "Every point in this guide",
        intro:
          "Pick a place from the list to see it on the map, open it in Google Maps or get directions from the hotel.",
      },
      videos: {
        id: "videos",
        eyebrow: "Video",
        title: "Baja California Sur in motion",
        intro:
          "Freely licensed footage hosted on Wikimedia Commons. It opens in a new tab so this page stays fast.",
      },
      faq: {
        id: "faq",
        eyebrow: "Practical tips",
        title: "Frequently asked questions",
        intro: "What is worth sorting out before you leave the hotel.",
      },
      cta: { id: "planear", eyebrow: "Next step", title: "Plan your day", intro: "" },
    },
    labels: {
      highlights: "Great for",
      practical: "Before you go",
      driveTime: "Estimated time",
      address: "Address",
      phone: "Phone",
      openMap: "Open in Google Maps",
      openAppleMaps: "Open in Maps",
      directions: "Directions from the hotel",
      official: "Official site",
      moreInfo: "More information",
      lastVerified: "Information reviewed on",
      externalLink: "opens in a new tab",
      noPhoto: "No photograph available",
      noPhotoDetail:
        "We could not find a verifiably licensed image of this place. We would rather leave the space empty than hotlink someone else's photo.",
      illustrative: "Illustrative image",
      miniTour: "Suggested mini tour",
      miniTourSteps: [
        "Malecón Kiosco",
        "Muelle Fiscal",
        "La Paz letters",
        "Ice cream",
        "Dinner",
      ],
      mapPointsLabel: "Points in this guide",
      mapFrameTitle: "Map of",
      mapHint:
        "The map loads only when you need it. Use the arrow keys to move through the list.",
      watchVideo: "View on Wikimedia Commons",
      videoLicense: "License",
      itineraryNote: "Note",
      category: {
        hotel: "Hotel",
        beach: "Beach",
        "day-trip": "Day trip",
        restaurant: "Restaurant",
        activity: "Activity",
        excursion: "Excursion",
      },
    },
    dynamicNotice: {
      short: "Subject to change",
      long: "Hours, access and availability are subject to change. Confirm before visiting.",
    },
    cta: {
      title: "Build your day in La Paz",
      body: "Start with whichever itinerary is closest to your plan, confirm access and hours with the official sources, and adjust the rest as you go.",
      primary: "See itineraries",
      secondary: "Open the map",
    },
    footer: {
      sourcesTitle: "Official sources",
      sourcesIntro:
        "Everything in this guide comes from these sources. Check them before your visit.",
      imagesTitle: "Photographs",
      imagesIntro:
        "The photographs on this page were supplied for this project and are used for informational purposes. If you hold the rights to an image and would like attribution or its removal, please contact us.",
      imagesPending:
        "Some places don't yet have their own photograph; in those cases the space is left empty rather than using a photo of another site or place.",
      disclaimerTitle: "Notice",
      disclaimer:
        "This guide is informational and does not officially represent the hotel or the venues mentioned. Hours, costs, capacity and access rules can change without notice; always confirm with the official source before visiting. We do not publish prices or reviews.",
      credit: "Travel guide to La Paz, Baja California Sur",
      backToTop: "Back to top",
    },
  },
};
