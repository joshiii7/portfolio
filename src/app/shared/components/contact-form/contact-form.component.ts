import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ContactMailerService } from '../../../core/services/contact-mailer.service';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The public site key from the reCAPTCHA admin console (google.com/recaptcha/admin), site type
 * "Challenge (v2) — I'm not a robot Checkbox". Safe to keep in client code: unlike the secret key
 * (RECAPTCHA_SECRET_KEY, used server-side in api/send-mail.js), the site key is meant to be public.
 * This placeholder must be replaced with a real key before the widget will render.
 */
const RECAPTCHA_SITE_KEY = '6LeZ_8gtAAAAAIlbvO_GqY_NO51isiGrIVt5TyC7';

/** The slice of the global `grecaptcha` object (loaded from Google's own script) this form uses. */
interface Grecaptcha {
  render(
    container: HTMLElement,
    params: { sitekey: string; size?: 'normal' | 'compact'; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void },
  ): number;
  reset(widgetId?: number): void;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/** Validates the trimmed value: required, then min / max length. */
function trimmedLength(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = String(control.value ?? '').trim().length;
    if (!length) return { required: true };
    if (length < min) return { minlength: true };
    if (length > max) return { maxlength: true };
    return null;
  };
}

const emailValidator: ValidatorFn = (control) => {
  const value = String(control.value ?? '').trim();
  if (!value) return { required: true };
  return EMAIL_PATTERN.test(value) ? null : { email: true };
};

type FieldName = 'name' | 'email' | 'subject' | 'message';

const SUCCESS_MESSAGE = "Thanks! Your message was sent. I'll get back to you soon.";
const ERROR_MESSAGE = 'Sorry, your message could not be sent. Please try again later or email me directly.';

const MESSAGES: Record<FieldName, Record<string, string>> = {
  name: {
    required: 'Please enter your name.',
    minlength: 'Name should be at least 2 characters.',
    maxlength: 'Name should be under 100 characters.',
  },
  email: {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  },
  subject: {
    required: 'Please enter a subject.',
    minlength: 'Subject should be at least 3 characters.',
    maxlength: 'Subject should be under 150 characters.',
  },
  message: {
    required: 'Please tell me a bit about your project.',
    minlength: 'Please add a few more details (at least 10 characters).',
    maxlength: 'Message should be under 2000 characters.',
  },
};

/**
 * Contact form shared by the Home hero card and the Contact page. Errors show
 * once a field has been touched (left once), then update live on every change.
 * A valid submit posts to the /api/send-mail function; the button is disabled
 * while it is in flight and the result is announced in the status region.
 * `spam` is a honeypot field hidden from people; the API drops any submission that fills it.
 * The reCAPTCHA checkbox is a second, visible line of defense (the honeypot alone is invisible to
 * a visitor, so it does nothing to reassure a human that the form is being taken seriously); its
 * token is only trusted once api/send-mail.js verifies it with Google server-side.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact-form.component.scss',
  templateUrl: './contact-form.component.html',
  host: { '[class.form--compact]': 'compact()' },
})
export class ContactFormComponent implements AfterViewInit {
  /** Tighter spacing, used inside the Home hero card. */
  readonly compact = input(false);

  protected readonly statusMessage = signal('');
  protected readonly statusKind = signal<'success' | 'error'>('error');
  protected readonly sending = signal(false);
  private readonly mailer = inject(ContactMailerService);
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');
  private readonly recaptchaEl = viewChild.required<ElementRef<HTMLElement>>('recaptchaEl');

  /** The completed widget's response token, set by its callback; empty means not completed yet. */
  protected readonly recaptchaToken = signal('');
  protected readonly recaptchaTouched = signal(false);
  private recaptchaWidgetId?: number;
  /** Shared across every instance, so a second contact form on the same page reuses the one script tag. */
  private static scriptLoading?: Promise<void>;

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [trimmedLength(2, 100)] }),
    email: new FormControl('', { nonNullable: true, validators: [emailValidator] }),
    subject: new FormControl('', { nonNullable: true, validators: [trimmedLength(3, 150)] }),
    message: new FormControl('', { nonNullable: true, validators: [trimmedLength(10, 2000)] }),
    spam: new FormControl('', { nonNullable: true }),
  });

  ngAfterViewInit(): void {
    this.loadRecaptchaScript().then(() => this.renderRecaptcha());
  }

  private loadRecaptchaScript(): Promise<void> {
    if (window.grecaptcha) return Promise.resolve();
    if (!ContactFormComponent.scriptLoading) {
      ContactFormComponent.scriptLoading = new Promise((resolve) => {
        const onloadName = '__recaptchaOnload';
        (window as unknown as Record<string, () => void>)[onloadName] = () => resolve();
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?onload=${onloadName}&render=explicit`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      });
    }
    return ContactFormComponent.scriptLoading;
  }

  private renderRecaptcha(): void {
    this.recaptchaWidgetId = window.grecaptcha?.render(this.recaptchaEl().nativeElement, {
      sitekey: RECAPTCHA_SITE_KEY,
      // The standard-size widget (304px) is too wide for the compact Home hero card.
      size: this.compact() ? 'compact' : 'normal',
      callback: (token) => {
        this.recaptchaToken.set(token);
        this.recaptchaTouched.set(true);
      },
      'expired-callback': () => this.recaptchaToken.set(''),
      'error-callback': () => this.recaptchaToken.set(''),
    });
  }

  protected error(field: FieldName): string {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) return '';
    const key = Object.keys(control.errors)[0];
    return MESSAGES[field][key] ?? '';
  }

  protected isInvalid(field: FieldName): boolean {
    return !!this.error(field);
  }

  protected isValid(field: FieldName): boolean {
    const control = this.form.controls[field];
    return control.touched && control.valid;
  }

  protected submit(): void {
    if (this.sending()) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.showStatus('error', 'Please fix the highlighted fields before sending.');
      const firstInvalid = (Object.keys(this.form.controls) as FieldName[]).find((name) => this.form.controls[name].invalid);
      this.formEl().nativeElement.querySelector<HTMLElement>(`[formControlName="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!this.recaptchaToken()) {
      this.recaptchaTouched.set(true);
      this.showStatus('error', 'Please complete the reCAPTCHA check before sending.');
      return;
    }

    this.statusMessage.set('');
    this.sending.set(true);
    const { name, email, subject, message, spam } = this.form.getRawValue();

    this.mailer
      .send({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), spam, recaptchaToken: this.recaptchaToken() })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.form.reset();
          this.resetRecaptcha();
          this.showStatus('success', SUCCESS_MESSAGE);
        },
        error: (response: HttpErrorResponse) => {
          this.sending.set(false);
          // A failed check is worth a fresh widget: the token is single-use either way.
          this.resetRecaptcha();
          // Validation and rate-limit responses carry a readable message; anything else is generic.
          const detail = response.status === 400 || response.status === 429 ? response.error?.errors?.[0] : '';
          this.showStatus('error', detail || ERROR_MESSAGE);
        },
      });
  }

  private resetRecaptcha(): void {
    if (this.recaptchaWidgetId !== undefined) window.grecaptcha?.reset(this.recaptchaWidgetId);
    this.recaptchaToken.set('');
    this.recaptchaTouched.set(false);
  }

  private showStatus(kind: 'success' | 'error', text: string): void {
    this.statusKind.set(kind);
    this.statusMessage.set(text);
  }
}
