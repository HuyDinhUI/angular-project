import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import {
  GroupingState,
  ITableState,
  PaginatorState,
  SortState,
} from '../../../../../_metronic/shared/crud-table';
import { ITableService } from '../../../../../_metronic/core/services/itable.service';
import { ListProductDeleteModel, ProductsModel, ProductsModelDTO } from '../model/list-product-management.model';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../../../_core/utils/http-utils.service';
import { catchError, Observable } from 'rxjs';
import { ResultModel, ResultObjModel } from '../../../_core/models/_base.model';

const API_PRODUCTS_URL =
  environment.ApiRoot + '/categorymanagement/listproduct';
const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined,
};

@Injectable()
export class ListProductManagementService
  extends ITableService<ProductsModelDTO[]>
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

  public getListProduct(): Observable<ResultModel<ProductsModelDTO>>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const Url = API_PRODUCTS_URL
    return this.http.get<any>(Url,{
        headers: httpHeaders
    })
  }

  public createProduct(item: ProductsModel):Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = API_PRODUCTS_URL;
    return this.http.post<any>(url, item, { headers: httpHeaders });
  }
  
  public deleteProduct(item: ListProductDeleteModel):Observable<any>{
    console.log(item)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = API_PRODUCTS_URL;
    return this.http.delete<any>(url, {headers: httpHeaders,body: item});
  }

  public getProductById(id: number): Observable<ResultObjModel<ProductsModel>>{
    const httpHeaders = this.httpUtils.getHTTPHeaders()
    const url = API_PRODUCTS_URL + `/${id}`
    return this.http.get<any>(url,{headers:httpHeaders})
  }

  public updateProduct(id: number, data: ProductsModel): Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders()
    const url = API_PRODUCTS_URL + `/${id}`
    return this.http.put<any>(url,data,{headers:httpHeaders})
  }

  public importProduct(data:ProductsModel[]): Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders()
    const url = API_PRODUCTS_URL + '/import'
    return this.http.post<any>(url,data,{headers:httpHeaders})
  }
}
