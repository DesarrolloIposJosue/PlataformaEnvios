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
  private otherGuides:User_PrepaidGuides[] = [];
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
                if(!successResponse){
                  this.loading = false;
                  this.petitionError = true;
                }else{
                  var guides = successResponse;
                  this.response = successResponse;
                  this.guidesUser = [];
                  for (var i = 0; i < guides.length; i++) {
                    this.guidesUser.push(
                        new User_PrepaidGuides(guides[i].userId, guides[i].limitedGuidesNumber, guides[i].parcelId)
                    )
                  }
                  /*let checkParcelId:boolean = false;
                  let userId:number = 0;
                  let parcelIdActual:number = 0;
                  for (var i = 1; i < 5; i++){
                    for(var j = 0; j < guides.length; j++){
                      if(i == this.guidesUser[j].parcelId){
                        checkParcelId = false;
                      }else{
                        checkParcelId = true;
                        userId = this.guidesUser[j].parcelId;
                        parcelIdActual = i;
                      }
                    }
                    if(checkParcelId){
                      this.otherGuides.push(
                        new User_PrepaidGuides(userId, 0, parcelIdActual)
                      )
                    }
                  }
                  for(var i = 0; i< this.guidesUser.length; i++){
                    for(var j=0; j < this.otherGuides.length; j++){
                      if(this.guidesUser[i].parcelId == this.otherGuides[j].parcelId){
                        let parcelIdToSearch:number = this.guidesUser[i].parcelId;
                        var index = this.otherGuides.indexOf(this.otherGuides[j]);
                        if (index > -1) {
                          this.otherGuides.splice(index, 1);
                        }
                      }
                    }
                  }*/
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
      var elementAux = <HTMLInputElement>document.getElementById(this.guidesUser[j].parcelId.toString());
      this.updateUserGuides.push(new User_PrepaidGuides(this.guidesUser[j].userId, Number(elementAux.value), this.guidesUser[j].parcelId));
    }
    this.guideService.updatePrepaidGuides(this.updateUserGuides).subscribe(
      (successResponse) => {
        var checkUser = successResponse;
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
