import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { TypeProductManagementService } from '../services/type-product-managment.service';
import { LayoutUtilsService } from '../../../_core/utils/layout-utils.service';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';

@Component({
    selector: 'app-type-product-management',
    templateUrl:'./management-type-product.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TypeProductManagmentComponent implements OnInit, OnDestroy {
    paginator: PaginatorState
    sorting: SortState
    grouping: GroupingState
    isLoading: boolean
    filterGroup: FormGroup
    searchGroup: FormGroup
    private subscriptions: Subscription[] = []

    private subsriptions: Subscription[] = []
    displayedColumns = [
        'select',
        '#',
        'TenLoaiMH',
        'LoaiMHC',
        'DoUuTien',
        'MoTa',
        'ThaoTac'
    ]

    selection = new SelectionModel()
    itemIds: number[]=[]
    selection2 = new SelectionModel<number>(true,[])

    constructor(
        private router: Router,
        private changeDetect: ChangeDetectorRef,
        public typeProductManagementService: TypeProductManagementService,
        private layoutUtilsService: LayoutUtilsService,
        private danhmuc: DanhMucChungService,
        private auth: AuthService,
        private fb:FormBuilder
    ){}

    ngOnInit(): void {
        this.typeProductManagementService.fetch()

        this.typeProductManagementService.items$.subscribe(data =>{
            this.itemIds = []
            data.forEach(element => {
                this.itemIds.push(element.IdLMH)
            })
        })

        this.grouping = this.typeProductManagementService.grouping
        this.paginator = this.typeProductManagementService.paginator
        this.sorting = this.typeProductManagementService.sorting

        const sb = this.typeProductManagementService.isLoading$.subscribe(
            (res: any) => (this.isLoading = res)
        )
        this.subscriptions.push(sb)
    }

    ngOnDestroy(): void {
        this.subsriptions.forEach((sb) => sb.unsubscribe())
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
    this.typeProductManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.typeProductManagementService.patchState({ paginator });
  }

  add(){
    this.router.navigate(['/management/category/typeproduct/add'],{
        queryParams:{}
    })
  }
}