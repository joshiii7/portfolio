import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/data/site';
import { ContactFormComponent } from '../../../shared/components/contact-form/contact-form.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

const BOX_SIZE = 35;
const MAX_TRAIL = 20;
const TRAIL_FADE_MS = 600;
const TRAIL_LIFETIME_MS = 800;

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink, IconComponent, ContactFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './hero.component.scss',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly site = SITE;

  private cols = 0;
  private rows = 0;
  private trail: TrailPoint[] = [];
  private frame = 0;

  private readonly onResize = () => this.resizeCanvas();

  private readonly onMouseMove = (e: MouseEvent) => {
    const rect = this.canvasRef().nativeElement.getBoundingClientRect();
    this.trail.unshift({ x: e.clientX - rect.left, y: e.clientY - rect.top, time: Date.now() });
    if (this.trail.length > MAX_TRAIL) this.trail.pop();
  };

  ngAfterViewInit(): void {
    this.resizeCanvas();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    this.cols = Math.ceil(canvas.width / BOX_SIZE);
    this.rows = Math.ceil(canvas.height / BOX_SIZE);
  }

  /** Faint grid, plus a glowing, fading trail of cells under the cursor. */
  private animate = (): void => {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        ctx.strokeStyle = 'rgba(132, 161, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.strokeRect(c * BOX_SIZE, r * BOX_SIZE, BOX_SIZE, BOX_SIZE);
      }
    }

    const now = Date.now();
    for (const point of this.trail) {
      const opacity = Math.max(0, 1 - (now - point.time) / TRAIL_FADE_MS);
      if (opacity <= 0) continue;

      const col = Math.floor(point.x / BOX_SIZE);
      const row = Math.floor(point.y / BOX_SIZE);

      ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
      ctx.shadowBlur = 15 * opacity;
      ctx.shadowColor = 'rgba(0, 68, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(col * BOX_SIZE, row * BOX_SIZE, BOX_SIZE, BOX_SIZE);
      ctx.shadowBlur = 0;
    }

    this.trail = this.trail.filter((p) => now - p.time < TRAIL_LIFETIME_MS);
    this.frame = requestAnimationFrame(this.animate);
  };
}
