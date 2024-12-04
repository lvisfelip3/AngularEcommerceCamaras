import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service'; 
import { Observable } from 'rxjs';
import { Order } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SaleInfoService extends BaseHttpService {

  constructor() { 
    super();
  }

  getSaleInfo(id: number): Observable<Order> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Order>(this.apiUrl + 'pedidos/pedido.php', { params });
  }
}
