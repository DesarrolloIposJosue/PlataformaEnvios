import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { ClientService } from '../client-service/client.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor( private clientService:ClientService ) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    console.log(next);
    if(this.clientService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }
}
