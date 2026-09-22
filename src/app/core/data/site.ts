export interface NavLink {
  label: string;
  path: string;
  /** Only an exact URL match counts as active (Home); others match by prefix. */
  exact?: boolean;
}

export const SITE = {
  name: 'Joshi Adlawan',
  handle: '@joshiangelo',
  legalName: 'Joshi Angelo Adlawan',
  email: 'adlawanjoshiangelo@gmail.com',
  phone: '+63 938 294 3739',
  phoneHref: 'tel:+639382943739',
  hours: 'Mon–Fri, 8:00 AM–5:00 PM',
  tagline: 'Full-stack software developer building custom web, mobile, and desktop applications.',
  origin: 'https://joshiii7-portfolio.vercel.app',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/', exact: true },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export const PROJECT_TYPES: { value: string; label: string }[] = [
  { value: 'Custom Software Application / Business System', label: 'Custom Software Application / Business System (Web, Mobile, or Desktop)' },
  { value: 'Business or Marketing Website', label: 'Business or Marketing Website' },
  { value: 'Front-End Development', label: 'Front-End Development' },
  { value: 'Website Maintenance / SEO', label: 'Website Maintenance / SEO' },
  { value: 'Not Sure Yet', label: 'Not Sure Yet' },
];
