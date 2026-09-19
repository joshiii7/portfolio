import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './page-banner.component.scss',
  template: `
    <section class="page-banner">
      @if (bg(); as src) {
        <img class="page-banner__bg" [src]="src" alt="" aria-hidden="true" />
      }
      <div class="container">
        <h1>{{ title() }}</h1>
        <p>{{ text() }}</p>
        <ng-content />
      </div>
    </section>
  `,
})
export class PageBannerComponent {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  /** Decorative background illustration (path under assets/). */
  readonly bg = input<string>();
}
