import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PhotoAsset, PhotoFocal } from '../../../core/models/photo.model';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-page-banner',
  imports: [PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './page-banner.component.scss',
  template: `
    <section class="page-banner" [class.page-banner--photo]="!!photo()">
      @if (photo(); as p) {
        <app-photo [photo]="p" [focal]="focal()" [eager]="true" />
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
  /** A photo instead of the illustration: gets a darker scrim and light text so the heading stays readable. */
  readonly photo = input<PhotoAsset>();
  /** Which part of the photo stays in frame when it is cropped to the banner. */
  readonly focal = input<PhotoFocal>('center');
}
