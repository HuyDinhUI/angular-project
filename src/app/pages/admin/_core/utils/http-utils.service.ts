import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../modules/auth/_services/auth.service';
import { TokenStorage } from '../../../../modules/auth/_services/token-storage.service';

@Injectable({
    providedIn:'root',
})

export class HttpUtilService {
    constructor (private tokenStorage: TokenStorage, private auth: AuthService) {}

    getHTTPHeaders(): HttpHeaders {
    const auth = this.auth.getAuthFromLocalStorage();
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return result;
  }
}