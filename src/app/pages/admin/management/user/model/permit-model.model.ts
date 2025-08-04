import { FormGroup } from "@angular/forms";

export interface PermitDTO{
    Id: number,
    permit: string,
    edit: boolean,
    isReadPermit: boolean,
    fullname: string
    formGroup?: FormGroup;
}

export class PermitModel{
    Id_Permit: number
    Username: string
    Edit: boolean
}