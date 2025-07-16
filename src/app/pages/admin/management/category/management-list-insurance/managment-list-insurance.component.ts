import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-tlist-insurance-management',
    templateUrl:'./management-list-insurance.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListInsuranceManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}