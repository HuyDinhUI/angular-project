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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateFilterCustomer } from '../../../CustomersManagement/Model/DateFilter-customer.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subscription,
  switchMap,
} from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { ListProductManagementService } from '../services/list-product-management.service';
import {
  LayoutUtilsService,
  MessageType,
} from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { tap } from 'lodash';
import { ResultModel } from '../../../_core/models/_base.model';
import {
  ListProductDeleteModel,
  ProductsModelDTO,
} from '../model/list-product-management.model';
import { ImportProductDialogComponent } from './management-import-product-dialog/managemnt-import-product-dialog.component';
import { Router } from '@angular/router';
import { TypeProductManagementService } from '../services/type-product-managment.service';
import { ListUnittManagementService } from '../services/list-unit-management.service';
import { ListBrandManagementService } from '../services/list-brand-management.service';
import { ListProduceManagementService } from '../services/list-produce-management.service';

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
  searchControl = new FormControl();
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
    public listTypeProductManagementService: TypeProductManagementService,
    public listUnitManagementService: ListUnittManagementService,
    public listBrandManagementService: ListBrandManagementService,
    public listProduceManagementService: ListProduceManagementService,
    private layoutUtilsService: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listProductManagementService.fetch();
    this.listTypeProductManagementService.fetch();
    this.listUnitManagementService.fetch();
    this.listBrandManagementService.fetch();
    this.listProduceManagementService.fetch();

    this.listProductManagementService.items$.subscribe((data) => {
      this.itemIds = []
      data.forEach((element) => {
        this.itemIds.push(element.IdMH);
        
      });
    });

    

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => this.search(val));

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
    console.log(numSelected)
    console.log(numRows)
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection2.clear()
      : this.itemIds.forEach((row) => this.selection2.select(row));
  }

  import() {
    const saveMessage = 'IMPORT THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(ImportProductDialogComponent, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listProductManagementService.fetch();
      } else {
        this.layoutUtilsService.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listProductManagementService.fetch();
      }
    });
  }

  filterLoaiMatHang(value: number) {
    const filter = {};
    if (value == 0) {
      this.listProductManagementService.patchState({ filter });
    } else {
      filter['IdLMH'] = value;
      this.listProductManagementService.patchState({ filter });
    }
  }

  filterDonViTinh(value: number) {
    const filter = {};
    if (value == 0) {
      this.listProductManagementService.patchState({ filter });
    } else {
      filter['IdDVT'] = value;
      this.listProductManagementService.patchState({ filter });
    }
  }

  filterNhanHieu(value: number) {
    const filter = {};
    if (value == 0) {
      this.listProductManagementService.patchState({ filter });
    } else {
      filter['IdNhanHieu'] = value;
      this.listProductManagementService.patchState({ filter });
    }
  }

  filterXuatXu(value: number) {
    const filter = {};
    if (value == 0) {
      this.listProductManagementService.patchState({ filter });
    } else {
      filter['IdXuatXu'] = value;
      this.listProductManagementService.patchState({ filter });
    }
  }

  search(searchTerm: string) {
    this.listProductManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listProductManagementService.patchState({ paginator });
  }

  add() {
    this.router.navigate(['/management/category/listproduct/add'], {
      queryParams: {},
    });
  }

  edit(id: number){
    this.router.navigate(['/management/category/listproduct/edit/'+ id])
  }

  deleteProduct(id: number) {
    const message =
      'Bạn có muốn xóa sản phẩm này không? Lưu ý: Quá trình xóa không thể hoàn tác.';
    const dialog = this.layoutUtilsService.deleteElement('', message);
    const model = new ListProductDeleteModel();
    model.LstProductsDelete.push(id);
    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.listProductManagementService.deleteProduct(model).subscribe((res) =>{
          if (res && res.status === 1){
            this.layoutUtilsService.showActionNotification(
            'Xóa thành công',
            MessageType.Delete,
            4000,
            true,
            false,
          );
          this.listProductManagementService.fetch()
        } else {
          this.layoutUtilsService.showActionNotification(
            res.error.message,
            MessageType.Read,
            999999999,
            true,
            false,
            3000,
            'top',
            0
          );
          }
        });
      }
    });
  }

  deleteListProducts(){
    const message =
      'Bạn có muốn xóa sản phẩm này không? Lưu ý: Quá trình xóa không thể hoàn tác.';
    const dialog = this.layoutUtilsService.deleteElement('', message);
    const model = new ListProductDeleteModel();
    console.log(this.selection2)
    model.LstProductsDelete = this.selection2.selected

    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.listProductManagementService.deleteProduct(model).subscribe((res) =>{
          if (res && res.status === 1){
            this.layoutUtilsService.showActionNotification(
            'Xóa thành công',
            MessageType.Delete,
            4000,
            true,
            false,
          );
          this.selection2.clear()
          this.listProductManagementService.fetch()
        } else {
          this.layoutUtilsService.showActionNotification(
            res.error.message,
            MessageType.Read,
            999999999,
            true,
            false,
            3000,
            'top',
            0
          );
          }
        });
      }
    });
  }
}
