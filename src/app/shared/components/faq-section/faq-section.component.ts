import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Faq } from '../../../core/models/faq.model';
import { AccordionComponent } from '../accordion/accordion.component';

/**
 * FAQ block (Home, Pricing, Contact, Services, and each service page). A single centered column:
 * heading, intro paragraph, and a Contact button stacked above the question list. It is a plain
 * flat colour, --color-faq-bg, with no image or gradient, so it looks the same wherever it
 * appears. Pages cannot override its background; the sections around it are what alternate.
 */
@Component({
  selector: 'app-faq-section',
  imports: [AccordionComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq-section.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section class="section-py section-faq">
      <div class="container faq-layout">
        <div class="faq-intro" data-aos="fade-up">
          @if (eyebrow(); as label) {
            <span class="faq-eyebrow">{{ label }}</span>
          }
          <h2 class="section-title">{{ title() }} <span class="heading-accent">{{ accent() }}</span></h2>
          @if (intro(); as text) {
            <p>{{ text }}</p>
          }
          <p>
            @if (contactLink()) {
              Don't see your question here? <a routerLink="/contact">Send me a message</a> and I'll answer it directly.
            } @else {
              Don't see your question here? Just include it in your message and I'll answer it directly.
            }
          </p>
          @if (contactLink()) {
            <a routerLink="/contact" class="btn btn-primary faq-contact">Contact</a>
          }
        </div>
        <app-accordion class="faq-list" [items]="faqs()" [idPrefix]="idPrefix()" data-aos="fade-up" data-aos-delay="100" />
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
  /** Off on the Contact page, where the message form is already the next thing on the page. */
  readonly contactLink = input(true);
}
