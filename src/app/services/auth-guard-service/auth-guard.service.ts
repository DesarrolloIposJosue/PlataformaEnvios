import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor( private auth:AuthService ) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    console.log(next);
    if(this.auth.isAuthenticated()){
      console.log("Entro el guard");
      return true;
    }else{
      console.error("Usuario no autentificado");
      return false;
    }
  }

}
