/**
 * Descarga Fraunces y Manrope (licencia SIL Open Font 1.1) y las aloja dentro
 * del proyecto para no depender de un CDN externo ni filtrar visitas a un
 * tercero. Solo se guardan los subconjuntos latin y latin-ext, que cubren
 * espanol e ingles.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Los @font-face viven en src/styles/fonts.css.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "fonts");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const SUBSETS = ["latin", "latin-ext"];

const FAMILIES = [
  {
    slug: "fraunces",
    css: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap",
  },
  {
    slug: "manrope",
    css: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap",
  },
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const family of FAMILIES) {
  const css = await (await fetch(family.css, { headers: { "User-Agent": UA } })).text();

  // Cada bloque de Google va precedido por un comentario con el subconjunto.
  const wanted = new Map();
  for (const chunk of css.split("/*").slice(1)) {
    const subset = chunk.split("*/")[0].trim();
    const url = (chunk.match(/url\((https[^)]+\.woff2)\)/) ?? [])[1];
    if (url && SUBSETS.includes(subset) && !wanted.has(subset)) wanted.set(subset, url);
  }

  for (const [subset, url] of wanted) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`${family.slug}/${subset}: HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    await writeFile(join(OUT, `${family.slug}-${subset}.woff2`), bytes);
    console.log(`ok ${family.slug}-${subset}.woff2 (${(bytes.length / 1024).toFixed(0)} kB)`);
  }
}

console.log(`\nFuentes en ${OUT}`);
