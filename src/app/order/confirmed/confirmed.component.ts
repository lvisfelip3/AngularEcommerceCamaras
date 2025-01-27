import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ClientDataComponent, DeliveryDataComponent, ProductsDataComponent } from '@order/confirmed';
import { DeliveryService } from '@order/services/delivery.service';
import { ProductItemOrder, Client, Adress, Payment } from "@shared/interfaces/interfaces";
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';

@Component({
  selector: 'app-confirmed',
  standalone: true,
  imports: [
    MatTabsModule,
    ClientDataComponent,
    DeliveryDataComponent,
    ProductsDataComponent,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmedComponent implements OnInit {

  clientData: Client | null = null;
  addressData: Adress | null = null;
  paymentData: Payment | null = null;
  products: ProductItemOrder[] = [];

  readonly orderRef = input.required<string>();

  constructor(
    private orderService: DeliveryService,
  ) {}

  ngOnInit() {
    this.requestOrder();
  }

  requestOrder(): void {
    if (this.orderRef()) {
      this.orderService.getOrderDetails(this.orderRef()).pipe(
        tap((data) => {
          const { client, address, payment, productos } = data;
          this.clientData = client;
          this.addressData = address;
          this.paymentData = payment;
          this.products = productos;
        })
      )
      .subscribe();
    }
  }
}
