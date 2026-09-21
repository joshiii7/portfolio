import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP core plus ScrollTrigger, registered once. Shared by every page that animates
 * (Home, Services, the cursor). The text plugins (SplitText, ScrambleText) are only
 * registered by HomeMotionService, so other pages never download them.
 *
 * Components create their animations in ngAfterViewInit, outside Angular's zone, through
 * a gsap.matchMedia() scoped to their element, and call revert() on it in ngOnDestroy,
 * which kills every tween and trigger.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  readonly gsap = gsap;
  readonly ScrollTrigger = ScrollTrigger;
}
