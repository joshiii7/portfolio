import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

const FEATURED_COUNT = 3;

@Component({
  selector: 'app-projects-preview',
  imports: [RouterLink, ProjectCardComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: block; }`,
  template: `
    <section appReveal class="section-py">
      <div class="container">
        <h2 class="section-title">Featured <span class="heading-accent">Projects</span></h2>
        <p class="section-intro">A selection of capstone projects built to solve practical business and institutional challenges.</p>

        <div class="grid grid-3">
          @for (project of featured; track project.slug) {
            <app-project-card [project]="project" />
          } @empty {
            <p>Featured projects are on their way. Check back soon.</p>
          }
        </div>

        <div class="section-cta">
          <a routerLink="/projects" class="btn btn-outline">View All Projects</a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsPreviewComponent {
  protected readonly featured = inject(ContentService).capstoneProjects.slice(0, FEATURED_COUNT);
}
