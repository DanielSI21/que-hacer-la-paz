/**
 * Genera variantes AVIF/WebP responsivas a partir de fotografías reales
 * proporcionadas para el proyecto (assets-source/), y las escribe en
 * public/images con el patron <slug>-<ancho>.avif|.webp que usa
 * ResponsiveImage.
 *
 *   node scripts/process-local-images.mjs
 *
 * A diferencia de scripts/fetch-media.mjs (que descargaba de Wikimedia
 * Commons y verificaba licencia), estas imagenes fueron entregadas
 * directamente para este proyecto: no se fabrica informacion de licencia
 * ni autoria, por eso no se genera un archivo de creditos.
 */
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets-source");
const OUT = join(ROOT, "public", "images");

const WIDTHS = {
  hero: [768, 1280, 1920, 2560],
  wide: [640, 960, 1440],
  card: [400, 600, 900],
};

const MANIFEST = [
  { slug: "hero-balandra", file: "playa-balandra.jpg", ratio: 16 / 9, preset: "hero" },
  { slug: "hotel-la-concha", file: "hotel-la-concha.jpg", ratio: 3 / 2, preset: "wide" },
  { slug: "playa-tecolote", file: "playa-el-tecolote.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "playa-saltito", file: "playa-el-saltito.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "playa-la-ventana", file: "playa-la-ventana.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "arco-los-cabos", file: "arco-los-cabos.jpg", ratio: 3 / 2, preset: "wide" },
  { slug: "todos-santos", file: "todos-santos.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "playa-cerritos", file: "playa-cerritos.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "malecon", file: "malecon.jpg", ratio: 16 / 9, preset: "hero" },
  { slug: "malecon-alt", file: "malecon-2.jpg", ratio: 3 / 2, preset: "wide" },
  { slug: "la-garita", file: "la-garita.png", ratio: 4 / 3, preset: "card" },
  { slug: "azotea", file: "la-azotea.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "espiritu-santo-main", file: "isla-espiritu-santo-3.jpg", ratio: 3 / 2, preset: "wide" },
  { slug: "espiritu-santo-1", file: "isla-espiritu-santo-1.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "espiritu-santo-2", file: "isla-espiritu-santo-2.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "taco-fish", file: "taco-fish.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "agricole", file: "agricole.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "docecuarenta-todos-santos", file: "docecuarenta-todos-santos.jpg", ratio: 4 / 3, preset: "card" },
  { slug: "docecuarenta-la-paz", file: "docecuarenta-la-paz.jpg", ratio: 4 / 3, preset: "card" },
];

// Archivos entregados que no se usan (duplicados o alternativas de los de
// arriba): balandra.jpg, hotel-la-concha.jpeg, los-cabos.png.

async function renderVariants(sourcePath, item) {
  const widths = WIDTHS[item.preset];
  for (const w of widths) {
    const h = Math.round(w / item.ratio);
    const base = sharp(sourcePath, { failOn: "none" })
      .rotate()
      .resize(w, h, { fit: "cover", position: "attention" });
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(join(OUT, `${item.slug}-${w}.avif`));
    await base.clone().webp({ quality: 76 }).toFile(join(OUT, `${item.slug}-${w}.webp`));
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const item of MANIFEST) {
    const source = join(SRC, item.file);
    await renderVariants(source, item);
    console.error(`ok ${item.slug} <- ${item.file}`);
  }

  // Imagen para redes sociales (1200x630) a partir del hero.
  await sharp(join(SRC, "playa-balandra.jpg"))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, "og-la-paz.jpg"));
  console.error("ok og-la-paz.jpg");
}

await main();
