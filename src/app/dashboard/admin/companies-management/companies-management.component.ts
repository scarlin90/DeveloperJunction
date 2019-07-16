import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyFormModel } from './models/company-form.model';
import { InputModel } from 'src/app/shared/components/input/models/input.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/shared/companies/company.service';
import { Company } from 'src/app/shared/companies/models/company.model';
import { Observable } from 'rxjs';
import { ManagementCardComponent } from '../management-card/management-card.component';
import { ManagementTabState } from '../models/management.tabstate';

@Component({
    selector: 'app-companies-management',
    templateUrl: './companies-management.component.html',
    styleUrls: ['./companies-management.component.scss']
})
export class CompaniesManagementComponent implements OnInit {
    @ViewChild(ManagementCardComponent) managementCardComponent: ManagementCardComponent;
    companyFormModel: CompanyFormModel;

    companies$: Observable<Company[]>;

    constructor(private readonly formBuilder: FormBuilder, private readonly companyService: CompanyService) {}

    ngOnInit() {
        this.setupCompanyFormModel();
        this.companies$ = this.companyService.listAsync();
    }

    onAddCompany(company: Company) {
        this.companyService.add(company);
        this.companyFormModel.value.logo = undefined;
    }

    onDeleteCompany(company: Company) {
        this.companyService.delete(company.id);
    }

    onEditCompany(company: Company) {
        this.companyService.update(company);
        this.companyFormModel.isEditing = false;
        this.companyFormModel.value = undefined;

        this.managementCardComponent.switchTab(ManagementTabState.List);
    }

    onBeginEditingCompany(company: Company) {
        this.companyFormModel.value = company;
        this.companyFormModel.form.get(this.companyFormModel.name.inputKey).setValue(company.name);
        this.companyFormModel.form.get(this.companyFormModel.description.inputKey).setValue(company.description);
        this.companyFormModel.isEditing = true;

        this.managementCardComponent.switchTab(ManagementTabState.Edit);
    }

    private setupCompanyFormModel() {
        this.companyFormModel = new CompanyFormModel({
            name: new InputModel({
                label: 'Company Name:',
                inputKey: 'name',
                validationErrors: new Map([['required', 'Company must have a name']])
            }),
            logo: new InputModel({
                label: 'Logo',
                inputKey: 'logo'
            }),
            description: new InputModel({
                label: 'Description',
                inputKey: 'description'
            })
        });

        this.companyFormModel.form = this.formBuilder.group({
            [this.companyFormModel.name.inputKey]: new FormControl('', Validators.required),
            [this.companyFormModel.logo.inputKey]: new FormControl(''),
            [this.companyFormModel.description.inputKey]: new FormControl('')
        });

        this.companyFormModel.name.form = this.companyFormModel.form;
        this.companyFormModel.logo.form = this.companyFormModel.form;
        this.companyFormModel.description.form = this.companyFormModel.form;
    }
}
