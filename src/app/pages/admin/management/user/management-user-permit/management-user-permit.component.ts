import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ListPermitManagementService } from "../services/management-user-permit.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { LayoutUtilsService, MessageType } from "../../../_core/utils/layout-utils.service";

@Component({
    selector: 'list-user-permit',
    templateUrl: './management-user-permit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserPermitManagementComponent implements OnInit, OnDestroy {
    displayedColumns = ['Id', 'tenquyen', 'edit', 'isreadpermit']
    idParam: any
    dataSource: any
    fullname: string
    form: FormGroup

    constructor(
        private route: ActivatedRoute,
        public permitManagement: ListPermitManagementService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private layoutUtilsService: LayoutUtilsService
    ) {
        this.form = this.fb.group({
            permit: this.fb.array([])
        })
    }

    get permit(): FormArray {
        return this.form.get('permit') as FormArray
    }

    getPermitFormGroup(index: number): FormGroup {
        return this.permit.at(index) as FormGroup;
    }

    ngOnInit(): void {
        this.idParam = this.route.snapshot.paramMap.get('username');
        this.permitManagement.getListPermitByUsername(this.idParam).subscribe(res => {
            console.log(res)
            this.fullname = res.data[0].fullname;

            res.data.forEach(item => {
                const group = this.fb.group({
                    Username: [this.idParam],
                    Id_Permit: [item.Id],
                    Edit: [item.edit]
                });
                this.permit.push(group);
                console.log(group)
                // Gán form group vào từng row
                item.formGroup = group;
            });

            console.log(res.data)

            this.dataSource = new MatTableDataSource(res.data);
            this.cd.detectChanges();

            console.log(this.permit.value)
        })


    }

    ngOnDestroy(): void {

    }

    goBack(): void {
        window.history.back();
    }

    update() {
        console.log(this.permit.value)
        this.permitManagement.updatePermit(this.permit.value).subscribe((res) => {
            if (res && res.status === 1) {
                this.layoutUtilsService.showActionNotification(
                    'Cập nhật thành công',
                    MessageType.Update,
                    4000,
                    true,
                    false
                );
                this.permitManagement.fetch();
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
}



