import { Entity } from '../../data-access/entity.interface';

export class Job implements Entity {
    id: string;
    companyId: string; // Company's ID
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
