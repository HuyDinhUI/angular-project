import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";


@Component({
    selector:'management-add-product',
    templateUrl: 'management-add-product.component.html',
    standalone:false,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManagementAddProductComponent implements OnInit,OnDestroy{

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }
}