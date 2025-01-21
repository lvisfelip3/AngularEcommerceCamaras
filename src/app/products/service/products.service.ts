import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { Observable, tap } from 'rxjs';
import { Product, ProductResponse } from '@shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseHttpService {

  products$ = signal<Product[]>([])
  limit = signal<number>(10)
  currentPage = signal<number>(1)
  hasToLoad = signal<boolean>(true);

  getProducts(page: number | undefined): Observable<ProductResponse> {
    const pages = page ? page : this.currentPage();
    const params = new HttpParams().set('limit', this.limit().toString()).set('page', pages.toString());
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

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl, { params: { id } });
  }

  searchProducts(search: string): Observable<ProductResponse> {
    const params = new HttpParams().set('search', search).set('limit', this.limit().toString()).set('page', this.currentPage().toString());
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

  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl, { params: { name } });
  }

  getProductsByCategory(id: number ): Observable<ProductResponse> {
    const params = new HttpParams().set('category_id', id.toString()).set('limit', this.limit().toString()).set('page', this.currentPage().toString());
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
    const params = new HttpParams().set('maxPrice', maxPrice.toString()).set('limit', this.limit().toString()).set('page', this.currentPage().toString());
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
