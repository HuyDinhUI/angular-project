import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, Inject, ChangeDetectorRef} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImportProductDialogComponent } from '../management-list-product/management-import-product-dialog/managemnt-import-product-dialog.component';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ListInsuranceManagementService } from '../services/list-insurance-managment.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { AddInsuranceDialogComponenet } from './management-list-insurance-add-dialog/management-list-insurance-add-dialog.component';

@Component({
    selector: 'app-tlist-insurance-management',
    templateUrl:'./management-list-insurance.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListInsuranceManagmentComponent implements OnInit, OnDestroy {
    
    paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  displayedColumns = ['STT', 'TenDonVi', 'DiaChi', 'SoDienThoai','NguoiLienhe','GhiChu','ThaoTac'];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<bigint>(true, []);
  itemIds: bigint[] = [];
  selection2 = new SelectionModel<bigint>(true, []);

  constructor(
    private changeDetect: ChangeDetectorRef,
    public listInsuranceManagementService: ListInsuranceManagementService,
    private layoutUtilsServie: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listInsuranceManagementService.fetch();
    this.listInsuranceManagementService.items$.subscribe((data) => {
      data.forEach((element) => {
        this.itemIds.push(element.Id_DV);
      });
    });

    this.grouping = this.listInsuranceManagementService.grouping;
    this.paginator = this.listInsuranceManagementService.paginator;
    this.sorting = this.listInsuranceManagementService.sorting;
    const sb = this.listInsuranceManagementService.isLoading$.subscribe(
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

  add() {
    const saveMessage = 'THÊM THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddInsuranceDialogComponenet, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listInsuranceManagementService.fetch();
      } else {
        this.layoutUtilsServie.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listInsuranceManagementService.fetch();
      }
    });
  }

    
}