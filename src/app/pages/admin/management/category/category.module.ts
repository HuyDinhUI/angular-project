import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './category.component';
import { TypeProductManagmentComponent } from './mangement-type-product/management-type-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeeCustomerModule } from '../../../jee-customer.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';
import { ListUnitManagmentComponent } from './mangement-list-unit/management-list-unit.component';
import { ListTypeAssestManagmentComponent } from './management-list-type-assest/management-list-type.component';
import { ListReasonAssestManagmentComponent } from './management-list-reason-assest/management-list-reason-assest.component';
import { ListProudctManagmentComponent } from './management-list-product/management-list-product.component';
import { ListProduceManagmentComponent } from './management-list-produce/management-list-produce.component';
import { ListInsuranceManagmentComponent } from './management-list-insurance/managment-list-insurance.component';
import { ListGroupAssestManagmentComponent } from './management-list-group-assest/management-list-group-assest.component';
import { ListBrandManagmentComponent } from './management-list-brand/management-list-brand.component';
import { ListProductManagementService } from './services/list-product-management.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ImportProductDialogComponent } from './management-list-product/management-import-product-dialog/managemnt-import-product-dialog.component';
import { TypeProductManagementService } from './services/type-product-managment.service';
import { ListBrandManagementService } from './services/list-brand-management.service';
import { ListProduceManagementService } from './services/list-produce-management.service';
import { ListUnittManagementService } from './services/list-unit-management.service';

const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent,
    children: [
      {
        path: 'listproduct',
        loadChildren: () =>
          import(
            './management-list-product/managment-list-product.module'
          ).then((m) => m.ListProductsManagementModule),
      },
      {
        path: 'typeassest',
        loadChildren: () => import('./management-list-type-assest/management-list-type-assest.module').then((m) => m.ListTypeAssestManagementModule)
      },

      {
        path: 'typeproduct',
        loadChildren: () =>
          import(
            './mangement-type-product/management-type-product.module'
          ).then((m) => m.TypeProductManagementModule),
      },

      {
        path: 'listunit',
        loadChildren: () => import('./mangement-list-unit/management-list-unit.module').then((m) => m.ListUnitManagementModule),
      },
      {
        path: 'reasonassest',
        loadChildren: () => import('./management-list-reason-assest/management-list-reason-assest.module').then((m) => m.ListReasonTypeAssestManagementModule)
      },
      {
        path: 'produce',
        loadChildren: () => import('./management-list-produce/management-list-produce.module').then((m) => m.ListProduceManagementModule)
      },
      {
        path: 'insurance',
        loadChildren: ()=> import('./management-list-insurance/management-list-insurance.module').then((m) => m.ListInsuranceManagementModule)
      },
      {
        path: 'groupassest',
        loadChildren: () => import('./management-list-group-assest/management-list-group-assest.module').then((m) => m.ListGroupTypeAssestManagementModule)
      },
      {
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
