import { InputModel } from 'src/app/shared/components/input/models/input.model';
import { FormGroup } from '@angular/forms';
import { Company } from 'src/app/shared/companies/models/company.model';

export class CompanyFormModel {
    name: InputModel;
    logo: InputModel;
    description: InputModel;
    form: FormGroup;
    value: Company;
    isEditing: boolean;

    constructor(companyForm?: Partial<CompanyFormModel>) {
        if (!!companyForm) {
            Object.assign(this, companyForm);
        }
    }
}
