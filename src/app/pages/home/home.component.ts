import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOME_FAQS } from '../../core/data/faqs';
import { CtaBandComponent } from '../../shared/components/cta-band/cta-band.component';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsPreviewComponent } from './projects-preview/projects-preview.component';
import { ServicesPreviewComponent } from './services-preview/services-preview.component';
import { WhyMeComponent } from './why-me/why-me.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesPreviewComponent,
    ProjectsPreviewComponent,
    WhyMeComponent,
    FaqSectionComponent,
    CtaBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-services-preview />
    <app-projects-preview />
    <app-why-me />
    <app-faq-section
      idPrefix="homeFaq"
      intro="A few things people usually ask before starting a project."
      [faqs]="faqs"
    />
    <app-cta-band
      title="Have a Project in"
      accent="Mind?"
      text="Tell me about it and I'll get back to you so we can talk through scope, timeline, and next steps."
    />
  `,
})
export class HomeComponent {
  protected readonly faqs = HOME_FAQS;
}
