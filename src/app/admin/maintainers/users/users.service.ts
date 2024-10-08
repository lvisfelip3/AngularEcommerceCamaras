import { Injectable } from '@angular/core';
import { User } from '../../../shared/interfaces/interfaces';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {

  constructor(private cookie: CookieService) {
    super();
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const body = JSON.stringify(user);
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<User>(this.apiUrl + '/usuarios/usuarios.php', body, { headers });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/usuarios/usuarios.php');
  }

  deleteUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id.toString());
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<User>(this.apiUrl + '/usuarios/usuarios.php', { params, headers });
  }

  getUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<User>(this.apiUrl + '/usuarios/usuarios.php', {
      params,
    });
  }

  updateUser(id: number, user: Omit<User, 'id'>): Observable<User> {
    const body = JSON.stringify({ ...user, id });
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User>(this.apiUrl + '/usuarios/usuarios.php', body, { headers });
  }
}
