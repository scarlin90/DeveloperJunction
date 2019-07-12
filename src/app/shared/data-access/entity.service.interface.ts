import { Entity } from './entity.interface';
import { Observable } from 'rxjs';

export interface IEntityService<T extends Entity> {
    get(id: string): Promise<T>;
    getAsync(id: string): Observable<T>;
    add(entity: T, id?: string): Promise<T>;
    update(updatedEntity: T): Promise<T>;
    delete(id: string): Promise<void>;
}

export abstract class EntityService<T extends Entity> implements IEntityService<T> {
    private storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName;
    }

    abstract get(id: string): Promise<T>;
    abstract getAsync(id: string): Observable<T>;
    abstract list(): Promise<T[]>;
    abstract listAsync(): Observable<T[]>;
    abstract add(entity: T, id?: string): Promise<T>;
    abstract update(updatedEntity: T): Promise<T>;
    abstract delete(id: string): Promise<void>;
}
