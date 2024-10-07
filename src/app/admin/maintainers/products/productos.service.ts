import { Injectable } from '@angular/core';
import { Product } from '../../../shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService extends BaseHttpService {
  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const body = JSON.stringify(product);
    console.log('body: ', body);
    return this.http.post<Product>(this.apiUrl, body);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<Product>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Product>(this.apiUrl, {
      params,
    });
  }

  updateProduct(id: number, product: Omit<Product, 'id'>): Observable<Product> {
    const body = JSON.stringify({ ...product, id });
    console.log(body)
    return this.http.put<Product>(this.apiUrl, body);
  }
}
