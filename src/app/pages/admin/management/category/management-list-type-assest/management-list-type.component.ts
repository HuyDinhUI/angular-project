import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { ListTypeAssestManagementService } from '../services/list-type-assest-management.service';
import { AddTypeAssestDialogComponent } from './management-list-type-assest-add-dialog/managment-list-type-assest-add-dialog.component';
import { ImportTypeAssestDialogComponent } from './management-list-type-assest-import-dialog/managment-list-type-assest-import-dialog.component';

@Component({
    selector: 'app-list-type-assest-management',
    templateUrl:'./management-list-type-assest.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListTypeAssestManagmentComponent implements OnInit, OnDestroy {
paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  displayedColumns = ['STT', 'MaLoai', 'TenLoai', 'ConHieuLuc','ThaoTac'];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<number>(true, []);
  itemIds: number[] = [];
  selection2 = new SelectionModel<number>(true, []);

  constructor(
    private changeDetect: ChangeDetectorRef,
    public listTypeAssetManagementService: ListTypeAssestManagementService,
    private layoutUtilsServie: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listTypeAssetManagementService.fetch();
    this.listTypeAssetManagementService.items$.subscribe((data) => {
      this.itemIds = []
      data.forEach((element) => {
        this.itemIds.push(element.IdLoaiTS);
      });
    });

    this.grouping = this.listTypeAssetManagementService.grouping;
    this.paginator = this.listTypeAssetManagementService.paginator;
    this.sorting = this.listTypeAssetManagementService.sorting;
    const sb = this.listTypeAssetManagementService.isLoading$.subscribe(
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
    this.listTypeAssetManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listTypeAssetManagementService.patchState({ paginator });
  }

  add() {
    const saveMessage = 'THÊM THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddTypeAssestDialogComponent, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listTypeAssetManagementService.fetch();
      } else {
        this.layoutUtilsServie.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listTypeAssetManagementService.fetch();
      }
    });
  }

  import(){
    const saveMessage = 'IMPORT THÀNH CÔNG'
    const messageType = MessageType.Create;
    const dialogRef =  this.dialog.open(ImportTypeAssestDialogComponent,{
      data: {},
      panelClass: 'custom-dialog',
      maxWidth:'none',
      width: '900px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (!res){
        this.listTypeAssetManagementService.fetch()
      } else{
        this.layoutUtilsServie.showActionNotification(saveMessage,messageType,4000,true,false)
        this.listTypeAssetManagementService.fetch()
      }
    })
  }
}