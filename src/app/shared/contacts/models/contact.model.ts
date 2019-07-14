import { Entity } from '../../data-access/entity.interface';

export class Contact implements Entity {
    id: string;
    firstName: string;
    surname: string;
    dob: Date;
    profilePic: string; // Path to image
    tagsToFollow: string[]; // Array of 'tags' the contact wishes to follow
    heat: number; // How recommended is the dev
    description: string; // Area for dev to sell themselves
    created: Date;
    lastModified: Date;

    constructor(contact?: Partial<Contact>) {
        if (!!contact) {
            Object.assign(this, contact);
        }
    }
}
