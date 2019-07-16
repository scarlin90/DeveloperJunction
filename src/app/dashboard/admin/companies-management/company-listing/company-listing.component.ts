import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/shared/companies/models/company.model';

@Component({
    selector: 'app-company-listing',
    templateUrl: './company-listing.component.html',
    styleUrls: ['./company-listing.component.scss']
})
export class CompanyListingComponent implements OnInit {
    @Input() company: Company;
    @Output() deleteCompany: EventEmitter<Company> = new EventEmitter();
    @Output() beginEditing: EventEmitter<Company> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    clickRemoveCompany() {
        this.deleteCompany.emit(this.company);
    }

    beginEdit() {
        this.beginEditing.emit(this.company);
    }
}
