import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { ContentService } from '../../../core/services/content.service';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-project-detail',
  imports: [PageBannerComponent, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (project(); as project) {
      <app-page-banner [title]="project.name" [text]="project.bannerText" [photo]="photos.woodenDesk" focal="center" />

      <section class="section-py">
        <div class="container">
          <app-project-card [project]="project" variant="detail" data-aos="fade-up" />
        </div>
      </section>

    } @else {
      <app-page-banner
        title="Project Not Found"
        text="This project could not be found. It may have moved, so please check the Projects page."
      />
    }
  `,
})
export class ProjectDetailComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  private readonly content = inject(ContentService);

  /** Route param, bound by the router (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly project = computed(() => this.content.project(this.slug()));
}
