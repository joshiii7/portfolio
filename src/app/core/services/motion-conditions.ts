/**
 * Media conditions every GSAP animation runs inside, so reduced motion and touch stay static.
 * Kept free of any GSAP import so the app shell can read them without pulling GSAP into
 * the initial bundle.
 */
export const MOTION = {
  /** Anything animated at all: skipped entirely when the visitor prefers reduced motion. */
  ok: '(prefers-reduced-motion: no-preference)',
  /** Pointer-driven extras (the custom cursor): a real mouse, never touch, never reduced motion. */
  pointer: '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
  /** Heavier desktop-only effects (magnetic buttons, parallax): a wide screen with a real mouse. */
  desktop: '(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (hover: hover) and (pointer: fine)',
} as const;
