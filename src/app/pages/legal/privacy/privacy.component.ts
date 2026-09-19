import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LegalPageComponent } from '../../../shared/components/legal-page/legal-page.component';

@Component({
  selector: 'app-privacy',
  imports: [LegalPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-legal-page
      title="Privacy Policy"
      text="What happens to the information you share through the contact form on this site."
      bg="assets/images/banners/banner-privacy.svg"
    >
      <h2>Information I Collect</h2>
      <p>The only personal information this site collects is what you choose to type into the contact form: your name, email address, message, and optionally your phone number and the type of project you're inquiring about. Nothing is collected anywhere else on the site.</p>
      <h2>How It's Collected</h2>
      <p>This site has no server or database. The contact form does not submit anywhere: it opens your own email client with your message pre-filled, and you review and send it yourself, through your own email account, to my inbox. I only ever see what you choose to actually send.</p>
      <h2>Cookies and Tracking</h2>
      <p>This site does not use cookies, analytics, or any third-party tracking scripts.</p>
      <h2>Why I Collect It</h2>
      <p>I use the information you send only to understand your project and get back to you about it.</p>
      <h2>How It's Used</h2>
      <p>Your message is read personally by me and used only to respond to your inquiry and, if we move forward, to discuss and deliver the project you contacted me about. It is not used for any other purpose.</p>
      <h2>Sharing</h2>
      <p>Your information is not sold, rented, or shared with third parties, and it is never used for marketing or added to a mailing list.</p>
      <h2>Retention</h2>
      <p>Once you send your message, it lives in my personal email inbox for as long as I need it to respond to and keep track of your inquiry. I don't control how your own email provider stores or retains what you send.</p>
      <h2>Contact About Your Information</h2>
      <p>If you'd like to ask about, correct, or request deletion of information you've sent me, reach out using the same details below:</p>
    </app-legal-page>
  `,
})
export class PrivacyComponent {}
