import { Entity } from '../../data-access/entity.interface';

export class User implements Entity {
    id: string;
    name: string;
    role: Role;

    constructor(user?: Partial<User>) {
        if (!!user) {
            Object.assign(this, user);
        }
    }
}

export type Role = 'Admin' | 'Normal';
