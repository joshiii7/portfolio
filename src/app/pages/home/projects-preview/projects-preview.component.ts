import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { MotionSectionDirective } from '../../../shared/directives/motion-section.directive';

const FEATURED_COUNT = 3;

@Component({
  selector: 'app-projects-preview',
  imports: [RouterLink, ProjectCardComponent, MotionSectionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: block; }`,
  template: `
    <section appMotionSection class="section-py bg-secondary">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Featured <span class="heading-accent">Projects</span></h2>
        <p class="section-intro" data-aos="fade-up" data-aos-delay="100">A selection of my work: business systems built for real organizations, and public projects I built myself.</p>

        <div class="grid grid-3">
          @for (project of featured; track project.slug) {
            <app-project-card [project]="project" />
          } @empty {
            <p>Featured projects are on their way. Check back soon.</p>
          }
        </div>

        <div class="section-cta" data-aos="fade-up">
          <a routerLink="/projects" class="btn btn-outline">View All Projects</a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsPreviewComponent {
  protected readonly featured = inject(ContentService).featuredProjects.slice(0, FEATURED_COUNT);
}
