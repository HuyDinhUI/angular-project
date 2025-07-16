import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-list-unit-management',
    templateUrl:'./management-list-unit.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListUnitManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}