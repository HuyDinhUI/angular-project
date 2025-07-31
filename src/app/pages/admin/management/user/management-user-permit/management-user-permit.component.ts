import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ListPermitManagementService } from "../services/management-user-permit.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'list-user-permit',
    templateUrl: './management-user-permit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserPermitManagementComponent implements OnInit,OnDestroy{
    displayedColumns = ['Id','tenquyen','edit','isreadpermit']
    idParam: any
    dataSource: any 
    fullname: string
    
    constructor(
        private route: ActivatedRoute,
        public permitManagement: ListPermitManagementService,
        private cd: ChangeDetectorRef
    ){}
    ngOnInit(): void {
        this.idParam = this.route.snapshot.paramMap.get('username')
        this.permitManagement.getListPermitByUsername(this.idParam).subscribe(res => {
            console.log(res.data)
            this.dataSource = new MatTableDataSource(res.data)
            this.fullname = res.data[0].fullname
            this.cd.detectChanges()

        })
        
    }

    ngOnDestroy(): void {
        
    }

    goBack(): void {
    window.history.back();
  }
}