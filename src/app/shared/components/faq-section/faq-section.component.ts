import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Faq } from '../../../core/models/faq.model';
import { AccordionComponent } from '../accordion/accordion.component';

/**
 * FAQ block (Home, Pricing, Contact, Services, and each service page). It is a plain flat colour,
 * --color-faq-bg, with no image or gradient, so it looks the same wherever it appears. Pages
 * cannot override its background; the sections around it are what alternate.
 */
@Component({
  selector: 'app-faq-section',
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq-section.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section class="section-py section-faq">
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
  readonly faqs = input.required<readonly Faq[]>();
  readonly idPrefix = input.required<string>();
  readonly eyebrow = input<string>();
  readonly title = input('Frequently Asked');
  readonly accent = input('Questions');
  readonly intro = input<string>();
}
