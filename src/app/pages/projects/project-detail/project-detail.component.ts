import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectPictureComponent } from '../../../shared/components/project-picture/project-picture.component';

/**
 * One project, written up like an article: a hero with the project in a browser frame, a sticky
 * "at a glance" rail beside the story, and a link on to the next project. My own builds
 * (ShowcaseProject) tell the story through highlights and screenshots; client work
 * (CapstoneProject) tells it as problem, build, result.
 */
@Component({
  selector: 'app-project-detail',
  imports: [PageBannerComponent, ProjectPictureComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-detail.component.scss',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
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

  /** The problem / build / result of a client project, in reading order. */
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

  /** Text in the browser frame's address bar: the real address for a live project, else its name. */
  protected readonly frameLabel = computed(() => {
    const p = this.entry();
    if (!p) return '';
    if ('live' in p && p.live) return p.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return p.name;
  });

  /** The project after this one in the list, wrapping around, so the last page still leads somewhere. */
  protected readonly next = computed(() => {
    const list = this.content.featuredProjects;
    const i = list.findIndex((p) => p.slug === this.slug());
    return i === -1 || list.length < 2 ? null : list[(i + 1) % list.length];
  });

  /** What the browser should assume about the sizes it will show the screenshots at. */
  protected readonly coverSizes = '(min-width: 1200px) 1100px, 92vw';
  protected readonly shotSizes = '(min-width: 1024px) 760px, 92vw';
  protected readonly phoneSizes = '(min-width: 768px) 300px, 70vw';
}
