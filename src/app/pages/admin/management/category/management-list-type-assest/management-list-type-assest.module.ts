
import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListProduceManagementService } from "../services/list-produce-management.service";


import { ListInsuranceManagementService } from "../services/list-insurance-managment.service";
import { ListTypeAssestManagmentComponent } from "./management-list-type.component";
import { AddTypeAssestDialogComponent } from "./management-list-type-assest-add-dialog/managment-list-type-assest-add-dialog.component";
import { ImportTypeAssestDialogComponent } from "./management-list-type-assest-import-dialog/managment-list-type-assest-import-dialog.component";
import { ListTypeAssestManagementService } from "../services/list-type-assest-management.service";
import { SearchForm } from "../../../../../components/SearchComponent/SearchComponent.component";


const routes: Routes = [
    {
        path: '',
        component: ListTypeAssestManagmentComponent,
        
    }
]

@NgModule({
    declarations: [ListTypeAssestManagmentComponent,AddTypeAssestDialogComponent,ImportTypeAssestDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule,SearchForm],
    providers: [ListTypeAssestManagementService],
    exports:[RouterModule]
})

export class ListTypeAssestManagementModule{}