import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ContactMailerService } from '../../../core/services/contact-mailer.service';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact-form.component.scss',
  templateUrl: './contact-form.component.html',
  host: { '[class.form--compact]': 'compact()' },
})
export class ContactFormComponent {
  /** Tighter spacing, used inside the Home hero card. */
  readonly compact = input(false);

  protected readonly statusMessage = signal('');
  protected readonly statusKind = signal<'success' | 'error'>('error');
  protected readonly sending = signal(false);
  private readonly mailer = inject(ContactMailerService);
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [trimmedLength(2, 100)] }),
    email: new FormControl('', { nonNullable: true, validators: [emailValidator] }),
    subject: new FormControl('', { nonNullable: true, validators: [trimmedLength(3, 150)] }),
    message: new FormControl('', { nonNullable: true, validators: [trimmedLength(10, 2000)] }),
    spam: new FormControl('', { nonNullable: true }),
  });

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

    this.statusMessage.set('');
    this.sending.set(true);
    const { name, email, subject, message, spam } = this.form.getRawValue();

    this.mailer
      .send({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), spam })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.form.reset();
          this.showStatus('success', SUCCESS_MESSAGE);
        },
        error: (response: HttpErrorResponse) => {
          this.sending.set(false);
          // Validation and rate-limit responses carry a readable message; anything else is generic.
          const detail = response.status === 400 || response.status === 429 ? response.error?.errors?.[0] : '';
          this.showStatus('error', detail || ERROR_MESSAGE);
        },
      });
  }

  private showStatus(kind: 'success' | 'error', text: string): void {
    this.statusKind.set(kind);
    this.statusMessage.set(text);
  }
}
