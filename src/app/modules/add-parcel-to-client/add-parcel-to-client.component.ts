import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Product } from '../../classes/Product';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { User_Parcel } from '../../classes/UserParcel';
import { User_Product } from '../../classes/UserProduct';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-parcel-to-client',
  templateUrl: './add-parcel-to-client.component.html',
  styleUrls: ['./add-parcel-to-client.component.css']
})

export class AddParcelToClientComponent implements OnInit {
  public loading:boolean = false;

  public redPackForm:boolean = false;
  public fedExForm:boolean = false;
  public dhlForm:boolean = false;
  public estafetaForm:boolean = false;
  private petitionError = false;
  private response:any;
  public productsEstafeta:Product[] = [];

  public errorParcelData:boolean = false;
  public errorAddParcelsToClient:boolean = false;

  constructor(
    private parcelService:ParcelService,
    private router:Router
  ) {
  }

  assignParcel(forma:NgForm){

    var parcInfo:User_Parcel[] = [];
    var parcInfoInd:User_Parcel = new User_Parcel;
    var prodUserInfo:User_Product[] = [];

    if(this.redPackForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordRedPack"].value == "" || forma.controls["usernameRedPack"].value == ""){
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 2;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameRedPack"].value;
        parcInfoInd.password = forma.controls["passwordRedPack"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.fedExForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordFedEx"].value == "" || forma.controls["usernameFedEx"].value == ""){
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 3;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameFedEx"].value;
        parcInfoInd.password = forma.controls["passwordFedEx"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.dhlForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordDHL"].value == "" || forma.controls["usernameDHL"].value == ""){
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 1;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameDHL"].value;
        parcInfoInd.password = forma.controls["passwordDHL"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.estafetaForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordEstafeta"].value == "" || forma.controls["usernameEstafeta"].value == ""){
        this.errorParcelData = true;
      }else{
        console.log("Entre");
        parcInfoInd.parcelId = 4;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameEstafeta"].value;
        parcInfoInd.password = forma.controls["passwordEstafeta"].value;
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productsEstafeta.length; j++)
        {

          var elementAux = <HTMLInputElement>document.getElementById(this.productsEstafeta[j].id.toString());
          prodUserInfo.push(new User_Product(0, this.productsEstafeta[j].id, Number(elementAux.value)));

        }
      }
    }

    if(!this.errorParcelData){
      //Entra a enviar
      this.loading = true;
      this.parcelService.addParcelToClient(parcInfo).subscribe(jsonData => {
            var checkUser = jsonData;
            if (jsonData == "SUCCESS: Parcels assigned to User") {
              this.parcelService.addProductsToClient(prodUserInfo).subscribe(jsonData2 => {
                console.log("Response from assign prods: " + jsonData2);
                if(jsonData2 == "SUCCESS: Products assigned to User")
                {
                   this.router.navigate(['/home']);
                }

              });
            } else {
                this.loading = false;
                this.errorAddParcelsToClient = true;
            }
        });
    }else{
      console.log("No puede guardar");
    }

  }

  checkRedPack(){
    var element = <HTMLInputElement>document.getElementById("test5");
    element = <HTMLInputElement>document.getElementById("test5");
    if(element.checked == true){
      this.redPackForm = true;
    }else{
      this.redPackForm = false;
    }
  }

  checkFedEx(){
    var element = <HTMLInputElement>document.getElementById("test7");
    element = <HTMLInputElement>document.getElementById("test7");
    if(element.checked == true){
      this.fedExForm = true;
    }else{
      this.fedExForm = false;
    }
  }

  checkDHL(){
    var element = <HTMLInputElement>document.getElementById("test6");
    element = <HTMLInputElement>document.getElementById("test6");
    if(element.checked == true){
      this.dhlForm = true;
    }else{
        this.dhlForm = false;
    }
  }

  checkEstafeta(){
    var element = <HTMLInputElement>document.getElementById("test8");
    element = <HTMLInputElement>document.getElementById("test8");
    if(element.checked == true){
      this.estafetaForm = true;
      let parcelId:number = 4;
      this.parcelService.getProductsByParcel(parcelId).subscribe(
        (successResponse) => {
          console.log("Success");
          console.log(successResponse);
            if(!successResponse){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = successResponse;
              this.response = successResponse;
              this.productsEstafeta = [];
              for (var i = 0; i < productArray.length; i++) {
                this.productsEstafeta.push(
                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                          productArray[i].kg, productArray[i].factor)
                );
              }
              this.petitionError = false;
            }
        }
      );
      this.errorParcelData = false;
    }else{
      this.estafetaForm = false;
    }
  }


  ngOnInit() {
  }

}
