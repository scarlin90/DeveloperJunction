import { InputModel } from 'src/app/shared/components/input/models/input.model';
import { FormGroup } from '@angular/forms';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { Company } from 'src/app/shared/companies/models/company.model';
import { Observable } from 'rxjs';

export class JobsManagementViewModel {
    title: InputModel;
    type: InputModel;
    description: InputModel;
    hours: InputModel;
    salary: InputModel;
    startDate: InputModel;
    tags: InputModel;
    company: InputModel;

    isEditing: boolean;
    companies$: Observable<Company[]>;

    form: FormGroup;
    value: Job;

    constructor(viewModel?: Partial<JobsManagementViewModel>) {
        if (!!viewModel) {
            Object.assign(this, viewModel);
        }
    }
}
