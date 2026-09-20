import { Injectable, inject } from '@angular/core';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MOTION } from './motion-conditions';
import { MotionService } from './motion.service';

const CARD_OFFSET = 36;

/**
 * The Home-only GSAP pieces: the text plugins (free in the current npm release) and the
 * section helpers built on them. Kept apart from MotionService so /services and the
 * cursor don't download SplitText or ScrambleText.
 */
@Injectable({ providedIn: 'root' })
export class HomeMotionService {
  private readonly motion = inject(MotionService);
  private readonly gsap = this.motion.gsap;
  private readonly ScrollTrigger = this.motion.ScrollTrigger;

  constructor() {
    this.gsap.registerPlugin(SplitText, ScrambleTextPlugin);
  }

  readonly SplitText = SplitText;

  /** Card entrances and heading-accent decode for one Home section. */
  animateSection(scope: HTMLElement): ReturnType<MotionService['gsap']['matchMedia']> {
    const mm = this.gsap.matchMedia(scope);
    mm.add(MOTION.ok, () => {
      this.revealCards(this.gsap.utils.toArray<HTMLElement>('.card', scope));
      this.decodeAccents(this.gsap.utils.toArray<HTMLElement>('.heading-accent', scope));
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
    const gsap = this.gsap;

    // Opacity, not visibility, so links inside a card stay keyboard-focusable while hidden.
    const hidden = { opacity: 0, y: CARD_OFFSET, transition: 'none' };
    gsap.set(cards, hidden);

    this.ScrollTrigger.batch(cards, {
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
      this.gsap.to(accent, {
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
