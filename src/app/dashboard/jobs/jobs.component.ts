import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/jobs/job.service';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/jobs/models/job.model';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
    jobs$: Observable<Job[]>;

    constructor(private readonly jobService: JobService) {}

    ngOnInit() {
        // Sort the jobs by heat

        this.jobs$ = this.jobService.listAsync().pipe(
            tap(jobs => {
                jobs.sort((jobA, jobB) => {
                    if (jobA.heat > jobB.heat) {
                        return -1;
                    } else if (jobA.heat < jobB.heat) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                console.log(jobs);
            })
        );
    }
}
