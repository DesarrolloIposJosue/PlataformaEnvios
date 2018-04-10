import { Component, ElementRef, OnInit, EventEmitter } from '@angular/core';
import "materialize-css";
import "angular2-materialize";
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit {
  private typeUser:string;

  constructor(
    private el: ElementRef,
    private _actRouter: ActivatedRoute,
    private _router: Router,
    private clientService:ClientService,
    private productService:ProductService
  ) {
      this.typeUser = sessionStorage.getItem('Type');
  }

  private userLogged:boolean = false;

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
    $('.dropdown-trigger').dropdown({
      hover: false
    });
  }

  goHome() {
       this._router.navigate(['/home']);
       this.closeSideNav();
   }

   goQuotation() {
       this._router.navigate(['/quotation']);
       this.closeSideNav();
       this.closeSideNav();
   }

   goTracking() {
       this._router.navigate(['/tracking']);
       this.closeSideNav();
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

   goAddClient(){
     this.closeSideNav();
     this.clientService.operation = 0;
     this._router.navigate(['/add-client']);
   }

   goAddParcelClient(){
     this.closeSideNav();
     this._router.navigate(['/select-client-to-edit-parcel']);
   }

   goEditClient(){
     this.closeSideNav();
     this._router.navigate(['/select-client-to-edit']);
   }

   goAddProduct(){
     this.closeSideNav();
     this.productService.operation = 0;
     this._router.navigate(['/add-product']);
   }

   goEditProduct(){
     this.closeSideNav();
     this._router.navigate(['/select-product-to-edit']);
   }

   logOut(){
     this._router.navigate(['/log-in']);
     this.clientService.logOut();
   }

}
