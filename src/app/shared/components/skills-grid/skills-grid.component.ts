import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillItem } from '../../../core/models/skill.model';

/** Glowing icon tiles, marked up as a real list so assistive tech announces it as one. */
@Component({
  selector: 'app-skills-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './skills-grid.component.scss',
  template: `
    <ul class="skills" [attr.aria-label]="label()">
      @for (item of items(); track item.name) {
        <li class="skill-card">
          <div class="glow" [style.background]="item.color"></div>
          <div class="content">
            <img [src]="item.icon" [alt]="item.name" />
            <p>{{ item.name }}</p>
          </div>
        </li>
      } @empty {
        <li>Nothing to show here yet.</li>
      }
    </ul>
  `,
})
export class SkillsGridComponent {
  readonly items = input.required<readonly SkillItem[]>();
  readonly label = input.required<string>();
}
