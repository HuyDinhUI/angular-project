import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ListReasonAssestManagementService } from '../services/list-reason-assest-management.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { AddReasonAssestDialogComponent } from './management-reason-assest-add-dialog/reason-assest-add-dialog.component';
import { ImportReasonAssestDialogComponent } from './management-reason-assest-import-dialog/reason-assest-import.component';

@Component({
    selector: 'app-list-reason-assest-management',
    templateUrl:'./management-list-reason-assest.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListReasonAssestManagmentComponent implements OnInit, OnDestroy {
paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  displayedColumns = ['STT', 'LoaiTangGiam', 'MaTangGiam', 'TenTangGiam','TrangThai','ThaoTac'];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<number>(true, []);
  itemIds: number[] = [];
  selection2 = new SelectionModel<number>(true, []);

  constructor(
    private changeDetect: ChangeDetectorRef,
    public listReasonAssetManagementService: ListReasonAssestManagementService,
    private layoutUtilsServie: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listReasonAssetManagementService.fetch();
   

    this.grouping = this.listReasonAssetManagementService.grouping;
    this.paginator = this.listReasonAssetManagementService.paginator;
    this.sorting = this.listReasonAssetManagementService.sorting;
    const sb = this.listReasonAssetManagementService.isLoading$.subscribe(
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

  changeKeyword(val: any) {
    this.search(val);
  }

  search(searchTerm: string) {
    this.listReasonAssetManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listReasonAssetManagementService.patchState({ paginator });
  }

  add() {
    const saveMessage = 'THÊM THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddReasonAssestDialogComponent, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listReasonAssetManagementService.fetch();
      } else {
        this.layoutUtilsServie.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listReasonAssetManagementService.fetch();
      }
    });
  }

  import(){
    const saveMessage = 'IMPORT THÀNH CÔNG'
    const messageType = MessageType.Create;
    const dialogRef =  this.dialog.open(ImportReasonAssestDialogComponent,{
      data: {},
      panelClass: 'custom-dialog',
      maxWidth:'none',
      width: '900px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (!res){
        this.listReasonAssetManagementService.fetch()
      } else{
        this.layoutUtilsServie.showActionNotification(saveMessage,messageType,4000,true,false)
        this.listReasonAssetManagementService.fetch()
      }
    })
  }
}