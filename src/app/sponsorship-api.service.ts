import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SponsorshipAskResponse } from './models/sponsorship-ask-response';

/** Request body key must match your FastAPI model. */
export interface AskRequestBody {
  question: string;
}

@Injectable({ providedIn: 'root' })
export class SponsorshipApiService {
  private readonly http = inject(HttpClient);
  private readonly askUrl = 'http://127.0.0.1:8000/ask';

  ask(body: AskRequestBody): Observable<SponsorshipAskResponse> {
    return this.http.post<SponsorshipAskResponse>(this.askUrl, body);
  }
}
