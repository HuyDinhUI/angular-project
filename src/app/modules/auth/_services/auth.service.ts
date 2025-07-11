import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { LoginModel, User, UserModel } from '../_models/user.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../_models/auth-response.model';

const API_AUTH_URL = `${environment.ApiRoot}/authorization`;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  currentUser$: Observable<User | null>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<User | null>;
  isLoadingSubject: BehaviorSubject<boolean>;
  errorMessageSubject: BehaviorSubject<string>;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: User) {
    this.currentUserSubject.next(user);
  }

  constructor(private http: HttpClient, private router: Router) {
    
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.errorMessageSubject = new BehaviorSubject<string>('');

    this.isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    if (!this.getAuthFromLocalStorage()) {
      this.prepareLogout();
    } else {
      this.currentUserSubject.next(this.getAuthFromLocalStorage().user as User);
    }
  }

  login(username: string, password: string): Observable<User | undefined | boolean> {
    this.isLoadingSubject.next(true);
    const loginModel = new LoginModel();
    loginModel.Username = username;
    loginModel.Password = password;
    return this.getUser(loginModel).pipe(
      map((res) => {
        const result = this.setAuthFromLocalStorage(res);
        return result;
      }),
      catchError((err) => {
        this.errorMessageSubject.next(err.error.message);
        return of(undefined)
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  prepareLogout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  logout() {
    if (this.getAuthFromLocalStorage()) {
      this.updateLastlogin().subscribe();
      this.prepareLogout();
    } else {
      this.prepareLogout();
    }
  }

  getUserByToken(): Observable<any> {
    return of(true);
  }

  registration(user: UserModel): Observable<any> {
    return of(true);
  }

  forgotPassword(email: string): Observable<boolean> {
    return of(true);
  }

  private setAuthFromLocalStorage(auth: AuthResponse): boolean {
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      this.currentUserSubject.next(auth.user);
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): any {
    try {
      const raw = localStorage.getItem(this.authLocalStorageToken);
      const authData = raw ? JSON.parse(raw) : null;
      return authData;
    } catch (error) {
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getUser(item: LoginModel): Observable<any> {
    return this.http.post<any>(API_AUTH_URL + '/login', item);
  }

  updateLastlogin(): Observable<any> {
    const httpHeaders = this.getHTTPHeaders();
    return this.http.get<any>(API_AUTH_URL + '/updateLastlogin', {
      headers: httpHeaders,
    });
  }

  isAuthenticated(): boolean {
    const auth = this.getAuthFromLocalStorage();
    if (auth) {
      if (this.isTokenExpired(auth.token)) {
        if (!auth.user) return false;
        if (!this.currentUserValue) {
          this.currentUserSubject.next(auth.user);
        }
        this.updateLastlogin().subscribe((res) => {});
        return true;
      }
      return false;
    }
    return false;
  }

  isTokenExpired(token: string): boolean {
    const date = this.getTokenExpirationDate(token);
    if (!date) return false;
    return date.valueOf() > new Date().valueOf();
  }

  getTokenExpirationDate(token: string): Date | null {
    let decoded: any = jwtDecode(token);
    if (!decoded.exp) return null; 
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  getHTTPHeaders(): HttpHeaders | undefined {
    const auth = this.getAuthFromLocalStorage();
    if (auth) {
      const token = this.getAuthFromLocalStorage().token;
      let result = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      return result;
    }
    return undefined;
  }
}
