import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { MOTION } from '../../../core/services/motion-conditions';
import { MotionService } from '../../../core/services/motion.service';

/** Drift speed in px per second. */
const SPEED = 36;

/**
 * A slow, seamless loop of the languages and tools from the Services page, in a band
 * under the hero. GSAP moves the track with its ticker (transform only). The list
 * appears twice for the loop; the copy is aria-hidden. It pauses on hover and while
 * anything inside has focus, and has a real Pause button for keyboard and touch
 * visitors. Under reduced motion GSAP never runs and CSS shows one static wrapped row.
 */
@Component({
  selector: 'app-tools-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tools-marquee.component.scss',
  host: { 'data-aos': 'fade-up' },
  template: `
    <div class="marquee__viewport">
      <div class="marquee__move" #move>
        <ul class="marquee__list" #list aria-label="Languages and tools I work with">
          @for (item of items; track item.name) {
            <li class="marquee__item"><img [src]="item.icon" alt="" width="24" height="24" decoding="async" /><span>{{ item.name }}</span></li>
          }
        </ul>
        <ul class="marquee__list marquee__list--copy" aria-hidden="true">
          @for (item of items; track item.name) {
            <li class="marquee__item"><img [src]="item.icon" alt="" width="24" height="24" decoding="async" /><span>{{ item.name }}</span></li>
          }
        </ul>
      </div>
    </div>
    <div class="marquee__controls">
      <button
        type="button"
        class="marquee__toggle"
        [attr.aria-label]="paused() ? 'Play the scrolling list of tools' : 'Pause the scrolling list of tools'"
        (click)="toggle()"
      >{{ paused() ? 'Play' : 'Pause' }}</button>
    </div>
  `,
})
export class ToolsMarqueeComponent implements AfterViewInit, OnDestroy {
  private readonly content = inject(ContentService);
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly moveRef = viewChild.required<ElementRef<HTMLElement>>('move');
  private readonly listRef = viewChild.required<ElementRef<HTMLElement>>('list');
  private mm?: ReturnType<MotionService['gsap']['matchMedia']>;
  private syncSpeed?: () => void;
  /** Set when Play is pressed, so hover or focus on the button can't keep the band stopped. */
  private resumed = false;

  protected readonly items = [...this.content.languages, ...this.content.tools];
  protected readonly paused = signal(false);

  protected toggle(): void {
    const next = !this.paused();
    this.paused.set(next);
    this.resumed = !next;
    this.syncSpeed?.();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.setupMotion());
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  private setupMotion(): void {
    const { gsap } = this.motion;
    const mm = gsap.matchMedia(this.host);
    this.mm = mm;

    mm.add(MOTION.ok, () => {
      const move = this.moveRef().nativeElement;
      const list = this.listRef().nativeElement;
      const setX = gsap.quickSetter(move, 'x', 'px');

      const state = { factor: 1 };
      let loopWidth = list.offsetWidth;
      let x = 0;
      let hovered = false;
      let focused = false;
      let onScreen = true;

      // One frame of drift. The list is duplicated, so wrapping by one list width is seamless.
      const tick = () => {
        if (!onScreen || state.factor === 0) return;
        x -= (SPEED / 60) * state.factor * gsap.ticker.deltaRatio();
        if (x <= -loopWidth) x += loopWidth;
        setX(x);
      };

      // Ease to a stop / back to speed so pausing never snaps.
      this.syncSpeed = () => {
        const stopped = this.paused() || ((hovered || focused) && !this.resumed);
        gsap.to(state, { factor: stopped ? 0 : 1, duration: 0.4, ease: 'power2.out', overwrite: true });
      };

      const onEnter = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        hovered = true;
        this.syncSpeed?.();
      };
      const onLeave = () => {
        hovered = false;
        if (!focused) this.resumed = false;
        this.syncSpeed?.();
      };
      const onFocusIn = () => {
        focused = true;
        this.syncSpeed?.();
      };
      const onFocusOut = () => {
        focused = false;
        if (!hovered) this.resumed = false;
        this.syncSpeed?.();
      };

      const resizeObserver = new ResizeObserver(() => (loopWidth = list.offsetWidth));
      resizeObserver.observe(list);
      // No point moving pixels nobody can see.
      const intersectionObserver = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting));
      intersectionObserver.observe(this.host);

      this.host.addEventListener('pointerenter', onEnter);
      this.host.addEventListener('pointerleave', onLeave);
      this.host.addEventListener('focusin', onFocusIn);
      this.host.addEventListener('focusout', onFocusOut);
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        this.host.removeEventListener('pointerenter', onEnter);
        this.host.removeEventListener('pointerleave', onLeave);
        this.host.removeEventListener('focusin', onFocusIn);
        this.host.removeEventListener('focusout', onFocusOut);
        gsap.set(move, { clearProps: 'transform' });
        this.syncSpeed = undefined;
      };
    });
  }
}
