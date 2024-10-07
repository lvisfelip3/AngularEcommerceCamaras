import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { User } from '../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService{
  private userData = new BehaviorSubject<User | null>(null);

  constructor() {
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
    return localStorage.getItem('token');
  }

  private setUserDataFromToken(token: string): void {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    this.userData.next(decodedToken.data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
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
    localStorage.removeItem('token');
    this.userData.next(null);
  }
}
