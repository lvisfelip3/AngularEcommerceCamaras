import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Adress, Payment } from '@shared/interfaces/interfaces';
import { PreparingOrderIconComponent } from '@order/utils/icons/preparing-order-icon.component';
import { ShippingOrderIconComponent } from '@order/utils/icons/shipping-order-icon.component';
import { ShippedOrderIconComponent } from '@order/utils/icons/shipped-order-icon.component';

@Component({
  selector: 'app-delivery-data',
  standalone: true,
  imports: [
    MatIconModule,
    PreparingOrderIconComponent,
    ShippingOrderIconComponent,
    ShippedOrderIconComponent
  ],
  templateUrl: './delivery-data.component.html',
  styleUrl: './delivery-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryDataComponent {
  @Input() delivery: Adress | null = null;
  @Input() payment: Payment | null = null;

  PaymentState(state: number) {
    switch (state) {
      case 0:
        return 'En espera de pago';
      case 1:
        return 'Pago Realizado';
      case 2:
        return 'Pago Pendiente';
      case 3:
        return 'Pago rechazado';
      default:
        return 'N/A';
    }
  }

  ShippingState(state: number) {
    switch (state) {
      case 0:
        return 'En espera de envío';
      case 1:
        return 'Completado';
      case 2:
        return 'Asignado';
      case 3:
        return 'Pendiente';
      default:
        return 'N/A';
    }
  }
}
