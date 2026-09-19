import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureCardComponent } from '../../../shared/components/feature-card/feature-card.component';
import { SiteIconName } from '../../../shared/components/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface Reason {
  icon: SiteIconName;
  title: string;
  text: string;
}

@Component({
  selector: 'app-why-me',
  imports: [FeatureCardComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: block; }`,
  template: `
    <section appReveal class="section-py bg-secondary">
      <div class="container">
        <h2 class="section-title">Why Work With <span class="heading-accent">Me</span></h2>
        <div class="grid grid-3">
          @for (reason of reasons; track reason.title) {
            <app-feature-card [icon]="reason.icon" [title]="reason.title" [text]="reason.text" />
          }
        </div>
      </div>
    </section>
  `,
})
export class WhyMeComponent {
  protected readonly reasons: Reason[] = [
    {
      icon: 'building',
      title: 'Real Systems, Real Organizations',
      text: "The projects on this site are systems I've actually built and shipped for real organizations, not tutorials or templates.",
    },
    {
      icon: 'pen',
      title: 'Design-Minded Development',
      text: 'My background is in design, so usability and visual polish are part of the build from day one, not an afterthought.',
    },
    {
      icon: 'chat',
      title: 'Direct Communication',
      text: "You work directly with me. No account managers, no hand-offs. I'm currently taking on new projects.",
    },
  ];
}
