import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CtaBandComponent } from '../../shared/components/cta-band/cta-band.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [PageBannerComponent, CtaBandComponent, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly content = inject(ContentService);
}
