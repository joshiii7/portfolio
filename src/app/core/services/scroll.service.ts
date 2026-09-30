import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const SHOW_TOP_BUTTON_AFTER_PX = 300;

/**
 * The only place in the app that listens to window scroll. Reads scrollY in
 * the listener, batches the signal write into the next animation frame, and
 * only publishes the derived flag when it actually flips, so a scroll tick
 * never forces more work than a single boolean comparison.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly scrollY = signal(0);
  private ticking = false;

  /** True once the page is scrolled past the threshold; drives the "Top" button. */
  readonly showTopButton = computed(() => this.scrollY() > SHOW_TOP_BUTTON_AFTER_PX);

  constructor() {
    // Prerendering has no window; scroll only matters in the browser.
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    window.addEventListener(
      'scroll',
      () => {
        if (this.ticking) return;
        this.ticking = true;
        window.requestAnimationFrame(() => {
          this.ticking = false;
          this.scrollY.set(window.scrollY);
        });
      },
      { passive: true },
    );
    window.requestAnimationFrame(() => this.scrollY.set(window.scrollY));

    // Every route is its own "page": start each one at the top, instantly
    // (CSS scroll-behavior: smooth would otherwise animate the jump).
    inject(Router).events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
