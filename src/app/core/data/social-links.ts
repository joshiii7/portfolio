import { SocialLink } from '../models/social-link.model';

/**
 * The same three profiles fingerdash lists in its footer (GitHub, Facebook,
 * WhatsApp), in the same order and with the same accessible names.
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
