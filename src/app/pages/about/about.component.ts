import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ASEAN_PHOTOS } from '../../core/data/photos';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-about',
  imports: [PageBannerComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly content = inject(ContentService);
  protected readonly photos = ASEAN_PHOTOS;
}
