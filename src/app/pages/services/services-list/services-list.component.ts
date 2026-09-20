import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { SERVICES_FAQS } from '../../../core/data/faqs';
import { ContentService } from '../../../core/services/content.service';
import { CtaBandComponent } from '../../../shared/components/cta-band/cta-band.component';
import { FaqSectionComponent } from '../../../shared/components/faq-section/faq-section.component';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card.component';
import { SkillsGridComponent } from '../../../shared/components/skills-grid/skills-grid.component';

interface ProcessStep {
  title: string;
  text: string;
}

@Component({
  selector: 'app-services-list',
  imports: [
    PageBannerComponent,
    ServiceCardComponent,
    SkillsGridComponent,
    FaqSectionComponent,
    CtaBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services-list.component.scss',
  templateUrl: './services-list.component.html',
})
export class ServicesListComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  protected readonly content = inject(ContentService);
  protected readonly faqs = SERVICES_FAQS;

  protected readonly process: ProcessStep[] = [
    { title: 'Discovery Call', text: "We talk through what you need, the problem you're trying to solve, and whether it's a good fit." },
    { title: 'Proposal & Scope', text: "I put together a clear scope and timeline so we're aligned before any work starts." },
    { title: 'Build', text: 'I build the project, with check-ins along the way so you can see progress and give feedback.' },
    { title: 'Review & Launch', text: 'We review the finished work together, make any final adjustments, and launch.' },
  ];
}
