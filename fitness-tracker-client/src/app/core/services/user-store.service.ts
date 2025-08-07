import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private username$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private userId$ = new BehaviorSubject<number>(this.getUserIdFromStore());

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.getLoginStatusFromStorage());
  constructor() {}

  public getIsLoggedIn() {
    return this.isLoggedIn$.asObservable();
  }

  public setIsLoggedIn(status: boolean) {
    this.isLoggedIn$.next(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  }

  private getLoginStatusFromStorage(): boolean {
    const status = localStorage.getItem('isLoggedIn');
    return status ? JSON.parse(status) : false;
  }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getUsernameFromStore() {
    return this.username$.asObservable();
  }

  public setUsernameForStore(fullname: string) {
    this.username$.next(fullname);
  }

  public setUserIdForStore(id: number) {
    this.userId$.next(id);
    localStorage.setItem('userId', id.toString());
  }

  public getUserIdFromStore(): number {
    const stored = localStorage.getItem('userId');
    return stored ? Number(stored) : 0; // Default 0 if not found
  }
}
