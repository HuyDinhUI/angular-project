import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector:'app-reason-assest-import-dialog',
    templateUrl: './reason-assest-import.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportReasonAssestDialogComponent implements OnInit,OnDestroy{

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ImportReasonAssestDialogComponent> 
    ){}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    goBack(){
        this.dialogRef.close()
    }
}