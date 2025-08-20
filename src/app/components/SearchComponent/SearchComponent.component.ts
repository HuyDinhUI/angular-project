import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subscription } from "rxjs";
import { DanhMucChungService } from "../../pages/admin/_core/services/danhmuc.service";
import { debounce } from "lodash";
import { JeeCustomerModule } from "../../pages/jee-customer.module";

@Component({
    selector:'app-search-form',
    templateUrl: './SearchComponent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [JeeCustomerModule],
    standalone:true

})
export class SearchForm implements OnInit,OnDestroy{
    private _errorMessage$ = new BehaviorSubject<string>('')
    private subscriptions: Subscription[] = []
    searchGroup!: FormGroup
    @Output() keywordEvent: EventEmitter<string> = new EventEmitter<string>()
    @Output() filterEvent: EventEmitter<any> = new EventEmitter<any>()

    get errorMessage$(){
        return this._errorMessage$.asObservable()
    }

    constructor(
        public cd: ChangeDetectorRef,
        public generalService: DanhMucChungService,
        private fb: FormBuilder
    ){}

    ngOnInit(): void {
        this.searchForm()
    }

    ngOnDestroy(): void {
        
    }

    searchForm(){
        this.searchGroup = this.fb.group({
            keyword:['']
        })
        const searchEvent = this.searchGroup.controls['keyword'].valueChanges
        .pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe((val) => {
            this.search(val)
        })
        this.subscriptions.push(searchEvent)
    }

    search(val:any){
        this.keywordEvent.emit(val)
    }
}