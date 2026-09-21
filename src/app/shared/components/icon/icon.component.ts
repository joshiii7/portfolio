import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../../core/models/service.model';

export type SiteIconName =
  | IconName
  | 'phone' | 'check' | 'x' | 'medal' | 'badge-shield' | 'building' | 'pen' | 'chat'
  | 'whatsapp' | 'facebook' | 'github' | 'codewars' | 'codepen';

/**
 * Every inline SVG icon on the site, selected by name. Stroke icons inherit
 * `currentColor`; the social glyphs are filled. `inline` adds the shared
 * `.inline-icon` treatment for icons sitting next to text.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `:host { display: contents; }`,
  template: `
    @switch (name()) {
      @case ('whatsapp') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.19 3.01.15.2 2.06 3.14 5 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.2-.55-.34ZM12.02 2C6.5 2 2.03 6.48 2.03 12c0 1.9.53 3.68 1.44 5.2L2 22l4.94-1.42A9.94 9.94 0 0 0 12.02 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2c-1.68 0-3.24-.47-4.58-1.28l-.33-.2-3.02.87.87-2.94-.21-.34a8.2 8.2 0 0 1-1.29-4.31c0-4.53 3.69-8.2 8.2-8.2 4.53 0 8.2 3.68 8.2 8.2 0 4.53-3.68 8.2-8.2 8.2Z"></path></svg>
      }
      @case ('facebook') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
      }
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"></path></svg>
      }
      @default {
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          [attr.stroke-width]="name() === 'check' ? 2.5 : 1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class.inline-icon]="inline()"
          [attr.aria-hidden]="decorativeOnly() ? 'true' : null"
        >
          @switch (name()) {
            @case ('dashboard') {
              <rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>
            }
            @case ('browser') {
              <rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><circle cx="6.5" cy="6.5" r="0.4" fill="currentColor" stroke="none"></circle><circle cx="9" cy="6.5" r="0.4" fill="currentColor" stroke="none"></circle>
            }
            @case ('code') {
              <polyline points="8 6 3 12 8 18"></polyline><polyline points="16 6 21 12 16 18"></polyline>
            }
            @case ('checklist') {
              <rect x="4" y="3" width="16" height="18" rx="2"></rect><polyline points="8 11 10 13 14 9"></polyline><line x1="8" y1="17" x2="16" y2="17"></line>
            }
            @case ('layers') {
              <polygon points="12 2 22 8.5 12 15 2 8.5 12 2"></polygon><polyline points="2 14.5 12 21 22 14.5"></polyline>
            }
            @case ('smartphone') {
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
            }
            @case ('layout') {
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>
            }
            @case ('zap') {
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            }
            @case ('wrench') {
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>
            }
            @case ('target') {
              <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
            }
            @case ('shield') {
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>
            }
            @case ('report') {
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>
            }
            @case ('mail') {
              <rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            }
            @case ('phone') {
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
            }
            @case ('check') {
              <polyline points="20 6 9 17 4 12"></polyline>
            }
            @case ('x') {
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            }
            @case ('medal') {
              <circle cx="12" cy="8" r="6"></circle><path d="M8.5 13.5 6 22l6-3 6 3-2.5-8.5"></path>
            }
            @case ('badge-shield') {
              <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z"></path><polyline points="9 12 11 14 15 10"></polyline>
            }
            @case ('building') {
              <rect x="4" y="3" width="16" height="18" rx="1"></rect><line x1="8" y1="7" x2="8" y2="7.01"></line><line x1="12" y1="7" x2="12" y2="7.01"></line><line x1="16" y1="7" x2="16" y2="7.01"></line><line x1="8" y1="11" x2="8" y2="11.01"></line><line x1="12" y1="11" x2="12" y2="11.01"></line><line x1="16" y1="11" x2="16" y2="11.01"></line><line x1="9" y1="21" x2="9" y2="16"></line><line x1="15" y1="21" x2="15" y2="16"></line>
            }
            @case ('pen') {
              <path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
            }
            @case ('codepen') {
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>
            }
            @case ('codewars') {
              <line x1="4" y1="4" x2="18" y2="18"></line><line x1="20" y1="4" x2="6" y2="18"></line><line x1="12" y1="16" x2="16" y2="12"></line><line x1="12" y1="12" x2="8" y2="16"></line><line x1="18" y1="18" x2="20.5" y2="20.5"></line><line x1="6" y1="18" x2="3.5" y2="20.5"></line>
            }
            @case ('chat') {
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            }
          }
        </svg>
      }
    }
  `,
})
export class IconComponent {
  readonly name = input.required<SiteIconName>();
  /** Adds the shared `.inline-icon` treatment (icon sitting next to text). */
  readonly inline = input(false);
  /** Icons are decorative everywhere on this site; the label lives in adjacent text. */
  readonly decorativeOnly = input(true);
}
