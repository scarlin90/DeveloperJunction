import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthenticationService, private afAuth: AngularFireAuth) {}

    ngOnInit() {
        const authUi = new firebaseui.auth.AuthUI(this.afAuth.auth);
        const uiConfig: firebaseui.auth.Config = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
            }
        };

        this.authService.createLoginUi('#firebaseui-auth-container', uiConfig, authUi);
    }

    onLoginSuccessful(authResult) {
        this.authService.login(authResult.user);
    }
}
