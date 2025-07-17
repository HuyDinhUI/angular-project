import { Component,ChangeDetectionStrategy ,OnInit, OnDestroy, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImportProductDialogComponent } from '../management-list-product/management-import-product-dialog/managemnt-import-product-dialog.component';

@Component({
    selector: 'app-tlist-insurance-management',
    templateUrl:'./management-list-insurance.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListInsuranceManagmentComponent implements OnInit, OnDestroy {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ImportProductDialogComponent> 
    ){}
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    goBack(){
        this.dialogRef.close()
    }
}