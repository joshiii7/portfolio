import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS, SITE } from '../../../core/data/site';
import { HeaderHeightService } from '../../../core/services/header-height.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  private readonly headerHeight = inject(HeaderHeightService);
  private readonly header = viewChild.required<ElementRef<HTMLElement>>('header');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  ngAfterViewInit(): void {
    this.headerHeight.register(this.header().nativeElement);
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
