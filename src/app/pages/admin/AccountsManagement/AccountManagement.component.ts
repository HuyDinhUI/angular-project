import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './AccountManagement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:false
})
export class AccountManagementComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}