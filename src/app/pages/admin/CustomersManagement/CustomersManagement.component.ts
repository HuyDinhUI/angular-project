import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import { TopHeaderComponent } from '../../_layout/components/top-header/top-header.component';


@Component({
  selector: 'app-customer-management',
  templateUrl: './CustomersManagement.component.html',
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersManagementComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
