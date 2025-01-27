import { Component, inject, OnInit, ChangeDetectionStrategy, computed } from '@angular/core';
import { ProductCardComponent } from '@products/ui/product-card/product-card.component';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { Product } from '@shared/interfaces/interfaces';
import { FilterComponent } from '@products/ui/filter/filter.component';
import { debounceTime, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductListSkeletonComponent } from '@products/ui/skeleton/product-list-skeleton/product-list-skeleton.component';
import { ProductsService } from '@products/service/products.service';
import { EmptyProductComponent } from '@products/ui/empty-product/empty-product.component';
import { SortProductsPipe } from '@products/utils/sort-products.pipe';
import { CartMobileButtonComponent } from '@shared/components/cart-mobile-button/cart-mobile-button.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    FilterComponent,
    ProductListSkeletonComponent,
    EmptyProductComponent,
    SortProductsPipe,
    CartMobileButtonComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [
    SortProductsPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductListComponent implements OnInit {
  productService = inject(ProductsService);
  cartState = inject(CartStateService).state;
  sortProducts_ = inject(SortProductsPipe);

  searchControl = new FormControl('');
  categoryControl = new FormControl<number | null>(null);
  maxPriceControl = new FormControl<number | null>(null);
  orderByControl = new FormControl<string | null>(null);

  hasToLoad = computed(() => this.productService.hasToLoad());
  currentPage = computed(() => this.productService.currentPage());
  products$ = computed(() => this.productService.products$());
  isLoading = computed(() => this.productService.isLoading());

  // @HostListener('window:scroll')
  // onScroll(): void {
  //   const scrollPosition = window.innerHeight + window.scrollY;
  //   const scrollTreshold = document.documentElement.scrollHeight;

  //   if (scrollPosition >= scrollTreshold) {
  //     this.productService.getProducts();
  //   }
  // }

  ngOnInit(): void {
    this.productService.getProducts(undefined)?.subscribe();

    this.searchControl.valueChanges.pipe(
        debounceTime(200),
        tap((searchTerm: string | null) => {
          if (!searchTerm || searchTerm === null) this.productService.getProducts(undefined)?.subscribe();
          this.productService.searchProducts(searchTerm as string).subscribe();
        })
      ).subscribe();

    this.categoryControl.valueChanges.pipe(
      debounceTime(300),
      tap((categoryId) => {
        if (!categoryId || categoryId === null) this.productService.getProducts(undefined)?.subscribe();
        this.productService.getProductsByCategory(categoryId as number).subscribe();
      })
    )
    .subscribe();

    this.orderByControl.valueChanges.pipe(
      debounceTime(300),
      tap((orderBy) => {
        if (!orderBy || orderBy === null) this.productService.getProducts(undefined)?.subscribe();
        const sortedProducts = this.sortProducts_.transform(this.products$(), orderBy);
        this.productService.setProducts(sortedProducts);
      })
    )
    .subscribe();

    this.maxPriceControl.valueChanges.pipe(
      debounceTime(300),
      tap((maxPrice) => {
        if (!maxPrice || maxPrice === null) this.productService.getProducts(undefined)?.subscribe();
        this.productService.getProductsByMaxPrice(maxPrice as number).subscribe();
      })
    )
    .subscribe();
  }

  maxValue(): number {
    const products = this.products$();
    if (products.length === 0) return 0;

    return Math.max(...products.map((product) => product.precio));
  }

  addToCart(product: Product) {
    this.cartState.add({ product, quantity: 1 });
  }
}
