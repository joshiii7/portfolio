import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Faq } from '../../../core/models/faq.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { AccordionComponent } from '../accordion/accordion.component';

/** FAQ block with the decorative banner art behind its heading (Home, Contact, Pricing, Services). */
@Component({
  selector: 'app-faq-section',
  imports: [AccordionComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq-section.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section appReveal class="section-py section-heading-art" [class.bg-secondary]="secondary()">
      <img class="section-heading-art__bg" src="assets/images/banners/banner-faq.svg" alt="" aria-hidden="true" />
      <div class="container">
        <h2 class="section-title">{{ title() }} <span class="heading-accent">{{ accent() }}</span></h2>
        @if (intro(); as text) {
          <p class="section-intro">{{ text }}</p>
        }
        <app-accordion [items]="faqs()" [idPrefix]="idPrefix()" />
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
