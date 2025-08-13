import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';

@Component({
    selector: 'app-user-management',
    templateUrl: './error-403.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class Error403Component implements OnInit{
    constructor(){}

    ngOnInit(): void {
        
    }
}