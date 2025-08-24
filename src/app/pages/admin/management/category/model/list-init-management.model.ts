export interface UnitModelDTO {
  IdDVT: number;
  TenDVT: string,
}

export class UnitModel {
 TenDVT: string
}

export class ListUnitDeleteModel {
  LstUnitDelete: number[]

  constructor(){
    this.LstUnitDelete = []
  }
}
