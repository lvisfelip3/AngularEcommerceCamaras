import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { catchError, throwError } from 'rxjs';

export const fetchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const baseService = inject(BaseHttpService);
  baseService.setError(false);
  return next(req).pipe(
    catchError((error) => {
      baseService.setError(true);
      return throwError(() => console.error(error));
    })
  );
};
