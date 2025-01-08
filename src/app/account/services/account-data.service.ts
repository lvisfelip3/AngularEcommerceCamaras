import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { formValue, userOrder } from '@shared/interfaces/interfaces';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; 

interface userResponse {
  status: boolean,
  message?: string
}

@Injectable({
  providedIn: 'root'
})
export class AccountDataService extends BaseHttpService{

  constructor(private cookie: CookieService) {
    super();
  }

  getUserOrders(id: number): Observable<userOrder[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<userOrder[]>(this.apiUrl + 'usuarios/data.php', { params });
  }

  setUserPersonalData(id: number, data: formValue): Observable<userResponse> {
    const jwt = this.cookie.get('authToken');
    const params = new HttpParams().set('id', id.toString());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.http.post<userResponse>(this.apiUrl + 'usuarios/data.php', data, { params, headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
