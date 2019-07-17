import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { Company } from 'src/app/shared/companies/models/company.model';
import { CompanyService } from 'src/app/shared/companies/company.service';
import { UserService } from 'src/app/shared/users/user.service';
import { JobService } from 'src/app/shared/jobs/job.service';
import { User } from 'src/app/shared/users/models/user.model';

@Component({
    selector: 'app-job-card',
    templateUrl: './job-card.component.html',
    styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
    @Input() job: Job;

    company: Company;

    constructor(
        private readonly companyService: CompanyService,
        private readonly jobService: JobService,
        private readonly userService: UserService
    ) {}

    async ngOnInit() {
        this.company = await this.companyService.get(this.job.companyId);
    }

    hasUserVoted() {
        return this.userService.currentUser.votedFor.includes(this.job.id);
    }

    voteUp() {
        if (this.hasUserVoted()) {
            return;
        }
        this.job.heat++;

        this.updateJob();
    }

    voteDown() {
        if (this.hasUserVoted()) {
            return;
        }
        this.job.heat--;

        this.updateJob();
    }

    private updateJob() {
        this.jobService.update(this.job);

        const user = new User(this.userService.currentUser);
        user.votedFor.push(this.job.id);
        this.userService.update(user);
    }
}
