import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { ProductItemCart } from '@shared/interfaces/interfaces';
import { OrderItemComponent } from '@order/ui/order-item/order-item.component';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    OrderItemComponent,
    RouterLink,
    MatDividerModule,
    CurrencyPipe
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent{
  cart_ = inject(CartStateService).state
  products$: ProductItemCart[] = this.cart_.products()

}
