import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../core/data/photos';
import { CONTACT_FAQS } from '../../core/data/faqs';
import { SITE } from '../../core/data/site';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-contact',
  imports: [PageBannerComponent, ContactFormComponent, FaqSectionComponent, IconComponent, SocialLinksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact.component.scss',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  protected readonly site = SITE;
  protected readonly faqs = CONTACT_FAQS;
}
