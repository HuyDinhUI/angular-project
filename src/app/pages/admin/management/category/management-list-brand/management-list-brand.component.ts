import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ListBrandManagementService } from '../services/list-brand-management.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { AddBrandDialogComponent } from './management-list-brand-add-dialog/management-list-brand-add-dialog.component';

@Component({
    selector: 'app-list-brand-management',
    templateUrl:'./management-list-brand.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListBrandManagmentComponent implements OnInit, OnDestroy {

    paginator: PaginatorState;
    sorting: SortState;
    grouping: GroupingState;
    isLoading: boolean;
    filterGroup: FormGroup;
    searchGroup: FormGroup;
    private subscriptions: Subscription[] = [];
    displayedColumns = [
        'select',
        '#',
        'TenNhanHieu',
        'ThaoTac'
    ]
    showSearch = new showSearchFormModel();
    selection = new SelectionModel<number>(true,[])
    itemIds: number[] = [];
    selection2 = new SelectionModel<number>(true,[])

    constructor(
        private changeDetect: ChangeDetectorRef,
        public listBrandManagementService: ListBrandManagementService,
        private layoutUtilsServie:LayoutUtilsService,
        public dialog: MatDialog,
        public danhmuc: DanhMucChungService,
        private auth: AuthService,
        private fb: FormBuilder
    ){}

    ngOnInit(): void {
        this.listBrandManagementService.fetch()
        this.listBrandManagementService.items$.subscribe(data => {
            this.itemIds = []
            data.forEach(element => {
                this.itemIds.push(element.IdNhanHieu)
            })
        })

        this.grouping = this.listBrandManagementService.grouping
        this.paginator = this.listBrandManagementService.paginator
        this.sorting = this.listBrandManagementService.sorting
        const sb = this.listBrandManagementService.isLoading$.subscribe(
            (res: any) => (this.isLoading = res)
        )
        this.subscriptions.push(sb)
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sb => sb.unsubscribe()))
    }

    isAllSelected() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.itemIds.length;
    return numSelected === numRows;
  }

  changeKeyword(val: any) {
    this.search(val);
  }

  search(searchTerm: string) {
    this.listBrandManagementService.patchState({ searchTerm });
  }

   paginate(paginator: PaginatorState) {
    this.listBrandManagementService.patchState({ paginator });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection2.clear()
      : this.itemIds.forEach((row) => this.selection2.select(row));
  }

  add(){
    const saveMessage = 'THÊM THÀNH CÔNG'
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddBrandDialogComponent,{
        data: {},
        panelClass: 'custom-dialog',
        maxWidth:'none',
        width: '900px',
        disableClose: true
    })
    dialogRef.afterClosed().subscribe((res) => {
        if (!res){
            this.listBrandManagementService.fetch()
        } else{
            this.layoutUtilsServie.showActionNotification(saveMessage,messageType,4000,true,false)
            this.listBrandManagementService.fetch()
        }
    })
  }
}