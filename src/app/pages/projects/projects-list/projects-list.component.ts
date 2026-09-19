import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { CtaBandComponent } from '../../../shared/components/cta-band/cta-band.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects-list',
  imports: [PageBannerComponent, ProjectCardComponent, CtaBandComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects-list.component.scss',
  template: `
    <app-page-banner
      title="Selected Projects"
      text="A selection of capstone projects built to solve practical business and institutional challenges."
      bg="assets/images/banners/banner-projects.svg"
    />

    <section appReveal class="section-py">
      <div class="container">
        <div class="project-group">
          <h2>Business &amp; Client <span class="heading-accent">Projects</span></h2>
          <div class="grid grid-3">
            @for (project of content.capstoneProjects; track project.slug) {
              <app-project-card [project]="project" />
            } @empty {
              <p>Projects are on their way. Check back soon.</p>
            }
          </div>
        </div>

        <div class="project-group">
          <h2>Front-End <span class="heading-accent">Craft</span></h2>
          <div class="grid grid-3">
            @for (project of content.craftProjects; track project.name) {
              <app-project-card [project]="project" variant="craft" />
            } @empty {
              <p>More front-end demos are on their way.</p>
            }
          </div>
        </div>
      </div>
    </section>

    <app-cta-band
      title="Have Something Similar in"
      accent="Mind?"
      text="If any of these are close to what you need, let's talk about your project specifically."
    />
  `,
})
export class ProjectsListComponent {
  protected readonly content = inject(ContentService);
}
