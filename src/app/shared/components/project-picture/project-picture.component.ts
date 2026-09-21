import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProjectImage } from '../../../core/models/project.model';

/**
 * A project screenshot delivered with <picture>: WebP sources at several widths for the browser to
 * choose from (srcset and sizes), and a plain <img> fallback carrying width, height and alt, so the
 * space is reserved before the image loads (no layout shift). Lazy by default; pass `eager` for an
 * image that is on screen at load.
 */
@Component({
  selector: 'app-project-picture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-picture.component.scss',
  host: { '[class.is-crop]': 'crop()' },
  template: `
    <picture>
      <source type="image/webp" [attr.srcset]="srcset()" [attr.sizes]="sizes()" />
      <img
        [src]="fallback()"
        [attr.width]="width()"
        [attr.height]="height()"
        [alt]="image().alt"
        [attr.loading]="eager() ? null : 'lazy'"
        [attr.fetchpriority]="eager() ? 'high' : null"
        decoding="async"
      />
    </picture>
  `,
})
export class ProjectPictureComponent {
  readonly image = input.required<ProjectImage>();
  /** What the browser should assume about the displayed width, so it picks a sensible file. */
  readonly sizes = input('100vw');
  /** Fixed-height card crop (top of the screenshot) instead of the screenshot's own proportions. */
  readonly crop = input(false);
  readonly eager = input(false);

  protected readonly srcset = computed(() => this.image().widths.map((w) => `${this.image().base}-${w}.webp ${w}w`).join(', '));
  protected readonly fallback = computed(() => `${this.image().base}-${this.image().fallbackWidth}.webp`);
  protected readonly width = computed(() => this.image().fallbackWidth);
  protected readonly height = computed(() => Math.round((this.image().fallbackWidth * this.image().height) / this.image().width));
}
