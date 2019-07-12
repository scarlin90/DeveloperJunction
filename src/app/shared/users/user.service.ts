import { Injectable } from '@angular/core';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { User } from './models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService extends FirebaseEntityService<User> {
    constructor(protected afs: AngularFirestore) {
        super('users', afs);
    }
}
