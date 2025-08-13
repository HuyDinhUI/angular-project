import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './category.component';
import { TypeProductManagmentComponent } from './mangement-type-product/management-type-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeeCustomerModule } from '../../../jee-customer.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';
import { ListProductManagementService } from './services/list-product-management.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ImportProductDialogComponent } from './management-list-product/management-import-product-dialog/managemnt-import-product-dialog.component';
import { TypeProductManagementService } from './services/type-product-managment.service';
import { ListBrandManagementService } from './services/list-brand-management.service';
import { ListProduceManagementService } from './services/list-produce-management.service';
import { ListUnittManagementService } from './services/list-unit-management.service';
import { AuthGuard } from '../../../../modules/auth/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent,
    children: [
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3400"]},
        path: 'listproduct',
        loadChildren: () =>
          import(
            './management-list-product/managment-list-product.module'
          ).then((m) => m.ListProductsManagementModule),
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3410"]},
        path: 'typeassest',
        loadChildren: () => import('./management-list-type-assest/management-list-type-assest.module').then((m) => m.ListTypeAssestManagementModule)
      },

      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3403"]},
        path: 'typeproduct',
        loadChildren: () =>
          import(
            './mangement-type-product/management-type-product.module'
          ).then((m) => m.TypeProductManagementModule),
      },

      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3501"]},
        path: 'listunit',
        loadChildren: () => import('./mangement-list-unit/management-list-unit.module').then((m) => m.ListUnitManagementModule),
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3414"]},
        path: 'reasonassest',
        loadChildren: () => import('./management-list-reason-assest/management-list-reason-assest.module').then((m) => m.ListReasonTypeAssestManagementModule)
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3404"]},
        path: 'produce',
        loadChildren: () => import('./management-list-produce/management-list-produce.module').then((m) => m.ListProduceManagementModule)
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3408"]},
        path: 'insurance',
        loadChildren: ()=> import('./management-list-insurance/management-list-insurance.module').then((m) => m.ListInsuranceManagementModule)
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3412"]},
        path: 'groupassest',
        loadChildren: () => import('./management-list-group-assest/management-list-group-assest.module').then((m) => m.ListGroupTypeAssestManagementModule)
      },
      {
        canActivate:[AuthGuard],
        data:{requiredPermissions: ["3406"]},
        path: 'brand',
        loadChildren: () => import('./management-list-brand/management-list-brand.module').then((m) => m.ListBrandManagementModule)
      },

      { path: '', redirectTo: 'category', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [CategoryManagementComponent, ImportProductDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JeeCustomerModule,
    NgxMatSelectSearchModule,
    TranslateModule,
  ],
  providers: [
    ListProductManagementService,
    TypeProductManagementService,
    ListBrandManagementService,
    ListProduceManagementService,
    ListUnittManagementService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, height: 'auto', width: '1200px' },
    },
  ],
  exports: [RouterModule],
})
export class CategoryManagmentModel {}
