import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { HomeMotionService } from '../../core/services/home-motion.service';

/**
 * Put on a Home <section> to give its cards a GSAP scroll entrance and its heading
 * accent a decode effect. Built in ngAfterViewInit (the cards are rendered by then),
 * outside Angular's zone, and fully reverted in ngOnDestroy.
 */
@Directive({ selector: '[appMotionSection]' })
export class MotionSectionDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(HomeMotionService);
  private readonly zone = inject(NgZone);
  private mm?: ReturnType<HomeMotionService['animateSection']>;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.mm = this.motion.animateSection(this.el);
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
