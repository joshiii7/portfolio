export type SocialLinkId = 'github' | 'codewars' | 'codepen' | 'facebook' | 'whatsapp';

export interface SocialLink {
  id: SocialLinkId;
  /** Visible name, also used as the icon name. */
  label: string;
  href: string;
  /** Icon-only links need an accessible name; it says the link opens a new tab. */
  ariaLabel: string;
  rel: string;
}
