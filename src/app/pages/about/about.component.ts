import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, inject, PLATFORM_ID, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import { PhotoAsset } from '../../core/models/photo.model';
import { ASEAN_PHOTOS } from '../../core/data/photos';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink, PageBannerComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  protected readonly content = inject(ContentService);
  protected readonly photos = ASEAN_PHOTOS;

  protected srcset(photo: PhotoAsset): string {
    return (photo.variants ?? []).map((v) => `${v.src} ${v.width}w`).join(', ');
  }

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly journeyList = viewChild<ElementRef<HTMLElement>>('journeyList');

  /** How many stage markers the scroll line has reached, so they can light up in turn. */
  protected readonly reached = signal(0);

  private frame = 0;
  private readonly onScroll = () => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.updateProgress();
    });
  };

  /** Competition photos open in Fancybox, the same lightbox the project pages use. */
  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // prerendering has no window
    Fancybox.bind('[data-fancybox="competition-journey"]');
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.updateProgress();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    Fancybox.unbind('[data-fancybox="competition-journey"]');
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.frame);
  }

  /**
   * Fills the timeline line down to the middle of the viewport (it grows as you scroll down and
   * drains as you scroll back up) and counts the markers that line has passed. The fill is a CSS
   * variable on the list, so scrolling never triggers change detection; only a marker being reached
   * or left does.
   */
  private updateProgress(): void {
    const list = this.journeyList()?.nativeElement;
    if (!list) return;
    const focus = window.innerHeight * 0.5;
    const box = list.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (focus - box.top) / box.height));
    list.style.setProperty('--journey-progress', progress.toFixed(4));

    const markers = Array.from(list.querySelectorAll<HTMLElement>('.stage__step'));
    const count = markers.filter((m) => {
      const r = m.getBoundingClientRect();
      return r.top + r.height / 2 <= focus;
    }).length;
    this.reached.set(count);
  }
}
