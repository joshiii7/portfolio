import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { SERVICES_FAQS } from '../../../core/data/faqs';
import { ContentService } from '../../../core/services/content.service';
import { MOTION } from '../../../core/services/motion-conditions';
import { MotionService } from '../../../core/services/motion.service';
import { FaqSectionComponent } from '../../../shared/components/faq-section/faq-section.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card.component';
import { SkillsGridComponent } from '../../../shared/components/skills-grid/skills-grid.component';

interface ProcessStep {
  title: string;
  text: string;
}

@Component({
  selector: 'app-services-list',
  imports: [
    PageBannerComponent,
    ServiceCardComponent,
    SkillsGridComponent,
    FaqSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services-list.component.scss',
  templateUrl: './services-list.component.html',
})
export class ServicesListComponent implements AfterViewInit, OnDestroy {
  private readonly motion = inject(MotionService);
  private readonly zone = inject(NgZone);
  private readonly processList = viewChild.required<ElementRef<HTMLElement>>('processList');
  private mm?: ReturnType<MotionService['gsap']['matchMedia']>;

  protected readonly photos = WORKSPACE_PHOTOS;
  protected readonly content = inject(ContentService);
  protected readonly faqs = SERVICES_FAQS;

  protected readonly process: ProcessStep[] = [
    { title: 'Discovery Call', text: "We talk through what you need, the problem you're trying to solve, and whether it's a good fit." },
    { title: 'Proposal & Scope', text: "I put together a clear scope and timeline so we're aligned before any work starts." },
    { title: 'Build', text: 'I build the project, with check-ins along the way so you can see progress and give feedback.' },
    { title: 'Review & Launch', text: 'We review the finished work together, make any final adjustments, and launch.' },
  ];

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.setupProcessTimeline());
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  /**
   * The process draws itself as you scroll: each numbered marker pops in and the connector to
   * the next step fills, one after another, scrubbed to scroll position (transform and opacity
   * only). The step text stays on AOS. Without motion the finished timeline just shows.
   */
  private setupProcessTimeline(): void {
    const { gsap } = this.motion;
    const list = this.processList().nativeElement;
    const mm = gsap.matchMedia(list);
    this.mm = mm;

    mm.add(MOTION.ok, () => {
      const steps = gsap.utils.toArray<HTMLElement>('.process-step', list);
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 60%', scrub: 0.5 },
      });

      steps.forEach((step, index) => {
        const marker = step.querySelector('.process-step__marker');
        const fill = step.querySelector('.process-step__fill');
        timeline.fromTo(marker, { scale: 0.6, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, index);
        if (fill) timeline.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'none' }, index + 0.3);
      });
    });
  }
}
