import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/** Media conditions every GSAP animation runs inside, so reduced motion and touch stay static. */
export const MOTION = {
  /** Anything animated at all: skipped entirely when the visitor prefers reduced motion. */
  ok: '(prefers-reduced-motion: no-preference)',
  /** Heavier pointer-driven effects (magnetic buttons, parallax): desktop with a real mouse only. */
  desktop: '(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (hover: hover) and (pointer: fine)',
} as const;

const CARD_OFFSET = 36;

/**
 * GSAP setup and the pieces shared by the Home sections. Plugins are registered
 * once here (free in the current npm release: ScrollTrigger, SplitText,
 * ScrambleTextPlugin). Components create their animations in ngAfterViewInit,
 * outside Angular's zone, through a gsap.matchMedia() scoped to their element,
 * and call revert() on it in ngOnDestroy, which kills every tween and trigger.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  constructor() {
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  readonly gsap = gsap;
  readonly ScrollTrigger = ScrollTrigger;
  readonly SplitText = SplitText;

  /** Card entrances and heading-accent decode for one Home section. */
  animateSection(scope: HTMLElement): gsap.MatchMedia {
    const mm = gsap.matchMedia(scope);
    mm.add(MOTION.ok, () => {
      this.revealCards(gsap.utils.toArray<HTMLElement>('.card', scope));
      this.decodeAccents(gsap.utils.toArray<HTMLElement>('.heading-accent', scope));
    });
    return mm;
  }

  /**
   * Staggered rise-and-fade as batches of cards enter, reversed on the way back up
   * (the same mirror behaviour AOS has elsewhere). `.card` has `transition: all`, which
   * would smooth every GSAP frame, so it is switched off while animating and the inline
   * styles are cleared afterwards to hand hover back to the stylesheet.
   */
  private revealCards(cards: HTMLElement[]): void {
    if (!cards.length) return;

    // Opacity, not visibility, so links inside a card stay keyboard-focusable while hidden.
    const hidden = { opacity: 0, y: CARD_OFFSET, transition: 'none' };
    gsap.set(cards, hidden);

    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          overwrite: true,
          onComplete: () => void gsap.set(batch, { clearProps: 'transform,opacity,transition' }),
        }),
      onLeaveBack: (batch) => void gsap.to(batch, { ...hidden, duration: 0.4, ease: 'power2.in', overwrite: true }),
    });
  }

  /**
   * The blue accent word in a heading scrambles and resolves once as it scrolls in.
   * The heading gets an aria-label with its real text while it runs, and the word's
   * width is locked so the line doesn't reflow on scrambled characters.
   */
  private decodeAccents(accents: HTMLElement[]): void {
    for (const accent of accents) {
      const heading = accent.closest('h2');
      const finalText = accent.textContent ?? '';
      if (!heading || !finalText) continue;

      const label = heading.textContent ?? finalText;
      gsap.to(accent, {
        duration: 0.9,
        ease: 'none',
        scrambleText: { text: finalText, chars: 'upperCase', speed: 0.6, revealDelay: 0.1 },
        scrollTrigger: {
          trigger: accent,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            heading.setAttribute('aria-label', label);
            accent.style.display = 'inline-block';
            accent.style.minWidth = `${accent.offsetWidth}px`;
          },
        },
        onComplete: () => {
          heading.removeAttribute('aria-label');
          accent.style.removeProperty('display');
          accent.style.removeProperty('min-width');
        },
      });
    }
  }
}
