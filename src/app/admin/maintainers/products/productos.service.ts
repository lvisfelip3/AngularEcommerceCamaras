import { inject, Injectable, signal } from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from '@shared/ui/snack-bar.service';

interface ProductResponse {
  status: boolean;
  message: string;
  data: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService extends BaseHttpService {
  private readonly cookie = inject(CookieService);
  private readonly _snackBar = inject(SnackBarService);

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

  addProduct(product: Omit<Product, 'id'>, imagen: File | string): void {
    const body = new FormData();

    body.append('product', JSON.stringify(product));
    body.append('imagen', imagen);
    const params = new HttpParams().set('action', 'create');

    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<ProductResponse>(this.apiUrl, body, { params, headers }).pipe(
      tap((res) => {
        if (!res.status) return;

        this.products$.update(products => [...products, res.data]);

        this._snackBar.showSnackBar('Producto Agregado', 'OK');
      })
    )
    .subscribe();
  }

  deleteProduct(id: number): void {
    const params = new HttpParams().set('id', id.toString()).set('action', 'delete');
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<Product>(this.apiUrl, null, { params, headers }).pipe(
      tap(() => {
        this.products$.update(products => products.filter(product => product.id !== id));

        this._snackBar.showSnackBar('Producto eliminado', 'OK');
      })
    )
    .subscribe();
  }

  getProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Product>(this.apiUrl, {
      params,
    });
  }

  updateProduct(id: number, product: Omit<Product, 'id'>, imagen?: File | string): void {
    const body = JSON.stringify({ ...product, id, imagen });

    const params = new HttpParams().set('action', 'update');
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<ProductResponse>(this.apiUrl, body, { params, headers }).pipe(
      tap((res) => {
        if (!res.status) return;

        this.products$.update(
          products => products.map(
            product => product.id === id ? res.data : product
          )
        );

        this._snackBar.showSnackBar('Producto actualizado', 'OK');
      })
    )
    .subscribe();
}
}
