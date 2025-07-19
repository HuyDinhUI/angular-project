import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import {
  GroupingState,
  ITableState,
  PaginatorState,
  SortState,
} from '../../../../../_metronic/shared/crud-table';
import { ITableService } from '../../../../../_metronic/core/services/itable.service';
import { ProductsModelDTO } from '../model/list-product-management.model';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../../../_core/utils/http-utils.service';
import { Observable } from 'rxjs';
import { ResultModel } from '../../../_core/models/_base.model';
import { TypeProductsModelDTO } from '../model/type-product-managment.model';
import { UnitModelDTO } from '../model/list-init-management.model';

const API_PRODUCTS_URL =
  environment.ApiRoot + '/categorymanagement/listunit';
const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined,
};

@Injectable()
export class ListUnittManagementService
  extends ITableService<UnitModelDTO[]>
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

  public getTypeProduct(): Observable<ResultModel<UnitModelDTO>>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const Url = API_PRODUCTS_URL
    return this.http.get<any>(Url,{
        headers: httpHeaders
    })
  }
}
