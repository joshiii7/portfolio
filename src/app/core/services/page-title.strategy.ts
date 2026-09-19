import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SITE } from '../data/site';

const DEFAULT_DESCRIPTION =
  'Joshi Adlawan, full-stack software developer building web, mobile, and desktop applications for businesses, institutions, and startups.';

/**
 * Per-route <title>, meta description, and social tags, so client-side
 * navigation keeps the same head metadata the separate HTML pages had.
 * A route sets `title` and `data.description`; detail pages resolve both
 * from their content.
 */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const raw = this.buildTitle(snapshot) ?? SITE.name;
    const fullTitle = raw.includes(SITE.name) ? raw : `${raw} | ${SITE.name}`;
    const description = this.deepest(snapshot.root).data['description'] ?? DEFAULT_DESCRIPTION;
    const url = `${SITE.origin}${snapshot.url === '/' ? '/' : snapshot.url.split(/[?#]/)[0]}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.setCanonical(url);
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;
    while (current.firstChild) current = current.firstChild;
    return current;
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
