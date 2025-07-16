import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-list-brand-management',
    templateUrl:'./management-list-brand.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListBrandManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}