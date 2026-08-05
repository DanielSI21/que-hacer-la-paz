import type { ImagePreset } from "../content/types";

/** Debe coincidir con WIDTHS y las proporciones de scripts/fetch-media.mjs. */
const PRESETS: Record<
  ImagePreset,
  { widths: number[]; ratio: number; sizes: string }
> = {
  hero: { widths: [768, 1280, 1920, 2560], ratio: 16 / 9, sizes: "100vw" },
  wide: {
    widths: [640, 960, 1440],
    ratio: 3 / 2,
    sizes: "(min-width: 62rem) 46rem, 100vw",
  },
  card: {
    widths: [400, 600, 900],
    ratio: 4 / 3,
    sizes: "(min-width: 62rem) 22rem, (min-width: 40rem) 45vw, 100vw",
  },
};

interface Props {
  slug: string;
  alt: string;
  preset: ImagePreset;
  /** La imagen del hero es el LCP: se carga con prioridad y sin diferir. */
  priority?: boolean;
  className?: string;
}

const srcSet = (slug: string, ext: "avif" | "webp", widths: number[]) =>
  widths.map((w) => `/images/${slug}-${w}.${ext} ${w}w`).join(", ");

export function ResponsiveImage({ slug, alt, preset, priority = false, className }: Props) {
  const { widths, ratio, sizes } = PRESETS[preset];
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(slug, "avif", widths)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(slug, "webp", widths)} sizes={sizes} />
      <img
        className={className}
        src={`/images/${slug}-${widths[0]}.webp`}
        alt={alt}
        width={largest}
        height={Math.round(largest / ratio)}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
