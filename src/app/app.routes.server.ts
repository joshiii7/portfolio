import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ContentService } from './core/services/content.service';

/**
 * Public routes are prerendered to static HTML at build time, so crawlers get the page content,
 * title, canonical and JSON-LD without running JavaScript. Home and Contact hold the contact form,
 * whose Turnstile setup reads `window` and is left untouched, so those two stay client-rendered
 * (Home's title, description and JSON-LD are already in index.html). Unknown URLs get the client shell.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'contact', renderMode: RenderMode.Client },
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => inject(ContentService).services.map((service) => ({ id: service.id })),
  },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => inject(ContentService).featuredProjects.map((project) => ({ slug: project.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
