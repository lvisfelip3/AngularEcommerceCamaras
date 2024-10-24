import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../service/product-list-state.service'; 
import { RouterLink } from '@angular/router';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '@shared/ui/snack-bar.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [
    ProductDetailStateService
  ],
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state;
  cartState = inject(CartStateService).state;

  snackBar = inject(SnackBarService);

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    })
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1,
    });

    this.snackBar.showSnackBar('Producto agregado', 'OK');
  }
}
