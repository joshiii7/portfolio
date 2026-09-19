import { Injectable } from '@angular/core';
import AOS from 'aos';

/**
 * Animate On Scroll, set up the way fingerdash does it: every page that uses
 * data-aos calls init() once it has rendered, the animation plays as an element
 * enters the screen and again scrolling back (once: false, mirror: true), and
 * trigger points are refreshed after web fonts load because they change
 * heights. Everything stays static for visitors who prefer reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class AosService {
  init(): void {
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
