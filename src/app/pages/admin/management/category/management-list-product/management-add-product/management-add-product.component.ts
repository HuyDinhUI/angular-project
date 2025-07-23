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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsModel } from '../../model/list-product-management.model';
import { ListProductManagementService } from '../../services/list-product-management.service';
import {
  LayoutUtilsService,
  MessageType,
} from '../../../../_core/utils/layout-utils.service';
import { ListUnittManagementService } from '../../services/list-unit-management.service';
import { TypeProductManagementService } from '../../services/type-product-managment.service';

@Component({
  selector: 'management-add-product',
  templateUrl: 'management-add-product.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementAddProductComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private listProductManagement: ListProductManagementService,
    public listUnitManagement: ListUnittManagementService,
    public listTypeProductManagement: TypeProductManagementService,
    private layoutUtilsService: LayoutUtilsService
  ) {}

  ngOnInit(): void {
    this.listUnitManagement.fetch();
    this.listTypeProductManagement.fetch();
    this.loadForm();
  }

  ngOnDestroy(): void {}

  goBack() {
    this.router.navigate(['/management/category/listproduct']);
  }

  loadForm() {
    this.formGroup = this.fb.group({
      mahang: ['', Validators.compose([Validators.required])],
      tenmathang: ['', Validators.compose([Validators.required])],
      loaimathang: ['', Validators.compose([Validators.required])],
      donvitinh: ['', Validators.compose([Validators.required])],
      sokytinhkhauhaotoithieu: [0, Validators.compose([Validators.required])],
      sokytinhkhauhaotoida: [0, Validators.compose([Validators.required])],
      tenonsite: ['', Validators.compose([Validators.required])],
      vat: [0, Validators.compose([Validators.required])],
      giamua: [0, Validators.compose([Validators.required])],
      giaban: [0, Validators.compose([Validators.required])],
      dinhmuctoithieu: [0, Validators.compose([Validators.required])],
      dinhmuctoida: [0, Validators.compose([Validators.required])],
      donvitinhcap2: ['', Validators.compose([Validators.required])],
      quydoidonvitinhcap2: [0, Validators.compose([Validators.required])],
      donvitinhcap3: ['', Validators.compose([Validators.required])],
      quydoidonvitinhcap3: [0, Validators.compose([Validators.required])],
      theodoilo: [''],
      lataisan: [''],
      mota: ['', Validators.compose([Validators.required])],
      motachitiet: ['', Validators.compose([Validators.required])],
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

  prepareData(): ProductsModel {
    let model = new ProductsModel();
    model.MaHang = this.formGroup.controls['mahang'].value
    model.IdLMH = this.formGroup.controls['loaimathang'].value;
    model.TenMatHang = this.formGroup.controls['tenmathang'].value;
    model.IdDVT = this.formGroup.controls['donvitinh'].value;
    model.SoKyTinhKhauHaoToiThieu =
      this.formGroup.controls['sokytinhkhauhaotoithieu'].value;
    model.SoKyTinhKhauHaoToiDa =
      this.formGroup.controls['sokytinhkhauhaotoida'].value;
    model.TenOnsite = this.formGroup.controls['tenonsite'].value;
    model.VAT = this.formGroup.controls['vat'].value;
    model.GiaMua = this.formGroup.controls['giamua'].value;
    model.GiaBan = this.formGroup.controls['giaban'].value;
    model.LowerLimit = this.formGroup.controls['dinhmuctoithieu'].value;
    model.UpperLimit = this.formGroup.controls['dinhmuctoida'].value;
    model.IdDVTCap2 = this.formGroup.controls['donvitinhcap2'].value;
    model.QdDVTCap2 = this.formGroup.controls['quydoidonvitinhcap2'].value;
    model.IdDVTCap3 = this.formGroup.controls['donvitinhcap3'].value;
    model.QdDVTCap3 = this.formGroup.controls['quydoidonvitinhcap3'].value;
    model.Theodoilo = this.formGroup.controls['theodoilo'].value;
    model.IsTaisan = this.formGroup.controls['lataisan'].value;
    model.Mota = this.formGroup.controls['mota'].value;
    model.ChiTietMoTa = this.formGroup.controls['motachitiet'].value;

    return model;
  }

  onSubmit() {
    console.log(this.formGroup.controls['theodoilo'].value);
    if (this.formGroup.valid) {
      const model = this.prepareData();
      console.log(model)
      this.listProductManagement.createProduct(model).subscribe((res) => {
        if (res && res.status === 1) {
          this.layoutUtilsService.showActionNotification(
            'Thêm thành công',
            MessageType.Create,
            4000,
            true,
            false,
          );
          this.resetForm();
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
      });
    }
    this.validateAllFormFields(this.formGroup);
  }

  resetForm() {
    this.formGroup.reset();
  }
}
