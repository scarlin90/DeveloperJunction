import { Injectable } from '@angular/core';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { User } from './models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService extends FirebaseEntityService<User> {
    // tslint:disable-next-line:variable-name
    private _currentUser: User;

    constructor(protected afs: AngularFirestore) {
        super('users', afs);
    }

    get currentUser() {
        return this._currentUser;
    }

    set currentUser(user: User) {
        this._currentUser = user;
    }
}
