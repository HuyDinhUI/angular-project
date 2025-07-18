import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'add-type-product',
  templateUrl: 'managment-type-product-add.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTypeProductManagementComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tenloaimathang: ['', Validators.compose([Validators.required])],
      loaimathangcha: ['', Validators.compose([Validators.required])],
      mota: ['', Validators.compose([Validators.required])],
      douutien: [0, Validators.compose([Validators.required])],
      khomacdinh: ['', Validators.compose([Validators.required])],
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

  goBack() {
    this.router.navigate(['/management/category/typeproduct']);
  }

  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void {}
}
