export interface ProductsModelDTO {
  IdMH: number;
  MaHang: string;
  TenMatHang: String;
  HinhAnh: String;
  SoKyTinhKhauHaoToiThieu: number;
  SoKyTinhKhauHaoToiDa: number;
}

export class ProductsModel {
  IdMH: number;
  MaHang: string;
  TenMatHang: String;
  HinhAnh: String;
  SoKyTinhKhauHaoToiThieu: number;
  SoKyTinhKhauHaoToiDa: number;
  LoaiMatHang: string;
  TenDVT: string;
}
