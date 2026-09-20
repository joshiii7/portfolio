import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: must stay empty. Bots fill it, the API silently drops those. */
  spam: string;
}

export interface MailerResponse {
  code: number;
  errors?: string[];
}

/** Posts the contact form to the Vercel function at /api/send-mail (same origin, relative URL). */
@Injectable({ providedIn: 'root' })
export class ContactMailerService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<MailerResponse> {
    return this.http.post<MailerResponse>('/api/send-mail', payload, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
  }
}
