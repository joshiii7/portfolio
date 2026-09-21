import { ComparisonRow, MaintenancePlan, PricingPlan } from '../models/pricing.model';

export const PROJECT_PLANS: PricingPlan[] = [
  {
    name: 'Business Website',
    price: 25000,
    period: 'one-time, and up depending on scope',
    tagline: 'A custom-coded brochure or lead-generation site that gives your business a professional home online.',
    features: [
      'Custom-coded, mobile-responsive design',
      'Contact and inquiry forms',
      'Basic on-page SEO',
      'Cross-browser and mobile testing',
      '30 days of post-launch bug-fix support',
    ],
    scopeNote: 'Does not include user accounts, dashboards, or database-backed features. See Custom Web Application for those.',
  },
  {
    name: 'Custom Web Application / Business System',
    price: 80000,
    period: 'one-time, typically ₱80,000–₱120,000+ depending on complexity',
    tagline: 'Database-backed systems: accounts, dashboards, records, and workflows built around how your business runs.',
    features: [
      'User accounts and role-based access',
      'Custom dashboards and reporting',
      'Database design and data management',
      'Workflow automation for your specific process',
      '30 days of post-launch bug-fix support',
    ],
    scopeNote: 'Multi-module systems, advanced integrations, or large-scale data migrations are scoped and quoted individually.',
  },
  {
    name: 'Mobile Application',
    price: 120000,
    period: 'one-time, limited MVP scope',
    tagline: 'A focused first version of your app: core screens, one backend integration, built to get real users in hand.',
    features: [
      'Android, iOS, or cross-platform from one codebase',
      'A defined set of core screens and user flows',
      'One backend or API integration',
      'Basic app-store submission guidance',
      '30 days of post-launch bug-fix support',
    ],
    scopeNote: 'Complex payments, real-time chat, geolocation, advanced integrations, and extensive app-store compliance work are scoped and quoted separately.',
  },
  {
    name: 'Desktop Application',
    price: 80000,
    period: 'one-time, focused single-workflow scope',
    tagline: 'A focused Windows tool for one core workflow, not a full multi-user platform.',
    features: [
      'Windows desktop application',
      'Local or simple networked database',
      'One core workflow automated',
      'Installer and setup package',
      '30 days of post-launch bug-fix support',
    ],
    scopeNote: 'Multi-user systems, advanced reporting, data synchronization, multiple roles, and complex integrations are scoped and quoted separately.',
  },
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    name: 'Basic Care',
    monthly: 3000,
    annual: 30000,
    tagline: 'Keep your site secure, backed up, and running smoothly.',
    features: [
      'Uptime and security monitoring',
      'Regular backups',
      'Software and dependency updates',
      'Minor content updates (up to 2 a month)',
      'Email support (2 to 3 business day response)',
    ],
    featured: false,
  },
  {
    name: 'Standard Care',
    monthly: 8000,
    annual: 80000,
    tagline: 'Ongoing fixes and small improvements, not just upkeep.',
    features: [
      'Everything in Basic Care',
      'Bug fixes and small feature tweaks (up to 4 hours a month)',
      'Performance checks and optimization',
      'Priority email support (1 to 2 business day response)',
    ],
    featured: true,
  },
  {
    name: 'Priority Care',
    monthly: 18000,
    annual: 180000,
    tagline: 'For systems that need fast turnaround and dedicated attention.',
    features: [
      'Everything in Standard Care',
      'Up to 10 hours a month of development time',
      'Proactive monitoring with a monthly health report',
      'Priority support (same or next business day)',
      'Direct phone and chat access',
    ],
    featured: false,
  },
];

/** Built from each plan's own feature list above, in the same order as MAINTENANCE_PLANS (Basic, Standard, Priority). */
export const MAINTENANCE_COMPARISON: ComparisonRow[] = [
  { label: 'Uptime and security monitoring', values: [true, true, true] },
  { label: 'Regular backups', values: [true, true, true] },
  { label: 'Software and dependency updates', values: [true, true, true] },
  { label: 'Minor content updates', values: ['Up to 2 a month', true, true] },
  { label: 'Bug fixes and development time', values: [false, 'Up to 4 hours a month', 'Up to 10 hours a month'] },
  { label: 'Performance checks and optimization', values: [false, true, true] },
  { label: 'Proactive monitoring with a monthly health report', values: [false, false, true] },
  { label: 'Support and response time', values: ['Email, 2 to 3 business days', 'Priority email, 1 to 2 business days', 'Priority support, same or next business day'] },
  { label: 'Direct phone and chat access', values: [false, false, true] },
];
