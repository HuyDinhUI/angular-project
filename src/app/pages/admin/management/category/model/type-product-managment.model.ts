export interface TypeProductsModelDTO {
  IdLMH: number,
  TenLMH: string,
  LoaiMatHangCha: string,
  DoUuTien: number,
  Mota: string
}

export class TypeProductsModel {
  TenLMH: string
  LoaiMHC: number
  DoUuTien: number
  Mota: string
  HinhAnh: File
}
