import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyFormModel } from '../models/company-form.model';
import { Company } from 'src/app/shared/companies/models/company.model';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompanyService } from 'src/app/shared/companies/company.service';

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
    @Input() companyFormModel: CompanyFormModel;
    @Output() addCompany: EventEmitter<Company> = new EventEmitter();
    @Output() editCompany: EventEmitter<Company> = new EventEmitter();

    showSuccessMessage: boolean;

    private temporaryLogoFile: File;

    constructor(private readonly companyService: CompanyService) {}

    ngOnInit() {}

    async onAddClick() {
        const company = new Company({
            name: this.companyFormModel.form.get(this.companyFormModel.name.inputKey).value,
            logo: await this.uploadNewLogo(),
            description: this.companyFormModel.form.get(this.companyFormModel.description.inputKey).value,
            created: new Date(),
            lastModified: new Date()
        });

        this.companyFormModel.value = company;
        this.addCompany.emit(company);

        this.showSuccessAlert();

        this.resetForm();
    }

    async onEditClick() {
        const company = new Company({
            id: this.companyFormModel.value.id,
            name: this.companyFormModel.form.get(this.companyFormModel.name.inputKey).value,
            logo: await this.uploadNewLogo(),
            description: this.companyFormModel.form.get(this.companyFormModel.description.inputKey).value,
            created: this.companyFormModel.value.created,
            lastModified: new Date(),
            heat: 0
        });

        this.editCompany.emit(company);

        this.resetForm();
    }

    resetForm() {
        this.companyFormModel.form.reset();
        this.companyFormModel.name.currentError = undefined;
    }

    setTemporaryFile(logoFile: File) {
        this.temporaryLogoFile = logoFile;
    }

    private showSuccessAlert() {
        this.showSuccessMessage = true;
        timer(2000)
            .pipe(take(1))
            .subscribe(() => (this.showSuccessMessage = false));
    }

    private async uploadNewLogo() {
        const logoFile: File = this.temporaryLogoFile;
        if (logoFile) {
            const logoUrl = await this.companyService.uploadLogoToStorage(logoFile);
            return logoUrl;
        }
        return this.companyFormModel.value.logo;
    }
}
