import { Injectable } from '@angular/core';
import { Contact } from './models/contact.model';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends FirebaseEntityService<Contact> {
    constructor(protected afs: AngularFirestore) {
        super('contacts', afs);
    }
}
