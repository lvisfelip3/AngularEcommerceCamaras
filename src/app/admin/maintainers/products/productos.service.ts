import { inject, Injectable, signal } from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService extends BaseHttpService {
  private readonly cookie = inject(CookieService);

  products$ = signal<Product[]>([]);

  constructor() {
    super();
    this.getProducts();
  }

  getProducts(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true)
    const params = new HttpParams().set('action', 'maintainer')
    this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      tap((res) => {
        this.products$.set(res);
      }),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe();
  }

  addProduct(product: Omit<Product, 'id'>, image: File): Observable<Product> {
    const formData = new FormData();
    formData.append('nombre', product.nombre);
    formData.append('descripcion', (product.descripcion ?? ''));
    formData.append('precio', product.precio.toString());
    formData.append('stock', product.stock.toString());
    formData.append('categoria_id', (product.categoria_id ?? '').toString());
    formData.append('imagen', image);

    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Product>(this.apiUrl, formData, { headers });
  }

  deleteProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Product>(this.apiUrl, { params, headers });
  }

  getProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Product>(this.apiUrl, {
      params,
    });
  }

  updateProduct(id: number, product: Omit<Product, 'id'>, image: File): Observable<Product> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('nombre', product.nombre);
    formData.append('descripcion', (product.descripcion ?? ''));
    formData.append('precio', product.precio.toString());
    formData.append('stock', product.stock.toString());
    formData.append('categoria_id', (product.categoria_id ?? '').toString());
    if (image) {
      formData.append('imagen', image);  
    }

    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Product>(this.apiUrl, formData, { headers });
  }
}
