import { Injectable } from '@angular/core';
import { Company } from './models/company.model';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends FirebaseEntityService<Company> {
    constructor(protected afs: AngularFirestore) {
        super('companies', afs);
    }
}
