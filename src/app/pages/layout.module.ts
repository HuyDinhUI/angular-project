import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './_layout/layout.component'
import {SidebarComponent} from './_layout/components/sidebar/sidebar.component'
import {RouterOutlet} from '@angular/router'

import { LayoutRoutingModule } from './layout-routing.module';
import { TopHeaderComponent } from './_layout/components/top-header/top-header.component';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { TranslationModule } from '../modules/i18n/translation.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayoutComponent,SidebarComponent, AsideDynamicComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutRoutingModule,
    TranslationModule,
    TranslateModule
  ]
})
export class LayoutModule {}