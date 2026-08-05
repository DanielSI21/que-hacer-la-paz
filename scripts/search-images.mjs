/**
 * Busca candidatos de imagen en Wikimedia Commons y reporta su licencia.
 * No descarga nada: solo lista opciones para elegir manualmente.
 *   node scripts/search-images.mjs
 */
const UA = "TurismoLaPazLanding/1.0 (landing turistica; contacto: proyecto local)";
const API = "https://commons.wikimedia.org/w/api.php";

const QUERIES = {
  balandra: "Playa Balandra La Paz",
  tecolote: "Tecolote beach La Paz Baja California",
  saltito: "El Saltito beach Baja California Sur",
  laventana: "La Ventana Baja California Sur kitesurf",
  arco: "El Arco Cabo San Lucas",
  todossantos: "Todos Santos Baja California Sur",
  cerritos: "Cerritos beach Baja California Sur",
  malecon: "Malecon La Paz Baja California Sur",
  laPazCoast: "La Paz Baja California Sur bay coast",
  tacos: "fish taco Baja California",
  espirituSanto: "Isla Espiritu Santo Baja California Sur",
};

const strip = (html = "") => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function search(term) {
  const url = `${API}?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
    term
  )}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime|extmetadata`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${term}: HTTP ${res.status}`);
  const json = await res.json();
  const pages = Object.values(json?.query?.pages ?? {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const m = info.extmetadata ?? {};
      return {
        title: p.title,
        w: info.width,
        h: info.height,
        mime: info.mime,
        license: strip(m.LicenseShortName?.value),
        artist: strip(m.Artist?.value),
        credit: strip(m.Credit?.value),
        description: strip(m.ImageDescription?.value).slice(0, 140),
        file: info.url,
        page: info.descriptionurl,
      };
    })
    .filter(Boolean)
    .filter((c) => /\.(jpe?g|png|webp)$/i.test(c.title))
    .filter((c) => c.w >= 1400);
}

const out = {};
for (const [key, term] of Object.entries(QUERIES)) {
  try {
    out[key] = await search(term);
    console.error(`ok  ${key}: ${out[key].length}`);
  } catch (err) {
    console.error(`err ${key}: ${err.message}`);
    out[key] = [];
  }
}
console.log(JSON.stringify(out, null, 2));
