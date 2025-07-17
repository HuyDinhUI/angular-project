import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'import-product-dialog',
    templateUrl: './management-import-product-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ImportProductDialogComponent implements OnInit, OnDestroy{



    displayedColumns = ['#','MaHang','TenMH','TenK','DonGia','IdLMH','IdDVT','MoTa','ThaoTac']

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