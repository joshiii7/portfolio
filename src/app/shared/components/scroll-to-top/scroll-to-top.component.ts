import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './scroll-to-top.component.scss',
  template: `
    <button
      type="button"
      id="scrollToTopBtn"
      title="Scroll to top"
      [class.is-visible]="scroll.showTopButton()"
      (click)="scroll.scrollToTop()"
    >
      <img src="assets/svg/up-arrow-svgrepo-com.svg" alt="" width="18" />
      <span>Top</span>
    </button>
  `,
})
export class ScrollToTopComponent {
  protected readonly scroll = inject(ScrollService);
}
