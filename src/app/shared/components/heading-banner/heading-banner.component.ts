import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PhotoAsset, PhotoFocal } from '../../../core/models/photo.model';
import { PhotoComponent } from '../photo/photo.component';

/**
 * A hero-style band behind a section heading: a decorative photo cropped with
 * object-fit: cover, a dark scrim over it, and the projected heading (and
 * intro) on top in light text. The photo is decorative (empty alt, hidden
 * from assistive technology); the heading carries the meaning.
 */
@Component({
  selector: 'app-heading-banner',
  imports: [PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './heading-banner.component.scss',
  template: `
    <div class="heading-banner">
      <app-photo [photo]="photo()" [focal]="focal()" />
      <div class="container heading-banner__inner">
        <ng-content />
      </div>
    </div>
  `,
})
export class HeadingBannerComponent {
  readonly photo = input.required<PhotoAsset>();
  /** Which part of the photo stays in frame when it is cropped to the band. */
  readonly focal = input<PhotoFocal>('center');
}
