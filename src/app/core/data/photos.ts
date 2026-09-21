import { PhotoAsset, PhotoVariant } from '../models/photo.model';

const PHOTOS_DIR = 'images/photos';
const ASEAN_DIR = `${PHOTOS_DIR}/competitions/asean-2025`;
const WORKSPACE_DIR = `${PHOTOS_DIR}/workspace`;

/**
 * The WebP renditions of a photo: one `<name>-<width>.webp` file per width, in the same folder, so
 * the file name carries the description and its suffix carries the size.
 */
const webpVariants = (dir: string, name: string, widths: readonly number[]): PhotoVariant[] =>
  widths.map((width) => ({ src: `${dir}/${name}-${width}.webp`, width }));

/** WorldSkills ASEAN Manila 2025 photo used as a decorative banner background. */
export const ASEAN_PHOTOS = {
  /** On stage at the TESDA awards night, holding a trophy, with officials either side. */
  awardsNight: {
    src: `${ASEAN_DIR}/tesda-awards-night-trophy-stage-1600.webp`,
    width: 1600,
    height: 1066,
    variants: webpVariants(ASEAN_DIR, 'tesda-awards-night-trophy-stage', [640, 1024, 1600]),
  },
} as const satisfies Record<string, PhotoAsset>;

/** Photos of the site owner. */
export const PORTRAIT_PHOTOS = {
  /** Seated at a competition workstation beside a Philippine flag, in profile. */
  headshot: {
    src: `${ASEAN_DIR}/joshi-adlawan-worldskills-asean-manila-2025-competitor-1376.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(ASEAN_DIR, 'joshi-adlawan-worldskills-asean-manila-2025-competitor', [640, 1024, 1376]),
  },
} as const satisfies Record<string, PhotoAsset>;

/** Desk and keyboard photos used as decorative banner backgrounds on the interior pages. */
export const WORKSPACE_PHOTOS = {
  /** Home office: desk, laptop showing a code editor, chair and a coffee. */
  homeOffice: {
    src: `${WORKSPACE_DIR}/home-office-desk-laptop-code-editor-1376.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'home-office-desk-laptop-code-editor', [640, 1024, 1376]),
  },
  /** Grey-keycap mechanical keyboard with a coiled cable on a wooden desk. */
  woodenDesk: {
    src: `${WORKSPACE_DIR}/wooden-desk-mechanical-keyboard-coiled-cable-1376.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'wooden-desk-mechanical-keyboard-coiled-cable', [640, 1024, 1376]),
  },
  /** Hands typing on a mechanical keyboard. */
  handsTyping: {
    src: `${WORKSPACE_DIR}/hands-typing-on-mechanical-keyboard-1376.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'hands-typing-on-mechanical-keyboard', [640, 1024, 1376]),
  },
  /** Dark desk with a backlit keyboard, mouse, wooden speaker and a succulent (a 4:1 panorama). */
  darkDeskPanorama: {
    src: `${WORKSPACE_DIR}/dark-desk-keyboard-mouse-speaker-panorama-1920.webp`,
    width: 1920,
    height: 476,
    variants: webpVariants(WORKSPACE_DIR, 'dark-desk-keyboard-mouse-speaker-panorama', [640, 1024, 1920]),
  },
} as const satisfies Record<string, PhotoAsset>;
