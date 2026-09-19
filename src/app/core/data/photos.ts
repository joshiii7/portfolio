import { PhotoAsset, PhotoVariant } from '../models/photo.model';

const IMAGES_DIR = 'assets/images';
const ASEAN_DIR = `${IMAGES_DIR}/asean`;
const WORKSPACE_DIR = `${IMAGES_DIR}/workspace`;

/**
 * The WebP renditions of a photo. Every rendition keeps the same file name and
 * lives in a folder named for its size (mobile, tablet, desktop), so the name
 * carries the description and the folder carries the size.
 */
const webpVariants = (dir: string, name: string, desktopWidth: number): PhotoVariant[] => [
  { src: `${dir}/mobile/${name}.webp`, width: 640 },
  { src: `${dir}/tablet/${name}.webp`, width: 1024 },
  { src: `${dir}/desktop/${name}.webp`, width: desktopWidth },
];

/** WorldSkills ASEAN Manila 2025 photos used as decorative banner backgrounds. */
export const ASEAN_PHOTOS = {
  /** Group selfie on the competition floor with the Singapore and Philippines teams. */
  floorSelfie: {
    src: `${ASEAN_DIR}/competition-floor-group-selfie.jpg`,
    width: 992,
    height: 558,
  },
  /** On stage at the TESDA awards night, holding a trophy, with officials either side. */
  awardsNight: {
    src: `${ASEAN_DIR}/tesda-awards-night-trophy-stage.jpg`,
    width: 2048,
    height: 1364,
    variants: webpVariants(ASEAN_DIR, 'tesda-awards-night-trophy-stage', 1600),
  },
} as const satisfies Record<string, PhotoAsset>;

/** Photos of the site owner. */
export const PORTRAIT_PHOTOS = {
  /** Seated at a competition workstation beside a Philippine flag, in profile. */
  headshot: {
    src: `${ASEAN_DIR}/joshi-adlawan-worldskills-asean-manila-2025-competitor.jpg`,
    width: 1376,
    height: 768,
    variants: webpVariants(ASEAN_DIR, 'joshi-adlawan-worldskills-asean-manila-2025-competitor', 1376),
  },
} as const satisfies Record<string, PhotoAsset>;

/** Desk and keyboard photos (WebP only) used as decorative banner backgrounds on the interior pages. */
export const WORKSPACE_PHOTOS = {
  /** Home office: desk, laptop showing a code editor, chair and a coffee. */
  homeOffice: {
    src: `${WORKSPACE_DIR}/desktop/home-office-desk-laptop-code-editor.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'home-office-desk-laptop-code-editor', 1376),
  },
  /** Grey-keycap mechanical keyboard with a coiled cable on a wooden desk. */
  woodenDesk: {
    src: `${WORKSPACE_DIR}/desktop/wooden-desk-mechanical-keyboard-coiled-cable.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'wooden-desk-mechanical-keyboard-coiled-cable', 1376),
  },
  /** Hands typing on a mechanical keyboard. */
  handsTyping: {
    src: `${WORKSPACE_DIR}/desktop/hands-typing-on-mechanical-keyboard.webp`,
    width: 1376,
    height: 768,
    variants: webpVariants(WORKSPACE_DIR, 'hands-typing-on-mechanical-keyboard', 1376),
  },
  /** Dark desk with a backlit keyboard, mouse, wooden speaker and a succulent (a 4:1 panorama). */
  darkDeskPanorama: {
    src: `${WORKSPACE_DIR}/desktop/dark-desk-keyboard-mouse-speaker-panorama.webp`,
    width: 1920,
    height: 476,
    variants: webpVariants(WORKSPACE_DIR, 'dark-desk-keyboard-mouse-speaker-panorama', 1920),
  },
} as const satisfies Record<string, PhotoAsset>;
