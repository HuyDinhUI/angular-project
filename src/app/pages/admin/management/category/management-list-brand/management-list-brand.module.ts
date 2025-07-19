import { RouterModule, Routes } from "@angular/router";
import { ListBrandManagmentComponent } from "./management-list-brand.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListBrandManagementService } from "../services/list-brand-management.service";
import { AddBrandDialogComponent } from "./management-list-brand-add-dialog/management-list-brand-add-dialog.component";

const routes: Routes = [
    {
        path: '',
        component: ListBrandManagmentComponent
    }
]

@NgModule({
    declarations: [ListBrandManagmentComponent,AddBrandDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers:[ListBrandManagementService],
    exports: [RouterModule]
})
export class ListBrandManagementModule{}