import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-select-client-edit-parcel',
  templateUrl: './select-client-edit-parcel.component.html',
  styleUrls: ['./select-client-edit-parcel.component.css']
})
export class SelectClientEditParcelComponent implements OnInit {
  error = '';
  loading: boolean = false;
  private user:any;
  private invalidForm = false;
  private petitionError = false;
  private dataUser:any[] = [];
  private response:any;

  constructor(
    private el: ElementRef,
    private router:Router,
    private clientService:ClientService,
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.clientService.getUsersByUserID().subscribe(
      (successResponse) => {
          if(!successResponse){
            this.loading = false;
            this.petitionError = true;
          }else{
            var userArray = successResponse;
            this.response = successResponse;
            this.dataUser = [];
            for (var i = 0; i < userArray.length; i++) {
              //console.log(countryArray[i].name);
              this.dataUser[userArray[i].name + " " + userArray[i].lastName] = null; //countryArray[i].flag or null
            }
            this.petitionError = false;
            $(this.el.nativeElement).find('input.autocomplete').autocomplete({
              data: this.dataUser,
              limit: 5
            });

          }
      },
      (errorResponse) => {
        this.loading = false;
        this.petitionError = true;
      }
    );
  }

  selectClient(forma:NgForm){
    var element = <HTMLInputElement>document.getElementById("userData");
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      this.loading = true;

      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(element.value == userNameLastName){
          sessionStorage.setItem('NewUserName', this.response[i].userName);
          sessionStorage.setItem('NewUserId', this.response[i].id);
          this.productService.operation = 1;
          this.router.navigate(['/add-parcel-to-client']);
        }
      }
    }
  }
}
