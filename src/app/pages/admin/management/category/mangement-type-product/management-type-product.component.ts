import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-type-product-management',
    templateUrl:'./management-type-product.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class TypeProductManagmentComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}