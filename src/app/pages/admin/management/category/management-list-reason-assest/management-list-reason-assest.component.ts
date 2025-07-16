import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-list-reason-assest-management',
    templateUrl:'./management-list-reason-assest.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListReasonAssestManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}