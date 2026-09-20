import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { Faq } from '../../../core/models/faq.model';
import { AccordionComponent } from '../accordion/accordion.component';
import { PhotoComponent } from '../photo/photo.component';

/**
 * FAQ block (Home, Pricing, Contact, Services, and each service page). Every one of them sits on
 * the same decorative photo, the dark desk with the backlit keyboard, under a dark scrim, so the
 * FAQ looks identical wherever it appears.
 */
@Component({
  selector: 'app-faq-section',
  imports: [AccordionComponent, PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq-section.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section class="section-py section-faq">
      <app-photo [photo]="photo" />
      <div class="container">
        @if (eyebrow(); as label) {
          <span class="eyebrow text-center" data-aos="fade-up">{{ label }}</span>
        }
        <h2 class="section-title" data-aos="fade-up">{{ title() }} <span class="heading-accent">{{ accent() }}</span></h2>
        @if (intro(); as text) {
          <p class="section-intro" data-aos="fade-up" data-aos-delay="100">{{ text }}</p>
        }
        <app-accordion [items]="faqs()" [idPrefix]="idPrefix()" data-aos="fade-up" data-aos-delay="100" />
      </div>
    </section>
  `,
})
export class FaqSectionComponent {
  protected readonly photo = WORKSPACE_PHOTOS.darkDeskPanorama;

  readonly faqs = input.required<readonly Faq[]>();
  readonly idPrefix = input.required<string>();
  readonly eyebrow = input<string>();
  readonly title = input('Frequently Asked');
  readonly accent = input('Questions');
  readonly intro = input<string>();
}
