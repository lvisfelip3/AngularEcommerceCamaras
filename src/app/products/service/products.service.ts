import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

const LIMIT = 10

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseHttpService {

  getProducts(page:number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl,{ params: { limit: page * LIMIT }}    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl, { params: { id } });
  }

  UpdateProduct(product: Product): Observable<Product> {
    const body = JSON.stringify(product);
    console.log('body: ', body);
    return this.http.put<Product>(this.apiUrl, body);
  }

  DeleteProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    console.log('params: ', params);
    return this.http.delete<Product>(this.apiUrl, { params });
  }
}
