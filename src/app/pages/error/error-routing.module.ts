import { RouterModule, Routes } from "@angular/router";
import { Error403Component } from "./403/error-403.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Error404Component } from "./404/error-404.component";


const routes: Routes = [
    {
        path: '403',
        component: Error403Component
    },
    {
        path: '404',
        component: Error404Component
    },
    {path:'',redirectTo:'404',pathMatch: 'full'}

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class ErrorRoutingModel { }