import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { TypeProductsModel } from '../../model/type-product-managment.model';
import { TypeProductManagementService } from '../../services/type-product-managment.service';
import { LayoutUtilsService, MessageType } from '../../../../_core/utils/layout-utils.service';


@Component({
  selector: 'add-type-product',
  templateUrl: 'managment-type-product-add.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTypeProductManagementComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public typeproductservice: TypeProductManagementService,
    private layoutUtilsService: LayoutUtilsService
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tenloaimathang: ['', Validators.compose([Validators.required])],
      loaimathangcha: ['', Validators.compose([Validators.required])],
      mota: ['', Validators.compose([Validators.required])],
      douutien: [0, Validators.compose([Validators.required])],
      khomacdinh: ['', Validators.compose([Validators.required])]
    });
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      this.previewUrl = null;
      return;
    }
    const file = input.files[0];
    this.selectedFile = file;

    // preview
    this.previewUrl = URL.createObjectURL(file);
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
    if (this.formGroup.valid) {
      // const model = this.prepareData();
      // console.log(model)
      this.isLoading = true
      const formData = new FormData()
      formData.append('TenLMH', this.formGroup.get('tenloaimathang')?.value)
      formData.append('LoaiMHC', this.formGroup.get('loaimathangcha')?.value)
      formData.append('Mota', this.formGroup.get('mota')?.value)
      formData.append('DoUuTien', this.formGroup.get('douutien')?.value)
      formData.append('HinhAnh', this.selectedFile, this.selectedFile.name)
      
      this.typeproductservice.create(formData).subscribe((res) => {
        console.log(res.status)
        if (res && res.status === 1) {
          this.isLoading = false
          this.cd.detectChanges()
          console.log(this.isLoading)
          this.layoutUtilsService.showActionNotification(
            'Thêm thành công',
            MessageType.Create,
            4000,
            true,
            false,
          );
          
          this.typeproductservice.fetch()

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

  goBack() {
    this.router.navigate(['/management/category/typeproduct']);
  }

  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void { }
}
