import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapstoneProject, ShowcaseProject } from '../../../core/models/project.model';
import { ProjectPictureComponent } from '../project-picture/project-picture.component';

/**
 * teaser  - image, Problem + Result (or the summary), tags, link to the project page (Home, Projects list)
 * related - image, Result, tags, link to the case study (service detail "Related Work")
 *
 * A ShowcaseProject (one of my own builds) shows a cropped screenshot, the summary, tags, and links.
 * The full write-up lives on the project page itself (ProjectDetailComponent).
 */
export type ProjectCardVariant = 'teaser' | 'related';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ProjectPictureComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-card.component.scss',
  templateUrl: './project-card.component.html',
  host: { class: 'card project-card' },
})
export class ProjectCardComponent {
  readonly project = input.required<CapstoneProject | ShowcaseProject>();
  readonly variant = input<ProjectCardVariant>('teaser');

  /** What the browser should assume about the screenshot's width so it downloads a fitting file. */
  protected readonly teaserSizes = '(min-width: 1024px) 337px, (min-width: 768px) 45vw, 92vw';

  protected readonly capstone = computed(() => {
    const p = this.project();
    return 'problem' in p ? p : null;
  });

  protected readonly showcase = computed(() => {
    const p = this.project();
    return 'images' in p ? p : null;
  });
}
