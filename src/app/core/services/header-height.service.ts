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
 *
 * The header also shrinks once the page is scrolled (the navbar calls setCompact), and page
 * padding must keep matching the full-size header, so a resize that happens while it is
 * compact is remembered and measured after it has grown back.
 */
@Injectable({ providedIn: 'root' })
export class HeaderHeightService {
  private header: HTMLElement | null = null;
  private compact = false;
  private stale = false;

  constructor() {
    window.addEventListener('resize', () => this.sync());
  }

  register(header: HTMLElement): void {
    this.header = header;
    this.sync();
    document.fonts?.ready.then(() => this.sync());
  }

  /** The navbar reports whether the header is in its shrunken, scrolled state. */
  setCompact(compact: boolean): void {
    this.compact = compact;
    // Wait out the 0.3s grow-back transition before measuring.
    if (!compact && this.stale) setTimeout(() => this.sync(), 400);
  }

  private sync(): void {
    if (!this.header) return;
    if (this.compact) {
      this.stale = true;
      return;
    }
    this.stale = false;
    document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
  }
}
