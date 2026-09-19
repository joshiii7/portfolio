import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent, SiteIconName } from '../icon/icon.component';

/** Icon + title + text card ("Why Work With Me", service "What's Included"). Styles are global (.card, .value-item). */
@Component({
  selector: 'app-feature-card',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card value-item' },
  template: `
    <div class="card-icon" aria-hidden="true"><app-icon [name]="icon()" /></div>
    <h3>{{ title() }}</h3>
    <p>{{ text() }}</p>
  `,
})
export class FeatureCardComponent {
  readonly icon = input.required<SiteIconName>();
  readonly title = input.required<string>();
  readonly text = input.required<string>();
}
