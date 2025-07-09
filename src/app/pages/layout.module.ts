import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './_layout/layout.component'
import {SidebarComponent} from './_layout/components/sidebar/sidebar.component'
import {RouterOutlet} from '@angular/router'
import { DashboardComponent } from './admin/Dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { TopHeaderComponent } from './_layout/components/top-header/top-header.component';

@NgModule({
  declarations: [LayoutComponent,SidebarComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutRoutingModule
  ]
})
export class LayoutModule {}