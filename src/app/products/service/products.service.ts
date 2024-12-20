import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/interfaces';

const LIMIT = 10

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseHttpService {

  getProducts(page:number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params: { page, limit: LIMIT } });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl, { params: { id } });
  }

  searchProducts(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?search=${search}`);
  }

  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl, { params: { name } });
  }

  getProductsByCategory(id: number ): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params: { category_id: id } });
  }

  getProductsByMaxPrice(maxPrice:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?maxPrice=${maxPrice}`);
  }

}
