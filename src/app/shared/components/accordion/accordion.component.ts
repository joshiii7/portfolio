import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Faq } from '../../../core/models/faq.model';
import { splitOnLinkPlaceholder } from '../../utils/text-link';

/**
 * Exclusive accordion: opening one item closes whichever other item is open.
 * Built from real <button> triggers (native Enter/Space + focus), with
 * aria-expanded / aria-controls set explicitly. The first item starts open.
 */
@Component({
  selector: 'app-accordion',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './accordion.component.scss',
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  readonly items = input.required<readonly Faq[]>();
  /** Unique per accordion on a page, so trigger/panel ids never collide. */
  readonly idPrefix = input.required<string>();

  protected readonly openIndex = signal<number | null>(0);

  protected toggle(index: number): void {
    this.openIndex.update((open) => (open === index ? null : index));
  }

  /** Splits an answer on its `{link}` placeholder so the link renders as a router link. */
  protected parts(faq: Faq): [string, string] {
    return splitOnLinkPlaceholder(faq.a);
  }
}
