import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'management-add-product',
  templateUrl: 'management-add-product.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementAddProductComponent implements OnInit, OnDestroy {

    formGroup: FormGroup

    constructor(
        private router: Router,
        private fb: FormBuilder
    ){}

  ngOnInit(): void {

   this.loadForm()
  }

  ngOnDestroy(): void {}

  goBack(){
    this.router.navigate(['/management/category/listproduct'])
  }

   loadForm(){
        this.formGroup = this.fb.group({
            mahang:['',Validators.compose([Validators.required])],
            tenmathang:['',Validators.compose([Validators.required])],
            loaimathang: ['',Validators.compose([Validators.required])],
            donvitinh: ['', Validators.compose([Validators.required])],
            sokytinhkhauhaotoithieu: [0,Validators.compose([Validators.required])],
            sokytinhkhauhaotoida: [0,Validators.compose([Validators.required])],
            tenonsite: ['',Validators.compose([Validators.required])],
            vat: [0,Validators.compose([Validators.required])],
            giamua:[0,Validators.compose([Validators.required])],
            giaban:[0,Validators.compose([Validators.required])],
            dinhmuctoithieu:[0,Validators.compose([Validators.required])],
            dinhmuctoida:[0,Validators.compose([Validators.required])],
            donvitinhcap2:['',Validators.compose([Validators.required])],
            quydoidonvitinhcap2:[0,Validators.compose([Validators.required])],
            donvitinhcap3:['',Validators.compose([Validators.required])],
            quydoidonvitinhcap3:[0,Validators.compose([Validators.required])],
            mota:['',Validators.compose([Validators.required])],
            motachitiet:['',Validators.compose([Validators.required])]
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

  onSubmit(){
    this.validateAllFormFields(this.formGroup)
  }

  resetForm(){
    this.formGroup.reset()
  }
  
}
