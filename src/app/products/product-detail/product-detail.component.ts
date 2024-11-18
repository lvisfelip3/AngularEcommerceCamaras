import { 
  ChangeDetectionStrategy, 
  Component, 
  inject, 
  input, 
  effect
} from '@angular/core';
import { ProductDetailStateService } from '../service/product-list-state.service';
import { RouterLink } from '@angular/router';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { ProductDetailSkeletonComponent } from './product-detail-skeleton/product-detail-skeleton.component';
import { FavoriteStateService } from '@shared/data-access/fav-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    ProductDetailSkeletonComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [
    ProductDetailStateService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductDetailComponent {
  readonly productDetailState = inject(ProductDetailStateService).state;
  private readonly cartState = inject(CartStateService).state;
  private readonly snackBar = inject(SnackBarService);
  private readonly favState = inject(FavoriteStateService).state;

  readonly id = input.required<string>();

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        this.productDetailState.getById(currentId);
      }
    }, { allowSignalWrites: true });
  }

  addToCart(): void {
    const currentProduct = this.productDetailState.product();
    
    if (!currentProduct) {
      this.snackBar.showSnackBar('Error: Producto no disponible', 'OK');
      return;
    }

    this.cartState.add({
      product: currentProduct,
      quantity: 1,
    });

    this.snackBar.showSnackBar('Producto agregado', 'OK');
  }

  addToFav(): void {
    const currentProduct = this.productDetailState.product();

    if (!currentProduct) {
      this.snackBar.showSnackBar('Error: Producto no disponible', 'OK');
      return;
    }

    this.favState.add(currentProduct);
    this.snackBar.showSnackBar('Producto agregado', 'OK');
  }
}