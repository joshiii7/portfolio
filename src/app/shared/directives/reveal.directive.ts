import { Directive, ElementRef, Injectable, OnDestroy, OnInit, booleanAttribute, inject, input, signal } from '@angular/core';

/** One IntersectionObserver shared by every [appReveal] element on the page. */
@Injectable({ providedIn: 'root' })
export class RevealObserver {
  private readonly callbacks = new Map<Element, () => void>();

  private readonly observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.callbacks.get(entry.target)?.();
        this.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
  );

  observe(el: Element, onReveal: () => void): void {
    this.callbacks.set(el, onReveal);
    this.observer.observe(el);
  }

  unobserve(el: Element): void {
    this.callbacks.delete(el);
    this.observer.unobserve(el);
  }
}

/**
 * Fade-and-rise on first scroll into view. Applies the `.reveal` styles
 * (global, see styles/_utilities.scss) and flips `.is-visible` once.
 */
@Directive({
  selector: '[appReveal]',
  host: { '[class.reveal]': 'enabled()', '[class.is-visible]': 'visible()' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);

  /** `[appReveal]="false"` opts out, for elements animated by AOS instead. */
  readonly enabled = input(true, { alias: 'appReveal', transform: booleanAttribute });

  protected readonly visible = signal(false);

  ngOnInit(): void {
    if (!this.enabled()) return;
    this.observer.observe(this.el, () => this.visible.set(true));
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.el);
  }
}
