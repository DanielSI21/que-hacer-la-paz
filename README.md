# Guía de La Paz, BCS — landing para visitantes de La Concha Beach Hotel & Club

Landing turística responsive, accesible y bilingüe (español / inglés) para
personas hospedadas en La Paz, Baja California Sur.

```bash
npm install
npm run dev
```

## Arquitectura

Componentes y datos están separados: los componentes no contienen texto.

```
src/
  content/
    content.ts      Todo el contenido: lugares, itinerarios, FAQ, fuentes,
                    videos y cadenas de interfaz, en es y en.
    types.ts        Modelo de datos (TourismPlace, Itinerary, UiStrings…).
  components/       Presentación pura; leen el contenido ya resuelto.
  i18n/             Contexto de idioma (URL ?lang=, localStorage, navegador).
  styles/           tokens · base · layout · components (CSS plano).
scripts/            Procesamiento de imágenes y descarga de tipografías.
assets-source/      Fotografías originales entregadas para el proyecto
                    (no se sirven directamente; scripts/process-local-images.mjs
                    las convierte y recorta hacia public/images).
public/images/      Variantes AVIF/WebP servidas por la página.
public/fonts/       Fraunces y Manrope alojadas localmente.
```

Para cambiar un texto, un enlace o añadir un lugar, edita **solo**
`src/content/content.ts`.

## Reglas de contenido

Estas reglas están implementadas, no solo documentadas:

- **No se publican precios, reseñas, horarios como dato permanente ni
  coordenadas.** Los lugares con información variable llevan
  `dynamicInformation: true` y la interfaz muestra *«Horarios, acceso y
  disponibilidad sujetos a cambios. Confirma antes de visitar.»*
- **Los enlaces de mapa se construyen con búsquedas por nombre**
  (`mapSearchUrl`, `directionsFromHotel`, `mapEmbedUrl`, `appleMapsUrl`), nunca
  con coordenadas. Las rutas salen siempre desde el hotel. Cada lugar muestra
  tanto «Abrir en Google Maps» como «Abrir en Mapas» (Apple Maps, vía
  `maps.apple.com`, universal fuera de iOS también).
- **Todos los enlaces externos** se renderizan con `<ExternalLink>`, que fuerza
  `target="_blank"` y `rel="noopener noreferrer"` y avisa del comportamiento a
  lectores de pantalla.
- **Solo se enlazan fuentes oficiales verificadas** el 5 de agosto de 2026
  (CONANP, gob.mx, golapaz.com, visitloscabos.travel, laconcha.com,
  jazamango.mx, barracudacantina.com).
- Los datos estructurados incluyen `TouristAttraction`, `Restaurant`,
  `ItemList`, `FAQPage` y `BreadcrumbList`. **No** se declara `Hotel` ni
  calificaciones, precios o disponibilidad, porque la página no representa
  oficialmente al establecimiento.

## Imágenes

Las fotografías fueron entregadas directamente para este proyecto (no
provienen de bancos de imágenes ni de Wikimedia Commons), por lo que no se
fabrica información de licencia o autoría: el pie de página solo indica que
las imágenes se usan con fines informativos y que, si alguien es titular de
derechos sobre alguna, puede pedir atribución o su remoción.

```bash
npm run media:images   # recorta assets-source/ y genera AVIF + WebP responsivos
npm run media:fonts    # descarga Fraunces y Manrope (OFL) a public/fonts
npm run media:search   # utilidad para buscar futuras fotos con licencia libre en Commons
```

`scripts/process-local-images.mjs` lee `assets-source/`, recorta cada foto al
formato del componente que la usa (hero 16:9, wide 3:2, card 4:3) y escribe
las variantes en `public/images/<slug>-<ancho>.avif|.webp`. Algunos orígenes
son de baja resolución (por ejemplo El Saltito o Azotea); el script los
amplía lo necesario para cubrir el ancho requerido, con la consiguiente
pérdida leve de nitidez — es la mejor fuente disponible por ahora.

Lugares sin fotografía propia (se deja el espacio vacío en vez de usar una
foto de otro sitio): Taco Fish La Paz. El resto de lugares y restaurantes ya
tienen imagen real.

Para sustituir o añadir una foto: coloca el archivo en `assets-source/`,
añade su entrada al `MANIFEST` de `scripts/process-local-images.mjs`, corre
`npm run media:images` y apunta el campo `image` del lugar en `content.ts`.

## Video

Los videos con licencia libre (Wikimedia Commons) se **enlazan**, no se
empotran: pesan decenas de MB y arruinarían la carga inicial. Están en la
constante `VIDEOS` de `content.ts`, con autoría, licencia y peso.

## Accesibilidad y rendimiento

- HTML semántico con `main`, `section` etiquetadas, jerarquía de encabezados sin
  saltos y *skip link*.
- Foco visible en todo elemento interactivo, con un tono claro sobre las
  secciones oscuras para mantener contraste.
- Lista del mapa navegable con flechas, `Home` y `End`; el `iframe` de Google
  Maps solo se inserta cuando la persona lo pide.
- FAQ y notas prácticas con `<details>`/`<summary>` nativos.
- Contraste verificado: 42 combinaciones de texto y fondo, mínimo 4.68:1.
- Imágenes AVIF + WebP con `srcset`/`sizes`; la del hero se precarga y el resto
  usa `loading="lazy"`.
- `prefers-reduced-motion` desactiva animaciones y el desplazamiento suave.

## Idiomas

El documento es uno solo y cambia de idioma en cliente: `?lang=es` / `?lang=en`,
preferencia guardada en `localStorage` y detección del navegador como último
recurso. `index.html` declara `hreflang` para ambas versiones. Al cambiar de
idioma se actualizan `<html lang>`, el título y la meta descripción.

Para publicar cada idioma en su propia URL, prerrenderiza `/guia-la-paz` y
`/en/guia-la-paz` con el idioma correspondiente; el contenido ya está listo.

## Aviso

Esta guía es informativa y no representa oficialmente al hotel ni a los
establecimientos mencionados. Horarios, costos, cupos y reglas de acceso pueden
cambiar sin aviso.
