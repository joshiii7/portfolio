import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PORTRAIT_PHOTOS } from '../../../core/data/photos';
import { SITE } from '../../../core/data/site';
import { CtaAction, CtaContent } from '../../../core/models/cta.model';
import { IconComponent } from '../icon/icon.component';
import { PhotoComponent } from '../photo/photo.component';

const DEFAULT_PRIMARY: CtaAction = { label: 'Start a Project', route: '/contact' };
const DEFAULT_SECONDARY: CtaAction = { label: SITE.phone, href: SITE.phoneHref, icon: 'phone' };

/**
 * The closing call to action, rendered once by the app shell after every page that has one, over
 * the same decorative photo everywhere (the competitor headshot the About page introduced). Pages
 * only choose the words (see core/data/cta.ts); the design and its place, last before the footer,
 * are not up to the page.
 */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, IconComponent, PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cta-band.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section class="section-py cta-band cta-band--photo">
      <app-photo [photo]="photo" focal="upper" />
      <div class="container" data-aos="zoom-in-up">
        <h2>{{ content().title }} <span class="heading-accent">{{ content().accent }}</span></h2>
        <p>{{ content().text }}</p>
        <div class="cta-actions">
          @if (primary(); as action) {
            @if (action.route) {
              <a [routerLink]="action.route" class="btn btn-primary btn-lg">{{ action.label }}</a>
            } @else {
              <a [href]="action.href" class="btn btn-primary btn-lg btn-phone">
                @if (action.icon) {
                  <app-icon [name]="action.icon" />
                }
                {{ action.label }}
              </a>
            }
          }
          @if (secondary(); as action) {
            <a
              [href]="action.href"
              class="btn btn-outline btn-lg btn-phone"
              [attr.target]="action.external ? '_blank' : null"
              [attr.rel]="action.external ? 'me noopener noreferrer' : null"
              [attr.aria-label]="action.ariaLabel ?? null"
            >
              @if (action.icon) {
                <app-icon [name]="action.icon" />
              }
              {{ action.label }}
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class CtaBandComponent {
  protected readonly photo = PORTRAIT_PHOTOS.headshot;

  readonly content = input.required<CtaContent>();

  protected readonly primary = computed(() => this.content().primary ?? DEFAULT_PRIMARY);
  protected readonly secondary = computed(() => this.content().secondary ?? DEFAULT_SECONDARY);
}
