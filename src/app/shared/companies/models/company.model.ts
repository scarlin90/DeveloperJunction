import { Entity } from '../../data-access/entity.interface';

export class Company implements Entity {
    id: string;
    name: string;
    logo: string; // Path to logo
    description: string;
    heat: number; // How popular is company
    created: Date;
    lastModified: Date;

    constructor(company?: Partial<Company>) {
        if (!!company) {
            Object.assign(this, company);
        }
    }
}
