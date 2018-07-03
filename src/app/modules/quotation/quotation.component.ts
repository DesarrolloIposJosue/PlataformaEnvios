import { Component, OnInit, ElementRef, Output, EventEmitter  } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { NgForm } from '@angular/forms';
import { Package } from '../../classes/Package';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { RateService } from '../../services/rate-service/rate.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { Rate } from '../../classes/Rate';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from '../../classes/Client';
import { Multipieces } from '../../classes/Multipieces';
import { MultipiecesForm } from '../../classes/MultipiecesForm';
import { ProductService } from '../../services/product-service/product.service';
import { ClientService } from '../../services/client-service/client.service';

import { DownloadGuideService } from '../../services/download-guide-service/download-guide.service';
import { QuotationService } from '../../services/quotation-service/quotation.service';

import { ResponseCP } from '../../classes/ResponseCP';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  profile: any;
  loading:boolean;
  private invalidForm:boolean = false;
  private petitionError = false;
  private dataProducts:Rate[] = [];
  private response:any;
  private invalidNumber:boolean = false;
  private invalidPC:boolean = false;
  private seguro:boolean = false;

  private multiPackActive:boolean = false; //To know if in the form active the multipack
  private packs:Multipieces[] = []
  private objectCreateMultipieces:MultipiecesForm[] = [];
  private userMultiPack:boolean = false; //To know if the user is multipack
  private responseCP:ResponseCP = new ResponseCP();

  private noCP:boolean = false;
  private dataUser:any[] = [];
  private userArray:any[] = [];
  private loaded:boolean = false;
  private selectedClientInfo:User;

  private noLoad:boolean = false;
  private thirdAccount:string = "";
  private printType:string;

  private extArea:number = 0;

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private rateService: RateService,
    private router: Router,
    private createGuideService:CreateGuideService,
    private download:DownloadGuideService,
    private productService: ProductService,
    private clientService: ClientService
  ) {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });

    var obj = JSON.parse(sessionStorage.getItem('ActualUser')); // An object :D
    let user:User = new User(obj.id, obj.name, obj.lastName, obj.userName, obj.password, obj.address, obj.email, obj.typeId, obj.address2,
  obj.colony, obj.city, obj.state, obj.zip, obj.country, obj.phoneNumber, obj.numberHouse, obj.setCompany, obj.lockInfo);

    this.createGuideService.userActual = user;


    this.productService.getParcelsFromUserQuotation(user.id).subscribe(
      (responseParcels) =>{
        if(!responseParcels){
          this.loading = false;
          this.petitionError = true;
        }else{
          console.log(responseParcels);
          var productArray = responseParcels;
          console.log(productArray.length);

          if(productArray.length > 1){
            this.rateService.uniqueParcel = true;
          }else{
            this.rateService.uniqueParcel = false;
          }

          for (var i = 0; i < productArray.length; i++) {
            if(productArray[i].parcelId == 2 || productArray[i].parcelId == 3){
              if(productArray[i].multiPieces == "Y"){
                this.userMultiPack = true;
              }
              if(productArray[i].thirdAccount.length > 0 ){
                this.thirdAccount = productArray[i].thirdAccount;
              }
              if(productArray[i].parcelId == 3 && productArray[i].printType.lenght > 0){
                this.printType=productArray[i].printType;
              }
            }
            
          }

          this.clientService.getUsersByUserID().subscribe(
            (successResponse) => {
                if(!successResponse){
                  this.loading = false;
                  this.petitionError = true;
                }else{

                  this.loaded = true;
                  this.userArray = successResponse;
                  this.response = successResponse;
                  this.dataUser = [];
                  for (var i = 0; i < this.userArray.length; i++) {
                    //console.log(countryArray[i].name);
                    this.dataUser[this.userArray[i].name + " " + this.userArray[i].lastName] = null; //countryArray[i].flag or null
                  }
                  this.petitionError = false;
                  setTimeout(() =>
                  {
                    $(this.el.nativeElement).find('input.autocomplete').autocomplete({
                      data: this.dataUser,
                      limit: 5
                    });
                  },
                  400);
                }
            },
            (errorResponse) => {
              this.loading = false;
              this.petitionError = true;
            }
          );
        }
      }
    );
  }

  ngOnInit() {

  }

  selectedClient(deviceValue){
    if(deviceValue.length > 0){
      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(deviceValue == userNameLastName){
          this.selectedClientInfo = new User(this.response[i].id, this.response[i].name, this.response[i].lastName,
            this.response[i].userName, this.response[i].password, this.response[i].address, this.response[i].email,
            this.response[i].typeId, this.response[i].address2, this.response[i].colony, this.response[i].city,
            this.response[i].state, this.response[i].zip, this.response[i].country, this.response[i].phoneNumber,
            this.response[i].numberHouse, this.response[i].setCompany, this.response[i].lockInfo);
          //this.clientService.setUserEdit(userAux);
        }else{
          this.loading = false;
        }
      }
    }
    /*

    var element = <HTMLInputElement>document.getElementById("userData");
      this.invalidForm = false;
      this.loading = true;
      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(element.value == userNameLastName){
          let userAux:User = new User(this.response[i].id, this.response[i].name, this.response[i].lastName,
            this.response[i].userName, this.response[i].password, this.response[i].address, this.response[i].email,
            this.response[i].typeId, this.response[i].address2, this.response[i].colony, this.response[i].city,
            this.response[i].state, this.response[i].zip, this.response[i].country, this.response[i].phoneNumber);
          this.clientService.setUserEdit(userAux);
          this.clientService.operation = 1;
          this.router.navigate(['/add-client']);
        }else{
          this.loading = false;
        }
      }*/

  }

  checkSeguro(){
    var element = <HTMLInputElement>document.getElementById("seguro");
    element = <HTMLInputElement>document.getElementById("seguro");
    if(element.checked == true){
      this.seguro = true;
      setTimeout( () => { document.getElementById("insurance").focus(); }, 100 );
    }else{
      this.seguro = false;
    }
  }

  loseFocusDest(deviceValue){
    if(deviceValue.length > 4){
      this.rateService.getInfoByPostalCode(deviceValue).subscribe(
        (response) => {
          this.responseCP.postalCode = response.codigo_postal;
          this.responseCP.colonies = response.colonias;
          this.responseCP.municipality = response.municipio;
          this.responseCP.state = response.estado;

          if(response.colonias.length < 1){
            this.noCP = true;
          }
        }
      )
    }
  }

  setArrayEmptyDest(){
    this.responseCP.colonies = [];
  }

  checkDestCP(deviceValue){
    this.noCP = false;
    this.responseCP.colonies = [];
    this.rateService.getInfoByPostalCode(deviceValue).subscribe(
      (response) => {
        this.responseCP.postalCode = response.codigo_postal;
        this.responseCP.colonies = response.colonias;
        this.responseCP.municipality = response.municipio;
        this.responseCP.state = response.estado;

        if(response.colonias.length < 1){
          this.noCP = true;
        }
      }
    )
  }

  addQuotation(forma:NgForm){
    this.packs = [];
    this.loading = true;
    let insurance:number = 0;

    if(!forma.valid){
          this.invalidForm = true;
          this.loading = false;

    }else{
      this.noLoad = false;
      var x = document.getElementById("preloaderRate");
      x.style.display = "block";

      this.invalidForm = false;
      if(this.multiPackActive){
        if(this.objectCreateMultipieces.length > 0){
          let totalWeight:number = 0;
          let counter:number = 0;
          for(var j=0; j<this.objectCreateMultipieces.length; j++)
          {
            var elementHeight = <HTMLInputElement>document.getElementById(this.objectCreateMultipieces[j].height.toString());
            var elementWidth = <HTMLInputElement>document.getElementById(this.objectCreateMultipieces[j].width.toString());
            var elementInsurance = <HTMLInputElement>document.getElementById(this.objectCreateMultipieces[j].insurance.toString());
            var elementLength = <HTMLInputElement>document.getElementById(this.objectCreateMultipieces[j].length.toString());
            var elementWeight = <HTMLInputElement>document.getElementById(this.objectCreateMultipieces[j].weight.toString());
            if(Number(elementHeight.value) > 0 && Number(elementWidth.value) > 0 && Number(elementLength.value) > 0 && Number(elementWeight.value) > 0 ){
              this.packs.push(new Multipieces(forma.controls["postal_code_origin"].value, forma.controls["postal_code_dest"].value,
              Number(elementWeight.value),Number(elementLength.value), Number(elementWidth.value), Number(elementHeight.value),
              Number(elementInsurance.value)));
              counter++;
              totalWeight = Number(elementWeight.value) + totalWeight;
            }else{
              //Error de producto y no procede a guardar
              //this.errorProductPaqueteExpress = true;
            }
          }
          if(counter == this.packs.length){
            //this.errorProductFedEx = false;
          }
          this.createGuideService.multipiecesData = this.packs;
        this.rateService.GetQuotationMultiPieces(this.packs, this.createGuideService.userActual.id).subscribe(responseQuotation => {
          if(responseQuotation){
            var rateArray = responseQuotation;
            this.response = responseQuotation;
            this.dataProducts = [];
            for (var i = 0; i < rateArray.length; i++) {
              this.dataProducts.push(
                new Rate(rateArray[i].id, rateArray[i].name, rateArray[i].description,
                        rateArray[i].kg, rateArray[i].volumetricWeight, rateArray[i].factor, rateArray[i].parcelId,
                        rateArray[i].amount, rateArray[i].parcelName, rateArray[i].deliveryDateSpecified,
                        rateArray[i].deliveryDate, rateArray[i].amountDetails));
            }
            this.rateService.dataProducts = this.dataProducts;
            this.petitionError = false;
            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.destinyCity = forma.controls["dest_city"].value;
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
            this.createGuideService.destinyZip = forma.controls["postal_code_dest"].value;
            this.createGuideService.packageType = forma.controls["kindPackage"].value;
            this.createGuideService.thirdAccount = this.thirdAccount;
            this.createGuideService.printType = this.printType;

            this.rateService.weight = totalWeight;
            this.rateService.dataCpDest.colony = forma.controls["colonyDest"].value;
            this.rateService.dataCpDest.municipality = forma.controls["dest_city"].value;
            this.rateService.dataCpDest.postalCode = forma.controls["postal_code_dest"].value;
            this.rateService.dataCpDest.state = forma.controls["dest_state"].value;
            this.rateService.selectedUser = this.selectedClientInfo;

            this.router.navigate(['/show-rate']);
          }else{
            x.style.display = "none";
            this.loading = false;
            this.noLoad = true;
          }
        },(errorResponse) => {
          x.style.display = "none";
          this.invalidForm = true;
          this.loading = false;
        });
      }
    }else{
      const quotationData: Package = {
        id: 0,
        status: "iniciado",
        originAddress: forma.controls["origin_city"].value,
        postCodeOrigin: forma.controls["postal_code_origin"].value,
        destinationAddress: forma.controls["dest_city"].value,
        postCodeDest: forma.controls["postal_code_dest"].value,
        kindPackage: forma.controls["kindPackage"].value,
        weight: forma.controls["weight"].value,
        long: forma.controls["long"].value,
        width: forma.controls["width"].value,
        hight: forma.controls["hight"].value,
        idParcel: 0

      }

      if(forma.controls["insurance"]){
        insurance = forma.controls["insurance"].value;
      }


      let dataAux:DataAuxGuide = new DataAuxGuide(quotationData.postCodeOrigin, quotationData.postCodeDest, quotationData.originAddress,
      quotationData.destinationAddress, quotationData.kindPackage, quotationData.width, quotationData.long, quotationData.hight,
      quotationData.weight, insurance);


      this.createGuideService.dataAuxGuide = dataAux;

      if(quotationData.postCodeOrigin > 0 && quotationData.postCodeDest > 0 && quotationData.weight > 0
      && quotationData.long > 0 && quotationData.width > 0 && quotationData.hight > 0 &&
      quotationData.postCodeOrigin.toString().length > 4 && quotationData.postCodeDest.toString().length > 4){
        this.invalidNumber = false;
        this.invalidPC = false;
        this.rateService.getQuotation(quotationData, insurance).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
            x.style.display = "none";
            this.noLoad = true;
          }else{
            var rateArray = jsonData;
            this.response = jsonData;
            this.dataProducts = [];
            for (var i = 0; i < rateArray.length; i++) {
              this.dataProducts.push(
                new Rate(rateArray[i].id, rateArray[i].name, rateArray[i].description,
                        rateArray[i].kg, rateArray[i].volumetricWeight, rateArray[i].factor, rateArray[i].parcelId,
                        rateArray[i].amount, rateArray[i].parcelName, rateArray[i].deliveryDateSpecified,
                         rateArray[i].deliveryDate, rateArray[i].amountDetails));
            }
            this.rateService.dataProducts = this.dataProducts;
            this.petitionError = false;

            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.destinyCity = forma.controls["dest_city"].value;
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
            this.createGuideService.destinyZip = forma.controls["postal_code_dest"].value;
            this.createGuideService.packageType = forma.controls["kindPackage"].value;
            this.createGuideService.thirdAccount = this.thirdAccount;
            this.createGuideService.printType = this.printType;

            this.rateService.weight = forma.controls["weight"].value;

            this.rateService.dataCpDest.colony = forma.controls["colonyDest"].value;
            this.rateService.dataCpDest.municipality = forma.controls["dest_city"].value;
            this.rateService.dataCpDest.postalCode = forma.controls["postal_code_dest"].value;
            this.rateService.dataCpDest.state = forma.controls["dest_state"].value;
            this.rateService.selectedUser = this.selectedClientInfo;

            this.router.navigate(['/show-rate']);
          }

        },
        (errorResponse) => {
          x.style.display = "none";
          this.invalidForm = true;
          this.loading = false;
        }
      );
      }else{
        x.style.display = "none";
        this.invalidForm = true;
        this.loading = false;
        if(quotationData.postCodeOrigin < 0 || quotationData.postCodeDest < 0 || quotationData.weight > 0
        || quotationData.long < 0 || quotationData.width < 0 || quotationData.hight < 0){
          this.invalidNumber = true;
        }
        if(quotationData.postCodeOrigin.toString().length < 4 || quotationData.postCodeDest.toString().length < 4){
          this.invalidPC = true;
        }
      }
    }
  }
}

  quantityChange(deviceValue){
    this.objectCreateMultipieces = [];
    for(let i=0; i<deviceValue; i++){
      this.objectCreateMultipieces.push(new MultipiecesForm("weight" + i, "length" + i, "width" + i,
      "height" + i, "insurance" + i))
    }
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
  }

  activeMultiPack(){
    var element = <HTMLInputElement>document.getElementById("multipack");
    element = <HTMLInputElement>document.getElementById("multipack");
    if(element.checked == true){
      this.multiPackActive = true;
      $(document).ready(function(){
        $('input[type=number]').on('wheel', function(e){
            return false;
        });
      });
    }else{
      this.objectCreateMultipieces = [];
      this.multiPackActive = false;
      $(document).ready(function(){
        $('input[type=number]').on('wheel', function(e){
            return false;
        });
      });
    }
  }
}
