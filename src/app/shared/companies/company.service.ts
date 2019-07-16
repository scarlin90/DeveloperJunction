import { Injectable } from '@angular/core';
import { Company } from './models/company.model';
import { FirebaseEntityService } from '../data-access/firebase/services/firebase-entity.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import * as uuid from 'uuid/v4';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends FirebaseEntityService<Company> {
    constructor(protected afs: AngularFirestore, private readonly storage: AngularFireStorage) {
        super('companies', afs);
    }

    async uploadLogoToStorage(file: File) {
        const uploadSnapshot = await this.storage.upload(`images/companies/${uuid()}-${file.name}`, file);
        return uploadSnapshot.ref.getDownloadURL();
    }
}
