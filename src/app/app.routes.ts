import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ContentService } from './core/services/content.service';

const serviceTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).service(route.paramMap.get('id') ?? '')?.title ?? 'Service Not Found';

const serviceDescription: ResolveFn<string | undefined> = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).service(route.paramMap.get('id') ?? '')?.metaDescription;

const projectTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const project = inject(ContentService).project(route.paramMap.get('slug') ?? '');
  return project ? `${project.name} Case Study` : 'Project Not Found';
};

const projectDescription: ResolveFn<string | undefined> = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).project(route.paramMap.get('slug') ?? '')?.metaDescription;

export const routes: Routes = [
  {
    path: '',
    title: 'Joshi Adlawan | Full-Stack Software Developer',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    title: 'About',
    data: { description: "Learn about Joshi Adlawan's background, approach, and experience as a full-stack software developer." },
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'services',
    children: [
      {
        path: '',
        title: 'Services',
        data: { description: 'Software development services from Joshi Adlawan: custom web, mobile, and desktop applications, business systems, front-end development, and website maintenance.' },
        loadComponent: () => import('./pages/services/services-list/services-list.component').then((m) => m.ServicesListComponent),
      },
      {
        path: ':id',
        title: serviceTitle,
        resolve: { description: serviceDescription },
        loadComponent: () => import('./pages/services/service-detail/service-detail.component').then((m) => m.ServiceDetailComponent),
      },
    ],
  },
  {
    path: 'pricing',
    title: 'Pricing',
    data: { description: 'Starting prices for custom web, mobile, and desktop application development from Joshi Adlawan, plus monthly and annual maintenance plans.' },
    loadComponent: () => import('./pages/pricing/pricing.component').then((m) => m.PricingComponent),
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        title: 'Projects',
        data: { description: 'Case studies of real software systems built by Joshi Adlawan, including web applications and business systems, with the problem, solution, and outcome for each project.' },
        loadComponent: () => import('./pages/projects/projects-list/projects-list.component').then((m) => m.ProjectsListComponent),
      },
      {
        path: ':slug',
        title: projectTitle,
        resolve: { description: projectDescription },
        loadComponent: () => import('./pages/projects/project-detail/project-detail.component').then((m) => m.ProjectDetailComponent),
      },
    ],
  },
  {
    path: 'contact',
    title: 'Contact',
    data: { description: 'Get in touch with Joshi Adlawan to discuss your next software development project.' },
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'accessibility',
    title: 'Accessibility',
    data: { description: "Joshi Adlawan's commitment to building an accessible portfolio site, including keyboard navigation, focus states, and how to report an issue." },
    loadComponent: () => import('./pages/legal/accessibility/accessibility.component').then((m) => m.AccessibilityComponent),
  },
  {
    path: 'privacy',
    title: 'Privacy Policy',
    data: { description: "Joshi Adlawan's privacy policy: what contact-form information is collected, why, how it's used, and how to get in touch about it." },
    loadComponent: () => import('./pages/legal/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
