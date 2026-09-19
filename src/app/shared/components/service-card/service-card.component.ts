import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../../core/models/service.model';
import { IconComponent } from '../icon/icon.component';

/** Service teaser card (Home and Services list). The `.card` / `.service-card` styles are global. */
@Component({
  selector: 'app-service-card',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card service-card' },
  template: `
    <div class="card-icon" aria-hidden="true"><app-icon [name]="service().icon" /></div>
    <h3>{{ service().title }}</h3>
    <p>{{ service().summary }}</p>
    <a [routerLink]="['/services', service().id]" class="btn btn-outline btn-sm mt-3">Learn More</a>
  `,
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();
}
