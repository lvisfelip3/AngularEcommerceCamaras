import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { EmptyCartComponent } from './ui/empty-cart/empty-cart.component';
import { ProductItemCart } from '../shared/interfaces/interfaces';
import { CheckoutComponent } from './ui/checkout/checkout.component';
import { AlsoBougthComponent } from './ui/also-bougth/also-bougth.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, EmptyCartComponent, CheckoutComponent, AlsoBougthComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity - 1,
    });
  }
}
