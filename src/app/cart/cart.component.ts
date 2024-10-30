import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { EmptyCartComponent } from './ui/empty-cart/empty-cart.component';
import { ProductItemCart, Product } from '../shared/interfaces/interfaces';
import { CheckoutComponent } from './ui/checkout/checkout.component';
import { AlsoBougthComponent } from './ui/also-bougth/also-bougth.component';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { FavoriteStateService } from '@shared/data-access/fav-state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, EmptyCartComponent, CheckoutComponent, AlsoBougthComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  state = inject(CartStateService).state;
  favState = inject(FavoriteStateService).state;
  private readonly _snackBar = inject(SnackBarService);

  onRemove(id: number) {
    this.state.remove(id);
    this._snackBar.showSnackBar('Producto eliminado', 'OK');
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });

    this._snackBar.showSnackBar('Producto agregado', 'OK');
  }

  onDecrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity - 1,
    });
    this._snackBar.showSnackBar('Producto eliminado', 'OK');
  }

  onFav(product: Product) {
    this.favState.add(product);
    this._snackBar.showSnackBar('Producto agregado a favoritos', 'OK');
  }
}
