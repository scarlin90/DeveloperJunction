import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../shared/users/user.service';
import { User } from '../shared/users/models/user.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: any;

    constructor(
        private readonly userService: UserService,
        private readonly authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.user = this.userService.currentUser;
    }

    logout() {
        this.authenticationService.logout();
    }
}
