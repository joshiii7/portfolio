import { Faq } from '../models/faq.model';

export const HOME_FAQS: Faq[] = [
  {
    q: 'What services do you offer?',
    a: 'Custom software applications across web, mobile, and desktop, business websites, front-end development from an existing design, and ongoing website maintenance or SEO support.',
  },
  {
    q: 'What does your project process look like?',
    a: 'It starts with a discovery call to understand what you need, then a clear scope and proposal, then the build with check-ins along the way, and finally a review before launch.',
  },
  {
    q: 'How long does a typical project take?',
    a: "It depends on the scope and complexity of what you need. Once we've talked through your project, I'll give you a realistic timeline before any work begins.",
  },
  {
    q: 'How do I get started?',
    a: "Send a message through the form above or the {link}, or call or text the number in the header. I'll follow up to set up a discovery call and go from there.",
    link: { text: 'contact page', route: '/contact' },
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: 'What should I include in my message?',
    a: 'A short summary of what you need, your timeline if you have one, and any relevant links or files, like an existing site or a reference design, so I have a clear picture before we talk.',
  },
  {
    q: 'How quickly do you respond?',
    a: "I read every message personally and try to reply within a day or two. If your inquiry is time-sensitive, mention that in your message and I'll do my best to get back to you sooner.",
  },
  {
    q: 'Do you take on small projects, not just full systems?',
    a: "Yes. Whether it's a full custom system, a smaller front-end build, or a fix to an existing site, feel free to reach out and describe what you need. If you're not sure it fits, choose \"Not Sure Yet\" as the project type and I'll help figure it out.",
  },
  {
    q: 'What happens after I submit the form?',
    a: "The form opens your email client with your message pre-filled, so you can review it and hit send. I'll read it personally and follow up to talk through next steps.",
  },
];

export const PRICING_FAQS: Faq[] = [
  {
    q: 'Do you require a deposit?',
    a: 'Yes. Most projects start with a 30% deposit before work begins, with the remaining balance split across agreed milestones or due at delivery, depending on the size of the project.',
  },
  {
    q: 'How are payments structured for larger projects?',
    a: 'Larger projects are typically split into milestones, for example 30% to start, 40% at a working prototype or midpoint, and 30% on final delivery. The exact schedule and milestones are agreed on before any work begins.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Each project includes a reasonable number of revision rounds during development, agreed on when we scope the work together. Changes beyond the original scope, like new features added after development has started, are quoted separately.',
  },
  {
    q: 'Who owns the final product?',
    a: "Once the project is fully paid, you own the source code, design files, and final product. I'm happy to hand over full documentation and access as part of delivery.",
  },
  {
    q: 'Do I need a maintenance plan?',
    a: "No, maintenance plans are optional. If you don't need ongoing support after launch, a one-time project with its included post-launch support window is enough. You can always add a maintenance plan later if your needs change.",
  },
  {
    q: "Can I request a custom package instead of what's listed here?",
    a: "Yes. The pricing above covers common scenarios, but if your project doesn't fit neatly into one category, or you need a mix of services, reach out and I'll put together a custom quote around what you actually need.",
  },
];

export const SERVICES_FAQS: Faq[] = [
  {
    q: 'What kind of projects do you take on?',
    a: "Custom software applications across web, mobile, and desktop, business systems, business websites, front-end builds from an existing design, and ongoing maintenance or SEO support. If you're not sure whether your project fits, reach out and we can talk it through.",
  },
  {
    q: 'Do you work with clients remotely?',
    a: "Yes. Communication happens over email and calls, and I can work with clients wherever they're based.",
  },
  {
    q: 'How do we get started?',
    a: "Send a message through the contact page with a bit about your project. I'll follow up to set up a discovery call and go from there.",
  },
  {
    q: 'Can you help with an existing website instead of a new build?',
    a: 'Yes, I take on maintenance, fixes, and improvements to existing sites, not just new builds.',
  },
];
