import { CtaContent } from '../models/cta.model';
import { SITE } from './site';
import { SOCIAL_LINKS } from './social-links';

const github = SOCIAL_LINKS[0];

/**
 * The words of the call to action band, one entry per kind of page. The routes pick one
 * (`data: { cta: CTA.home }`) and the app shell renders it after the page, so the band is always
 * the last section before the footer.
 */
export const CTA = {
  home: {
    title: 'Have a Project in',
    accent: 'Mind?',
    text: "Tell me about it and I'll get back to you so we can talk through scope, timeline, and next steps.",
  },
  about: {
    title: 'Want to Know More About How I',
    accent: 'Work?',
    text: "If you'd like to talk through a project before committing to anything, I'm happy to have that conversation.",
    primary: { label: 'Get in Touch', route: '/contact' },
  },
  services: {
    title: 'Ready to Talk Through Your',
    accent: 'Project?',
    text: "Tell me what you need and I'll get back to you with next steps.",
  },
  serviceDetail: {
    title: 'Have Something Similar in',
    accent: 'Mind?',
    text: "If this is close to what you need, let's talk about your project specifically.",
  },
  projects: {
    title: 'Have Something Similar in',
    accent: 'Mind?',
    text: "If any of these are close to what you need, let's talk about your project specifically.",
  },
  projectDetail: {
    title: 'Have Something Similar in',
    accent: 'Mind?',
    text: "If this is close to what you need, let's talk about your project specifically.",
  },
  pricing: {
    title: 'Need Something More',
    accent: 'Specific?',
    text: "Every project is scoped individually. Tell me about what you need and I'll put together a clear, itemized quote, no fixed package required.",
    primary: { label: 'Request a Custom Quote', route: '/contact' },
  },
  // The contact page is where "Start a Project" already leads, so its band offers other ways in:
  // email, and the social profiles (no phone number here).
  contact: {
    title: 'Prefer to Talk',
    accent: 'Directly?',
    text: 'Skip the form and write to me by email, or find me on my social profiles.',
    primary: { label: 'Email me', href: `mailto:${SITE.email}`, icon: 'mail' },
    secondary: {
      label: 'Social profiles',
      href: github.href,
      icon: 'github',
      external: true,
      ariaLabel: 'Social profiles, Joshi Angelo Z. Adlawan on GitHub (opens in a new tab)',
    },
  },
} satisfies Record<string, CtaContent>;
