import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error403Component } from './403/error-403.component';
import { ErrorRoutingModel } from './error-routing.module';


@NgModule({
  declarations: [Error403Component],
  imports: [
    CommonModule,
    ErrorRoutingModel,
  ]
})
export class ErrorModule {}