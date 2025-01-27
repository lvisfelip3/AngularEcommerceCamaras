import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comuna, Ciudad, Client, Adress, ProductItemCart, Order, response, ApiFlowResponse, FinalFlowResponse } from '@shared/interfaces/interfaces';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseHttpService {

  private readonly _snackbar = inject(SnackBarService);
  private readonly cartService = inject(CartStateService).state;
  private readonly _email = inject(EmailService);

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

  handleFlowPayment(client: Client, Adress: Adress, payment: { method: string }, cart: ProductItemCart[]): Observable<ApiFlowResponse> {
    const body = JSON.stringify({ ...client, ...Adress, ...payment, products: cart });

    return this.http.post<ApiFlowResponse>(this.apiUrl + 'flow/handlePayment.php', body).pipe(
      tap((response) => {
        if (response.urlFlow) {
          window.location.href = response.urlFlow
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error: ';
            
        if (error.error?.error) {
            errorMessage = error.error.error;
        }

        this._snackbar.showSnackBar(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }

  checkPaymentStatus(saleRef: string | null): Observable<FinalFlowResponse> {
    return this.http.post<FinalFlowResponse>(`${this.apiUrl}flow/angularConfirmation.php`, { saleRef }).pipe(
      catchError(error => {
        console.error('Error en pago:', error);
        return throwError(() => ({
          success: false,
          message: error.error?.message || 'Error en el proceso de pago'
        } as FinalFlowResponse));
      })
    );
  }

}
