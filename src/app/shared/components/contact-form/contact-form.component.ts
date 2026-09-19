import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PROJECT_TYPES, SITE } from '../../../core/data/site';

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

const requiredValidator: ValidatorFn = (control) => (control.value ? null : { required: true });

type FieldName = 'name' | 'email' | 'projectType' | 'message';

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
  projectType: {
    required: 'Please choose a project type.',
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
 * A valid submit hands off to the visitor's email client via mailto:, exactly
 * as the static form did, so there is no async success state to show.
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

  protected readonly projectTypes = PROJECT_TYPES;
  protected readonly statusMessage = signal('');
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [trimmedLength(2, 100)] }),
    email: new FormControl('', { nonNullable: true, validators: [emailValidator] }),
    projectType: new FormControl('', { nonNullable: true, validators: [requiredValidator] }),
    message: new FormControl('', { nonNullable: true, validators: [trimmedLength(10, 2000)] }),
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
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.statusMessage.set('Please fix the highlighted fields before sending.');
      const firstInvalid = (Object.keys(this.form.controls) as FieldName[]).find((name) => this.form.controls[name].invalid);
      this.formEl().nativeElement.querySelector<HTMLElement>(`[formControlName="${firstInvalid}"]`)?.focus();
      return;
    }

    this.statusMessage.set('');
    const { name, email, projectType, message } = this.form.getRawValue();
    const body = [
      `Name=${name.trim()}`,
      `Email=${email.trim()}`,
      `Project Type=${projectType}`,
      `Message=${message.trim()}`,
    ].join('\r\n');
    window.location.href = `mailto:${SITE.email}?body=${encodeURIComponent(body)}`;
  }
}
