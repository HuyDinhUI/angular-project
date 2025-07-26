import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-add-management',
  templateUrl: './management-list-unit-add.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementUnitAddComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ManagementUnitAddComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tendonvitinh: ['', Validators.compose([Validators.required])],
    });
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

  onSubmit() {
    this.validateAllFormFields(this.formGroup);
  }

  ngOnDestroy(): void {}

  goBack() {
    this.dialogRef.close();
  }

  resetForm(){
    this.formGroup.reset()
  }
}
