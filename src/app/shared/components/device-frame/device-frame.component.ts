import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProjectImage } from '../../../core/models/project.model';
import { ProjectPictureComponent } from '../project-picture/project-picture.component';

/** Real device screen ratios (width / height), so a screenshot's own proportions decide which frame it gets. */
const IMAC_SCREEN_RATIO = 16 / 9;
const IPHONE_SCREEN_RATIO = 9 / 19.5;

/**
 * Wraps a project screenshot in a CSS-only device mockup: an iMac frame for desktop-shaped
 * screenshots, an iPhone frame for phone-shaped ones. No image needs tagging per project — the
 * frame is picked from the screenshot's own `width`/`height`, whichever device's screen ratio it
 * sits closer to. The screenshot fills the screen area via object-fit: cover (see
 * project-picture.component.scss's `.device-frame-viewport` rule), cropping rather than
 * stretching where a screenshot's own ratio doesn't exactly match the device it lands in.
 */
@Component({
  selector: 'app-device-frame',
  imports: [ProjectPictureComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './device-frame.component.scss',
  template: `
    @if (kind() === 'imac') {
      <div class="imac">
        <div class="imac-screen">
          <div class="imac-viewport device-frame-viewport">
            <app-project-picture [image]="image()" [sizes]="sizes()" [eager]="eager()" />
          </div>
        </div>
        <div class="imac-chin" aria-hidden="true"></div>
        <div class="imac-neck" aria-hidden="true"></div>
        <div class="imac-base" aria-hidden="true"></div>
      </div>
    } @else {
      <div class="iphone">
        <div class="iphone-viewport device-frame-viewport">
          <div class="iphone-island" aria-hidden="true"></div>
          <app-project-picture [image]="image()" [sizes]="iphoneSizes" [eager]="eager()" />
          <div class="iphone-home" aria-hidden="true"></div>
        </div>
      </div>
    }
  `,
})
export class DeviceFrameComponent {
  readonly image = input.required<ProjectImage>();
  /** What the browser should assume about the rendered width. Only used for the iMac frame: the iPhone frame always caps itself at 15rem, so it has its own fixed sizes below. */
  readonly sizes = input('(min-width: 1024px) 640px, 92vw');
  readonly eager = input(false);

  protected readonly iphoneSizes = '15rem';

  protected readonly kind = computed<'imac' | 'iphone'>(() => {
    const img = this.image();
    const ratio = img.width / img.height;
    const distanceToImac = Math.abs(ratio - IMAC_SCREEN_RATIO);
    const distanceToIphone = Math.abs(ratio - IPHONE_SCREEN_RATIO);
    return distanceToImac <= distanceToIphone ? 'imac' : 'iphone';
  });
}
