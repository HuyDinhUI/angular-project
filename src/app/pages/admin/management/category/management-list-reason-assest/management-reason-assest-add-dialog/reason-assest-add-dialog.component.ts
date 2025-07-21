import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector:'app-reason-assest-add-dialog',
    templateUrl: './reason-assest-add-dialog.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReasonAssestDialogComponent implements OnInit,OnDestroy{

    formGroup: FormGroup
    
        constructor(
            @Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<AddReasonAssestDialogComponent>,
            private fb: FormBuilder
        ){}
    
        ngOnInit(): void {
            this.loadForm()
        }
    
        loadForm(){
            this.formGroup = this.fb.group({
                loaitanggiam: ['',Validators.compose([Validators.required])],
                matanggiam: ['', Validators.compose([Validators.required])],
                tentanggiam: ['', Validators.compose([Validators.required])],
                trangthai: ['']
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