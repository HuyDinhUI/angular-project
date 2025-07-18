import { RouterModule, Routes } from "@angular/router";
import { TypeProductManagmentComponent } from "./management-type-product.component";
import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { TypeProductManagementService } from "../services/type-product-managment.service";
import { AddTypeProductManagementComponent } from "./management-type-product-add/management-type-product-add.component";

const routes:Routes = [
    {
        path: '',
        component: TypeProductManagmentComponent,
        children: [
            {
                path:'add',
                component:AddTypeProductManagementComponent
            }
            
        ]

    }
]

@NgModule({
    declarations: [TypeProductManagmentComponent,AddTypeProductManagementComponent],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [
        TypeProductManagementService
    ],
    exports: [RouterModule]
})

export class TypeProductManagementModule{}