import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { PhotoAsset, PhotoFocal } from '../../../core/models/photo.model';
import { SITE } from '../../../core/data/site';
import { IconComponent } from '../icon/icon.component';
import { PageBannerComponent } from '../page-banner/page-banner.component';

/** Shell for plain prose pages (Privacy, Accessibility): banner + legal-content body, sections projected in. */
@Component({
  selector: 'app-legal-page',
  imports: [PageBannerComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Projected prose (h2/p/ul from the page) must be styled too, so these rules
  // can't be scoped to this component's own template.
  encapsulation: ViewEncapsulation.None,
  styleUrl: './legal-page.component.scss',
  template: `
    <app-page-banner [title]="title()" [text]="text()" [photo]="photo()" [focal]="focal()" />
    <section class="section-py">
      <div class="container">
        <div class="legal-content" data-aos="fade-up">
          <p class="legal-updated">Last updated: {{ updated() }}</p>
          <ng-content />
          <ul>
            <li><a [href]="'mailto:' + site.email"><app-icon name="mail" [inline]="true" />{{ site.email }}</a></li>
            <li><a [href]="site.phoneHref"><app-icon name="phone" [inline]="true" />{{ site.phone }}</a></li>
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class LegalPageComponent {
  protected readonly site = SITE;

  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly photo = input.required<PhotoAsset>();
  readonly focal = input<PhotoFocal>('center');
  readonly updated = input('August 29, 2026');
}
