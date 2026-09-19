import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card.component';

@Component({
  selector: 'app-services-preview',
  imports: [RouterLink, ServiceCardComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: block; }`,
  template: `
    <section appReveal class="section-py bg-secondary">
      <div class="container">
        <h2 class="section-title">What I <span class="heading-accent">Build</span></h2>
        <p class="section-intro">Practical software development services, based on the kind of systems and applications I've actually built.</p>

        <div class="grid grid-4">
          @for (service of content.services; track service.id) {
            <app-service-card [service]="service" />
          } @empty {
            <p>Services are on their way. Check back soon.</p>
          }
        </div>

        <div class="section-cta">
          <a routerLink="/services" class="btn btn-outline">See All Services</a>
        </div>
      </div>
    </section>
  `,
})
export class ServicesPreviewComponent {
  protected readonly content = inject(ContentService);
}
