import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-account-management-list',
    templateUrl: './account-management-list.component.html',
    styleUrl: './account-management-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:false
})

export class AccountManagementListComponent implements OnInit, OnDestroy{
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
        
    }
}