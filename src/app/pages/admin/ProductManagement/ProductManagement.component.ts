import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import { TopHeaderComponent } from '../../_layout/components/top-header/top-header.component';

@Component({
  selector: 'app-managment-product',
  templateUrl: './ProductManagement.component.html',
  imports:[TopHeaderComponent,CommonModule]
})
export class ProductManagementComponent {
  products = [
    {
      id:"P001",
      name:"Niacinamide 10% + ZinC 1%",
      category:'serum',
      price:10.00,
      quantity:100,
      status:'in stock'
    },
    {
      id:"P002",
      name:"Niacinamide 10% + ZinC 1%",
      category:'serum',
      price:10.00,
      quantity:100,
      status:'in stock'
    },
    {
      id:"P002",
      name:"Niacinamide 10% + ZinC 1%",
      category:'serum',
      price:10.00,
      quantity:100,
      status:'in stock'
    },

  ]
}