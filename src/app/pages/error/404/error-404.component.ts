import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';

@Component({
    selector: 'app-user-management',
    templateUrl: './error-404.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class Error404Component implements OnInit{
    constructor(){}

    ngOnInit(): void {
        
    }
}