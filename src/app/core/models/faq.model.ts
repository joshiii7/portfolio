import { TextLink } from '../../shared/utils/text-link';

export interface Faq {
  q: string;
  a: string;
  /** When set, `a` contains a `{link}` placeholder that renders as a router link. */
  link?: TextLink;
}
