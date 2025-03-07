import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { catchError, throwError } from 'rxjs';

export const fetchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const baseService = inject(BaseHttpService);
  const snackBarService = inject(SnackBarService);

  baseService.setError(false);

  return next(req).pipe(
    catchError((error) => {
      if (error.error.cod === 5) snackBarService.showSnackBar(error.error.message, 'OK');
      
      baseService.setError(true);
      return throwError(() => console.error(error));
    })
  );
};
