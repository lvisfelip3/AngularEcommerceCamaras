import { Injectable } from '@angular/core';
import { Category } from '../../../shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';

@Injectable({
  providedIn: 'root',
})

export class CategoriasService extends BaseHttpService {

  addCategory(category: Omit<Category, 'id'>): Observable<Category> {
    const body = JSON.stringify(category);
    return this.http.post<Category>(this.apiUrl + 'categorias/categorias.php', body);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'categorias/categorias.php');
  }

  deleteCategory(id: number): Observable<Category> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<Category>(this.apiUrl + 'categorias/categorias.php', { params });
  }

  getCategory(id: number): Observable<Category> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Category>(this.apiUrl + 'categorias/categorias.php', { params });
  }

  updateCategory(id: number, category: Omit<Category, 'id'>): Observable<Category> {
    const body = JSON.stringify({ ...category, id });
    return this.http.put<Category>(this.apiUrl + 'categorias/categorias.php', body);
  }
}
