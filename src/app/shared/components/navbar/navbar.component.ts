import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, NgZone, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS, SITE } from '../../../core/data/site';
import { HeaderHeightService } from '../../../core/services/header-height.service';
import { IconComponent } from '../icon/icon.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  private readonly headerHeight = inject(HeaderHeightService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly header = viewChild.required<ElementRef<HTMLElement>>('header');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  ngAfterViewInit(): void {
    this.headerHeight.register(this.header().nativeElement);
    this.zone.runOutsideAngular(() => this.watchScroll());
  }

  /**
   * Adds .is-scrolled to the header once the page has moved a little, and removes it near the top.
   * Two thresholds (40px down, 10px back up) stop it flickering at the boundary. It only toggles a
   * class, so no change detection is needed.
   */
  private watchScroll(): void {
    const header = this.header().nativeElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = header.classList.contains('is-scrolled');
      const next = scrolled ? window.scrollY > 10 : window.scrollY > 40;
      if (next === scrolled) return;
      header.classList.toggle('is-scrolled', next);
      this.headerHeight.setCompact(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  // Escape closes the menu from anywhere (focus stays on the toggle right
  // after it's clicked, not inside the nav), then returns focus to the toggle
  // so keyboard users land back where they started.
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (!this.menuOpen()) return;
    this.closeMenu();
    this.toggleButton().nativeElement.focus();
  }
}
