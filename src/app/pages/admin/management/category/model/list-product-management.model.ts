export interface ProductsModelDTO {
  IdMH: number;
  MaHang: string;
  TenMatHang: String;
  HinhAnh: String;
  SoKyTinhKhauHaoToiThieu: number;
  SoKyTinhKhauHaoToiDa: number;
}

export class ProductsModel {
  MaHang: string
  TenMatHang: string
  IdLMH: number
  IdDVT: number
  SoKyTinhKhauHaoToiThieu: number
  SoKyTinhKhauHaoToiDa: number
  TenOnsite: string
  VAT: number
  GiaMua: number
  GiaBan: number
  UpperLimit: number
  LowerLimit: number
  QdDVTCap2: number
  QdDVTCap3: number
  IdDVTCap2: number
  IdDVTCap3: number
  Theodoilo: boolean
  IsTaisan: boolean
  Mota: string
  ChiTietMoTa: string

  
}
