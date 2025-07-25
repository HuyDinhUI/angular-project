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
    public dialogRef: MatDialogRef<ImportProductDialogComponent>
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
      alert('Chưa chọn file');
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
            mahang: [row["Mã hàng"]],
            tenmathang: [row["Tên mã hàng"]],
            loaimathang: [row["Loại mã hàng"]],
            donvitinh: [row["Đơn vị tính"]],
            sokytinhkhauhaotoithieu: [row["Số kỳ tính khấu hao tối thiểu"]],
            sokytinhkhauhaotoida: [row["Số kỳ tính khấu hao tối đa"]],
            tenonsite: [row["Tên On Site"]],
            vat: [row["VAT"]],
            giamua: [row["Giá mua"]],
            giaban: [row["Giá bán"]],
            dinhmuctoithieu: [row["Định mức tối thiểu"]],
            dinhmuctoida: [row["Định mức tối đa"]],
            donvitinhcap2: [row["Đơn vị tính cấp 2"]],
            quydoidonvitinhcap2: [row["Quy đổi đơn vị tính cấp 2"]],
            donvitinhcap3: [row["Đơn vị tính cấp 3"]],
            quydoidonvitinhcap3: [row["Quy đổi đơn vị tính cấp 3"]],
            theodoilo: [row["Theo dõi lô"]],
            lataisan: [row["Là tài sản"]],
            mota: [row["Mô tả"]],
            motachitiet: [row["Mô tả chi tiết"]],
          })
        );
      });

        this.dataSource = new MatTableDataSource(this.products.value);
        this.cd.detectChanges();

      console.log('✅ FormArray sau khi import:', this.products.value);
    };

    reader.readAsArrayBuffer(this.selectedFile);
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
