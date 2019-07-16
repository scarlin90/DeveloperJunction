import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../shared/users/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private readonly userService: UserService,
        private router: Router
    ) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isLoggedIn) {
            this.userService.currentUser = await this.userService.get(this.authenticationService.user.uid);
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}
