import { Injectable } from '@angular/core';
import { Category } from '../../../shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class CategoriasService extends BaseHttpService {

  constructor(private cookie: CookieService) {
    super();
  }

  addCategory(category: Omit<Category, 'id'>): Observable<Category> {
    const body = JSON.stringify(category);
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Category>(this.apiUrl + 'categorias/categorias.php', body, { headers });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'categorias/categorias.php');
  }

  deleteCategory(id: number): Observable<Category> {
    const params = new HttpParams().set('id', id.toString());
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Category>(this.apiUrl + 'categorias/categorias.php', { params, headers });
  }

  getCategory(id: number): Observable<Category> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Category>(this.apiUrl + 'categorias/categorias.php', { params });
  }

  updateCategory(id: number, category: Omit<Category, 'id'>): Observable<Category> {
    const body = JSON.stringify({ ...category, id });
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Category>(this.apiUrl + 'categorias/categorias.php', body, { headers });
  }
}
