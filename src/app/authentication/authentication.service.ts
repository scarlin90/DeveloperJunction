import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { timer } from "rxjs";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase";
import { User } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public user: User;

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {}

  createLoginUi(
    element: string,
    firebaseUiConfig: firebaseui.auth.Config,
    authUi: firebaseui.auth.AuthUI
  ) {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        // reset ui so it can re-render on log out
        authUi.reset();
      } else {
        await timer(1000).toPromise();
        // No user signed in, render sign-in UI.
        authUi.start(element, firebaseUiConfig);
      }
    });
  }

  async login(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(["dashboard"]);
  }

  async logout() {
    try {
      await this.angularFireAuth.auth.signOut();
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user === null ? false : true;
  }
}
