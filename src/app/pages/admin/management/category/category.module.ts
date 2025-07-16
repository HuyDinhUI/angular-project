import { RouterModule, Routes } from "@angular/router";
import { CategoryManagementComponent } from "./category.component";
import {TypeProductManagmentComponent } from "./mangement-type-product/management-type-product.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JeeCustomerModule } from "../../../jee-customer.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { TranslateModule } from "@ngx-translate/core";
import { ListUnitManagmentComponent } from "./mangement-list-unit/management-list-unit.component";
import { ListTypeAssestManagmentComponent } from "./management-list-type-assest/management-list-type.component";
import { ListReasonAssestManagmentComponent } from "./management-list-reason-assest/management-list-reason-assest.component";
import { ListProudctManagmentComponent } from "./management-list-product/management-list-product.component";
import { ListProduceManagmentComponent } from "./management-list-produce/management-list-produce.component";
import { ListInsuranceManagmentComponent } from "./management-list-insurance/managment-list-insurance.component";
import { ListGroupAssestManagmentComponent } from "./management-list-group-assest/management-list-group-assest.component";
import { ListBrandManagmentComponent } from "./management-list-brand/management-list-brand.component";
import { ListProductManagementService } from "./services/list-product-management.service";

const routes: Routes = [
    {
        path:'',
        component:CategoryManagementComponent,
        children: [
            {
                path:'listproduct',
                component:ListProudctManagmentComponent
            },
            {
                path:'typeassest',
                component:ListTypeAssestManagmentComponent
            },
            {
                path: 'typeproduct',
                component:TypeProductManagmentComponent,
            },
            {
                path: 'listunit',
                component:ListUnitManagmentComponent
            },
            {
                path: 'reasonassest',
                component:ListReasonAssestManagmentComponent
            },
            {
                path: 'produce',
                component:ListProduceManagmentComponent
            },
            {
                path: 'insurance',
                component:ListInsuranceManagmentComponent
            },
            {
                path: 'groupassest',
                component:ListGroupAssestManagmentComponent
            },
            {
                path: 'brand',
                component:ListBrandManagmentComponent
            },

            {path:'', redirectTo:'category',pathMatch:'full'}
        ]
        
    }
]

@NgModule({
    declarations: [
        CategoryManagementComponent,
        ListProudctManagmentComponent
    ],
    imports: [CommonModule, RouterModule.forChild(routes), JeeCustomerModule, NgxMatSelectSearchModule, TranslateModule],
    providers: [
        ListProductManagementService
    ],
    exports:[RouterModule]
})
export class CategoryManagmentModel {}