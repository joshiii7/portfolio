import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';

/**
 * A thin accent bar at the top of every page that fills as you scroll. It only sets a
 * transform (scaleX) from a passive scroll listener, batched to one update per frame, so it
 * needs no animation library and adds nothing to the bundle. Under reduced motion the CSS
 * hides it and the listeners are removed.
 */
@Component({
  selector: 'app-scroll-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './scroll-progress.component.scss',
  template: `<div class="scroll-progress" #bar aria-hidden="true"></div>`,
})
export class ScrollProgressComponent implements AfterViewInit, OnDestroy {
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>('bar');
  private readonly zone = inject(NgZone);
  private cleanup?: () => void;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.start());
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  private start(): void {
    const el = this.bar().nativeElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const on = () => {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      update();
    };
    const off = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => (reduced.matches ? off() : on());

    reduced.addEventListener('change', sync);
    sync();
    this.cleanup = () => {
      reduced.removeEventListener('change', sync);
      off();
    };
  }
}
