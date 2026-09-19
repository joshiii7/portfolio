import { Injectable } from '@angular/core';

/**
 * The mobile header is a stack of rows (logo, phone CTA, menu toggle bar), so
 * its real height doesn't reduce to one constant. Measuring it live and
 * publishing it as --header-height keeps banner padding, hero padding, and
 * scroll-padding-top correct on any screen size.
 *
 * Re-measures on viewport resize only, not via a ResizeObserver on the header
 * itself: the header also grows while the mobile menu is open, and that is a
 * temporary overlay state page padding should NOT react to.
 */
@Injectable({ providedIn: 'root' })
export class HeaderHeightService {
  private header: HTMLElement | null = null;

  constructor() {
    window.addEventListener('resize', () => this.sync());
  }

  register(header: HTMLElement): void {
    this.header = header;
    this.sync();
    document.fonts?.ready.then(() => this.sync());
  }

  private sync(): void {
    if (!this.header) return;
    document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
  }
}
