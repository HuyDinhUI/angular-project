import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import { TopHeaderComponent } from '../../_layout/components/top-header/top-header.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports:[TopHeaderComponent]
})
export class DashboardComponent {
  revenue = '20.00 USD'
  orders = '30'
  customers = '50'
  products = '100'
}