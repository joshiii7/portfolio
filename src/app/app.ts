import { ChangeDetectionStrategy, Component, ElementRef, Injector, afterNextRender, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AosService } from './core/services/aos.service';
import { MOTION } from './core/services/motion-conditions';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent, CustomCursorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  /** Only a real mouse with motion allowed gets the cursor; everyone else never downloads it. */
  protected readonly cursorWanted = typeof window !== 'undefined' && window.matchMedia(MOTION.pointer).matches;

  constructor() {
    // Once each page has rendered its [data-aos] elements, like fingerdash's onMount.
    const aos = inject(AosService);
    const injector = inject(Injector);
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => afterNextRender(() => aos.init(), { injector }));
  }

  // A plain "#main" hash would resolve against <base href> and navigate to the
  // home route, and a browser doesn't reliably move keyboard focus to its scroll
  // target anyway (Safari won't, even with tabindex="-1"). Focusing <main>
  // explicitly makes the next Tab continue from inside the page content.
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
