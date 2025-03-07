import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Product, ProductResponse } from '@shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseHttpService {

  products$ = signal<Product[]>([])
  selectedProduct$ = signal<Product | null>(null)

  limit = signal<number>(10)
  currentPage = signal<number>(1)
  hasToLoad = signal<boolean>(true);

  getProducts(page: number | undefined): Observable<ProductResponse> | undefined {
    if (this.isLoading()) return;

    this.isLoading.set(true)

    const pages = page ? page : this.currentPage();

    const params = new HttpParams()
      .set('limit', this.limit().toString())
      .set('page', pages.toString())
      .set('action', 'getAll');
    return this.http.get<ProductResponse>(this.apiUrl, { params }).pipe(
      tap((res) => {
        const totalPages = res.pagination.totalPages

        this.products$.set(res.products)

        if (this.currentPage() >= totalPages) this.hasToLoad.set(false)
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  getProduct(id: string): Observable<Product> {
    const params = new HttpParams()
      .set('id', id)
      .set('action', 'getById');
    return this.http.get<Product>(this.apiUrl, { params });
  }

  searchProducts(search: string): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('search', search)
      .set('limit', this.limit().toString())
      .set('page', this.currentPage().toString())
      .set('action', 'getBySearch');
    return this.http.get<ProductResponse>(this.apiUrl, { params }).pipe(
      tap((res) => {
        const totalPages = res.pagination.totalPages

        this.products$.set(res.products)

        if (this.currentPage() >= totalPages) {
          this.hasToLoad.set(false)
        }
        
      })
    );
  }

  getProductByName(name: string): void {
    const params = new HttpParams()
      .set('name', name)
      .set('action', 'getByName');
    this.http.get<Product>(this.apiUrl, { params }).pipe(
      tap((res) => {
        this.selectedProduct$.set(res)
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe();
  }

  getProductsByCategory(id: number ): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('category_id', id.toString())
      .set('limit', this.limit().toString())
      .set('page', this.currentPage().toString())
      .set('action', 'getByCategory');
    return this.http.get<ProductResponse>(this.apiUrl, { params }).pipe(
      tap((res) => {
        const totalPages = res.pagination.totalPages

        this.products$.set(res.products)

        if (this.currentPage() >= totalPages) {
          this.hasToLoad.set(false)
        }
        
      })
    );
  }

  getProductsByMaxPrice(maxPrice:number): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('maxPrice', maxPrice.toString())
      .set('limit', this.limit().toString())
      .set('page', this.currentPage().toString())
      .set('action', 'getByMaxPrice');
    return this.http.get<ProductResponse>(this.apiUrl, { params }).pipe(
      tap((res) => {
        const totalPages = res.pagination.totalPages

        this.products$.set(res.products)

        if (this.currentPage() >= totalPages) {
          this.hasToLoad.set(false)
        }
        
      })
    );
  }

  setProducts(products: Product[]): void {
    this.products$.set(products);
  }

}
