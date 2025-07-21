
import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";

import { ListReasonAssestManagmentComponent } from "./management-list-reason-assest.component";
import { ListReasonAssestManagementService } from "../services/list-reason-assest-management.service";
import { AddReasonAssestDialogComponent } from "./management-reason-assest-add-dialog/reason-assest-add-dialog.component";
import { ImportReasonAssestDialogComponent } from "./management-reason-assest-import-dialog/reason-assest-import.component";


const routes: Routes = [
    {
        path: '',
        component: ListReasonAssestManagmentComponent,
        
    }
]

@NgModule({
    declarations: [ListReasonAssestManagmentComponent,AddReasonAssestDialogComponent,ImportReasonAssestDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [ListReasonAssestManagementService],
    exports:[RouterModule]
})

export class ListReasonTypeAssestManagementModule{}