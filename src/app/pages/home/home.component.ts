import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOME_FAQS } from '../../core/data/faqs';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { ToolsMarqueeComponent } from '../../shared/components/tools-marquee/tools-marquee.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsPreviewComponent } from './projects-preview/projects-preview.component';
import { ServicesPreviewComponent } from './services-preview/services-preview.component';
import { WhyMeComponent } from './why-me/why-me.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ToolsMarqueeComponent,
    ServicesPreviewComponent,
    ProjectsPreviewComponent,
    WhyMeComponent,
    FaqSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-tools-marquee />
    <app-services-preview />
    <app-projects-preview />
    <app-why-me />
    <app-faq-section
      idPrefix="homeFaq"
      intro="A few things people usually ask before starting a project."
      [faqs]="faqs"
    />
  `,
})
export class HomeComponent {
  protected readonly faqs = HOME_FAQS;
}
