import { Injectable } from '@angular/core';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { Job } from './models/job.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class JobService extends FirebaseEntityService<Job> {
    constructor(protected afs: AngularFirestore) {
        super('jobs', afs);
    }
}
