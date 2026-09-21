import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The AJ monogram with its wordmark: the mark, a hairline divider, and "Adlawan / Joshi" stacked
 * in the heading font. The mark is inlined (not an <img>) so `fill="currentColor"` follows the
 * colour of whatever wraps it; an SVG loaded through <img> can't inherit CSS colour.
 *
 * Purely visual: the link that wraps it carries the accessible name, and its label repeats the
 * wordmark text so the visible and spoken names match.
 *
 * The mark is the same artwork as public/images/logo/aj-mark.svg, redrawn with a lighter stroke
 * (18 units instead of 26). The master aj-logo.svg is unchanged.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './logo.component.scss',
  template: `
    <svg viewBox="220 195 360 410" fill="currentColor" aria-hidden="true" focusable="false">
      <g transform="translate(400 400) scale(1.2) translate(-707 -384)">
        <path d="M739.7 329 L722.5 329 L678.9 237.5 L625.8 356 L748 356 L748 374 L617.4 374 L587.4 440 L570.2 440 L668.6 223 L689.5 223 Z" />
        <path d="M796.7 440 L779.5 440 L740.3 356 L757.5 356 Z" />
        <path d="M846 502.8 L783 544.2 L721 502.9 L721 461 L739 461 L739 493.2 L783 521.8 L828 492.2 L828 371 L787 371 L787 353 L846 353 Z" />
      </g>
    </svg>
    <span class="word" aria-hidden="true">
      <span class="word__rule"></span>
      <span class="word__text">
        <span class="word__line word__line--last">Adlawan</span>
        <span class="word__line word__line--first">Joshi</span>
      </span>
    </span>
  `,
})
export class LogoComponent {}
