import { Component, ElementRef, OnInit, EventEmitter } from '@angular/core';
import "materialize-css";
import "angular2-materialize";
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { ActivatedRoute, Router } from '@angular/router';

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
    private _router: Router
  ) {

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
  }

  goHome() {
       this._router.navigate(['/home']);
   }

   goQuotation() {
       this._router.navigate(['/quotation']);
   }

   goTracking() {
       this._router.navigate(['/tracking']);
   }

   goLogIn() {
       this._router.navigate(['/log-in']);
   }

   goGoogleMaps(){
     this._router.navigate(['/google-maps']);
   }

}
