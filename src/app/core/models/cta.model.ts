export type CtaIcon = 'phone' | 'mail' | 'github';

/** One button in the call to action band. Give it a `route` (in-app) or an `href` (mailto, tel, external). */
export interface CtaAction {
  label: string;
  route?: string;
  href?: string;
  icon?: CtaIcon;
  /** Opens in a new tab. */
  external?: boolean;
  /** Only needed when the accessible name must say more than the label (it must still contain the label). */
  ariaLabel?: string;
}

/**
 * What a page's call to action says. The design is the same everywhere; only the words change.
 * Leave `primary` out for "Start a Project" (the contact page), and `secondary` out for the phone number.
 */
export interface CtaContent {
  /** Heading text before the accented last word(s). */
  title: string;
  accent: string;
  text: string;
  primary?: CtaAction;
  secondary?: CtaAction;
}
