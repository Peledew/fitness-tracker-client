import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenDto } from '../models/tokenDto';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${environment.apiUrl}`;
  private userPayload: any;

  private resetFormSubject = new Subject<void>();
  resetForm$ = this.resetFormSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStoreService,
  ) {
    this.userPayload = this.decodedToken();
  }

  triggerFormReset() {
    this.resetFormSubject.next();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj: any): Observable<TokenDto> {
    this.triggerFormReset();
    return this.http.post<any>(`${this.baseUrl}/login`, loginObj);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // !! -> converts string to boolean value
  }

  signOut() {
    localStorage.clear();
    this.userStore.setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }

  getUserIdFromToken(): number | null {
    if (!this.userPayload) return null;
    return this.userPayload.nameid ? +this.userPayload.nameid : null;
  }

  public setIsLoggedIn(status: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  }

  public getIsLoggedIn(): boolean {
    const status = localStorage.getItem('isLoggedIn');
    return status ? JSON.parse(status) : false;
  }
}
