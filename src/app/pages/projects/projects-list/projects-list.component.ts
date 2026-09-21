import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { ContentService } from '../../../core/services/content.service';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-projects-list',
  imports: [PageBannerComponent, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects-list.component.scss',
  template: `
    <app-page-banner
      title="Selected Projects"
      text="A selection of my work: business systems built for real organizations, and public projects I built myself."
      [photo]="photos.homeOffice" focal="center"
    />

    <section class="section-py">
      <div class="container">
        <div class="project-group">
          <h2 data-aos="fade-up">Featured <span class="heading-accent">Builds</span></h2>
          <div class="grid grid-3">
            @for (project of content.showcaseProjects; track project.slug; let i = $index) {
              <app-project-card [project]="project" data-aos="fade-up" [attr.data-aos-delay]="(i % 3) * 100" />
            }
          </div>
        </div>

        <div class="project-group">
          <h2 data-aos="fade-up">Business &amp; Client <span class="heading-accent">Projects</span></h2>
          <div class="grid grid-3">
            @for (project of content.capstoneProjects; track project.slug; let i = $index) {
              <app-project-card [project]="project" data-aos="fade-up" [attr.data-aos-delay]="(i % 3) * 100" />
            } @empty {
              <p>Projects are on their way. Check back soon.</p>
            }
          </div>
        </div>
      </div>
    </section>

  `,
})
export class ProjectsListComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  protected readonly content = inject(ContentService);
}
