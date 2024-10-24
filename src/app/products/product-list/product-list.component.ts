import { Component, inject, OnInit } from '@angular/core';
import { ProductStateService } from '../service/product-state.service';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { PaginationComponent } from '../ui/pagination/pagination.component';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { Product } from '../../shared/interfaces/interfaces';
import { FilterComponent } from '../ui/filter/filter.component';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductListSkeletonComponent } from '@products/ui/skeleton/product-list-skeleton/product-list-skeleton.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent, 
    PaginationComponent, 
    FilterComponent,
    ProductListSkeletonComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductStateService],
})
export default class ProductListComponent implements OnInit{
  productState = inject(ProductStateService);
  cartState = inject(CartStateService).state;

  searchControl = new FormControl('');
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    // Escuchar los cambios del searchControl para realizar la búsqueda
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string | null) => {
        if (searchTerm !== null && searchTerm.trim() !== '') {
          this.productState.search(searchTerm);
        }
      });

    // Suscribirse a los productos filtrados
    this.productState.products$.subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartState.add({ product, quantity: 1 });
  }
}
