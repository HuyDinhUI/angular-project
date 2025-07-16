import { Component,ChangeDetectionStrategy ,OnInit} from '@angular/core';

@Component({
    selector: 'app-category-management',
    templateUrl: './category.component.html',
    standalone:false,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoryManagementComponent implements OnInit{
    constructor(){}

    ngOnInit(): void {
        
    }
}