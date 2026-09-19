import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapstoneProject, CraftProject } from '../../../core/models/project.model';

/**
 * teaser  - image, Problem + Result, tags, link to the case study (Home, Projects list)
 * detail  - full Problem / Solution / Result write-up (case study page)
 * related - image, Result, tags, link to the case study (service detail "Related Work")
 * craft   - image, one-line description, tags, link to the live demo (Front-End Craft)
 */
export type ProjectCardVariant = 'teaser' | 'detail' | 'related' | 'craft';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-card.component.scss',
  templateUrl: './project-card.component.html',
  host: { class: 'card project-card' },
})
export class ProjectCardComponent {
  readonly project = input.required<CapstoneProject | CraftProject>();
  readonly variant = input<ProjectCardVariant>('teaser');

  protected readonly capstone = computed(() => {
    const p = this.project();
    return 'slug' in p ? p : null;
  });

  protected readonly craft = computed(() => {
    const p = this.project();
    return 'link' in p ? p : null;
  });
}
