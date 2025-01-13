import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { Adress, formValue, userOrder } from '@shared/interfaces/interfaces';
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

  createAddress(id: number, data: Adress): Observable<userResponse> {
    const jwt = this.cookie.get('authToken');
    const params = new HttpParams().set('id', id.toString()).set('action', 'createAddress');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.http.post<userResponse>(this.apiUrl + 'usuarios/data.php', data, { params, headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  deleteAddress(id: number): Observable<userResponse> {
    const jwt = this.cookie.get('authToken');
    const params = new HttpParams().set('id', id.toString());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.http.delete<userResponse>(this.apiUrl + 'usuarios/data.php', { params, headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getUserAddress(id: number): Observable<Adress[]> {
    const params = new HttpParams().set('id', id.toString()).set('action', 'getAddress');
    return this.http.get<Adress[]>(this.apiUrl + 'usuarios/data.php', { params }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
