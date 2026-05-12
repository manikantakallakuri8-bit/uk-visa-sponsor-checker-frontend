import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SponsorshipAskResponse } from './models/sponsorship-ask-response';
import { SponsorshipApiService } from './sponsorship-api.service';

function formatApiErrorDetail(err: HttpErrorResponse): string {
  const body = err.error;
  if (body && typeof body === 'object' && 'detail' in body) {
    const d = (body as { detail: unknown }).detail;
    if (Array.isArray(d)) {
      return d
        .map((item) =>
          typeof item === 'object' && item && 'msg' in item
            ? String((item as { msg: unknown }).msg)
            : JSON.stringify(item),
        )
        .join(' ');
    }
    return String(d);
  }
  return err.message || 'Unknown error';
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly api = inject(SponsorshipApiService);

  readonly title = 'UK sponsor licence lookup';

  searchText = '';
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly result = signal<SponsorshipAskResponse | null>(null);

  submitSearch(): void {
    const q = this.searchText.trim();
    if (!q || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.result.set(null);

    this.api.ask({ question: q }).subscribe({
      next: (res) => {
        this.result.set(res);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        if (err instanceof HttpErrorResponse) {
          const detail = formatApiErrorDetail(err);
          this.errorMessage.set(
            err.status ? `Request failed (${err.status}): ${detail}` : detail,
          );
        } else {
          this.errorMessage.set('Something went wrong. Is the API running on port 8000?');
        }
      },
    });
  }
}
