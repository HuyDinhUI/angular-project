import { RouterModule, Routes } from "@angular/router";
import { ListUnitManagmentComponent } from "./management-list-unit.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListUnittManagementService } from "../services/list-unit-management.service";
import { ManagementUnitAddComponent } from "./management-list-unit-add/management-list-unit-add.component";
import { SearchForm } from "../../../../../components/SearchComponent/SearchComponent.component";

const routes: Routes = [
    {
        path:'',
        component:ListUnitManagmentComponent,
        children:[
            {
                path:'add',
                component: ManagementUnitAddComponent
            }
        ]
    }
]

@NgModule({
    declarations: [ListUnitManagmentComponent, ManagementUnitAddComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule, SearchForm],
    providers:[ListUnittManagementService],
    exports: [RouterModule]
})

export class ListUnitManagementModule{}