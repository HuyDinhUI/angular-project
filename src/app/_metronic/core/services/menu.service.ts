import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpUtilService } from '../../../pages/admin/_core/utils/http-utils.service';
import { QueryResultsModel } from '../../../pages/admin/_core/models/query-models/query-result.model';
import { QueryParamsModel } from '../../../pages/admin/_core/models/query-models/query-params.model';

@Injectable()
export class MenuServices {
  
  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
  ReadOnlyControl!: boolean;
  constructor(private http: HttpClient, private httpUtils: HttpUtilService) { }

  layMenuChucNang(): Observable<QueryResultsModel | any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<any>(environment.ApiRoot + `/menu/LayMenuChucNang`,{headers: httpHeaders});
  }
}