import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'import-insurance-dialog',
    templateUrl: './management-list-insurance-import-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ImportInsuranceDialogComponent implements OnInit, OnDestroy{

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ImportInsuranceDialogComponent> 
    ){}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    goBack(){
        this.dialogRef.close()
    }
}