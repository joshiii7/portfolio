import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { CapstoneProject, ProjectImage, ShowcaseProject } from '../../../core/models/project.model';
import { ProjectPictureComponent } from '../project-picture/project-picture.component';

/**
 * A manually-driven row of other projects, built on Swiper: nothing moves on its own. Drag it with
 * a mouse, swipe it on touch, or step through it with the arrow buttons on either side (Swiper's
 * Navigation module, pointed at our own button elements instead of its default markup so they can
 * carry this site's own styling). Each card is just the screenshot and a line of description — the
 * project name is still in its accessible name for anyone using a screen reader, just not shown
 * visually.
 */
@Component({
  selector: 'app-project-carousel',
  imports: [ProjectPictureComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './project-carousel.component.scss',
  template: `
    <div class="carousel">
      <button type="button" class="carousel__arrow carousel__arrow--prev" #prevBtn aria-label="Previous project">
        <span aria-hidden="true">&larr;</span>
      </button>

      <div class="carousel__swiper swiper" #swiperEl>
        <div class="swiper-wrapper">
          @for (project of projects(); track project.slug) {
            <div class="swiper-slide">
              <a class="carousel__card" [routerLink]="['/projects', project.slug]" [attr.aria-label]="project.name">
                <app-project-picture [image]="cardImage(project)" [sizes]="cardSizes" [crop]="true" />
                <p class="carousel__desc">{{ cardDescription(project) }}</p>
              </a>
            </div>
          }
        </div>
      </div>

      <button type="button" class="carousel__arrow carousel__arrow--next" #nextBtn aria-label="Next project">
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  `,
})
export class ProjectCarouselComponent implements AfterViewInit, OnDestroy {
  readonly projects = input.required<readonly (ShowcaseProject | CapstoneProject)[]>();

  protected readonly cardSizes = '(min-width: 640px) 20rem, 72vw';

  private readonly swiperRef = viewChild.required<ElementRef<HTMLElement>>('swiperEl');
  private readonly prevRef = viewChild.required<ElementRef<HTMLButtonElement>>('prevBtn');
  private readonly nextRef = viewChild.required<ElementRef<HTMLButtonElement>>('nextBtn');
  private swiper?: Swiper;

  protected cardImage(project: ShowcaseProject | CapstoneProject): ProjectImage {
    return 'images' in project ? project.images[0] : project.image;
  }

  protected cardDescription(project: ShowcaseProject | CapstoneProject): string {
    return 'images' in project ? project.summary : project.result;
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperRef().nativeElement, {
      modules: [Navigation],
      slidesPerView: 'auto',
      // Now that a card is just an image and a line of text, with no border or background of its
      // own, the gap between cards is the only thing separating them — wider than Swiper's default
      // so they still read as distinct items.
      spaceBetween: 40,
      grabCursor: true,
      navigation: {
        prevEl: this.prevRef().nativeElement,
        nextEl: this.nextRef().nativeElement,
      },
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
