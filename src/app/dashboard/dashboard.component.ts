import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  user: firebase.User;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
