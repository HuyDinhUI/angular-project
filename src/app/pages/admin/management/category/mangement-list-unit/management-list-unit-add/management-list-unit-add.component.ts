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
import { ListUnittManagementService } from '../../services/list-unit-management.service';
import { UnitModel } from '../../model/list-init-management.model';
import { LayoutUtilsService, MessageType } from '../../../../_core/utils/layout-utils.service';

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
    public dialogRef: MatDialogRef<ManagementUnitAddComponent>,
    public UnitManagementService: ListUnittManagementService,
    private layoutUtilsService: LayoutUtilsService
  ) { }

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

  prepareData() {
    const data = new UnitModel()
    data.TenDVT = this.formGroup.controls['tendonvitinh'].value
    return data
  }

  onSubmit(type: string) {
    if (this.formGroup.valid) {
      const data = this.prepareData()
      this.UnitManagementService.createUnit(data).subscribe(res => {
        if (res && res.status === 1) {
          this.layoutUtilsService.showActionNotification(
            'Thêm thành công',
            MessageType.Create,
            4000,
            true,
            false,
          );
          if (type === 'continue'){
            this.resetForm()
          } else this.goBack()
          this.UnitManagementService.fetch()
        } else {
          this.layoutUtilsService.showActionNotification(
            res.error.message,
            MessageType.Read,
            999999999,
            true,
            false,
            3000,
            'top',
            0
          );
        }
      })
    } 
    this.validateAllFormFields(this.formGroup);
  }

  ngOnDestroy(): void { }

  goBack() {
    this.dialogRef.close();
  }

  resetForm() {
    this.formGroup.reset()
  }
}
