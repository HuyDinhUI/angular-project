import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../modules/auth/_services/auth.service';
import { TokenStorage } from '../../../../modules/auth/_services/token-storage.service';
import { ITableState } from '../../../../_metronic/shared/crud-table';

@Injectable({
    providedIn:'root',
})



export class HttpUtilService {
    constructor (private tokenStorage: TokenStorage, private auth: AuthService) {}

    getFindHTTPParams(queryParams:any): HttpParams {
    let params = new HttpParams()
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('page', (queryParams.pageNumber + 1).toString())
      .set('record', queryParams.pageSize.toString());
    let keys:any = [],
      values:any = [];
    if (queryParams.more) {
      params = params.append('more', 'true');
    }
    Object.keys(queryParams.filter).forEach(function (key) {
      if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
        keys.push(key);
        values.push(queryParams.filter[key]);
      }
    });
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|')).append('filter.vals', values.join('|'));
    }
    return params;
  }

    getFindHTTPParamsITableState(tableState: ITableState | any, more: boolean = false): HttpParams {
    let params = new HttpParams()
      //.set('filter',  queryParams.filter )
      .set('sortOrder', tableState.sorting.direction)
      .set('sortField', tableState.sorting.column)
      .set('page', tableState.paginator.page.toString())
      .set('record', tableState.paginator.pageSize.toString());
    let keys = [],
      values = [];
    if (more) {
      params = params.append('more', 'true');
    }
    Object.keys(tableState.filter).forEach(function (key) {
      if (typeof tableState.filter[key] !== 'string' || tableState.filter[key] !== '') {
        keys.push(key);
        values.push(tableState.filter[key]);
      }
    });
    if (tableState.searchTerm) {
      keys.push('keyword');
      values.push(tableState.searchTerm);
    }
    if (keys.length > 0) {
      params = params.append('filter.keys', keys.join('|')).append('filter.vals', values.join('|'));
    }
    return params;
  }

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

