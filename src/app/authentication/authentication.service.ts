import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { timer, of } from 'rxjs';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { User as FirebaseUser } from 'firebase';
import { UserService } from '../shared/users/user.service';
import { User } from '../shared/users/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        public angularFireAuth: AngularFireAuth,
        public router: Router,
        private zone: NgZone,
        private readonly userService: UserService
    ) {}

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

    async login(userDetails: FirebaseUser) {
        localStorage.setItem('user', JSON.stringify(userDetails));
        await this.fetchOrCreateUser(userDetails);
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
        const user = JSON.parse(localStorage.getItem('user')) as FirebaseUser;
        return user === null ? false : true;
    }

    get user(): FirebaseUser {
        return JSON.parse(localStorage.getItem('user'));
    }

    private async fetchOrCreateUser(loggedInUser: FirebaseUser) {
        let user = await this.userService.get(loggedInUser.uid);
        if (!user) {
            user = await this.userService.add(
                new User({
                    id: loggedInUser.uid,
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    profilePicUrl: loggedInUser.photoURL,
                    role: 'Normal',
                    votedFor: []
                }),
                loggedInUser.uid
            );
        }

        this.userService.currentUser = user;
    }
}
