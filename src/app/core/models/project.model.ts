import { TextLink } from '../../shared/utils/text-link';

export interface CapstoneProject {
  slug: string;
  name: string;
  /** The screenshot for the cards and the top of the case study. */
  image: ProjectImage;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
  /** Shown in the project page's facts band, e.g. "Completed", "Live", "In progress". */
  status: string;
  /** Shown in the project page's facts band: one short standout feature, e.g. "Automated payroll". */
  keyFeature: string;
  metaDescription: string;
  bannerText: string;
}

/** A screenshot delivered as responsive WebP: one `<base>-<width>.webp` file per entry in `widths`. */
export interface ProjectImage {
  /** Path without the size suffix and extension, e.g. `images/projects/syntaxia/home`. */
  base: string;
  widths: readonly number[];
  /** Which of `widths` the plain <img> fallback points at. */
  fallbackWidth: number;
  /** Pixel size of the original capture, so the browser can reserve the right space (no layout shift). */
  width: number;
  height: number;
  alt: string;
  /** Paragraphs shown under the screenshot in the "Take a look" gallery. */
  caption?: string[];
  /** When set, one paragraph in `caption` contains a `{link}` placeholder that renders as a router link. */
  captionLink?: TextLink;
}

/** A project I built myself (as opposed to capstone work), shown with real screenshots and links. */
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
  /** Shown in the project page's facts band, e.g. "Completed", "Live", "In progress". */
  status: string;
  /** Shown in the project page's facts band: one short standout feature, e.g. "Live code editor". */
  keyFeature: string;
  metaDescription: string;
  bannerText: string;
}
