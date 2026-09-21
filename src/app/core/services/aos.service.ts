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
  private readonly watched = new WeakSet<Element>();

  /**
   * Mirror mode fades an element out as soon as its top scrolls past the top of the screen, which
   * hides the part of a tall element (a portrait, a case study card) that is still being read. So an
   * element that turns out taller than 40% of the screen animates in once instead and then stays.
   * It watches sizes rather than measuring once, because images make elements grow after init().
   */
  private readonly tallWatcher =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver((entries) => {
          let changed = false;
          for (const { target } of entries) {
            if (target.hasAttribute('data-aos-once')) continue;
            if (target.getBoundingClientRect().height > window.innerHeight * 0.4) {
              target.setAttribute('data-aos-once', 'true');
              changed = true;
            }
          }
          if (changed) AOS.refreshHard();
        });

  init(): void {
    this.watchTallElements();

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

  private watchTallElements(): void {
    document.querySelectorAll('[data-aos]').forEach((element) => {
      if (this.watched.has(element)) return;
      this.watched.add(element);
      this.tallWatcher?.observe(element);
    });
  }
}
