import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './_layout/layout.component'

import { CustomersManagementComponent } from './admin/CustomersManagement/CustomersManagement.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, 
    children: [
      {
        path: 'Management/CustomerManagement',
        loadChildren:() => import("./admin/CustomersManagement/CustomersManagement.module").then((m) => m.CustomerManagementModule)
          
      },

      { path: '', redirectTo: 'Management/CustomerManagement', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}