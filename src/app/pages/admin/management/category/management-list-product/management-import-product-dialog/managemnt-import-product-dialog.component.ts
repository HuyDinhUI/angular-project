import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ChangeDetectorRef } from '@angular/core';
import { LayoutUtilsService, MessageType } from '../../../../_core/utils/layout-utils.service';
import { ListProduceManagementService } from '../../services/list-produce-management.service';
import { ListProductManagementService } from '../../services/list-product-management.service';

@Component({
  selector: 'import-product-dialog',
  templateUrl: './management-import-product-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ImportProductDialogComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  form: FormGroup;
  displayedColumns = [
    '#',
    'MaHang',
    'TenMH',
    'TenK',
    'DonGia',
    'IdLMH',
    'IdDVT',
    'MoTa',
    'ThaoTac',
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;
  dataSource: any

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImportProductDialogComponent>,
    private layoutUtilsService: LayoutUtilsService,
    public listProductManagementService: ListProductManagementService
  ) {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      document.querySelector('.name-file').textContent = this.selectedFile.name;
    }
  }

  importData() {
    if (!this.selectedFile) {
      this.layoutUtilsService.showActionNotification(
         'Chưa chọn file',
            MessageType.Read,
            4000,
            true,
            false,
            3000,
            'top',
            0
      )
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      this.products.clear(); // Clear dữ liệu cũ

      jsonData.forEach((row: any) => {
        this.products.push(
          this.fb.group({
            MaHang: [row["Mã hàng"]],
            TenMatHang: [row["Tên mặt hàng"]],
            IdLMH: [row["Loại mặt hàng"]],
            IdDVT: [row["Đơn vị tính"]],
            SoKyTinhKhauHaoToiThieu: [row["Số kỳ tính khấu hao tối thiểu"]],
            SoKyTinhKhauHaoToiDa: [row["Số kỳ tính khấu hao tối đa"]],
            TenOnSite: [row["Tên On Site"]],
            VAT: [row["VAT"]],
            GiaMua: [row["Giá mua"]],
            GiaBan: [row["Giá bán"]],
            UpperLimit: [row["Định mức tối thiểu"]],
            LowerLimit: [row["Định mức tối đa"]],
            IdDVTCap2: [row["Đơn vị tính cấp 2"]],
            QuyDoiDVTCap2: [row["Quy đổi đơn vị tính cấp 2"]],
            IdDVTCap3: [row["Đơn vị tính cấp 3"]],
            QuyDoiDVTCap3: [row["Quy đổi đơn vị tính cấp 3"]],
            Theodoilo: [row["Theo dõi lô"] == 1],
            IsTaiSan: [row["Là tài sản"] == 1],
            Mota: [row["Mô tả"]],
            ChiTietMoTa: [row["Mô tả chi tiết"]],
          })
        );
      });

        this.dataSource = new MatTableDataSource(this.products.value);
        this.cd.detectChanges();

      console.log('✅ FormArray sau khi import:', this.products.value);
    };

    reader.readAsArrayBuffer(this.selectedFile);
  }

  loadData(){
    if (this.products.length === 0){
      this.layoutUtilsService.showError('Chưa import dữ liệu')
    }
    else{
      this.listProductManagementService.importProduct(this.products.value).subscribe(res =>{
        if (res && res.status === 1){
          this.layoutUtilsService.showActionNotification(
            'Thêm thành công',
            MessageType.Create,
            4000,
            true,
            false
          );
          this.listProductManagementService.fetch()
        } 
        else{
          this.layoutUtilsService.showActionNotification(
            res.error.message,
            MessageType.Read,
            4000,
            true,
            false,
            3000,
            'top',
            0
          );
        }
      })
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  triggerImport() {
    this.fileInput.nativeElement.click();
  }

  goBack() {
    this.dialogRef.close();
  }
}
