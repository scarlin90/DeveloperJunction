import { Entity } from '../../data-access/entity.interface';

export class Job implements Entity {
    id: string;
    companyId: string; // Company's ID
    title: string;
    type: JobType;
    description: string;
    hours: number;
    salary: number;
    startDate: Date;
    heat: number; // How popular is the Job
    created: Date;
    lastModified: Date;

    constructor(job?: Partial<Job>) {
        if (!!job) {
            Object.assign(this, job);
        }
    }
}

export type JobType = 'Full Time' | 'Part Time' | 'Temporary';
