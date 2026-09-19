import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, SITE } from '../../../core/data/site';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
