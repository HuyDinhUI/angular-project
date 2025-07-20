import { RouterModule, Routes } from "@angular/router";
import { ListProduceManagmentComponent } from "./management-list-produce.component";
import { NgModule } from "@angular/core";
import { AddProduceDialogComponent } from "./management-list-produce-add-dialog/management-list-produce-add-dialog.component";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListProduceManagementService } from "../services/list-produce-management.service";

const routes: Routes = [
    {
        path: '',
        component: ListProduceManagmentComponent,
        
    }
]

@NgModule({
    declarations: [ListProduceManagmentComponent, AddProduceDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [ListProduceManagementService],
    exports:[RouterModule]
})

export class ListProduceManagementModule{}