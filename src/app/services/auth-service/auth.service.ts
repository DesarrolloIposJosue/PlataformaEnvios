import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged } from '../../classes/UserLogged';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  public userProfile: any;

  public userLogged:UserLogged;

  public validateUser(){

  }

  public setUserLogged(){

  }

  public closeSession(){

  }

  constructor(public router: Router) {
    
  }

  public login(): void {
    this.userLogged.getStatus();
    this.userLogged.setStatus(true);
  }

}
