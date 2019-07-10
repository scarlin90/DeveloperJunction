import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { timer, of } from 'rxjs';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(public angularFireAuth: AngularFireAuth, public router: Router, private zone: NgZone) {}

    createLoginUi(element: string, firebaseUiConfig: firebaseui.auth.Config, authUi: firebaseui.auth.AuthUI) {
        firebase.auth().onAuthStateChanged(async () => {
            try {
                await timer(1000).toPromise();
                // No user signed in, render sign-in UI.
                authUi.start(element, firebaseUiConfig);
            } catch (error) {
                // reset ui so it can re-render on log out
                authUi.reset();
            }
        });
    }

    async login(userDetails) {
        localStorage.setItem('user', JSON.stringify(userDetails));
        this.zone.run(() => {
            this.router.navigate(['dashboard']);
        });
    }

    async logout() {
        try {
            await this.angularFireAuth.auth.signOut();
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        } catch (error) {
            console.error('Failed to log out', error);
        }
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user === null ? false : true;
    }

    get user(): User {
        return JSON.parse(localStorage.getItem('user'));
    }
}
