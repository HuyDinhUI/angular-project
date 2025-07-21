import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector:'app-group-type-assest-add-dialog',
    templateUrl: './group-type-add-dialog.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupTypeAssestDialogComponent implements OnInit,OnDestroy{

    formGroup: FormGroup
    
        constructor(
            @Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<AddGroupTypeAssestDialogComponent>,
            private fb: FormBuilder
        ){}
    
        ngOnInit(): void {
            this.loadForm()
        }
    
        loadForm(){
            this.formGroup = this.fb.group({
                manhom: ['',Validators.compose([Validators.required])],
                tennhom: ['', Validators.compose([Validators.required])],
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