import { 
  ChangeDetectionStrategy, 
  Component, 
  inject, 
  input, 
  effect,
  computed
} from '@angular/core';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { FavoriteStateService } from '@shared/data-access/fav-state.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsService } from '@products/service/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductDetailComponent {
  private readonly cartState = inject(CartStateService).state;
  private readonly snackBar = inject(SnackBarService);
  private readonly favState = inject(FavoriteStateService).state;
  private readonly productService = inject(ProductsService);

  slugProduct = input.required<string>();
  currentProduct = computed(() => this.productService.selectedProduct$())

  constructor() {
    effect(() => {
      const currentName = this.slugProduct();
      if (currentName) {
        this.productService.getProductByName(currentName).subscribe();
      }
    });
  }

  addToCart(): void {
    const currentProduct = this.currentProduct();
    
    if (!currentProduct) {
      this.snackBar.showSnackBar('Error: Producto no disponible', 'OK');
      return;
    }

    this.cartState.add({
      product: currentProduct,
      quantity: 1,
    });
  }

  addToFav(): void {
    const currentProduct = this.currentProduct();

    if (!currentProduct) {
      this.snackBar.showSnackBar('Error: Producto no disponible', 'OK');
      return;
    }

    this.favState.add(currentProduct);
    this.snackBar.showSnackBar('Producto agregado', 'OK');
  }
}