import { Entity } from '../../data-access/entity.interface';
import { Company } from '../../companies/models/company.model';

export class Job implements Entity {
    id: string;
    companyId: string; // Company's ID
    company?: Company; // Allow a reference to full company object to be added to the entity
    title: string;
    type: JobType;
    description: string;
    hours: string;
    salary: number;
    startDate: Date;
    heat: number; // How popular is the Job
    tags: string[];
    created: Date;
    lastModified: Date;

    constructor(job?: Partial<Job>) {
        if (!!job) {
            Object.assign(this, job);
        }
    }
}

export type JobType = 'Full Time' | 'Part Time' | 'Temporary';
