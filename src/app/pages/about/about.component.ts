import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ASEAN_PHOTOS, PORTRAIT_PHOTOS } from '../../core/data/photos';
import { AosService } from '../../core/services/aos.service';
import { ContentService } from '../../core/services/content.service';
import { CtaBandComponent } from '../../shared/components/cta-band/cta-band.component';
import { HeadingBannerComponent } from '../../shared/components/heading-banner/heading-banner.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-about',
  imports: [PageBannerComponent, HeadingBannerComponent, CtaBandComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly content = inject(ContentService);
  protected readonly photos = ASEAN_PHOTOS;
  protected readonly portraits = PORTRAIT_PHOTOS;

  constructor() {
    // Once the page (and its data-aos elements) has rendered, like fingerdash's onMount.
    const aos = inject(AosService);
    afterNextRender(() => aos.init());
  }
}
