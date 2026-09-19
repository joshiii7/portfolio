import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/data/site';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

/** Pre-footer call to action: a primary "contact" button beside a click-to-call button. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cta-band.component.scss',
  styles: `:host { display: block; }`,
  template: `
    <section appReveal class="section-py cta-band">
      <div class="container">
        <h2>{{ title() }} <span class="heading-accent">{{ accent() }}</span></h2>
        <p>{{ text() }}</p>
        <div class="cta-actions">
          <a routerLink="/contact" class="btn btn-primary btn-lg">{{ label() }}</a>
          <a [href]="site.phoneHref" class="btn btn-outline btn-lg btn-phone">
            <app-icon name="phone" /> {{ site.phone }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class CtaBandComponent {
  protected readonly site = SITE;

  /** Heading text before the accented last word(s). */
  readonly title = input.required<string>();
  readonly accent = input.required<string>();
  readonly text = input.required<string>();
  readonly label = input('Start a Project');
}
