import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { Comuna, Ciudad, Client, Adress, ProductItemCart } from '@shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

interface response {
  message: string,
  orderId: string
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseHttpService {

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.apiUrl + 'ciudades/ciudad.php');
  }

  getComunas(): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(this.apiUrl + 'comunas/comuna.php');
  }

  getComunaByCiudad(ciudad_id: number): Observable<Comuna[]> {
    const params = new HttpParams().set('ciudad_id', ciudad_id.toString());
    return this.http.get<Comuna[]>(this.apiUrl + 'comunas/comuna.php', { params });
  }

  saveClientForPayment(client: Client, Adress: Adress, payment: { method: string }, cart: ProductItemCart[]): Observable<response> {
    const body = JSON.stringify({ ...client, ...Adress, ...payment, products: cart });
    return this.http.post<response>(this.apiUrl + 'clientes/cliente.php', body);
  }

  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'pedidos/pedido.php', { params: { id: orderId } });
  }

}
