import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { Company } from 'src/app/shared/companies/models/company.model';
import { CompanyService } from 'src/app/shared/companies/company.service';

@Component({
    selector: 'app-job-listing',
    templateUrl: './job-listing.component.html',
    styleUrls: ['./job-listing.component.scss']
})
export class JobListingComponent implements OnInit {
    @Input() job: Job;
    @Output() deleteJob: EventEmitter<Job> = new EventEmitter();
    @Output() beginEditing: EventEmitter<Job> = new EventEmitter();

    company: Company;

    constructor(private readonly companyService: CompanyService) {}

    async ngOnInit() {
        this.company = await this.companyService.get(this.job.companyId);
    }

    clickRemoveJob() {
        this.deleteJob.emit(this.job);
    }

    beginEdit() {
        this.beginEditing.emit(this.job);
    }
}
