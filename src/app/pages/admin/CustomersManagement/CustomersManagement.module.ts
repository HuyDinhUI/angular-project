import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { JeeCustomerModule } from '../../jee-customer.module'; 
import { CustomerManagementService } from './Services/customer-management.service';
import { CustomerThongTinService } from './Services/customer-thong-tin.service';
import { CustomerManagementListComponent } from './customer-management-list/customer-management-list.component';
import { CustomerManagementEditDialogComponent } from './customer-management-edit-dialog/customer-management-edit-dialog.component';
import { CustomersManagementComponent } from './CustomersManagement.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerGiaHanEditDialogComponent } from './customer-gia-han-edit-dialog/customer-gia-han-edit-dialog.component';
import { CustomerThongTinListComponent } from './customer-thong-tin-list/customer-thong-tin-list.component';
import { CustomerStatusDialogComponent } from './customer-status-dialog/customer-status-dialog.component';
import { CustomerAddNumberStaffDialogComponent } from './customer-add-number-staff-dialog/customer-add-number-staff-dialog.component';
import { CustomerResetPasswordDialog } from './customer-reset-password/customer-reset-password.component';
import { CustomerAddDeleteAppDialogComponent } from './customer-add-delete-app-dialog/customer-add-delete-app-dialog.component';
import { CustomerImportEditDialogComponent } from './customer-import-edit-dialog/customer-import-edit-dialog.component';
import { TopHeaderComponent } from '../../_layout/components/top-header/top-header.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersManagementComponent,
    children: [
      {
        path: '',
        component: CustomerManagementListComponent,
      },
      {
        path: 'info/:id',
        component: CustomerThongTinListComponent,
      },
      {path: '', redirectTo: '', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  declarations: [
    CustomerManagementEditDialogComponent,
    CustomerManagementListComponent,
    CustomersManagementComponent,
    CustomerGiaHanEditDialogComponent,
    CustomerThongTinListComponent,
    CustomerStatusDialogComponent,
    CustomerAddNumberStaffDialogComponent,
    CustomerResetPasswordDialog,
    CustomerAddDeleteAppDialogComponent,
    CustomerImportEditDialogComponent,
    TopHeaderComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
  providers: [
    CustomerManagementService,
    CustomerThongTinService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, height: 'auto', width: '900px' } },
  ],
  exports:[RouterModule]
})
export class CustomerManagementModule {}
