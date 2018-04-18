import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { GuidesService } from '../../services/guides/guides.service';
import { User_PrepaidGuides } from '../../classes/User_PrepaidGuides';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-select-client-edit-guides',
  templateUrl: './select-client-edit-guides.component.html',
  styleUrls: ['./select-client-edit-guides.component.css']
})
export class SelectClientEditGuidesComponent implements OnInit {
  error = '';
  loading: boolean = false;
  loadingGuides: boolean = false;
  private user:any;
  private invalidForm = false;
  private petitionError = false;
  private dataUser:any[] = [];
  private guidesUser:User_PrepaidGuides[] = [];
  private response:any;

  private guidesUserFounded:boolean = false;
  private updateUserGuides:User_PrepaidGuides[] = [];

  constructor(
    private el: ElementRef,
    private router:Router,
    private clientService:ClientService,
    private guideService:GuidesService
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
        console.log('Error al hacer el request');
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
          this.guidesUserFounded = true;
          console.log(this.response[i].id);
          this.guideService.selectPrepaidGuidesFromUser(this.response[i].id).subscribe(
            (successResponse) => {
                console.log(successResponse);
                if(!successResponse){
                  this.loading = false;
                  this.petitionError = true;
                }else{
                  var guides = successResponse;
                  console.log(guides);
                  this.response = successResponse;
                  this.guidesUser = [];
                  for (var i = 0; i < guides.length; i++) {
                    console.log(guides[i].limitedGuidesNumber);
                    console.log(guides[i].parcelId);
                    console.log(guides[i].userId);
                    console.log(this.guidesUser);
                    this.guidesUser.push(
                        new User_PrepaidGuides(guides[i].userId, guides[i].limitedGuidesNumber, guides[i].parcelId)
                    )
                  }
                  console.log(this.guidesUser);
                  this.petitionError = false;
                }
            },
            (errorResponse) => {
              console.log('Error al hacer el request');
              console.log(errorResponse);
              this.loading = false;
              this.petitionError = true;
            }
          );
        }
      }
    }
  }

  updateGuides(forma:NgForm){

    for(var j=0; j<this.guidesUser.length; j++)
    {
      console.log(this.guidesUser[j].parcelId.toString());
      var elementAux = <HTMLInputElement>document.getElementById(this.guidesUser[j].parcelId.toString());
      console.log(Number(elementAux.value));
      this.updateUserGuides.push(new User_PrepaidGuides(this.guidesUser[j].userId, Number(elementAux.value), this.guidesUser[j].parcelId));
    }
    console.log("Entre");
    console.log(this.updateUserGuides);
    this.guideService.updatePrepaidGuides(this.updateUserGuides).subscribe(
      (successResponse) => {
        var checkUser = successResponse;
        console.log(successResponse);
        if (successResponse == "SUCCESS: Prepaid Guides Updated.") {
          console.log("Se actualizo correctamente");
          this.router.navigate(['/home']);
        } else {
            this.loadingGuides = false;
        }
      },
      (errorResponse) => {
        console.log('Error al hacer el request');
        this.loadingGuides = false;
        this.petitionError = true;
      }
    );
  }

}
