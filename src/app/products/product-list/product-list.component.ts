import { Component, inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProductStateService } from '../service/product-state.service';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { Product } from '../../shared/interfaces/interfaces';
import { FilterComponent } from '../ui/filter/filter.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductListSkeletonComponent } from '@products/ui/skeleton/product-list-skeleton/product-list-skeleton.component';
import { ProductsService } from '@products/service/products.service';
import { EmptyProductComponent } from '@products/ui/empty-product/empty-product.component';
import { SortProductsPipe } from '@products/utils/sort-products.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    FilterComponent,
    ProductListSkeletonComponent,
    EmptyProductComponent,
    SortProductsPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductStateService, SortProductsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductListComponent implements OnInit {
  productState = inject(ProductStateService);
  productService = inject(ProductsService);
  cartState = inject(CartStateService).state;
  sortProducts_ = inject(SortProductsPipe);

  searchControl = new FormControl('');
  categoryControl = new FormControl<number | null>(null);
  maxPriceControl = new FormControl<number | null>(null);
  orderByControl = new FormControl<string | null>(null);
  filteredProducts: Product[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string | null) => {
        if (searchTerm) {
          this.updateFilteredProducts(searchTerm);
        } else {
          this.filteredProducts = this.productState.state().products;
        }
      });

    this.categoryControl.valueChanges.subscribe((categoryId) => {
      if (categoryId !== null) {
        this.updateFilteredProductsByCategory(categoryId);
      } else {
        this.filteredProducts = this.productState.state().products;
      }
    });

    this.orderByControl.valueChanges.subscribe((orderBy) => {
      if (orderBy) {
        this.filteredProducts = this.sortProducts_.transform(this.filteredProducts, orderBy);
      }
    });

    this.maxPriceControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((maxPrice) => {
      if (maxPrice !== null) {
        this.updateFilteredProductsByMaxPrice(maxPrice);
      } else {
        this.filteredProducts = this.productState.state().products;
      }
    });
  }

  private updateFilteredProducts(searchTerm: string): void {
    this.productState.search(searchTerm).subscribe((products) => {
      this.filteredProducts = products;
      this.cdr.detectChanges();
    });
  }

  private updateFilteredProductsByCategory(categoryId: number): void {
    if (categoryId !== null) {
      this.productState.filterByCategory(categoryId).subscribe((products) => {
        this.filteredProducts = products;
        this.cdr.detectChanges();
      });
    }
  }

  private updateFilteredProductsByMaxPrice(maxPrice: number): void {
    if (maxPrice !== null) {
      this.productState.filterByMaxPrice(maxPrice).subscribe((products) => {
        this.filteredProducts = products;
      });
    }
  }

  maxValue(): number {
    const products = this.productState.state().products;
    if (products.length === 0) return 0;

    return Math.max(...products.map((product) => product.precio));
  }

  addToCart(product: Product) {
    this.cartState.add({ product, quantity: 1 });
  }
}
