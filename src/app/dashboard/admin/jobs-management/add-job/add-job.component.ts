import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobsManagementViewModel } from '../models/jobs-management.view-model';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { Company } from 'src/app/shared/companies/models/company.model';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    @Input() jobViewModel: JobsManagementViewModel;
    @Output() addJob: EventEmitter<Job> = new EventEmitter();
    @Output() editJob: EventEmitter<Job> = new EventEmitter();

    showSuccessMessage: boolean;

    constructor() {}

    ngOnInit() {}

    async onAddClick() {
        const newJob = this.getNewJobFromForm();
        this.jobViewModel.value = newJob;

        this.addJob.emit(newJob);

        this.showSuccessAlert();

        this.resetForm();
    }

    async onEditClick() {
        const updatedJob = this.getNewJobFromForm();
        updatedJob.id = this.jobViewModel.value.id;

        this.editJob.emit(updatedJob);
        this.resetForm();
    }

    resetForm() {
        this.jobViewModel.form.reset();
        this.jobViewModel.company.currentError = undefined;
        this.jobViewModel.title.currentError = undefined;
        this.jobViewModel.type.currentError = undefined;
        this.jobViewModel.salary.currentError = undefined;
        this.jobViewModel.description.currentError = undefined;
        this.jobViewModel.startDate.currentError = undefined;
        this.jobViewModel.hours.currentError = undefined;
    }

    private showSuccessAlert() {
        this.showSuccessMessage = true;
        timer(2000)
            .pipe(take(1))
            .subscribe(() => (this.showSuccessMessage = false));
    }

    private getNewJobFromForm() {
        return new Job({
            companyId: this.jobViewModel.form.get(this.jobViewModel.company.inputKey).value,
            title: this.jobViewModel.form.get(this.jobViewModel.title.inputKey).value,
            type: this.jobViewModel.form.get(this.jobViewModel.type.inputKey).value,
            salary: this.jobViewModel.form.get(this.jobViewModel.salary.inputKey).value,
            description: this.jobViewModel.form.get(this.jobViewModel.description.inputKey).value,
            startDate: this.jobViewModel.form.get(this.jobViewModel.startDate.inputKey).value,
            hours: this.jobViewModel.form.get(this.jobViewModel.hours.inputKey).value,
            tags: (this.jobViewModel.form.get(this.jobViewModel.tags.inputKey).value as string).split(','),
            created: new Date(),
            lastModified: new Date(),
            heat: 0
        });
    }
}
