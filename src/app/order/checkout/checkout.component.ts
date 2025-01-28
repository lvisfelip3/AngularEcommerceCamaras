import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeliveryService } from '@order/services/delivery.service';
import { Action, EmailService, Type } from '@order/services/email.service';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { catchError, EMPTY, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  template: `
  <section class="min-h-screen flex justify-center items-center">
    <mat-spinner></mat-spinner>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  orderService = inject(DeliveryService);
  cartService = inject(CartStateService).state;
  _email = inject(EmailService)

  orderRef = input.required<string>();

  ngOnInit(): void {
    this.requestFlowStatus();
  }
  
  requestFlowStatus(): void {
    this.orderService.checkPaymentStatus(this.orderRef()).pipe(
      tap(() => this.cartService.clear()),
      switchMap(res => {
        
        if (res.success === false) {
          window.location.href = `https://camarasdeseguridadfacil.cl/pedidos/paymentError/${res.status}`;
          return EMPTY;
        }
        
        return this.orderService.getOrderDetails(this.orderRef()).pipe(
          switchMap(data => {
            const clientData = {
              email: data.client.email,
              nombre: data.client.nombre,
              apellido: data.client.apellido,
              orderRef: this.orderRef(),
              action: Action.CREATE,
              type: Type.DELIVERY
            };
            
            return this._email.sendMail(clientData).pipe(
              tap(() => {
                window.location.href = `https://camarasdeseguridadfacil.cl/pedidos/confirmed/${this.orderRef()}`;
              })
            );
          })
        );
      }),
      catchError(error => {
        return throwError(() => error);
      })
    ).subscribe();
  }
}
