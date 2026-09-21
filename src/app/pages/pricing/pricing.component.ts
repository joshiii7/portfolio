import { DecimalPipe } from '@angular/common';
import { WORKSPACE_PHOTOS } from '../../core/data/photos';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRICING_FAQS } from '../../core/data/faqs';
import { MAINTENANCE_PLANS, PROJECT_PLANS } from '../../core/data/pricing';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

type BillingCycle = 'monthly' | 'annual';

@Component({
  selector: 'app-pricing',
  imports: [DecimalPipe, RouterLink, PageBannerComponent, FaqSectionComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './pricing.component.scss',
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  protected readonly photos = WORKSPACE_PHOTOS;
  protected readonly projectPlans = PROJECT_PLANS;
  protected readonly maintenancePlans = MAINTENANCE_PLANS;
  protected readonly faqs = PRICING_FAQS;

  /** Each maintenance plan carries its own annual figure (not monthly x12), so the toggle only swaps which one shows. */
  protected readonly cycle = signal<BillingCycle>('monthly');

  protected setCycle(cycle: BillingCycle): void {
    this.cycle.set(cycle);
  }
}
