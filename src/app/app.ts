import { ChangeDetectionStrategy, Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CtaContent } from './core/models/cta.model';
import { AosService } from './core/services/aos.service';
import { CtaBandComponent } from './shared/components/cta-band/cta-band.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent, ScrollProgressComponent, CtaBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  /**
   * The call to action for the current page, read from the route's `data.cta`. The shell renders it
   * after the routed page, so on every page that has one it is the last section before the footer.
   * `key` is the URL, so moving between pages builds a fresh band (and AOS animates it again).
   */
  protected readonly cta = signal<{ key: string; content: CtaContent } | null>(null);

  constructor() {
    // Once each page has rendered its [data-aos] elements, like fingerdash's onMount.
    const aos = inject(AosService);
    const injector = inject(Injector);
    const router = inject(Router);
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.cta.set(this.readCta(router));
        afterNextRender(() => aos.init(), { injector });
      });
  }

  private readCta(router: Router): { key: string; content: CtaContent } | null {
    let route = router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const content = route.data['cta'] as CtaContent | undefined;
    return content ? { key: router.url, content } : null;
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
