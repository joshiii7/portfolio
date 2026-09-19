import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_FAQS } from '../../core/data/faqs';
import { SITE } from '../../core/data/site';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [PageBannerComponent, ContactFormComponent, FaqSectionComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact.component.scss',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  protected readonly site = SITE;
  protected readonly faqs = CONTACT_FAQS;
}
