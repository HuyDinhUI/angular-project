import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './_layout/layout.component'
import { DashboardComponent } from './admin/Dashboard/dashboard.component';
import { ProductManagementComponent } from './admin/ProductManagement/ProductManagement.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, 
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent
      },
      {
        path: 'Management/Product',
        component:ProductManagementComponent
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}