import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { GroupingState, PaginatorState, SortState } from '../../../../../_metronic/shared/crud-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showSearchFormModel } from '../../../_shared/jee-search-form/jee-search-form.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ListProduceManagementService } from '../services/list-produce-management.service';
import { LayoutUtilsService, MessageType } from '../../../_core/utils/layout-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DanhMucChungService } from '../../../_core/services/danhmuc.service';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';
import { AddProduceDialogComponent } from './management-list-produce-add-dialog/management-list-produce-add-dialog.component';

@Component({
  selector: 'app-list-produce-management',
  templateUrl: './management-list-produce.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProduceManagmentComponent implements OnInit, OnDestroy {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  displayedColumns = ['select', '#', 'TenXuatXu', 'ThaoTac'];
  showSearch = new showSearchFormModel();
  selection = new SelectionModel<number>(true, []);
  itemIds: number[] = [];
  selection2 = new SelectionModel<number>(true, []);

  constructor(
    private changeDetect: ChangeDetectorRef,
    public listProduceManagementService: ListProduceManagementService,
    private layoutUtilsServie: LayoutUtilsService,
    public dialog: MatDialog,
    public danhmuc: DanhMucChungService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listProduceManagementService.fetch();
    this.listProduceManagementService.items$.subscribe((data) => {
      this.itemIds = []
      data.forEach((element) => {
        this.itemIds.push(element.IdXuatXu);
      });
    });

    this.grouping = this.listProduceManagementService.grouping;
    this.paginator = this.listProduceManagementService.paginator;
    this.sorting = this.listProduceManagementService.sorting;
    const sb = this.listProduceManagementService.isLoading$.subscribe(
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
    this.listProduceManagementService.patchState({ searchTerm });
  }

  paginate(paginator: PaginatorState) {
    this.listProduceManagementService.patchState({ paginator });
  }

  add() {
    const saveMessage = 'THÊM THÀNH CÔNG';
    const messageType = MessageType.Create;
    const dialogRef = this.dialog.open(AddProduceDialogComponent, {
      data: {},
      panelClass: 'custom-dialog',
      maxWidth: 'none',
      width: '900px',
      disableClose: true,
    }); 
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        this.listProduceManagementService.fetch();
      } else {
        this.layoutUtilsServie.showActionNotification(
          saveMessage,
          messageType,
          4000,
          true,
          false
        );
        this.listProduceManagementService.fetch();
      }
    });
  }
}
