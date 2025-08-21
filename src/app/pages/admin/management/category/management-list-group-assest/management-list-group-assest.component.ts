import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { GroupingState } from '../../../../../_metronic/shared/crud-table/grouping.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { ListGroupTypeAssestManagementService } from '../services/list-group-type-management.service';
import { AddGroupTypeAssestDialogComponent } from './group-type-add-dialog/group-type-add-dialog.component';
import { ImportGroupTypeAssestDialogComponent } from './group-type-import-dialog/group-type-import-dialog.component';

@Component({
    selector: 'app-list-group-assest-management',
    templateUrl:'./management-list-group-assest.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListGroupAssestManagmentComponent implements OnInit, OnDestroy {
    paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  displayedColumns = ['STT', 'MaNhom', 'TenNhom', 'ConHieuLuc','ThaoTac'];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<number>(true, []);
  itemIds: number[] = [];
  selection2 = new SelectionModel<number>(true, []);

  constructor(
    private changeDetect: ChangeDetectorRef,
    public listGroupTypeAssetManagementService: ListGroupTypeAssestManagementService,
    private layoutUtilsServie: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listGroupTypeAssetManagementService.fetch();
    this.listGroupTypeAssetManagementService.items$.subscribe((data) => {
      data.forEach((element) => {
        this.itemIds.push(element.IdPNTS);
      });
    });

    this.grouping = this.listGroupTypeAssetManagementService.grouping;
    this.paginator = this.listGroupTypeAssetManagementService.paginator;
    this.sorting = this.listGroupTypeAssetManagementService.sorting;
    const sb = this.listGroupTypeAssetManagementService.isLoading$.subscribe(
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
    this.listGroupTypeAssetManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listGroupTypeAssetManagementService.patchState({ paginator });
  }

  add() {
    const saveMessage = 'THÊM THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddGroupTypeAssestDialogComponent, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listGroupTypeAssetManagementService.fetch();
      } else {
        this.layoutUtilsServie.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listGroupTypeAssetManagementService.fetch();
      }
    });
  }

  import(){
    const saveMessage = 'IMPORT THÀNH CÔNG'
    const messageType = MessageType.Create;
    const dialogRef =  this.dialog.open(ImportGroupTypeAssestDialogComponent,{
      data: {},
      panelClass: 'custom-dialog',
      maxWidth:'none',
      width: '900px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (!res){
        this.listGroupTypeAssetManagementService.fetch()
      } else{
        this.layoutUtilsServie.showActionNotification(saveMessage,messageType,4000,true,false)
        this.listGroupTypeAssetManagementService.fetch()
      }
    })
  }
}