import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../service/product-list-state.service'; 
import { RouterLink } from '@angular/router';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [ProductDetailStateService, MatButtonModule],
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state;
  cartState = inject(CartStateService).state;

  id = input.required<string>();

  constructor() {
    effect(() => {
      console.log(this.id());
      this.productDetailState.getById(this.id());
    })
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1,
    });
  }
}
