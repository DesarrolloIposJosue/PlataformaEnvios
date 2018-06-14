import { Component, ElementRef, OnInit, EventEmitter } from '@angular/core';
import "materialize-css";
import "angular2-materialize";
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { GuidesService } from '../../services/guides/guides.service';
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
    private productService:ProductService,
    private guideService:GuidesService
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

  }

  goHome() {
        this.guideService.selectedGuide = null;
        this.guideService.selectedGuides = [];
        this.guideService.selectedMultiguides = [];
       this._router.navigate(['/home']);
       this.closeSideNav();
   }

   goQuotation() {
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
       this._router.navigate(['/quotation']);
       this.closeSideNav();
       this.closeSideNav();
   }

   goLogIn() {
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
       this._router.navigate(['/log-in']);
       this.closeSideNav();
   }

   goGoogleMaps(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/google-maps']);
   }

   goAddClient(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this.clientService.operation = 0;
     this._router.navigate(['/add-client']);
   }

   goAddParcelClient(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/select-client-to-edit-parcel']);
   }

   goEditClient(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/select-client-to-edit']);
   }

   goAddProduct(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this.productService.operation = 0;
     this._router.navigate(['/add-product']);
   }

   goEditProduct(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/select-product-to-edit']);
   }

   goAddGuides(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/select-client-to-edit-guides']);
   }

   goReports(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/reports']);
   }

   goTracking(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this.closeSideNav();
     this._router.navigate(['/tracking']);
   }

   logOut(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this._router.navigate(['/log-in']);
     this.clientService.logOut();
   }

   goDefineGuidesRedPack(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this._router.navigate(['/define-guides-redpack']);
   }

   goGuides(){
     this.guideService.selectedGuide = null;
     this.guideService.selectedGuides = [];
     this.guideService.selectedMultiguides = [];
     this._router.navigate(['/guides']);
   }

}
