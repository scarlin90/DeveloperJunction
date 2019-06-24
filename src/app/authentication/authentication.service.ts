import { Injectable, OnDestroy } from "@angular/core";

import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService implements OnDestroy{
  public user: User;

  private authStateSubscription: Subscription;

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
    this.authStateSubscription = this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  async login(email: string, password: string) {
    try {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(["dashboard"]);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout() {
    await this.angularFireAuth.auth.signOut();
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }
}
