import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { SplitText } from 'gsap/SplitText';
import { SITE } from '../../../core/data/site';
import { HomeMotionService } from '../../../core/services/home-motion.service';
import { MOTION } from '../../../core/services/motion-conditions';
import { MotionService } from '../../../core/services/motion.service';
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
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly homeMotion = inject(HomeMotionService);
  private readonly zone = inject(NgZone);
  private mm?: ReturnType<MotionService['gsap']['matchMedia']>;

  protected readonly site = SITE;

  private cols = 0;
  private rows = 0;
  private trail: TrailPoint[] = [];
  private frame = 0;
  /** The faint grid, drawn once per size into its own canvas and copied onto the visible one each frame. */
  private gridLayer?: HTMLCanvasElement;
  private onScreen = true;
  private running = false;
  private visibility?: IntersectionObserver;
  private sizeWatcher?: ResizeObserver;

  private readonly onMouseMove = (e: MouseEvent) => {
    if (!this.onScreen) return;
    const rect = this.canvasRef().nativeElement.getBoundingClientRect();
    this.trail.unshift({ x: e.clientX - rect.left, y: e.clientY - rect.top, time: Date.now() });
    if (this.trail.length > MAX_TRAIL) this.trail.pop();
    this.schedule();
  };

  ngAfterViewInit(): void {
    // The section the canvas fills. It is watched instead of the <app-hero> host, which is an inline
    // element and reports different boxes from browser to browser.
    const hero = this.canvasRef().nativeElement.parentElement!;

    this.resizeCanvas();
    window.addEventListener('mousemove', this.onMouseMove);

    // Fonts, the form and the layout can change the hero's height after it first renders, so the
    // canvas follows the section's real size rather than the size it had at mount.
    this.sizeWatcher = new ResizeObserver(() => {
      this.resizeCanvas();
      this.schedule();
    });
    this.sizeWatcher.observe(hero);

    // Nothing is drawn while the hero is scrolled out of view.
    this.visibility = new IntersectionObserver(([entry]) => {
      this.onScreen = entry.isIntersecting;
      if (this.onScreen) this.schedule();
      else this.stop();
    });
    this.visibility.observe(hero);

    this.schedule();
    this.zone.runOutsideAngular(() => this.setupMotion());
  }

  ngOnDestroy(): void {
    this.mm?.revert();
    this.stop();
    this.visibility?.disconnect();
    this.sizeWatcher?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  /**
   * GSAP: a headline line reveal with the rest of the hero following it (everywhere
   * except reduced motion), plus magnetic buttons and a slight copy parallax on
   * desktop with a mouse. Everything sits in matchMedia, so ngOnDestroy's revert()
   * cleans it up and reduced-motion visitors see the hero untouched.
   */
  private setupMotion(): void {
    const { gsap } = this.motion;
    const Splitter = this.homeMotion.SplitText;
    const q = <T extends HTMLElement>(selector: string) => this.host.querySelector<T>(selector);
    const title = q('.hero-copy h1');
    const intro = q('.hero-copy p');
    const copy = q('.hero-copy');
    const formCard = q('.hero-form-card');
    const buttons = gsap.utils.toArray<HTMLElement>('.hero-actions .btn', this.host);
    const magnets = gsap.utils.toArray<HTMLElement>('.hero-magnet', this.host);
    if (!title || !intro || !copy || !formCard) return;

    const mm = gsap.matchMedia(this.host);
    this.mm = mm;

    mm.add(MOTION.ok, (context) => {
      const later = [intro, ...buttons, formCard];

      // Start hidden right now, before the first paint. Opacity (not visibility) keeps
      // the links and form fields focusable while the entrance runs.
      gsap.set(title, { opacity: 0 });
      gsap.set([intro, ...buttons], { opacity: 0, y: 18, transition: 'none' });
      gsap.set(formCard, { opacity: 0, x: 28, transition: 'none' });

      let split: SplitText | undefined;
      let cancelled = false;

      // Split only once the web fonts are in (or after 0.8s), so the lines match the final layout.
      const fontsReady = Promise.race([document.fonts?.ready, new Promise<void>((resolve) => setTimeout(resolve, 800))]);
      void fontsReady.then(() => {
        if (cancelled) return;
        context.add(() => {
          split = Splitter.create(title, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(title, { opacity: 1 });
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.9,
                ease: 'power4.out',
                stagger: 0.08,
                willChange: 'transform',
                onComplete: () => void gsap.set(self.lines, { clearProps: 'willChange' }),
              });
            },
          });

          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              // Hand hover (and the .card / .btn transitions) back to the stylesheet.
              onComplete: () => void gsap.set(later, { clearProps: 'transform,opacity,transition' }),
            })
            .to(intro, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
            .to(buttons, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.5)
            .to(formCard, { opacity: 1, x: 0, duration: 0.8 }, 0.45);
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    });

    mm.add(MOTION.desktop, () => {
      const cleanups: Array<() => void> = [];
      const pull = gsap.utils.clamp(-10, 10);

      // Each button's wrapper drifts a few px toward the pointer and settles back.
      for (const el of magnets) {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        let centerX = 0;
        let centerY = 0;

        const enter = () => {
          const rect = el.getBoundingClientRect();
          centerX = rect.left + rect.width / 2 - Number(gsap.getProperty(el, 'x'));
          centerY = rect.top + rect.height / 2 - Number(gsap.getProperty(el, 'y'));
        };
        const move = (event: PointerEvent) => {
          xTo(pull((event.clientX - centerX) * 0.2));
          yTo(pull((event.clientY - centerY) * 0.2));
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener('pointerenter', enter);
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      }

      // The copy drifts up a little faster than the page as the hero scrolls away. The form
      // card stays put so it never moves under someone filling it in.
      gsap.to(copy, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: this.host, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    // Setting width or height clears the canvas, so only touch them when the size really changed.
    if (!width || !height || (width === canvas.width && height === canvas.height)) return;
    canvas.width = width;
    canvas.height = height;
    this.cols = Math.ceil(canvas.width / BOX_SIZE);
    this.rows = Math.ceil(canvas.height / BOX_SIZE);
    this.drawGridLayer(canvas.width, canvas.height);
  }

  private drawGridLayer(width: number, height: number): void {
    const layer = document.createElement('canvas');
    layer.width = width;
    layer.height = height;
    const ctx = layer.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'rgba(47, 129, 247, 0.06)';
    ctx.lineWidth = 1;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        ctx.strokeRect(c * BOX_SIZE, r * BOX_SIZE, BOX_SIZE, BOX_SIZE);
      }
    }
    this.gridLayer = layer;
  }

  /** Ask for a frame. Frames only run while the hero is on screen and there is something to draw. */
  private schedule(): void {
    if (this.running || !this.onScreen) return;
    this.running = true;
    this.frame = requestAnimationFrame(this.animate);
  }

  private stop(): void {
    cancelAnimationFrame(this.frame);
    this.running = false;
  }

  /** Faint grid, plus a glowing, fading trail of cells under the cursor. */
  private animate = (): void => {
    this.running = false;
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.gridLayer) ctx.drawImage(this.gridLayer, 0, 0);

    const now = Date.now();
    for (const point of this.trail) {
      const opacity = Math.max(0, 1 - (now - point.time) / TRAIL_FADE_MS);
      if (opacity <= 0) continue;

      const col = Math.floor(point.x / BOX_SIZE);
      const row = Math.floor(point.y / BOX_SIZE);

      ctx.strokeStyle = `rgba(47, 129, 247, ${opacity})`;
      ctx.shadowBlur = 15 * opacity;
      ctx.shadowColor = 'rgba(47, 129, 247, 0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(col * BOX_SIZE, row * BOX_SIZE, BOX_SIZE, BOX_SIZE);
      ctx.shadowBlur = 0;
    }

    this.trail = this.trail.filter((p) => now - p.time < TRAIL_LIFETIME_MS);
    // Keep drawing only while the trail is still fading; the next mouse move starts it again.
    if (this.trail.length) this.schedule();
  };
}
