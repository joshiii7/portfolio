import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/data/site';
import { ContentService } from '../../../core/services/content.service';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { CtaBandComponent } from '../../../shared/components/cta-band/cta-band.component';
import { FeatureCardComponent } from '../../../shared/components/feature-card/feature-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-service-detail',
  imports: [
    RouterLink,
    IconComponent,
    PageBannerComponent,
    AccordionComponent,
    FeatureCardComponent,
    ProjectCardComponent,
    CtaBandComponent,
    RevealDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './service-detail.component.scss',
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  private readonly content = inject(ContentService);
  protected readonly site = SITE;

  /** Route param, bound by the router (withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly service = computed(() => this.content.service(this.id()));

  /** "Related Work" only renders when the service names real case studies. */
  protected readonly related = computed(() => this.content.projectsBySlugs(this.service()?.relatedProjects ?? []));
}
