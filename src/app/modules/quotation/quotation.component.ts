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
  private finalDataProducts:Rate[] = [];
  private response:any;
  private invalidNumber:boolean = false;
  private invalidPC:boolean = false;
  private seguro:boolean = false;

  private multiPackActive:boolean = false; //To know if in the form active the multipack
  private packs:Multipieces[] = []
  private objectCreateMultipieces:MultipiecesForm[] = [];
  private userMultiPack:boolean = false; //To know if the user is multipack

  private responseCP:ResponseCP = new ResponseCP();
  private responseCPOrigin:ResponseCP = new ResponseCP();

  private noCP:boolean = false;
  private noCPOrigin:boolean = false;
  private noMatchCP:boolean = false;

  private cpChange:boolean = false;

  private dataUser:any[] = [];
  private userArray:any[] = [];
  private loaded:boolean = false;
  private selectedClientInfo:User;

  private noLoad:boolean = false;
  private thirdAccount:string = "";
  private printType:string = "";

  private extAreaFedEx:number = 0;
  private extAreaPaquete:number = 0;
  private extAreaRedPack:number = 0;

  private noInsurance:boolean = false;

  private anotherColony:boolean = false;
  private anotherColonyOrigin:boolean = false;

  private numberGuidesRedPack:number;
  private numberGuidesFedEx:number;
  private numberGuidesPaquete:number;

  private maxWeightRedPack:number = -1;
  private maxWeightFedEx:number = -1;
  private maxWeightPaquete:number = -1;

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

    this.setOriginStateCodeFedEx(this.createGuideService.userActual.state);
    setTimeout( () =>{
      var element = <HTMLInputElement>document.getElementById("test2");
      element.checked = true;
      element = <HTMLInputElement>document.getElementById("domicile");
      element.checked = true;
    }, 400);

    this.productService.getParcelsFromUserQuotation(user.id).subscribe(
      (responseParcels) =>{
        if(!responseParcels){
          this.loading = false;
          this.petitionError = true;
        }else{
          var productArray = responseParcels;

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
            }
            if(productArray[i].parcelId == 3 && productArray[i].printType.length > 0){
              this.createGuideService.printTypeFedEx = productArray[i].printType;
            }
            if(productArray[i].extendedArea > 0 && productArray[i].parcelId == 5){
              this.extAreaPaquete = productArray[i].extendedArea;
            }

            if(productArray[i].parcelId == 2 && productArray[i].limitGuides == "Y"){
              this.numberGuidesRedPack = productArray[i].limitedGuidesNumber;
              this.maxWeightRedPack = productArray[i].limitWeight;

            }

            if(productArray[i].parcelId == 3 && productArray[i].limitGuides == "Y"){
              this.numberGuidesFedEx = productArray[i].limitedGuidesNumber;
              this.maxWeightFedEx = productArray[i].limitWeight;

            }

            if(productArray[i].parcelId == 5 && productArray[i].limitGuides == "Y"){
              this.numberGuidesPaquete = productArray[i].limitedGuidesNumber;
              this.maxWeightPaquete = productArray[i].limitWeight;

            }

            if(productArray[i].extendedArea > 0 && productArray[i].parcelId == 2){
              this.extAreaRedPack = productArray[i].extendedArea;
            }
            if(productArray[i].extendedArea > 0 && productArray[i].parcelId == 3){
              this.extAreaFedEx = productArray[i].extendedArea;
            }
            if(productArray[i].percentageDeclared > 0){
              this.noInsurance = false;
            }else{
              this.noInsurance = true
            }
            if(productArray[i].parcelId == 5){
              this.createGuideService.printTypePaquete = productArray[i].printType;
            }
            if(productArray[i].parcelId == 2){
              this.createGuideService.printTypeRedPack = productArray[i].printType;
            }
          }

          if(this.printType != "Z"){
            this.printType = "P";
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

  checkIfCPExist(deviceValue){
    if(deviceValue.length > 4){
      this.rateService.getInfoByPostalCode(deviceValue).subscribe(
        (response) => {
          if(this.createGuideService.userActual.zip != deviceValue){
            if(response.colonias.length < 1){
              this.noCPOrigin = true;
            }else{
              this.cpChange = true;
              this.responseCPOrigin.postalCode = response.codigo_postal;
              this.responseCPOrigin.colonies = response.colonias;
              this.responseCPOrigin.municipality = response.municipio;
              this.responseCPOrigin.state = response.estado;
              this.setOriginStateCodeFedEx(this.responseCPOrigin.state);
            }
          }else{
            this.cpChange = false;
          }
        }
      )
    }
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
            this.setStateCodeFedEx(this.response[i].state);
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
          this.setStateCodeFedEx(this.responseCP.state);
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
        this.setStateCodeFedEx(this.responseCP.state);

        if(response.colonias.length < 1){
          this.noCP = true;
        }
      }
    )
  }

  loseFocusOrigin(deviceValue){
    if(deviceValue.length > 4){
      this.rateService.getInfoByPostalCode(deviceValue).subscribe(
        (response) => {
          this.responseCPOrigin.postalCode = response.codigo_postal;
          this.responseCPOrigin.colonies = response.colonias;
          this.responseCPOrigin.municipality = response.municipio;
          this.responseCPOrigin.state = response.estado;
          this.setStateCodeFedEx(this.responseCPOrigin.state);
          if(response.colonias.length < 1){
            this.noCPOrigin = true;
          }
        }
      )
    }
  }

  setArrayEmptyOrigin(){
    this.responseCPOrigin.colonies = [];
  }

  checkOriginCP(deviceValue){
    this.noCPOrigin = false;
    this.responseCPOrigin.colonies = [];
    this.rateService.getInfoByPostalCode(deviceValue).subscribe(
      (response) => {
        this.responseCPOrigin.postalCode = response.codigo_postal;
        this.responseCPOrigin.colonies = response.colonias;
        this.responseCPOrigin.municipality = response.municipio;
        this.responseCPOrigin.state = response.estado;
        this.setOriginStateCodeFedEx(this.responseCPOrigin.state);

        if(response.colonias.length < 1){
          this.noCPOrigin = true;
        }
      }
    )
  }

  onChange(deviceValue) {
    if(deviceValue == "otro"){
      this.anotherColony = true;
    }else{
      this.anotherColony = false;
    }
  }

  onChangeColony(deviceValue) {
    if(deviceValue == "otro"){
      this.anotherColonyOrigin = true;
    }else{
      this.anotherColonyOrigin = false;
    }
  }

  addQuotation(forma:NgForm){
    this.packs = [];
    this.loading = true;
    let insurance:number = 0;

    if(!forma.valid){
          this.invalidForm = true;
          this.loading = false;

    }else{
      let deliveryType = forma.controls["dlvyType"].value;
      this.createGuideService.deliveryType = deliveryType;
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
            if(Number(elementHeight.value) > 0 && Number(elementWidth.value) > 0 && Number(elementLength.value) > 0 && Number(elementWeight.value) > 0 && elementInsurance != null){
              this.packs.push(new Multipieces(forma.controls["postal_code_origin"].value, forma.controls["postal_code_dest"].value,
              Number(elementWeight.value),Number(elementLength.value), Number(elementWidth.value), Number(elementHeight.value),
              Number(elementInsurance.value)));
              counter++;
              totalWeight = Number(elementWeight.value) + totalWeight;
            }else if(Number(elementHeight.value) > 0 && Number(elementWidth.value) > 0 && Number(elementLength.value) > 0 && Number(elementWeight.value) > 0){
              this.packs.push(new Multipieces(forma.controls["postal_code_origin"].value, forma.controls["postal_code_dest"].value,
              Number(elementWeight.value),Number(elementLength.value), Number(elementWidth.value), Number(elementHeight.value),
              0));
              counter++;
              totalWeight = Number(elementWeight.value) + totalWeight;
            }else{
              x.style.display = "none";
              this.invalidForm = true;
              this.loading = false;
            }
          }
          if(counter == this.packs.length){
            //this.errorProductFedEx = false;
          }
          this.createGuideService.multipiecesData = this.packs;
        this.rateService.GetQuotationMultiPieces(this.packs, this.createGuideService.userActual.id, this.extAreaFedEx, this.extAreaRedPack, deliveryType).subscribe(responseQuotation => {
          if(responseQuotation){
            var rateArray = responseQuotation;
            this.response = responseQuotation;
            this.dataProducts = [];
            for (var i = 0; i < rateArray.length; i++) {
              this.dataProducts.push(
                new Rate(rateArray[i].id, rateArray[i].name, rateArray[i].description,
                        rateArray[i].kg, rateArray[i].volumetricWeight, rateArray[i].factor, rateArray[i].parcelId,
                        rateArray[i].amount, rateArray[i].parcelName, rateArray[i].deliveryDateSpecified,
                        rateArray[i].deliveryDate, rateArray[i].amountDetails, rateArray[i].outOfArea));
            }

            var obj = {};

            for ( var i=0, len=this.dataProducts.length; i < len; i++ )
                obj[this.dataProducts[i]['name']] = this.dataProducts[i];

            this.dataProducts = new Array();
            for ( var key in obj )
                this.dataProducts.push(obj[key]);


            for(let item of this.dataProducts){
              if((this.maxWeightFedEx >= 0 && item.parcelId == 3) || (this.maxWeightPaquete >= 0 && item.parcelId == 5) || (this.maxWeightRedPack >= 0 && item.parcelId == 2)){
                if(item.parcelId == 2 && item.kg <= this.maxWeightRedPack && this.maxWeightRedPack >= 0){
                  this.finalDataProducts.push(item);
                }else if(item.parcelId == 3 && item.kg <= this.maxWeightFedEx && this.maxWeightFedEx >= 0){
                  this.finalDataProducts.push(item);
                }else if(item.parcelId == 5 && item.kg <= this.maxWeightPaquete && this.maxWeightPaquete >= 0){
                  this.finalDataProducts.push(item);
                }
              }else{
                this.finalDataProducts.push(item);
              }
            }

            this.rateService.dataProducts = this.finalDataProducts;

            this.petitionError = false;
            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.destinyCity = forma.controls["dest_city"].value;
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
            this.createGuideService.destinyZip = forma.controls["postal_code_dest"].value;
            this.createGuideService.packageType = forma.controls["kindPackage"].value;
            this.createGuideService.thirdAccount = this.thirdAccount;
            this.createGuideService.printType = this.printType;
            this.createGuideService.deliveryType = deliveryType;
            this.download.printType = this.printType;

            this.createGuideService.originZipChange = this.cpChange;

            if(this.cpChange){
              this.createGuideService.originState = forma.controls["origin_state"].value;
              this.createGuideService.originColony = forma.controls["colonyOrigin"].value;
              this.createGuideService.originCity = forma.controls["origin_city"].value;
              this.createGuideService.originZIP = forma.controls["postal_code_origin"].value;
            }

            this.rateService.weight = totalWeight;
            if(!this.anotherColony){
              this.rateService.dataCpDest.colony = forma.controls["colonyDest"].value;
            }else{
              this.rateService.dataCpDest.colony = forma.controls["anotherCol"].value;
            }
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
      quotationData.postCodeOrigin.toString().length > 3 && quotationData.postCodeDest.toString().length > 3){
        this.invalidNumber = false;
        this.invalidPC = false;
        this.rateService.getQuotation(quotationData, insurance, this.extAreaFedEx, this.extAreaPaquete, this.extAreaRedPack, deliveryType).subscribe(jsonData => {
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
                         rateArray[i].deliveryDate, rateArray[i].amountDetails, rateArray[i].outOfArea));
            }

            var obj = {};
            for ( var i=0, len=this.dataProducts.length; i < len; i++ )
                obj[this.dataProducts[i]['name']] = this.dataProducts[i];
            this.dataProducts = new Array();
            for ( var key in obj )
                this.dataProducts.push(obj[key]);

            for(let item of this.dataProducts){
              if((this.maxWeightFedEx >= 0 && item.parcelId == 3) || (this.maxWeightPaquete >= 0 && item.parcelId == 5) || (this.maxWeightRedPack >= 0 && item.parcelId == 2)){
                if(item.parcelId == 2 && item.kg <= this.maxWeightRedPack && this.maxWeightRedPack >= 0){
                  this.finalDataProducts.push(item);
                }else if(item.parcelId == 3 && item.kg <= this.maxWeightFedEx && this.maxWeightFedEx >= 0){
                  this.finalDataProducts.push(item);
                }else if(item.parcelId == 5 && item.kg <= this.maxWeightPaquete && this.maxWeightPaquete >= 0){
                  this.finalDataProducts.push(item);
                }
              }else{
                this.finalDataProducts.push(item);
              }
            }

            this.rateService.dataProducts = this.finalDataProducts;

            this.petitionError = false;

            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.destinyCity = forma.controls["dest_city"].value;
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
            this.createGuideService.destinyZip = forma.controls["postal_code_dest"].value;
            this.createGuideService.packageType = forma.controls["kindPackage"].value;
            this.createGuideService.thirdAccount = this.thirdAccount;
            this.createGuideService.printType = this.printType;
            this.createGuideService.deliveryType = deliveryType;
            this.download.printType = this.printType;

            this.createGuideService.originZipChange = this.cpChange;
            if(this.cpChange){
              this.createGuideService.originState = forma.controls["origin_state"].value;
              this.createGuideService.originColony = forma.controls["colonyOrigin"].value;
              this.createGuideService.originCity = forma.controls["origin_city"].value;
              this.createGuideService.originZIP = forma.controls["postal_code_origin"].value;
            }

            this.rateService.weight = forma.controls["weight"].value;

            if(!this.anotherColony){
              this.rateService.dataCpDest.colony = forma.controls["colonyDest"].value;
            }else{
              this.rateService.dataCpDest.colony = forma.controls["anotherCol"].value;
            }
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
        if(quotationData.postCodeOrigin <= 0 || quotationData.postCodeDest <= 0 || quotationData.weight <= 0
        || quotationData.long <= 0 || quotationData.width <= 0 || quotationData.hight <= 0){
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

  setStateCodeFedEx(state:string){
    let indexNo:number = state.indexOf(',P');
    let porcentajeString = state.substring(indexNo);
    if(state == "Aguascalientes"){
      this.createGuideService.stateCode = "AG";
    }else if(state == "Baja California"){
      this.createGuideService.stateCode = "BC";
    }else if(state == "Baja California Sur"){
      this.createGuideService.stateCode = "BS";
    }else if(state == "Campeche"){
      this.createGuideService.stateCode = "CM";
    }else if(state == "Chiapas"){
      this.createGuideService.stateCode = "CS";
    }else if(state == "Chihuahua"){
      this.createGuideService.stateCode = "CH";
    }else if(state == "Coahuila de Zaragoza"){
      this.createGuideService.stateCode = "CO";
    }else if(state == "Colima"){
      this.createGuideService.stateCode = "CL";
    }else if(state == "Ciudad de México"){
      this.createGuideService.stateCode = "DF";
    }else if(state == "Durango"){
      this.createGuideService.stateCode = "DG";
    }else if(state == "Guanajuato"){
      this.createGuideService.stateCode = "GT";
    }else if(state == "Guerrero"){
      this.createGuideService.stateCode = "GR";
    }else if(state == "Hidalgo"){
      this.createGuideService.stateCode = "HG";
    }else if(state == "Jalisco"){
      this.createGuideService.stateCode = "JA";
    }else if(state == "México"){
      this.createGuideService.stateCode = "EM";
    }else if(state == "Michoacán de Ocampo"){
      this.createGuideService.stateCode = "MI";
    }else if(state == "Morelos"){
      this.createGuideService.stateCode = "MO";
    }else if(state == "Nayarit"){
      this.createGuideService.stateCode = "NA";
    }else if(state == "Nuevo León"){
      this.createGuideService.stateCode = "NL";
    }else if(state == "Oaxaca"){
      this.createGuideService.stateCode = "OA";
    }else if(state == "Puebla"){
      this.createGuideService.stateCode = "PU";
    }else if(state == "Querétaro"){
      this.createGuideService.stateCode = "QT";
    }else if(state == "Quintana Roo"){
      this.createGuideService.stateCode = "QR";
    }else if(state == "San Luis Potosí"){
      this.createGuideService.stateCode = "SL";
    }else if(state == "Sinaloa"){
      this.createGuideService.stateCode = "SI";
    }else if(state == "Sonora"){
      this.createGuideService.stateCode = "SO";
    }else if(state == "Tabasco"){
      this.createGuideService.stateCode = "TB";
    }else if(state == "Tamaulipas"){
      this.createGuideService.stateCode = "TM";
    }else if(state == "Tlaxcala"){
      this.createGuideService.stateCode = "TL";
    }else if(state == "Veracruz de Ignacio de la Llave"){
      this.createGuideService.stateCode = "VE";
    }else if(state == "Yucatán"){
      this.createGuideService.stateCode = "YU";
    }else if(state == "Zacatecas"){
      this.createGuideService.stateCode = "ZA";
    }
  }

  setOriginStateCodeFedEx(state:string){
    let indexNo:number = state.indexOf(',P');
    let porcentajeString = state.substring(indexNo);
    if(state == "Aguascalientes"){
      this.createGuideService.stateOriginCode = "AG";
    }else if(state == "Baja California"){
      this.createGuideService.stateOriginCode = "BC";
    }else if(state == "Baja California Sur"){
      this.createGuideService.stateOriginCode = "BS";
    }else if(state == "Campeche"){
      this.createGuideService.stateOriginCode = "CM";
    }else if(state == "Chiapas"){
      this.createGuideService.stateOriginCode = "CS";
    }else if(state == "Chihuahua"){
      this.createGuideService.stateOriginCode = "CH";
    }else if(state == "Coahuila de Zaragoza"){
      this.createGuideService.stateOriginCode = "CO";
    }else if(state == "Colima"){
      this.createGuideService.stateOriginCode = "CL";
    }else if(state == "Ciudad de México"){
      this.createGuideService.stateOriginCode = "DF";
    }else if(state == "Durango"){
      this.createGuideService.stateOriginCode = "DG";
    }else if(state == "Guanajuato"){
      this.createGuideService.stateOriginCode = "GT";
    }else if(state == "Guerrero"){
      this.createGuideService.stateOriginCode = "GR";
    }else if(state == "Hidalgo"){
      this.createGuideService.stateOriginCode = "HG";
    }else if(state == "Jalisco"){
      this.createGuideService.stateOriginCode = "JA";
    }else if(state == "México"){
      this.createGuideService.stateOriginCode = "EM";
    }else if(state == "Michoacán de Ocampo"){
      this.createGuideService.stateOriginCode = "MI";
    }else if(state == "Morelos"){
      this.createGuideService.stateOriginCode = "MO";
    }else if(state == "Nayarit"){
      this.createGuideService.stateOriginCode = "NA";
    }else if(state == "Nuevo León"){
      this.createGuideService.stateOriginCode = "NL";
    }else if(state == "Oaxaca"){
      this.createGuideService.stateOriginCode = "OA";
    }else if(state == "Puebla"){
      this.createGuideService.stateOriginCode = "PU";
    }else if(state == "Querétaro"){
      this.createGuideService.stateOriginCode = "QT";
    }else if(state == "Quintana Roo"){
      this.createGuideService.stateOriginCode = "QR";
    }else if(state == "San Luis Potosí"){
      this.createGuideService.stateOriginCode = "SL";
    }else if(state == "Sinaloa"){
      this.createGuideService.stateOriginCode = "SI";
    }else if(state == "Sonora"){
      this.createGuideService.stateOriginCode = "SO";
    }else if(state == "Tabasco"){
      this.createGuideService.stateOriginCode = "TB";
    }else if(state == "Tamaulipas"){
      this.createGuideService.stateOriginCode = "TM";
    }else if(state == "Tlaxcala"){
      this.createGuideService.stateOriginCode = "TL";
    }else if(state == "Veracruz de Ignacio de la Llave"){
      this.createGuideService.stateOriginCode = "VE";
    }else if(state == "Yucatán"){
      this.createGuideService.stateOriginCode = "YU";
    }else if(state == "Zacatecas"){
      this.createGuideService.stateOriginCode = "ZA";
    }

  }
}
