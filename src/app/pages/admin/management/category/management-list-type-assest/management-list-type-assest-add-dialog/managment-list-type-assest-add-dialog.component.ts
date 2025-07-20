import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector:'app-type-assest-add-dialog',
    templateUrl: './managment-list-type-assest-add-dialog.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTypeAssestDialogComponent implements OnInit,OnDestroy{

    formGroup: FormGroup
    
        constructor(
            @Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<AddTypeAssestDialogComponent>,
            private fb: FormBuilder
        ){}
    
        ngOnInit(): void {
            this.loadForm()
        }
    
        loadForm(){
            this.formGroup = this.fb.group({
                maloai: ['',Validators.compose([Validators.required])],
                tenloai: ['', Validators.compose([Validators.required])],
                cohieuluc: ['']
            })
        }
    
        validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
          }
        });
      }
    
        ngOnDestroy(): void {
            
        }
    
        onSubmit(){
            this.validateAllFormFields(this.formGroup)
        }
    
        goBack(){
            this.dialogRef.close()
        }
}