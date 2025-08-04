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
import { PermitDTO } from '../model/permit-model.model';

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
export class UserManagementService
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

  

  
}
