import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../../core/data/social-links';
import { IconComponent } from '../icon/icon.component';

/** Icon-only social links, rendered from the typed SOCIAL_LINKS data (footer, contact card). */
@Component({
  selector: 'app-social-links',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './social-links.component.scss',
  template: `
    <ul class="social-links">
      @for (link of links; track link.id) {
        <li>
          <a [href]="link.href" target="_blank" [rel]="link.rel" [attr.aria-label]="link.ariaLabel" [attr.title]="link.label">
            <app-icon [name]="link.id" />
          </a>
        </li>
      }
    </ul>
  `,
})
export class SocialLinksComponent {
  protected readonly links = SOCIAL_LINKS;
}
