import { Entity } from '../../data-access/entity.interface';

export class User implements Entity {
    id: string;
    name: string;
    email: string;
    profilePicUrl: string;
    role: Role;
    votedFor: string[]; // Array of IDs of which the user has given heat

    constructor(user?: Partial<User>) {
        if (!!user) {
            Object.assign(this, user);
        }
    }
}

export type Role = 'Admin' | 'Normal';
