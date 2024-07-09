import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from './config.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | null = null;
  private userAuthDetails: any | null = null;
  private previousUrl: string | null = null;
  public hasAuthorized$ = new BehaviorSubject(false);

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient,
    private router: Router,
    private modals: NgbModal,
    private dialogRef: MatDialog
  ) {}

  public loginUser(data: {
    username: string;
    password: string;
  }): Observable<any | null> {
    return this.http.post<any>(`${this.apiUrl}/authentication/auth`, data);
  }

  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  getPreviousUrl(): string | null {
    return this.previousUrl;
  }

  public canActivate(state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated()) {
      this.setPreviousUrl(state.url);
      this.logout();
      return false;
    }
    return true;
  }

  private setUserDetails() {
    this.userAuthDetails = jwtHelper.decodeToken(this.authToken || '');
  }

  public isAuthenticated() {
    if (this.authToken === null) {
      this.hasAuthorized$.next(false);
      return false;
    }
    if (jwtHelper.isTokenExpired(this.authToken)) {
      this.refreshToken();
      return true;
    }
    this.hasAuthorized$.next(true);
    return true;
  }

  public logout() {
    this.modals.dismissAll();
    this.authToken = null;
    this.userAuthDetails = null;
    this.hasAuthorized$.next(false);
    this.apiUrl = '';
    localStorage.removeItem('shoresideTkn');
    this.router.navigate(['/login']);
    this.dialogRef.closeAll();
  }

  public addToken(data: any): void {
    localStorage.setItem('shoresideTkn', data.token);
    this.authToken = data.token;
    this.setUserDetails();
    this.hasAuthorized$.next(true);
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/authentication/refresh', {
      token: this.getToken(),
    });
  }

  public isTokenExpired(): boolean {
    return jwtHelper.isTokenExpired(this.authToken);
  }

  public getUserDetails() {
    return this.userAuthDetails;
  }

  public getToken() {
    return this.authToken;
  }

  public setToken(tkn: string) {
    this.authToken = tkn;
  }
}
