/** Which part of a photo stays in frame when it is cropped to a wide banner. */
export type PhotoFocal = 'top' | 'upper' | 'center' | 'lower';

/** One pre-scaled WebP rendition of a photo. */
export interface PhotoVariant {
  src: string;
  /** Pixel width, used as the srcset width descriptor. */
  width: number;
}

/**
 * A decorative photo under src/assets. `src`/`width`/`height` are the JPG
 * fallback and its real size (so the browser can reserve space); `variants`
 * are the WebP renditions the browser picks from by screen width.
 */
export interface PhotoAsset {
  src: string;
  width: number;
  height: number;
  variants?: readonly PhotoVariant[];
}
