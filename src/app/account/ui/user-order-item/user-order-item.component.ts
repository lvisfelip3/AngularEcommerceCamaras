import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { userOrder } from '@shared/interfaces/interfaces';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-user-order-item',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    DatePipe,
    CurrencyPipe,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './user-order-item.component.html',
  styleUrl: './user-order-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrderItemComponent {
  order = input.required<userOrder>()

  statePayment(state: number) {
    switch (state) {
      case 1:
        return 'Realizado'
      case 2:
        return 'Pendiente'
      case 3:
        return 'Fallido'
      default:
        return 'Cancelado'
    }
  }

  stateShipping(state: number) {
    switch (state) {
      case 1:
        return 'Completado'
      case 2:
        return 'Asignado'
      case 3:
        return 'Pendiente'
      default:
        return 'Cancelado'
    }
  }
}
