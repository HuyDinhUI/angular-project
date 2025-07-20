import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListProduceManagementService } from "../services/list-produce-management.service";
import { ListInsuranceManagmentComponent } from "./managment-list-insurance.component";
import { AddInsuranceDialogComponenet } from "./management-list-insurance-add-dialog/management-list-insurance-add-dialog.component";

const routes: Routes = [
    {
        path: '',
        component: ListInsuranceManagmentComponent,
        
    }
]

@NgModule({
    declarations: [ListInsuranceManagmentComponent, AddInsuranceDialogComponenet],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [ListProduceManagementService],
    exports:[RouterModule]
})

export class ListInsuranceManagementModule{}