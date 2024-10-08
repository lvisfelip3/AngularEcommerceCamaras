import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { User } from '../shared/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService{
  private userData = new BehaviorSubject<User | null>(null);
  private readonly tokenKey = 'authToken';

  constructor( private cookie: CookieService) {
    super();
    const token = this.getToken();
    if (token) {
      this.setUserDataFromToken(token);
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'auth/login.php', { email, password });
  }

  register(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'auth/register.php', data);
  }

  getToken(): string | null {
    return this.cookie.get(this.tokenKey) || null;
  }

  private setUserDataFromToken(token: string): void {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    this.userData.next(decodedToken.data);
  }

  getCurrentUser(): User | null {
    return this.userData.getValue();
  }

  saveToken(token: string): void {
    this.cookie.set(this.tokenKey, token, 1, '/', '', false, 'Strict');
    this.setUserDataFromToken(token);
  }

  getUserData(): Observable<User | null> {
    return this.userData.asObservable();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  logout(): void {
    this.cookie.delete(this.tokenKey, '/');
    this.userData.next(null);
  }
}
