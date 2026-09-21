export interface CapstoneProject {
  slug: string;
  name: string;
  image: string;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
  metaDescription: string;
  bannerText: string;
}

export interface CraftProject {
  name: string;
  image: string;
  description: string;
  tools: string[];
  link: string;
}

/** A screenshot delivered as responsive WebP: one `<base>-<width>.webp` file per entry in `widths`. */
export interface ProjectImage {
  /** Path without the size suffix and extension, e.g. `assets/images/projects/syntaxia-home`. */
  base: string;
  widths: readonly number[];
  /** Which of `widths` the plain <img> fallback points at. */
  fallbackWidth: number;
  /** Pixel size of the original capture, so the browser can reserve the right space (no layout shift). */
  width: number;
  height: number;
  alt: string;
}

/** A project I built myself (as opposed to client work), shown with real screenshots and links. */
export interface ShowcaseProject {
  slug: string;
  name: string;
  /** One sentence, for the cards. */
  summary: string;
  /** The fuller text for the project page. */
  description: string;
  highlights: string[];
  tools: string[];
  /** The first image is the cover. */
  images: ProjectImage[];
  github?: string;
  live?: string;
  metaDescription: string;
  bannerText: string;
}
