import { Component, OnInit } from  '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
selector:  'app-login',
templateUrl:  './login.component.html',
styleUrls: ['./login.component.scss']
})
export  class  LoginComponent  implements  OnInit {
    constructor(private authService:  AuthenticationService) { }
    ngOnInit() {}

    async login(email, password) {
      await this.authService.login(email, password);
    }
}
