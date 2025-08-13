import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeeCustomerModule } from '../../../jee-customer.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';
import { UserManagementComponent } from './user.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UserListManagementComponent } from './management-user-list/management-user-list.component';
import { UserPermitManagementComponent } from './management-user-permit/management-user-permit.component';
import { UserManagementService } from './services/management-user-list.service';
import { ListPermitManagementService } from './services/management-user-permit.service';
import { AuthGuard } from '../../../../modules/auth/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3900"]},
        path: '',
        component: UserListManagementComponent
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3900"]},
        path: 'permit/:username',
        component: UserPermitManagementComponent
      }
    ],
  },
];

@NgModule({
  declarations: [UserManagementComponent, UserListManagementComponent, UserPermitManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JeeCustomerModule,
    NgxMatSelectSearchModule,
    TranslateModule,
  ],
  providers: [
    UserManagementService,
    ListPermitManagementService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, height: 'auto', width: '1200px' },
    },
  ],
  exports: [RouterModule],
})
export class UserManagmentModel {}
