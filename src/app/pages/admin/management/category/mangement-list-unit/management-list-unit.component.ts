import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ListUnittManagementService } from '../services/list-unit-management.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { ManagementAddProductComponent } from '../management-list-product/management-add-product/management-add-product.component';
import { ManagementUnitAddComponent } from './management-list-unit-add/management-list-unit-add.component';
import { ListUnitDeleteModel } from '../model/list-init-management.model';

@Component({
    selector: 'app-list-unit-management',
    templateUrl:'./management-list-unit.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListUnitManagmentComponent implements OnInit, OnDestroy {

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
        'TenDVT',
        'ThaoTac'
    ]
    showSearch = new showSearchFormModel();
    selection = new SelectionModel<number>(true,[])
    itemIds: number[] = [];
    selection2 = new SelectionModel<number>(true,[])

    constructor(
        private router: Router,
        private changeDetect: ChangeDetectorRef,
        public listUnitManagementService: ListUnittManagementService,
        private layoutUtilsService: LayoutUtilsService,
        public dialog: MatDialog,
        public danhmuc: DanhMucChungService,
        private auth: AuthService,
        private fb: FormBuilder
        
    ){}

    ngOnInit(): void {
        this.listUnitManagementService.fetch();
        this.listUnitManagementService.items$.subscribe(data => {
            data.forEach(element => {
                this.itemIds.push(element.IdDVT)
            })
        })

        this.grouping = this.listUnitManagementService.grouping
        this.paginator = this.listUnitManagementService.paginator
        this.sorting = this.listUnitManagementService.sorting
        const sb = this.listUnitManagementService.isLoading$.subscribe(
            (res: any) => (this.isLoading = res)
        )
        this.subscriptions.push(sb)
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sb) => sb.unsubscribe())
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

  changeKeyword(val:any) {
    this.search(val);
  }

  search(searchTerm: string) {
    this.listUnitManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listUnitManagementService.patchState({ paginator });
  }

  deleteUnit(id: number) {
        const message =
          'Bạn có muốn xóa sản phẩm này không? Lưu ý: Quá trình xóa không thể hoàn tác.';
        const dialog = this.layoutUtilsService.deleteElement('', message);
        const model = new ListUnitDeleteModel();
        model.LstUnitDelete.push(id);
        dialog.afterClosed().subscribe((x) => {
          if (x) {
            this.listUnitManagementService.deleteUnit(model).subscribe((res) => {
              if (res && res.status === 1) {
                this.layoutUtilsService.showActionNotification(
                  'Xóa thành công',
                  MessageType.Delete,
                  4000,
                  true,
                  false,
                );
                this.listUnitManagementService.fetch()
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
  
    deleteListUnits() {
        const message =
          'Bạn có muốn xóa sản phẩm này không? Lưu ý: Quá trình xóa không thể hoàn tác.';
        const dialog = this.layoutUtilsService.deleteElement('', message);
        const model = new ListUnitDeleteModel();
        console.log(this.selection2)
        model.LstUnitDelete = this.selection2.selected
    
        dialog.afterClosed().subscribe((x) => {
          if (x) {
            this.listUnitManagementService.deleteUnit(model).subscribe((res) => {
              if (res && res.status === 1) {
                this.layoutUtilsService.showActionNotification(
                  'Xóa thành công',
                  MessageType.Delete,
                  4000,
                  true,
                  false,
                );
                this.selection2.clear()
                this.listUnitManagementService.fetch()
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

  add(){
    const saveMessage = 'THÊM THÀNH CÔNG'
    const dialogRef = this.dialog.open(ManagementUnitAddComponent,{
        data:{},
        panelClass: 'custom-dialog',
        maxWidth: 'none',
        width: '900px',
        disableClose: true
    });
    dialogRef.afterClosed().subscribe((res)=>{
        if(!res){
            this.listUnitManagementService.fetch()

        }else{
            this.layoutUtilsService.showActionNotification(
                saveMessage,
                MessageType.Create,
                4000,
                true,
                false
            )
            this.listUnitManagementService.fetch()
        }
    })
  }
}