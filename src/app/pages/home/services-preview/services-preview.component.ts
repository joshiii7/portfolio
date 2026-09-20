import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card.component';
import { MotionSectionDirective } from '../../../shared/directives/motion-section.directive';

@Component({
  selector: 'app-services-preview',
  imports: [RouterLink, ServiceCardComponent, MotionSectionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: block; }`,
  template: `
    <section appMotionSection class="section-py">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">What I <span class="heading-accent">Build</span></h2>
        <p class="section-intro" data-aos="fade-up" data-aos-delay="100">Practical software development services, based on the kind of systems and applications I've actually built.</p>

        <div class="grid grid-4">
          @for (service of content.services; track service.id) {
            <app-service-card [service]="service" />
          } @empty {
            <p>Services are on their way. Check back soon.</p>
          }
        </div>

        <div class="section-cta" data-aos="fade-up">
          <a routerLink="/services" class="btn btn-outline">See All Services</a>
        </div>
      </div>
    </section>
  `,
})
export class ServicesPreviewComponent {
  protected readonly content = inject(ContentService);
}
