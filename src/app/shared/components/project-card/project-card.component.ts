import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapstoneProject, CraftProject, ShowcaseProject } from '../../../core/models/project.model';
import { ProjectPictureComponent } from '../project-picture/project-picture.component';

/**
 * teaser  - image, Problem + Result, tags, link to the case study (Home, Projects list)
 * detail  - full Problem / Solution / Result write-up (case study page)
 * related - image, Result, tags, link to the case study (service detail "Related Work")
 * craft   - image, one-line description, tags, link to the live demo (Front-End Craft)
 *
 * A ShowcaseProject (one of my own builds) shows as a teaser (cropped screenshot, summary, tags, links)
 * or as `detail` (every screenshot, the description, highlights, tags, links).
 */
export type ProjectCardVariant = 'teaser' | 'detail' | 'related' | 'craft';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ProjectPictureComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-card.component.scss',
  templateUrl: './project-card.component.html',
  host: { class: 'card project-card' },
})
export class ProjectCardComponent {
  readonly project = input.required<CapstoneProject | CraftProject | ShowcaseProject>();
  readonly variant = input<ProjectCardVariant>('teaser');
  /** In a two-column group the screenshot is wider and shown uncropped. */
  readonly wide = input(false);

  /** What the browser should assume about the screenshot's width so it downloads a fitting file. */
  protected readonly teaserSizes = computed(() =>
    this.wide() ? '(min-width: 1024px) 600px, (min-width: 768px) 45vw, 92vw' : '(min-width: 1024px) 337px, (min-width: 768px) 45vw, 92vw',
  );
  protected readonly detailCoverSizes = '(min-width: 1280px) 1174px, 95vw';
  protected readonly detailGallerySizes = '(min-width: 768px) 575px, 95vw';

  protected readonly capstone = computed(() => {
    const p = this.project();
    return 'problem' in p ? p : null;
  });

  protected readonly craft = computed(() => {
    const p = this.project();
    return 'link' in p ? p : null;
  });

  protected readonly showcase = computed(() => {
    const p = this.project();
    return 'images' in p ? p : null;
  });
}
