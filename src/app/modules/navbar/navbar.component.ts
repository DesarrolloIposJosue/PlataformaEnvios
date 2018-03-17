import { Component, ElementRef, OnInit, EventEmitter } from '@angular/core';
import "materialize-css";
import "angular2-materialize";
import { ClientService } from '../../services/client-service/client.service';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private _actRouter: ActivatedRoute,
    private _router: Router,
    private authorizationService:AuthService,
    private clientService:ClientService
  ) {

  }

  dropDownActions = new EventEmitter<any | MaterializeAction>();
    openDropDown(){
      this.dropDownActions.emit({ action: "dropdown", params: ['show']});
    }

  sideNavActions = new EventEmitter<any | MaterializeAction>();
     openSideNav() {
         this.sideNavActions.emit({ action: "sideNav", params: ['show'] });
     }
     closeSideNav() {
         this.sideNavActions.emit({ action: "sideNav", params: ['hide'] });
     }

  ngOnInit() {
    $(this.el.nativeElement).find('.button-collapse').sideNav();
    $(this.el.nativeElement).find('.dropdown-button').dropdown();
  }

  goHome() {
       this._router.navigate(['/home']);
       this.closeSideNav();
   }

   goQuotation() {
       this._router.navigate(['/quotation']);
       this.closeSideNav();
   }

   goTracking() {
       this._router.navigate(['/tracking']);
       this.closeSideNav();
   }

   goLogIn() {
       this._router.navigate(['/log-in']);
       this.closeSideNav();
   }

   goGoogleMaps(){
     this.closeSideNav();
     this._router.navigate(['/google-maps']);
   }

   logOut(){
     this._router.navigate(['/log-in']);
     this.clientService.logOut();
   }

}
