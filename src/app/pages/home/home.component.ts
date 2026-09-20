import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';
import { HOME_FAQS } from '../../core/data/faqs';
import { MOTION } from '../../core/services/motion-conditions';
import { MotionService } from '../../core/services/motion.service';
import { CtaBandComponent } from '../../shared/components/cta-band/cta-band.component';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { ToolsMarqueeComponent } from '../../shared/components/tools-marquee/tools-marquee.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsPreviewComponent } from './projects-preview/projects-preview.component';
import { ServicesPreviewComponent } from './services-preview/services-preview.component';
import { WhyMeComponent } from './why-me/why-me.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ToolsMarqueeComponent,
    ServicesPreviewComponent,
    ProjectsPreviewComponent,
    WhyMeComponent,
    FaqSectionComponent,
    CtaBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Fixed 3px bar above the header. It starts collapsed (scaleX(0)), so reduced-motion
  // visitors, where GSAP never runs, simply don't get one.
  styles: `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 1200;
      background: var(--color-accent);
      transform: scaleX(0);
      transform-origin: left center;
      pointer-events: none;
    }
  `,
  template: `
    <div class="scroll-progress" #progress aria-hidden="true"></div>
    <app-hero />
    <app-tools-marquee />
    <app-services-preview />
    <app-projects-preview />
    <app-why-me />
    <app-faq-section
      idPrefix="homeFaq"
      intro="A few things people usually ask before starting a project."
      [faqs]="faqs"
    />
    <app-cta-band
      title="Have a Project in"
      accent="Mind?"
      text="Tell me about it and I'll get back to you so we can talk through scope, timeline, and next steps."
    />
  `,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  protected readonly faqs = HOME_FAQS;

  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private mm?: ReturnType<MotionService['gsap']['matchMedia']>;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const { gsap } = this.motion;
      const mm = gsap.matchMedia();
      this.mm = mm;

      mm.add(MOTION.ok, () => {
        gsap.to(this.progress().nativeElement, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
