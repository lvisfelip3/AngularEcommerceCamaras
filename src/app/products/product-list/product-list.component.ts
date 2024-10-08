import { Component, inject } from '@angular/core';
import { ProductStateService } from '../service/product-state.service';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { PaginationComponent } from "../ui/pagination/pagination.component";
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { Product } from '../../shared/interfaces/interfaces';
import { FilterComponent } from "../ui/filter/filter.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent, FilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductStateService],
})
export default class ProductListComponent {

  productState = inject(ProductStateService);
  cartState = inject(CartStateService).state;

  addToCart(product: Product) {
    this.cartState.add({product, quantity: 1});
  }
}
