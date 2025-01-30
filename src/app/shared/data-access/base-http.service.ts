import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);

  setError(error: boolean) {
    this.isError.set(error);
  }
}
