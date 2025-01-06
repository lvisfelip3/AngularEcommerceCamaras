import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comuna, Ciudad, Client, Adress, ProductItemCart, Order } from '@shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

interface response {
  message: string,
  orderRef: string
}

interface FlowResponse {
  success: boolean;
  message?: string;
  flowError?: {
    code: string;
    message: string;
    mediaCode: string;
  };
  saleId?: number;
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

  getOrderDetails(orderRef: string): Observable<Order> {
    return this.http.get<Order>(this.apiUrl + 'pedidos/pedido.php', { params: { id: orderRef } });
  }

  handleFlowPayment(client: Client, Adress: Adress, payment: { method: string }, cart: ProductItemCart[]): Observable<any> {
    const body = JSON.stringify({ ...client, ...Adress, ...payment, products: cart });
    return this.http.post<any>(this.apiUrl + 'flow/handlePayment.php', body).pipe(
      tap(response => {
        if (response.urlFlow) {
          window.location.href = response.urlFlow
        }
      })
    );
  }

  checkPaymentStatus(saleRef: string | null): Observable<FlowResponse> {
    return this.http.post<FlowResponse>(`${this.apiUrl}flow/angularConfirmation.php`, { saleRef }).pipe(
      catchError(error => {
        console.error('Error en pago:', error);
        return throwError(() => ({
          success: false,
          message: error.error?.message || 'Error en el proceso de pago'
        } as FlowResponse));
      })
    );
  }

}
