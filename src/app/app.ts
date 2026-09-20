import { ChangeDetectionStrategy, Component, ElementRef, Injector, afterNextRender, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AosService } from './core/services/aos.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent, ScrollProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

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
