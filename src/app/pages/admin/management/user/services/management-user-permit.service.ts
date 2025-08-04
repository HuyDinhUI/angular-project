import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import {
  GroupingState,
  ITableState,
  PaginatorState,
  SortState,
} from '../../../../../_metronic/shared/crud-table';
import { ITableService } from '../../../../../_metronic/core/services/itable.service';

import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../../../_core/utils/http-utils.service';
import { catchError, Observable } from 'rxjs';
import { ResultModel, ResultObjModel } from '../../../_core/models/_base.model';
import { PermitDTO, PermitModel } from '../model/permit-model.model';

const API_PRODUCTS_URL =
  environment.ApiRoot + '/usermanagement';
const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined,
};

@Injectable()
export class ListPermitManagementService
  extends ITableService<PermitDTO[]>
  implements OnDestroy
{
  API_URL_FIND: string = API_PRODUCTS_URL;
  API_URL_CTEATE: string = API_PRODUCTS_URL;
  API_URL_EDIT: string = API_PRODUCTS_URL;
  API_URL_DELETE: string = API_PRODUCTS_URL;

  constructor(
    @Inject(HttpClient) http: any,
    @Inject(HttpUtilService) httpUtils: any
  ) {
    super(http, httpUtils);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  public getListPermitByUsername(username: string): Observable<ResultModel<PermitDTO>>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const Url = API_PRODUCTS_URL + '/' + username
    return this.http.get<any>(Url,{
        headers: httpHeaders
    })
  }

  public updatePermit(permit: PermitModel[]): Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const Url = API_PRODUCTS_URL
    return this.http.put(Url,permit,{headers:httpHeaders})
  }
  
}
