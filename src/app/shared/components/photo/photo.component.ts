import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PhotoAsset, PhotoFocal } from '../../../core/models/photo.model';

/**
 * A decorative photo that fills its (positioned) parent, delivered with
 * <picture>: the browser picks the smallest WebP rendition that covers the
 * screen from srcset/sizes, and falls back to the JPG. It is decorative, so
 * it has an empty alt and is hidden from assistive technology.
 */
@Component({
  selector: 'app-photo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './photo.component.scss',
  template: `
    <picture>
      @if (srcset(); as set) {
        <source type="image/webp" [attr.srcset]="set" sizes="100vw" />
      }
      <img
        [src]="photo().src"
        [attr.width]="photo().width"
        [attr.height]="photo().height"
        [attr.data-focal]="focal()"
        alt=""
        aria-hidden="true"
        decoding="async"
        [attr.loading]="eager() ? null : 'lazy'"
        [attr.fetchpriority]="eager() ? 'high' : null"
      />
    </picture>
  `,
})
export class PhotoComponent {
  readonly photo = input.required<PhotoAsset>();
  /** Which part of the photo stays in frame when it is cropped. */
  readonly focal = input<PhotoFocal>('center');
  /** Above the fold: load right away, at high priority, instead of lazily. */
  readonly eager = input(false);

  protected readonly srcset = computed(() => {
    const variants = this.photo().variants;
    return variants?.length ? variants.map((v) => `${v.src} ${v.width}w`).join(', ') : null;
  });
}
