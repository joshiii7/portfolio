import { Faq } from './faq.model';

export type IconName =
  | 'dashboard' | 'browser' | 'code' | 'checklist' | 'layers' | 'smartphone'
  | 'layout' | 'zap' | 'wrench' | 'target' | 'shield' | 'report' | 'mail';

export interface ServiceInclude {
  icon: IconName;
  title: string;
  text: string;
}

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  metaDescription: string;
  detail: string;
  includes: ServiceInclude[];
  relatedProjects?: string[];
  outcomes: string[];
  audience: string[];
  faqs: Faq[];
}
