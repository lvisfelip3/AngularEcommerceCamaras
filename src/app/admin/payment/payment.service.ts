import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseHttpService {
  constructor( private cookie: CookieService) {
    super();
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'payment/payment.php');
  }

  switchStatus(shipping_id: number, status: number): Observable<any> {
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
        .set('id', shipping_id.toString())
        .set('status', status.toString());

    const options = { headers, params };

    return this.http.post<any>(this.apiUrl + 'payment/payment.php', null, options);
  }

  getSalesByStatus(status: number): Observable<any[]> {
    const params = new HttpParams().set('status', status.toString());
    return this.http.get<any[]>(this.apiUrl + 'payment/payment.php', { params });
  }
}
