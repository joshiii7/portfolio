import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  // A plain "#main" hash would resolve against <base href> and navigate to the
  // home route, and a browser doesn't reliably move keyboard focus to its scroll
  // target anyway (Safari won't, even with tabindex="-1"). Focusing <main>
  // explicitly makes the next Tab continue from inside the page content.
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
