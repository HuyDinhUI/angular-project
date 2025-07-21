
import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";

import { ListGroupAssestManagmentComponent } from "./management-list-group-assest.component";
import { ListGroupTypeAssestManagementService } from "../services/list-group-type-management.service";
import { AddGroupTypeAssestDialogComponent } from "./group-type-add-dialog/group-type-add-dialog.component";
import { ImportGroupTypeAssestDialogComponent } from "./group-type-import-dialog/group-type-import-dialog.component";


const routes: Routes = [
    {
        path: '',
        component: ListGroupAssestManagmentComponent,
        
    }
]

@NgModule({
    declarations: [ListGroupAssestManagmentComponent,AddGroupTypeAssestDialogComponent,ImportGroupTypeAssestDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [ListGroupTypeAssestManagementService],
    exports:[RouterModule]
})

export class ListGroupTypeAssestManagementModule{}