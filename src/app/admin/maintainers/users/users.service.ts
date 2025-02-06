import { inject, Injectable, signal } from '@angular/core';
import { User } from '@shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from '@shared/ui/snack-bar.service';

interface UserResponse {
  status: boolean;
  message: string;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  private cookie = inject(CookieService);
  private _snackBar = inject(SnackBarService);

  users$ = signal<User[]>([])

  constructor() {
    super();
    this.getUsers();
  }

  addUser(user: Omit<User, 'id'>): void {
    const body = JSON.stringify(user);
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<UserResponse>(this.apiUrl + '/usuarios/usuarios.php', body, { headers }).pipe(
      tap((res) => {
        this._snackBar.showSnackBar('Usuario agregado con exito', 'OK');
        if (res.user) this.users$.set([...this.users$(), res.user!]);
      })
    )
    .subscribe();
  }

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl + '/usuarios/usuarios.php').pipe(
      tap((users) => {
        this.users$.set(users);
      })
    )
    .subscribe();
  }

  deleteUser(id: number): void {
    const params = new HttpParams().set('id', id.toString());
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<User>(this.apiUrl + '/usuarios/usuarios.php', { params, headers }).pipe(
      tap(() => {
        this._snackBar.showSnackBar('Usuario eliminado', 'OK');
        this.users$.update(users => users.filter(user => user.id !== id));
      })
    )
    .subscribe();
  }

  getUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<User>(this.apiUrl + '/usuarios/usuarios.php', { params });
  }

  updateUser(id: number, user: Omit<User, 'id'>): void {
    const body = JSON.stringify({ ...user, id });
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<UserResponse>(this.apiUrl + '/usuarios/usuarios.php', body, { headers }).pipe(
      tap((res) => {
        this._snackBar.showSnackBar('Usuario actualizado', 'OK');
        if (res.user) this.users$.update(user => user.map(u => u.id === id ? res.user! : u));
      })
    )
    .subscribe();
  }

  private transformRol(rol: number): string {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      default:
        return 'Sin rol';
    }
  }
}
