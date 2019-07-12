import { Injectable } from '@angular/core';
import { EntityService } from '../../entity.service.interface';
import { Entity } from '../../entity.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export abstract class FirebaseEntityService<T extends Entity> extends EntityService<T> {
    protected collection: AngularFirestoreCollection<T>;
    protected afs: AngularFirestore;

    constructor(name: string, afs: AngularFirestore) {
        super(name);
        this.afs = afs;
        this.collection = this.afs.collection(name);
    }

    get(id: string): Promise<T> {
        return this.collection
            .doc<T>(id)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data();
                        const payloadId = doc.payload.id;
                        return { id: payloadId, ...data };
                    }
                }),
                take(1)
            )
            .toPromise();
    }

    getAsync(id: string): Observable<T> {
        return this.collection
            .doc<T>(id)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data();
                        const payloadId = doc.payload.id;
                        return { id: payloadId, ...data };
                    }
                })
            );
    }

    list(): Promise<T[]> {
        return this.collection
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as T;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                }),
                take(1)
            )
            .toPromise();
    }

    listAsync(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as T;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    /**
     * Add a new entity to the collection
     * @param entity Entity to add
     * @param id Optional - Use ID to add a specific entity with ID
     */
    add(entity: T, id?: string): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            if (!!id) {
                this.collection
                    .doc(id)
                    .set(firebaseSerialize(entity))
                    .then(ref => {
                        resolve(entity);
                    });
            } else {
                this.collection.add(firebaseSerialize(entity)).then(ref => {
                    const newentity = {
                        id: ref.id,
                        ...entity
                    };
                    resolve(newentity);
                });
            }
        });
        return promise;
    }

    update(updatedEntity: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            const docRef = this.collection
                .doc<T>(updatedEntity.id as string)
                .set(firebaseSerialize(updatedEntity))
                .then(() => {
                    resolve({
                        ...updatedEntity
                    });
                });
        });
        return promise;
    }

    delete(id: string): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            const docRef = this.collection.doc<T>(id);
            docRef.delete().then(() => {
                resolve();
            });
        });
        return promise;
    }
}

export function firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
}
