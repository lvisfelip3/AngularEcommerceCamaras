import { Injectable } from '@angular/core';
import { User } from '../../../shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  addUser(user: Omit<User, 'id'>): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(this.apiUrl + '/usuarios/usuarios.php', body);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/usuarios/usuarios.php');
  }

  deleteUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<User>(this.apiUrl + '/usuarios/usuarios.php', { params });
  }

  getUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<User>(this.apiUrl + '/usuarios/usuarios.php', {
      params,
    });
  }

  updateUser(id: number, user: Omit<User, 'id'>): Observable<User> {
    const body = JSON.stringify({ ...user, id });
    console.log(body);
    return this.http.put<User>(this.apiUrl + '/usuarios/usuarios.php', body);
  }
}
