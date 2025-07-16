import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-list-type-assest-management',
    templateUrl:'./management-list-type-assest.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListTypeAssestManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}