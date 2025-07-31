import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';

@Component({
    selector: 'app-user-management',
    templateUrl: './user.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit{
    constructor(){}

    ngOnInit(): void {
        
    }
}