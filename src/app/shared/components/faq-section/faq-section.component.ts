import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Faq } from '../../../core/models/faq.model';
import { AccordionComponent } from '../accordion/accordion.component';

/** FAQ block with the decorative banner art behind its heading (Home, Contact, Pricing, Services). */
@Component({
  selector: 'app-faq-section',
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq-section.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section class="section-py section-heading-art" [class.bg-secondary]="secondary()">
      <img class="section-heading-art__bg" src="assets/images/banners/banner-faq.svg" alt="" aria-hidden="true" />
      <div class="container">
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
  readonly faqs = input.required<readonly Faq[]>();
  readonly idPrefix = input.required<string>();
  readonly title = input('Frequently Asked');
  readonly accent = input('Questions');
  readonly intro = input<string>();
  readonly secondary = input(false);
}
