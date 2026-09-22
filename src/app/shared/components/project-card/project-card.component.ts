import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapstoneProject, ProjectImage, ShowcaseProject } from '../../../core/models/project.model';
import { ProjectPictureComponent } from '../project-picture/project-picture.component';

/**
 * A screenshot, the name, and the one-sentence summary, same shape for a ShowcaseProject (one of
 * my own builds) or a CapstoneProject (client/thesis work) — no separate problem/result blocks and
 * no button row. The whole card is one link to the project's own page, where the full write-up
 * (and, for a showcase project, the live/GitHub links) lives.
 */
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

  /** What the browser should assume about the screenshot's width so it downloads a fitting file. */
  protected readonly teaserSizes = '(min-width: 1024px) 337px, (min-width: 768px) 45vw, 92vw';

  protected readonly cardImage = computed<ProjectImage>(() => {
    const p = this.project();
    return 'images' in p ? p.images[0] : p.image;
  });
}
