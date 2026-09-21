import { SocialLink } from '../models/social-link.model';

/**
 * My public profiles: GitHub first (the call to action links to it), then the coding sites, then
 * the ways to message me.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/joshiii7',
    ariaLabel: 'Joshi Angelo Z. Adlawan on GitHub (opens in a new tab)',
    rel: 'me noopener noreferrer',
  },
  {
    id: 'codewars',
    label: 'Codewars',
    href: 'https://www.codewars.com/users/joshiii7',
    ariaLabel: 'Joshi Angelo Z. Adlawan on Codewars (opens in a new tab)',
    rel: 'me noopener noreferrer',
  },
  {
    id: 'codepen',
    label: 'CodePen',
    href: 'https://codepen.io/joshiii7',
    ariaLabel: 'Joshi Angelo Z. Adlawan on CodePen (opens in a new tab)',
    rel: 'me noopener noreferrer',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/joshi.adlawan/',
    ariaLabel: 'Facebook (opens in a new tab)',
    rel: 'noopener noreferrer',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/639382943739',
    ariaLabel: 'WhatsApp (opens in a new tab)',
    rel: 'noopener noreferrer',
  },
];
