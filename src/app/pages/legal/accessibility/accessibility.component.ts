import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WORKSPACE_PHOTOS } from '../../../core/data/photos';
import { LegalPageComponent } from '../../../shared/components/legal-page/legal-page.component';

@Component({
  selector: 'app-accessibility',
  imports: [LegalPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-legal-page
      title="Accessibility"
      text="How this site is built to work well for as many visitors as possible."
      [photo]="photos.woodenDesk" focal="center"
    >
      <h2>Keyboard Navigation</h2>
      <p>Every interactive element on this site, including navigation links, buttons, form fields, and the FAQ accordions, can be reached and operated using a keyboard alone, with Tab to move between elements and Enter or Space to activate them. A skip link at the very start of every page lets keyboard and screen reader users jump straight to the main content without tabbing through the header first.</p>
      <h2>Readable Content</h2>
      <p>Text is written in plain, direct language, set at a legible size with comfortable line height and spacing. Headings are used to describe the actual structure of each page, not just for visual styling, so the content is easy to scan and easy to follow.</p>
      <h2>Responsive Design</h2>
      <p>The layout adapts across phone, tablet, and desktop screens, with text, spacing, and tap targets sized to stay usable on smaller devices rather than shrinking down a desktop layout as-is.</p>
      <h2>Clear Focus States</h2>
      <p>Every interactive element shows a visible focus outline when navigated to by keyboard, so it's always clear which element is currently active. Focus is never hidden or removed for visual reasons.</p>
      <h2>Semantic Structure</h2>
      <p>Pages use native HTML elements such as header, nav, main, and footer for their intended purpose, form fields are paired with visible labels, and ARIA attributes like aria-expanded, aria-controls, and role="alert" are used where they add real information for assistive technology, such as on the FAQ accordions and the contact form's validation messages.</p>
      <h2>An Ongoing Effort</h2>
      <p>Accessibility on this site is something I actively work on, not a one-time checklist. If you run into anything that doesn't work as expected with a keyboard, screen reader, or any other assistive technology, I want to know about it.</p>
      <h2>Report an Accessibility Issue</h2>
      <p>If you come across an accessibility barrier anywhere on this site, please let me know so I can look into it:</p>
    </app-legal-page>
  `,
})
export class AccessibilityComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
}
