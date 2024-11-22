import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { EmptyCartComponent } from './ui/empty-cart/empty-cart.component';
import { ProductItemCart, Product } from '../shared/interfaces/interfaces';
import { CheckoutComponent } from './ui/checkout/checkout.component';
import { FeaturedProductsComponent } from '@home/ui/featured-products/featured-products.component';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { FavoriteStateService } from '@shared/data-access/fav-state.service';
import { CartItemSkeletonComponent } from '@cart/ui/cart-item-skeleton/cart-item-skeleton.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent, 
    EmptyCartComponent, 
    CheckoutComponent,
    FeaturedProductsComponent,
    CartItemSkeletonComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    const newQuantity = product.quantity + 1;
    
    if (newQuantity > product.product.stock) {
        this._snackBar.showSnackBar('No hay suficiente stock disponible', 'OK');
        return;
    }

    this.state.update({
        product: product.product,
        quantity: newQuantity,
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
