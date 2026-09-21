import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { MotionSectionDirective } from '../../../shared/directives/motion-section.directive';

const OWN_BUILDS_COUNT = 2;
const CLIENT_WORK_COUNT = 1;

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
  // Two of my own builds and one piece of client work. The portfolio's own project page is left out
  // here on purpose: it lives on the Projects page, so the home page keeps its client case study.
  private readonly content = inject(ContentService);
  protected readonly featured = [
    ...this.content.showcaseProjects.slice(0, OWN_BUILDS_COUNT),
    ...this.content.capstoneProjects.slice(0, CLIENT_WORK_COUNT),
  ];
}
