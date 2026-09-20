import { Injectable } from '@angular/core';
import AOS from 'aos';

/**
 * Animate On Scroll, set up the way fingerdash does it: init() is called once
 * a page has rendered (the app shell does this after every navigation), the
 * animation plays as an element enters the screen and again scrolling back
 * (once: false, mirror: true), and trigger points are refreshed after web
 * fonts load because they change heights. Everything stays static for visitors
 * who prefer reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class AosService {
  private started = false;

  init(): void {
    if (this.started) {
      // AOS.init() adds new scroll/resize listeners each time it is called, so later
      // pages just re-scan the DOM for their [data-aos] elements.
      AOS.refreshHard();
      return;
    }

    this.started = true;
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 90,
      once: false,
      mirror: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    void document.fonts?.ready.then(() => AOS.refresh());
  }
}
