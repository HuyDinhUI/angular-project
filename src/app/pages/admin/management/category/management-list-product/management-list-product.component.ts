import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  GroupingState,
  PaginatorState,
  SortState,
} from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateFilterCustomer } from '../../../CustomersManagement/Model/DateFilter-customer.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { ListProductManagementService } from '../services/list-product-management.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { tap } from 'lodash';
import { ResultModel } from '../../../_core/models/_base.model';
import { ProductsModelDTO } from '../model/list-product-management.model';
import { ImportProductDialogComponent } from './management-import-product-dialog/managemnt-import-product-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product-management',
  templateUrl: './management-list-product.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProudctManagmentComponent implements OnInit, OnDestroy {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  dateFilter: DateFilterCustomer;
  laodingDateFilter$ = new BehaviorSubject<boolean>(false);
  private subscriptions: Subscription[] = [];
  dislayedColumns = [
    'select',
    '#',
    'HinhAnh',
    'MaHang',
    'TenMatHang',
    'SoKyTinhKhauHaoToiThieu',
    'SoKyTinhKhauHaoToiDa',
    'ThaoTac',
  ];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<number>(true, []);
  itemIds: number[] = [];
  selection2 = new SelectionModel<number>(true, []);

  
  constructor(
    private router: Router,
    private changeDetect: ChangeDetectorRef,
    public listProductManagementService: ListProductManagementService,
    private layoutUtilsService: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listProductManagementService.fetch();
    
    this.listProductManagementService.items$.subscribe(data =>{
        data.forEach(element => {
            this.itemIds.push(element.IdMH)
        })
    })

    this.grouping = this.listProductManagementService.grouping;
    this.paginator = this.listProductManagementService.paginator;
    this.sorting = this.listProductManagementService.sorting;
    const sb = this.listProductManagementService.isLoading$.subscribe(
      (res: any) => (this.isLoading = res)
    );
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  isAllSelected() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.itemIds.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection2.clear()
      : this.itemIds.forEach((row) => this.selection2.select(row));
  }

  import(){
    const saveMessage = 'IMPORT THÀNH CÔNG'
    const messageType = MessageType.Create;
    const dialogRef =  this.dialog.open(ImportProductDialogComponent,{
      data: {},
      panelClass: 'custom-dialog',
      maxWidth:'none',
      width: '900px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (!res){
        this.listProductManagementService.fetch()
      } else{
        this.layoutUtilsService.showActionNotification(saveMessage,messageType,4000,true,false)
        this.listProductManagementService.fetch()
      }
    })
  }

  add(){
    this.router.navigate(['/management/category/listproduct/add'],{
      queryParams:{}
    })
  }
}
