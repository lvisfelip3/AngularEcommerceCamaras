import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from '@shared/ui/snack-bar.service';

interface categoryAddResponse {
  status: boolean,
  message: string,
  data: Category
}

@Injectable({
  providedIn: 'root',
})

export class CategoriasService extends BaseHttpService {
  private readonly _snackbar = inject(SnackBarService);

  categories$ = signal<Category[]>([])

  constructor(private cookie: CookieService) {
    super();
    this.getCategories();
  }

  addCategory(category: Omit<Category, 'id'>): void {
    const body = JSON.stringify(category);
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<categoryAddResponse>(this.apiUrl + 'categorias/categorias.php', body, { headers }).pipe(
      tap((response) => {
        const categories = this.categories$();
        this.categories$.set([...categories, response.data]);
        this._snackbar.showSnackBar('Categoría agregada correctamente', 'OK');
      })
    )
    .subscribe();
  }

  getCategories(): void {
    this.http.get<Category[]>(this.apiUrl + 'categorias/categorias.php').pipe(
      tap((categories) => {
        this.categories$.set(categories)
      })
    )
    .subscribe();
  }

  deleteCategory(id: number): void {
    const params = new HttpParams().set('id', id.toString());
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<Category>(this.apiUrl + 'categorias/categorias.php', { params, headers }).pipe(
      tap(() => {
        this.categories$.update(categories => categories.filter(category => category.id !== id));
        this._snackbar.showSnackBar('Categoría eliminada correctamente', 'OK');
      })
    )
    .subscribe();
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
