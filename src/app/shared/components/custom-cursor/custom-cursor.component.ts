import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';
import { MOTION } from '../../../core/services/motion-conditions';
import { MotionService } from '../../../core/services/motion.service';

type CursorMode = 'hidden' | 'default' | 'link' | 'text';

/** Things the ring grows over. */
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for]';
/** Text entry: the native I-beam must stay readable, so the custom cursor steps aside. */
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable=""], [contenteditable="true"]';

/**
 * A small dot and a lagging ring that follow the mouse, on top of the native cursor (which
 * stays visible). The ring grows over links and buttons, and both hide over text fields
 * and when the mouse leaves the window. It only runs for a real mouse with motion allowed
 * (MOTION.pointer), never on touch or under reduced motion, and CSS removes it there too.
 * Loaded through @defer, so it is not in the initial bundle.
 */
@Component({
  selector: 'app-custom-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './custom-cursor.component.scss',
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="cursor-ring" #ring></div>
    <div class="cursor-dot" #dot></div>
  `,
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private readonly ringRef = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dotRef = viewChild.required<ElementRef<HTMLElement>>('dot');
  private mm?: ReturnType<MotionService['gsap']['matchMedia']>;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.setupMotion());
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  private setupMotion(): void {
    const { gsap } = this.motion;
    const mm = gsap.matchMedia();
    this.mm = mm;

    mm.add(MOTION.pointer, () => {
      const ring = this.ringRef().nativeElement;
      const dot = this.dotRef().nativeElement;
      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

      let mode: CursorMode = 'hidden';
      let placed = false;

      const setMode = (next: CursorMode) => {
        if (next === mode) return;
        mode = next;
        const off = next === 'hidden' || next === 'text';
        gsap.to(ring, { opacity: off ? 0 : 0.6, scale: next === 'link' ? 1.6 : 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(dot, { opacity: off ? 0 : 1, scale: next === 'link' ? 0.4 : 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
      };

      const modeFor = (target: EventTarget | null): CursorMode => {
        const el = target instanceof Element ? target : null;
        if (el?.closest(TEXT_FIELD)) return 'text';
        if (el?.closest(INTERACTIVE)) return 'link';
        return 'default';
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        if (!placed) {
          // First movement: appear where the mouse is instead of flying in from the corner.
          gsap.set([ring, dot], { x: event.clientX, y: event.clientY });
          placed = true;
        }
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        if (mode === 'hidden') setMode(modeFor(event.target));
      };
      const onOver = (event: PointerEvent) => {
        if (event.pointerType === 'mouse' && mode !== 'hidden') setMode(modeFor(event.target));
      };
      const onLeave = () => setMode('hidden');

      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);

      return () => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerover', onOver);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      };
    });
  }
}
