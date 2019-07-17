import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesManagementComponent } from './companies-management/companies-management.component';
import { ManagementCardComponent } from './management-card/management-card.component';
import { AddCompanyComponent } from './companies-management/add-company/add-company.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CompanyListingComponent } from './companies-management/company-listing/company-listing.component';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { AddJobComponent } from './jobs-management/add-job/add-job.component';
import { JobListingComponent } from './jobs-management/job-listing/job-listing.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent
    }
];

@NgModule({
    declarations: [
        AdminComponent,
        CompaniesManagementComponent,
        ManagementCardComponent,
        AddCompanyComponent,
        CompanyListingComponent,
        JobsManagementComponent,
        AddJobComponent,
        JobListingComponent
    ],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, ComponentsModule]
})
export class AdminModule {}
