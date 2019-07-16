import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsManagementViewModel } from './models/jobs-management.view-model';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { Observable } from 'rxjs/internal/Observable';
import { ManagementCardComponent } from '../management-card/management-card.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JobService } from 'src/app/shared/jobs/job.service';
import { InputModel } from 'src/app/shared/components/input/models/input.model';
import { CompanyService } from 'src/app/shared/companies/company.service';
import { ManagementTabState } from '../models/management.tabstate';

@Component({
    selector: 'app-jobs-management',
    templateUrl: './jobs-management.component.html',
    styleUrls: ['./jobs-management.component.scss']
})
export class JobsManagementComponent implements OnInit {
    @ViewChild(ManagementCardComponent) managementCardComponent: ManagementCardComponent;

    jobViewModel: JobsManagementViewModel;

    jobs$: Observable<Job[]>;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly jobService: JobService,
        private readonly companyService: CompanyService
    ) {}

    ngOnInit() {
        this.setupJobViewModel();

        this.jobs$ = this.jobService.listAsync();
        this.jobViewModel.companies$ = this.companyService.listAsync();
    }

    onAddJob(job: Job) {
        this.jobService.add(job);
    }

    onDeleteJob(job: Job) {
        this.jobService.delete(job.id);
    }

    onEditJob(job: Job) {
        this.jobService.update(job);
        this.jobViewModel.isEditing = false;
        this.jobViewModel.value = undefined;

        this.managementCardComponent.switchTab(ManagementTabState.List);
    }

    onBeginEditingJob(job: Job) {
        this.jobViewModel.value = job;
        this.jobViewModel.form.setValue({
            [this.jobViewModel.title.inputKey]: job.title,
            [this.jobViewModel.company.inputKey]: job.companyId,
            [this.jobViewModel.type.inputKey]: job.type,
            [this.jobViewModel.salary.inputKey]: job.salary,
            [this.jobViewModel.description.inputKey]: job.description,
            [this.jobViewModel.startDate.inputKey]: job.startDate,
            [this.jobViewModel.hours.inputKey]: job.hours,
            [this.jobViewModel.tags.inputKey]: job.tags
                .reverse()
                .reduce((tagString, tag) => (tagString = tag + ',' + tagString))
        });
        this.jobViewModel.isEditing = true;

        this.managementCardComponent.switchTab(ManagementTabState.Edit);
    }

    private setupJobViewModel() {
        this.jobViewModel = new JobsManagementViewModel({
            title: new InputModel({
                label: 'Job Title',
                inputKey: 'title',
                validationErrors: new Map([['required', 'The job must have a title!']])
            }),
            description: new InputModel({
                label: 'Job Description',
                inputKey: 'description',
                validationErrors: new Map([['required', 'The job must have a description!']])
            }),
            salary: new InputModel({
                label: 'Salary',
                inputKey: 'salary',
                validationErrors: new Map([['required', 'The job must pay the employee!']])
            }),
            hours: new InputModel({
                label: 'Working Hours',
                inputKey: 'hours',
                validationErrors: new Map([['required', 'The employee needs to know when they have to work']])
            }),
            startDate: new InputModel({
                label: 'Start Date',
                inputKey: 'startDate',
                validationErrors: new Map([['required', 'When will the employee start their job?']])
            }),
            company: new InputModel({
                label: 'Company',
                inputKey: 'company',
                validationErrors: new Map([['required', 'The job must be associated with a company!']])
            }),
            type: new InputModel({
                label: 'Job Type',
                inputKey: 'type',
                validationErrors: new Map([['required', 'Is the job full time, part time or temporary?']])
            }),
            tags: new InputModel({
                label: 'Tags (comma separated)',
                inputKey: 'tags'
            })
        });

        this.jobViewModel.form = this.formBuilder.group({
            [this.jobViewModel.title.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.description.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.salary.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.hours.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.startDate.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.company.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.type.inputKey]: new FormControl('', Validators.required),
            [this.jobViewModel.tags.inputKey]: new FormControl('')
        });

        this.jobViewModel.title.form = this.jobViewModel.form;
        this.jobViewModel.description.form = this.jobViewModel.form;
        this.jobViewModel.salary.form = this.jobViewModel.form;
        this.jobViewModel.hours.form = this.jobViewModel.form;
        this.jobViewModel.startDate.form = this.jobViewModel.form;
        this.jobViewModel.company.form = this.jobViewModel.form;
        this.jobViewModel.type.form = this.jobViewModel.form;
        this.jobViewModel.tags.form = this.jobViewModel.form;
    }
}
