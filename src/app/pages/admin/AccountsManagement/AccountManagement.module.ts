import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { JeeCustomerModule } from '../../jee-customer.module'; 

import { TopHeaderComponent } from '../../_layout/components/top-header/top-header.component';
import { AccountManagementComponent } from './AccountManagement.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccountManagementListComponent } from './account-managment-list/account-managment-list.component';

const routes:Routes = [
    {
        path:'',
        component:AccountManagementComponent,
        children:[
            {
                path:'',
                component:AccountManagementComponent
            }
        ]
    },
]

@NgModule({
    declarations:[
        AccountManagementComponent,
        AccountManagementListComponent
    ],
    imports:[CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    exports:[RouterModule]
})

export class AccountManagementModule {}