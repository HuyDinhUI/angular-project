import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector:'app-type-assest-import-dialog',
    templateUrl: './managment-list-type-assest-import-dialog.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportTypeAssestDialogComponent implements OnInit,OnDestroy{

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ImportTypeAssestDialogComponent> 
    ){}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    goBack(){
        this.dialogRef.close()
    }
}