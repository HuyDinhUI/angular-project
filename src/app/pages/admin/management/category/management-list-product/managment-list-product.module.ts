import { RouterModule, Routes } from "@angular/router";
import { ListProudctManagmentComponent } from "./management-list-product.component";
import { ManagementAddProductComponent } from "./management-add-product/management-add-product.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListProductManagementService } from "../services/list-product-management.service";
import { ManagementEditProductComponent } from "./management-edit-product-dialog/management-edit-product.component"
import { AuthGuard } from "../../../../../modules/auth/_services/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: ListProudctManagmentComponent,
        children: [
            {   
                canActivate:[AuthGuard],
                data:{requiredPermissions: ["3402"]},
                path:'add',
                component:ManagementAddProductComponent
            },
            {
                canActivate:[AuthGuard],
                data:{requiredPermissions: ["3402"]},
                path: 'edit/:id',
                component:ManagementEditProductComponent
            }
        ]
    }
]

@NgModule({
    declarations:[
        ListProudctManagmentComponent,
        ManagementAddProductComponent,
        ManagementEditProductComponent
    ],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [
        ListProductManagementService
    ],
    exports: [RouterModule]
})
export class ListProductsManagementModule {}