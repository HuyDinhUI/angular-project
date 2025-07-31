import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './_layout/layout.component'
import { AdminComponent } from './theme/layout/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: 'Management/CustomerManagement',
        loadChildren:() => import("./admin/CustomersManagement/CustomersManagement.module").then((m) => m.CustomerManagementModule)
          
      },
      {
        path:'Management/AccountManagement',
        loadChildren:() => import("./admin/AccountsManagement/AccountManagement.module").then((m) => m.AccountManagementModule)
      },
      {
        path:'management/category',
        loadChildren:() => import("./admin/management/category/category.module").then((m) => m.CategoryManagmentModel)
      },
      {
        path: 'management/user',
        loadChildren:() => import("./admin/management/user/user.module").then((m) => m.UserManagmentModel)
      },

      { path: '', redirectTo: 'management/category/listproduct', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}