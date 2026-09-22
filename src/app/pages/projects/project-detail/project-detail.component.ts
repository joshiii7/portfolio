import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { ProjectImage } from '../../../core/models/project.model';
import { ContentService } from '../../../core/services/content.service';
import { DeviceFrameComponent } from '../../../shared/components/device-frame/device-frame.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCarouselComponent } from '../../../shared/components/project-carousel/project-carousel.component';
import { splitOnLinkPlaceholder } from '../../../shared/utils/text-link';

/**
 * One project, written up like an article: the site's page banner, breadcrumbs, a horizontal strip
 * of quick facts, then the story itself as a single column of alternating text/image sections (no
 * sidebar, no separate hero screenshot), and a carousel of other projects at the end. My own builds
 * (ShowcaseProject) tell it through highlights and a full gallery of screenshots; capstone work
 * (CapstoneProject) tells it as problem, build, result. Screenshots open in Fancybox (see
 * ngAfterViewInit) rather than a hand-rolled lightbox. Fancybox is imported statically (not lazily)
 * so it's bound and ready the instant the page renders, with no load-order race to debug; this
 * component only ever loads inside the already-lazy project-detail route chunk, so the page weight
 * it adds never reaches any other route.
 */
@Component({
  selector: 'app-project-detail',
  imports: [DeviceFrameComponent, PageBannerComponent, ProjectCarouselComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-detail.component.scss',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements AfterViewInit, OnDestroy {
  protected readonly photos = WORKSPACE_PHOTOS;
  private readonly content = inject(ContentService);

  /** Route param, bound by the router (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly entry = computed(() => this.content.projectEntry(this.slug()));

  protected readonly showcase = computed(() => {
    const p = this.entry();
    return p && 'images' in p ? p : null;
  });

  protected readonly capstone = computed(() => {
    const p = this.entry();
    return p && 'problem' in p ? p : null;
  });

  /** The problem / build / result of a capstone project, in reading order. Capstone projects only
   *  ever get the one cover screenshot, so all three chapters share it as their alternating-section image. */
  protected readonly chapters = computed(() => {
    const p = this.capstone();
    return p
      ? [
          { title: 'The problem', text: p.problem },
          { title: 'What I built', text: p.solution },
          { title: 'The result', text: p.result },
        ]
      : [];
  });

  /** What the browser should assume about the sizes it will show the screenshots at. */
  protected readonly shotSizes = '(min-width: 1024px) 640px, 92vw';

  /** Splits a caption paragraph on its `{link}` placeholder so the link renders as a router link. */
  protected captionParts(paragraph: string): [string, string] {
    return splitOnLinkPlaceholder(paragraph);
  }

  /** Which paragraph (of possibly several) is the one that carries the `{link}` placeholder. */
  protected hasLinkPlaceholder(paragraph: string): boolean {
    return paragraph.includes('{link}');
  }

  /** The full-size file Fancybox should open: the largest width this screenshot ships. */
  protected fullImageUrl(image: ProjectImage): string {
    return `${image.base}-${Math.max(...image.widths)}.webp`;
  }

  /** Every other project, for the carousel at the end of the page. */
  protected readonly relatedProjects = computed(() => this.content.featuredProjects.filter((entry) => entry.slug !== this.slug()));

  ngAfterViewInit(): void {
    // Bound globally (Fancybox's own default target, document.body) rather than scoped to this
    // component's host: the simplest, most standard usage, and the one Fancybox itself is tested
    // against. Matching elements are found by live selector at click time, so this survives
    // Angular re-rendering the gallery (a slug change reusing this same route/component) without
    // needing to rebind.
    Fancybox.bind('[data-fancybox]');
  }

  ngOnDestroy(): void {
    Fancybox.unbind('[data-fancybox]');
  }
}
