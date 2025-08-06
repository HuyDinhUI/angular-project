import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { PaginatorState, SortState } from "../../../../../_metronic/shared/crud-table";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subscription } from "rxjs";
import { showSearchFormModel } from "../../../_shared/jee-search-form/jee-search-form.model";
import { UserManagementService } from "../services/management-user-list.service";
import { LayoutUtilsService } from "../../../_core/utils/layout-utils.service";
import { MatDialog } from "@angular/material/dialog";
import { DanhMucChungService } from "../../../_core/services/danhmuc.service";
import { AuthService } from "../../../../../modules/auth/_services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-list-user',
    templateUrl: './management-user-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:false
})
export class UserListManagementComponent implements OnInit,OnDestroy{
    paginator: PaginatorState;
    sorting: SortState;
    isLoading: boolean
    filterGroup: FormGroup;
    searchControl = new FormControl();
    private subsription: Subscription[] = [];
    displayedColumns = ['RowId', 'username', 'hoten', 'dienthoai','email', 'thaotac'];
    showSearch = new showSearchFormModel();

    constructor(
        private changeDetect: ChangeDetectorRef,
        public userManagementService: UserManagementService,
        private layoutUtilsService: LayoutUtilsService,
        public dialog: MatDialog,
        public danhmuc: DanhMucChungService,
        public auth: AuthService,
        private fb: FormBuilder,
        private router: Router
    ){}

    ngOnInit(): void {
        this.userManagementService.fetch();
        
        
        
        this.searchControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((val) => this.search(val))

        this.paginator =this.userManagementService.paginator
        
    }

    search(searchTerm: string){
        this.userManagementService.patchState({searchTerm})
    }

    paginate(paginator: PaginatorState){
        this.userManagementService.patchState({paginator})
    }

    ngOnDestroy(): void {
        
    }

    
}