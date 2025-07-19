import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ListUnittManagementService } from '../services/list-unit-management.service';
import { LayoutUtilsService } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';

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

  add(){
    this.router.navigate(['/management/category/listunit/add'],{
      queryParams:{}
    })
  }
}