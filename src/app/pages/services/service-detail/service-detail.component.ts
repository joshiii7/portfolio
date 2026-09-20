import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/data/site';
import { ContentService } from '../../../core/services/content.service';
import { FaqSectionComponent } from '../../../shared/components/faq-section/faq-section.component';
import { CtaBandComponent } from '../../../shared/components/cta-band/cta-band.component';
import { FeatureCardComponent } from '../../../shared/components/feature-card/feature-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-service-detail',
  imports: [
    RouterLink,
    IconComponent,
    PageBannerComponent,
    FaqSectionComponent,
    FeatureCardComponent,
    ProjectCardComponent,
    CtaBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './service-detail.component.scss',
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  private readonly content = inject(ContentService);
  protected readonly site = SITE;

  /** Route param, bound by the router (withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly service = computed(() => this.content.service(this.id()));

  /** "Related Work" only renders when the service names real case studies. */
  protected readonly related = computed(() => this.content.projectsBySlugs(this.service()?.relatedProjects ?? []));
}
