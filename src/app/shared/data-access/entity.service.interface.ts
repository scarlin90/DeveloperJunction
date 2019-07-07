import { Entity } from './entity.interface';
import { Observable } from 'rxjs';

export interface IEntityService<T extends Entity> {
    get(id: string): T;
    getAsync(id: string): Observable<T>;
    add(entity: T): Promise<void>;
    update(updatedEntity: T): Promise<void>;
    delete(id: string): Promise<void>;
}

export abstract class EntityService<T extends Entity> implements IEntityService<T> {
    private storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName;
    }

    abstract get(id: string): Promise<T>;
    abstract getAsync(id: string): Observable<T>;
    abstract add(entity: T): Promise<void>;
    abstract update(updatedEntity: T): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
