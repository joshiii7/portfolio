import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-not-found',
  imports: [PageBannerComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-banner
      title="Page Not Found"
      text="That page doesn't exist or may have moved."
    />
    <section class="section-py text-center">
      <div class="container">
        <a routerLink="/" class="btn btn-primary btn-lg">Back to Home</a>
      </div>
    </section>
  `,
})
export class NotFoundComponent {}
