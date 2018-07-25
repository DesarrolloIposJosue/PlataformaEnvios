import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Product } from '../../classes/Product';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { ProductService } from '../../services/product-service/product.service';
import { User_Parcel } from '../../classes/UserParcel';
import { User } from '../../classes/Client';
import { User_Product } from '../../classes/UserProduct';
import { User_Product_Price } from '../../classes/UserProductPrice';
import { Observable } from 'rxjs/Rx';

declare var jQuery:any;
declare var $:any;

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
  public paqueteExpressForm:boolean = false;

  private petitionError = false;
  private response:any;
  private responseProductPrice:any;

  public productsEstafeta:Product[] = [];
  public productsDHL:Product[] = [];
  public productsRedPack:Product[] = [];
  public productsFedEx:Product[] = [];
  public productsPaqueteExpress:Product[] = [];

  private productNextDayFedEx:Product[] = [];
  private productEconomicFedEx:Product[] = [];

  private productNextDayRedPack:Product[] = [];
  private productEconomicRedPack:Product[] = [];

  public productUserPriceEstafeta:User_Product_Price[] = [];
  public productUserPriceDHL:User_Product_Price[] = [];
  public productUserPriceRedPack:User_Product_Price[] = [];
  public productUserPriceFedEx:User_Product_Price[] = [];
  public productUserPricePaqueteExpress:User_Product_Price[] = [];

  public productUserPriceNextDayFedEx:User_Product_Price[] = [];
  public productUserPriceEconomicFedEx:User_Product_Price[] = [];

  public productUserPriceNextDayRedPack:User_Product_Price[] = [];
  public productUserPriceEconomicRedPack:User_Product_Price[] = [];

  public userParcelEstafeta:User_Parcel;
  public userParcelDHL:User_Parcel;
  public userParcelRedPack:User_Parcel;
  public userParcelFedEx:User_Parcel;
  public userParcelPaqueteExpress:User_Parcel;

  public errorParcelData:boolean = false;
  public errorAddParcelsToClient:boolean = false;

  private guidesEstafeta:boolean = false;
  private guidesRedPack:boolean = false;
  private guidesDHL:boolean = false;
  private guidesFedEx:boolean = false;
  private guidesPaqueteExpress:boolean = false;

  private loadProductsEstafeta:boolean = false;
  private loadProductsRedPack:boolean = false;
  private loadProductsDHL:boolean = false;
  private loadProductsFedEx:boolean = false;
  private loadProductsPaqueteExpress:boolean = false;

  private existProductsEstafeta:boolean = false;
  private existProductsRedPack:boolean = false;
  private existProductsDHL:boolean = false;
  private existProductsFedEx:boolean = false;
  private existProductsPaqueteExpress:boolean = false;

  private loadedEstafeta:boolean = false;
  private loadedRedPack:boolean = false;
  private loadedDHL:boolean = false;
  private loadedFedEx:boolean = false;
  private loadedPaquetexpress:boolean = false;

  private errorProductEstafeta:boolean = false;
  private errorProdPriceEstafeta:boolean = false;
  private errorProductRedPack:boolean = false;
  private errorProdPriceRedPack:boolean = false;
  private errorProductDHL:boolean = false;
  private errorProdPriceDHL:boolean = false;
  private errorProductFedEx:boolean = false;
  private errorProdPriceFedEx:boolean = false;
  private errorProductPaqueteExpress:boolean = false;
  private errorProdPricePaqueteExpress:boolean = false;

  private multiPackRedPack:string = "N";
  private multiPackFedEx:string = "N";

  private nextDayFedEx:string = "N";
  private economicFedEx:string = "N";
  private nextDayRedPack:string = "N";
  private economicRedPack:string = "N";


  constructor(
    private parcelService:ParcelService,
    private router:Router,
    private productService: ProductService
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
    if(this.productService.operation == 1){
      this.productService.getParcelsFromUser().subscribe(
        (responseParcels) =>{
          if(!responseParcels){
            this.loading = false;
            this.petitionError = true;
          }else{
            var productArray = responseParcels;
            for(let i=0; i<productArray.length; i++){
              if(productArray[i].parcelId == 1){
                //DHL test6
                if(productArray[i].economic != "n"){
                  var element = <HTMLInputElement>document.getElementById("test6");
                  element = <HTMLInputElement>document.getElementById("test6");
                  element.checked = true;
                  this.checkDHL();
                }
              }else if(productArray[i].parcelId == 2){
                //RedPack test5
                if(productArray[i].economic != "n"){
                  var element = <HTMLInputElement>document.getElementById("test5");
                  element = <HTMLInputElement>document.getElementById("test5");
                  element.checked = true;
                  this.checkRedPack();
                }
              }else if(productArray[i].parcelId == 3){
                //FedEx test7
                if(productArray[i].economic != "n"){
                  var element = <HTMLInputElement>document.getElementById("test7");
                  element = <HTMLInputElement>document.getElementById("test7");
                  element.checked = true;
                  this.checkFedEx();
                }
              }else if(productArray[i].parcelId == 4){
                //Estafeta test8
                if(productArray[i].economic != "n"){
                  var element = <HTMLInputElement>document.getElementById("test8");
                  element = <HTMLInputElement>document.getElementById("test8");
                  element.checked = true;
                  this.checkEstafeta();
                }
              }else if(productArray[i].parcelId == 5){
                //Paquetexpress paqueteExpress
                if(productArray[i].economic != "n"){
                  var element = <HTMLInputElement>document.getElementById("paqueteExpress");
                  element = <HTMLInputElement>document.getElementById("paqueteExpress");
                  element.checked = true;
                  this.checkPaqueteExpress();
                }
              }
            }
          }
        }
      );
    }
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
        parcInfoInd.commissionDeclared = forma.controls["comitionRedPack"].value;
        parcInfoInd.extendedArea = forma.controls["extAreaRedPack"].value;
        parcInfoInd.percentageDeclared = forma.controls["porcValDeclRedPack"].value;
        parcInfoInd.reference = forma.controls["referenceRedPack"].value;
        parcInfoInd.economic = this.economicRedPack;
        parcInfoInd.nextDay = this.nextDayRedPack;
        parcInfoInd.printType = "P";
        if(this.guidesRedPack){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesRedPack"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        parcInfoInd.multiPieces = this.multiPackRedPack;
        parcInfoInd.thirdAccount = "";
        parcInfo.push(parcInfoInd);
        //Edit part
        if(this.productService.operation == 1){
          if(this.productUserPriceRedPack.length > 0){
            let counter:number = 0;
            for(var j=0; j<this.productUserPriceRedPack.length; j++){
              var elementAux = <HTMLInputElement>document.getElementById(this.productUserPriceRedPack[j].productId.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productUserPriceRedPack[j].productId, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProdPriceRedPack = true;
              }
            }
            if(counter == this.productUserPriceRedPack.length){
              this.errorProdPriceRedPack = false;
            }
          }else{
            let counter:number = 0;
            for(var j=0; j<this.productsRedPack.length; j++)
            {
              var elementAux = <HTMLInputElement>document.getElementById(this.productsRedPack[j].id.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productsRedPack[j].id, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProductRedPack = true;
              }
            }
            if(counter == this.productsRedPack.length){
              this.errorProductRedPack = false;
            }
          }
        //End edit
        }else{
          let counter:number = 0;
          for(var j=0; j<this.productsRedPack.length; j++)
          {
            var elementAux = <HTMLInputElement>document.getElementById(this.productsRedPack[j].id.toString());
            if(Number(elementAux.value) > 0){
              prodUserInfo.push(new User_Product(0, this.productsRedPack[j].id, Number(elementAux.value)));
              counter++;
            }else{
              //Error de producto y no procede a guardar
              this.errorProdPriceRedPack = true;
            }
          }
          if(counter == this.productsRedPack.length){
            this.errorProdPriceRedPack = false;
          }
        }
      }
    }else{
      //Redpack

      var x = sessionStorage.getItem('NewUserId');
      var userId = +x; // y: number
      if(this.userParcelRedPack){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 2;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPriceRedPack.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPriceRedPack[j].productId, this.productUserPriceRedPack[j].amount));
        }
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
        parcInfoInd.commissionDeclared = forma.controls["comitionFedEx"].value;
        parcInfoInd.extendedArea = forma.controls["extAreaFedEx"].value;
        parcInfoInd.percentageDeclared = forma.controls["porcValDeclFedEx"].value;
        parcInfoInd.reference = forma.controls["referenceFedEx"].value;
        parcInfoInd.printType = forma.controls["printType"].value;
        var element = <HTMLInputElement>document.getElementById("nextDayFedEx");
        if(element.checked == true){
          this.nextDayFedEx = "Y";
        }else{
          this.nextDayFedEx = "N";
        }
        element = <HTMLInputElement>document.getElementById("economicFedEx");
        if(element.checked == true){
          this.economicFedEx = "Y";
        }else{
          this.economicFedEx = "N";
        }
        parcInfoInd.economic = this.economicFedEx;
        parcInfoInd.nextDay = this.nextDayFedEx;
        parcInfoInd.thirdAccount = forma.controls["thirdAccountFedEx"].value;
        if(this.guidesFedEx){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesFedEx"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        parcInfoInd.multiPieces = this.multiPackFedEx;
        parcInfo.push(parcInfoInd);
        //Edit part
        if(this.productService.operation == 1){
          if(this.productUserPriceFedEx.length > 0){
            let counter:number = 0;
            for(var j=0; j<this.productUserPriceFedEx.length; j++){
              var elementAux = <HTMLInputElement>document.getElementById(this.productUserPriceFedEx[j].productId.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productUserPriceFedEx[j].productId, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProdPriceFedEx = true;
              }
            }
            if(counter == this.productUserPriceFedEx.length){
              this.errorProdPriceFedEx = false;
            }
          }else{
            let counter:number = 0;
            for(var j=0; j<this.productsFedEx.length; j++)
            {
              var elementAux = <HTMLInputElement>document.getElementById(this.productsFedEx[j].id.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productsFedEx[j].id, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProductFedEx = true;
              }
            }
            if(counter == this.productsFedEx.length){
              this.errorProductFedEx = false;
            }
          }
        //End edit
        }else{
          let counter:number = 0;
          for(var j=0; j<this.productsFedEx.length; j++)
          {
            var elementAux = <HTMLInputElement>document.getElementById(this.productsFedEx[j].id.toString());
            if(Number(elementAux.value) > 0){
              prodUserInfo.push(new User_Product(0, this.productsFedEx[j].id, Number(elementAux.value)));
              counter++;
            }else{
              //Error de producto y no procede a guardar
              this.errorProductFedEx = true;
            }
          }
          if(counter == this.productsFedEx.length){
            this.errorProductFedEx = false;
          }
        }
      }
    }else{
      //FedEx
      var x = sessionStorage.getItem('NewUserId');
      var userId = +x; // y: number
      if(this.userParcelFedEx){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 3;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        /*var element = <HTMLInputElement>document.getElementById("nextDayFedEx");
        if(element.checked == true){
          this.nextDayFedEx = "Y";
        }else{
          this.nextDayFedEx = "N";
        }
        element = <HTMLInputElement>document.getElementById("economicFedEx");
        if(element.checked == true){
          this.economicFedEx = "Y";
        }else{
          this.economicFedEx = "N";
        }*/
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPriceFedEx.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPriceFedEx[j].productId, this.productUserPriceFedEx[j].amount));
        }
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
        parcInfoInd.commissionDeclared = forma.controls["comitionDHL"].value;
        parcInfoInd.extendedArea = forma.controls["extAreaDHL"].value;
        parcInfoInd.percentageDeclared = forma.controls["porcValDeclDHL"].value;
        parcInfoInd.reference = forma.controls["referenceDHL"].value;
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
        parcInfoInd.thirdAccount = "";
        parcInfoInd.printType = "P";
        if(this.guidesDHL){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesDHL"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        parcInfoInd.multiPieces = 'N';
        parcInfo.push(parcInfoInd);
        //Edit part
        if(this.productService.operation == 1){
          if(this.productUserPriceDHL.length > 0){
            let counter:number = 0;
            for(var j=0; j<this.productUserPriceDHL.length; j++){
              var elementAux = <HTMLInputElement>document.getElementById(this.productUserPriceDHL[j].productId.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productUserPriceDHL[j].productId, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProdPriceDHL= true;
              }
            }
            if(counter == this.productUserPriceDHL.length){
              this.errorProdPriceDHL = false;
            }
          }else{
            let counter:number = 0;
            for(var j=0; j<this.productsDHL.length; j++)
            {
              var elementAux = <HTMLInputElement>document.getElementById(this.productsDHL[j].id.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productsDHL[j].id, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProductDHL = true;
              }
            }
            if(counter == this.productsDHL.length){
              this.errorProductDHL = false;
            }
          }
        //End edit
        }else{
          let counter:number = 0;
          for(var j=0; j<this.productsDHL.length; j++)
          {
            var elementAux = <HTMLInputElement>document.getElementById(this.productsDHL[j].id.toString());
            if(Number(elementAux.value) > 0){
              prodUserInfo.push(new User_Product(0, this.productsDHL[j].id, Number(elementAux.value)));
              counter++;
            }else{
              //Error de producto y no procede a guardar
              this.errorProductDHL = true;
            }
          }
          if(counter == this.productsDHL.length){
            this.errorProductDHL = false;
          }
        }

      }
    }else{
      //DHL
      var x = sessionStorage.getItem('NewUserId');
      var userId = +x; // y: number
      if(this.userParcelDHL){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 1;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPriceDHL.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPriceDHL[j].productId, this.productUserPriceDHL[j].amount));
        }
      }
    }

    if(this.estafetaForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordEstafeta"].value == "" || forma.controls["usernameEstafeta"].value == ""){
        this.errorParcelData = true;
      }else{
        parcInfoInd.parcelId = 4;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameEstafeta"].value;
        parcInfoInd.password = forma.controls["passwordEstafeta"].value;
        parcInfoInd.commissionDeclared = forma.controls["comitionEstafeta"].value;
        parcInfoInd.extendedArea = forma.controls["extAreaEstafeta"].value;
        parcInfoInd.percentageDeclared = forma.controls["porcValDeclEstafeta"].value;
        parcInfoInd.reference = forma.controls["referenceEstafeta"].value;
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
        parcInfoInd.thirdAccount = "";
        if(this.guidesEstafeta){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesEstafeta"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        parcInfoInd.multiPieces = 'N';
        parcInfo.push(parcInfoInd);
        //Edit part
        if(this.productService.operation == 1){
          if(this.productUserPriceEstafeta.length > 0){
            let counter:number = 0;
            for(var j=0; j<this.productUserPriceEstafeta.length; j++){
              var elementAux = <HTMLInputElement>document.getElementById(this.productUserPriceEstafeta[j].productId.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productUserPriceEstafeta[j].productId, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProdPriceEstafeta = true;
              }
            }
            if(counter == this.productUserPriceEstafeta.length){
              this.errorProdPriceEstafeta = false;
            }
          }else{
            let counter:number = 0;
            for(var j=0; j<this.productsEstafeta.length; j++)
            {
              var elementAux = <HTMLInputElement>document.getElementById(this.productsEstafeta[j].id.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productsEstafeta[j].id, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProductEstafeta = true;
              }
            }
            if(counter == this.productsEstafeta.length){
              this.errorProductEstafeta = false;
            }
          }
        //End edit
        }else{
          let counter:number = 0;
          for(var j=0; j<this.productsEstafeta.length; j++)
          {
            var elementAux = <HTMLInputElement>document.getElementById(this.productsEstafeta[j].id.toString());
            if(Number(elementAux.value) > 0){
              prodUserInfo.push(new User_Product(0, this.productsEstafeta[j].id, Number(elementAux.value)));
              counter++;
            }else{
              //Error de producto y no procede a guardar
              this.errorProductEstafeta = true;
            }
          }
          if(counter == this.productsEstafeta.length){
            this.errorProductEstafeta = false;
          }
        }
      }
    }else{
      //Estafeta
      if(this.userParcelEstafeta){
        var x = sessionStorage.getItem('NewUserId');
        var userId = +x; // y: number
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 4;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPriceEstafeta.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPriceEstafeta[j].productId, this.productUserPriceEstafeta[j].amount));
        }
      }
    }
    //Paquete express form
    if(this.paqueteExpressForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordPaqueteExpress"].value == "" || forma.controls["usernamePaqueteExpress"].value == ""){
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 5;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernamePaqueteExpress"].value;
        parcInfoInd.password = forma.controls["passwordPaqueteExpress"].value;
        parcInfoInd.commissionDeclared = forma.controls["comitionPaqueteExpress"].value;
        parcInfoInd.extendedArea = forma.controls["extAreaPaqueteExpress"].value;
        parcInfoInd.percentageDeclared = forma.controls["porcValDeclPaqueteExpress"].value;
        parcInfoInd.reference = forma.controls["referencePaqueteExpress"].value;
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
        parcInfoInd.printType = forma.controls["printTypePaquete"].value;
        parcInfoInd.thirdAccount = "";
        if(this.guidesPaqueteExpress){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesPaqueteExpress"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        parcInfoInd.multiPieces = 'N';
        parcInfo.push(parcInfoInd);
        //Edit part
        if(this.productService.operation == 1){
          if(this.productUserPricePaqueteExpress.length > 0){
            let counter:number = 0;
            for(var j=0; j<this.productUserPricePaqueteExpress.length; j++){
              var elementAux = <HTMLInputElement>document.getElementById(this.productUserPricePaqueteExpress[j].productId.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productUserPricePaqueteExpress[j].productId, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProdPricePaqueteExpress = true;
              }
            }
            if(counter == this.productUserPricePaqueteExpress.length){
              this.errorProdPricePaqueteExpress = false;
            }
          }else{
            let counter:number = 0;
            for(var j=0; j<this.productsPaqueteExpress.length; j++)
            {
              var elementAux = <HTMLInputElement>document.getElementById(this.productsPaqueteExpress[j].id.toString());
              if(Number(elementAux.value) > 0){
                prodUserInfo.push(new User_Product(0, this.productsPaqueteExpress[j].id, Number(elementAux.value)));
                counter++;
              }else{
                //Error de producto y no procede a guardar
                this.errorProductPaqueteExpress = true;
              }
            }
            if(counter == this.productsPaqueteExpress.length){
              this.errorProductPaqueteExpress = false;
            }
          }
        //End edit
        }else{
          let counter:number = 0;
          for(var j=0; j<this.productsPaqueteExpress.length; j++)
          {
            var elementAux = <HTMLInputElement>document.getElementById(this.productsPaqueteExpress[j].id.toString());
            if(Number(elementAux.value) > 0){
              prodUserInfo.push(new User_Product(0, this.productsPaqueteExpress[j].id, Number(elementAux.value)));
              counter++;
            }else{
              //Error de producto y no procede a guardar
              this.errorProductPaqueteExpress = true;
            }
          }
          if(counter == this.productsPaqueteExpress.length){
            this.errorProductFedEx = false;
          }
        }
      }
    }else{
      //Paquete express

      if(this.userParcelPaqueteExpress){
        var x = sessionStorage.getItem('NewUserId');
        var userId = +x; // y: number
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 5;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPricePaqueteExpress.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPricePaqueteExpress[j].productId, this.productUserPricePaqueteExpress[j].amount));
        }
      }else{
        var x = sessionStorage.getItem('NewUserId');
        var userId = +x; // y: number
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = 5;
        parcInfoInd.userId = userId;
        parcInfoInd.username = "n";
        parcInfoInd.password = "n";
        parcInfoInd.commissionDeclared = 0;
        parcInfoInd.extendedArea = 0;
        parcInfoInd.percentageDeclared = 0;
        parcInfoInd.reference = "n";
        parcInfoInd.limitGuides = "n";
        parcInfoInd.limitedGuidesNumber = 0;
        parcInfoInd.multiPieces = "n";
        parcInfoInd.thirdAccount = "n";
        parcInfoInd.economic = "n";
        parcInfoInd.nextDay = "n";
        parcInfoInd.printType = "n";

        parcInfo.push(parcInfoInd);
      }
    }
    if(!this.errorParcelData && !this.errorProductDHL && !this.errorProdPriceDHL && !this.errorProductFedEx  && !this.errorProdPriceFedEx
      && !this.errorProductRedPack && !this.errorProdPriceRedPack && !this.errorProductEstafeta && !this.errorProdPriceEstafeta
     && !this.errorProductPaqueteExpress && !this.errorProdPricePaqueteExpress){
      //Entra a enviar
      this.loading = true;
      this.parcelService.addParcelToClient(parcInfo).subscribe(jsonData => {
            var checkUser = jsonData;
            if (jsonData == "SUCCESS: Parcels assigned to User") {
              this.parcelService.addProductsToClient(prodUserInfo).subscribe(jsonData2 => {
                if(jsonData2 == "SUCCESS: Products assigned to User")
                {
                   sessionStorage.removeItem('NewUserId');
                   this.router.navigate(['/home']);
                }
              });
            } else {
                this.loading = false;
                this.errorAddParcelsToClient = true;
            }
        });
    }else{
      this.loading = false;
    }
  }

  checkPaidGuidesRedPack(){
    var element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
    element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
    if(element.checked == true){
      this.guidesRedPack = true;
    }else{
      this.guidesRedPack = false;
    }
  }

  checkRedPack(){
    var element = <HTMLInputElement>document.getElementById("test5");
    element = <HTMLInputElement>document.getElementById("test5");
    if(element.checked == true){
      this.redPackForm = true;
      let parcelId:number = 2;
      if(this.productService.operation == 0){
        this.parcelService.getProductsByParcel(parcelId).subscribe(
          (successResponse) => {
              if(!successResponse){
                this.loading = false;
                this.petitionError = true;
              }else{
                var productArray = successResponse;
                this.response = successResponse;
                this.productsRedPack = [];
                for (var i = 0; i < productArray.length; i++) {
                  if(productArray[i].name.indexOf('Economico') >= 0){
                    this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor));
                  }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                    this.productNextDayRedPack.push(
                      new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                              productArray[i].kg, productArray[i].factor)
                    );
                  }else{
                    this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor));
                  }
                  this.productsRedPack.push(
                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor)
                  );
                }
                if(this.userParcelRedPack && this.userParcelRedPack.limitGuides == 'Y'){
                  var element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                  element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                  element.checked = true;
                  this.guidesRedPack = true;
                }
                this.petitionError = false;
              }
          }
        );
        this.errorParcelData = false;
      }else if(this.productService.operation == 1){
        this.productService.getParcelsFromUser().subscribe(
          (responseParcels) =>{
            if(!responseParcels){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = responseParcels;
              this.userParcelRedPack = new User_Parcel();
              for (var i = 0; i < productArray.length; i++) {
                if(productArray[i].parcelId == 2){
                  this.userParcelRedPack.userId = productArray[i].userId;
                  this.userParcelRedPack.parcelId = productArray[i].parcelId;
                  this.userParcelRedPack.password = productArray[i].password;
                  if(this.userParcelRedPack.password == "n"){
                    this.userParcelRedPack.password = "";
                    this.userParcelRedPack.username = "";
                    this.userParcelRedPack.commissionDeclared = 0;
                    this.userParcelRedPack.extendedArea = 0;
                    this.userParcelRedPack.limitGuides = "";
                    this.userParcelRedPack.multiPieces = "";
                    this.userParcelRedPack.printType= "";
                    if(this.userParcelRedPack.multiPieces == "Y"){
                      var element = <HTMLInputElement>document.getElementById("multipackRedPack");
                      element = <HTMLInputElement>document.getElementById("multipackRedPack");
                      element.checked = true;
                      this.multiPackRedPack = "Y";
                    }else{
                      this.multiPackRedPack = "N";
                    }
                    this.userParcelRedPack.nextDay = "";
                    if(this.userParcelRedPack.nextDay == "Y"){
                      var element = <HTMLInputElement>document.getElementById("nextDayRedPack");
                      element = <HTMLInputElement>document.getElementById("nextDayRedPack");
                      element.checked = true;
                      this.nextDayRedPack = "Y";
                    }else{
                      this.nextDayRedPack = "N";
                    }

                    this.userParcelRedPack.economic = "";
                    if(this.userParcelRedPack.economic == "Y"){
                      var element = <HTMLInputElement>document.getElementById("economicRedPack");
                      element = <HTMLInputElement>document.getElementById("economicRedPack");
                      element.checked = true;
                      this.economicRedPack = "Y";
                    }else{
                      this.economicRedPack = "N";
                    }

                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelRedPack.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelRedPack.limitedGuidesNumber = 0;
                    }
                    this.userParcelRedPack.percentageDeclared = 0;
                    this.userParcelRedPack.reference = "";

                  }else{
                    this.userParcelRedPack.username = productArray[i].username;
                    this.userParcelRedPack.commissionDeclared = productArray[i].commissionDeclared;
                    this.userParcelRedPack.extendedArea = productArray[i].extendedArea;
                    this.userParcelRedPack.limitGuides = productArray[i].limitGuides;
                    this.userParcelRedPack.multiPieces = productArray[i].multiPieces;
                    this.userParcelRedPack.printType= "P";
                    if(this.userParcelRedPack.multiPieces == "Y"){
                      var element = <HTMLInputElement>document.getElementById("multipackRedPack");
                      element = <HTMLInputElement>document.getElementById("multipackRedPack");
                      element.checked = true;
                      this.multiPackRedPack = "Y";
                    }else{
                      this.multiPackRedPack = "N";
                    }
                    this.userParcelRedPack.nextDay = productArray[i].nextDay;
                    if(this.userParcelRedPack.nextDay == "Y"){
                      var element = <HTMLInputElement>document.getElementById("nextDayRedPack");
                      element = <HTMLInputElement>document.getElementById("nextDayRedPack");
                      element.checked = true;
                      this.nextDayRedPack = "Y";
                    }else{
                      this.nextDayRedPack = "N";
                    }

                    this.userParcelRedPack.economic = productArray[i].economic;
                    if(this.userParcelRedPack.economic == "Y"){
                      var element = <HTMLInputElement>document.getElementById("economicRedPack");
                      element = <HTMLInputElement>document.getElementById("economicRedPack");
                      element.checked = true;
                      this.economicRedPack = "Y";
                    }else{
                      this.economicRedPack = "N";
                    }

                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelRedPack.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelRedPack.limitedGuidesNumber = 0;
                    }
                    this.userParcelRedPack.percentageDeclared = productArray[i].percentageDeclared;
                    this.userParcelRedPack.reference = productArray[i].reference;
                  }
                }
              }
              this.loadProductsRedPack = true;
              this.productService.getProductsByUser().subscribe(
                (responseProductsUser) =>{
                  if(!responseProductsUser){
                    this.loading = false;
                    this.petitionError = true;
                  }else{
                    var productsUser = responseProductsUser;
                    let counterFounded:number = 0;
                    this.parcelService.getProductsByParcel(parcelId).subscribe(
                      (successResponse) => {
                          if(!successResponse){
                            this.loading = false;
                            this.petitionError = true;
                          }else{
                            var productArray = successResponse;
                            this.response = successResponse;
                            this.productsRedPack = [];
                            for (var i = 0; i < productArray.length; i++) {
                              if(productArray[i].name.indexOf('Economico') >= 0){
                                this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor));
                              }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                                this.productNextDayRedPack.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }else{
                                this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor));
                              }
                              this.productsRedPack.push(
                                new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor)
                              );
                            }
                            for(let i=0; i<productsUser.length; i++){
                              for(let j=0; j<this.productsRedPack.length; j++){
                                if(productsUser[i].productId == this.productsRedPack[j].id){
                                  counterFounded++;
                                }
                              }
                            }
                            if(counterFounded < 1){
                              this.loadedRedPack = true;
                              this.existProductsRedPack = false;
                              if(this.userParcelRedPack && this.userParcelRedPack.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                element.checked = true;
                                this.guidesRedPack = true;
                              }
                              this.petitionError = false;

                            }else{
                              this.loadedRedPack = true;
                              this.existProductsRedPack = true;
                              //Cargar elementos pagados
                              var productArray = successResponse;
                              this.response = successResponse;
                              this.productsRedPack = [];
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].name.indexOf('Economico') >= 0){
                                  this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor));
                                }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                                  this.productNextDayRedPack.push(
                                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                            productArray[i].kg, productArray[i].factor)
                                  );
                                }else{
                                  this.productEconomicRedPack.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor));
                                }
                                this.productsRedPack.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }
                              if(this.userParcelRedPack && this.userParcelRedPack.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                element.checked = true;
                                this.guidesRedPack = true;
                              }
                              this.petitionError = false;
                              this.productUserPriceRedPack = [];
                              for(var i = 0; i < responseProductsUser.length; i++) {
                                for(var j=0; j < this.productsRedPack.length; j++){
                                  if(responseProductsUser[i].productId == this.productsRedPack[j].id){
                                    if(this.productsRedPack[j].name.indexOf('Economico') >= 0){
                                      this.productUserPriceEconomicRedPack.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsRedPack[j].name)
                                      );
                                    }else if(this.productsRedPack[j].name.indexOf('Dia Siguiente') >= 0){
                                      this.productUserPriceNextDayRedPack.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsRedPack[j].name)
                                      );
                                    }else{
                                      this.productUserPriceEconomicRedPack.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsRedPack[j].name)
                                      );
                                    }
                                    this.productUserPriceRedPack.push(
                                      new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsRedPack[j].name)
                                    );
                                  }
                                }
                              }
                            }
                          }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }else{
      this.redPackForm = false;
      this.guidesRedPack = false;
      this.loadProductsRedPack = false;
    }
  }

  checkPaidGuidesPaqueteExpress(){
    var element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
    element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
    if(element.checked == true){
      this.guidesPaqueteExpress = true;
    }else{
      this.guidesPaqueteExpress = false;
    }
  }

  checkPaqueteExpress(){
    var element = <HTMLInputElement>document.getElementById("paqueteExpress");
    element = <HTMLInputElement>document.getElementById("paqueteExpress");
    if(element.checked == true){
      this.paqueteExpressForm = true;
      let parcelId:number = 5;
      if(this.productService.operation == 0){
        this.parcelService.getProductsByParcel(parcelId).subscribe(
          (successResponse) => {
              if(!successResponse){
                this.loading = false;
                this.petitionError = true;
              }else{
                var productArray = successResponse;
                this.response = successResponse;
                this.productsPaqueteExpress = [];
                for (var i = 0; i < productArray.length; i++) {
                  this.productsPaqueteExpress.push(
                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor)
                  );
                }
                if(this.userParcelPaqueteExpress && this.userParcelPaqueteExpress.limitGuides == 'Y'){
                  var element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                  element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                  element.checked = true;
                  this.guidesPaqueteExpress = true;
                }
                this.petitionError = false;
              }
          }
        );
        this.errorParcelData = false;
      }else if(this.productService.operation == 1){
        this.productService.getParcelsFromUser().subscribe(
          (responseParcels) =>{
            if(!responseParcels){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = responseParcels;
              this.userParcelPaqueteExpress = new User_Parcel();
              for (var i = 0; i < productArray.length; i++) {
                if(productArray[i].parcelId == 5){
                  this.userParcelPaqueteExpress.userId = productArray[i].userId;
                  this.userParcelPaqueteExpress.parcelId = productArray[i].parcelId;
                  this.userParcelPaqueteExpress.password = productArray[i].password;
                  if(this.userParcelPaqueteExpress.password == "n"){
                    this.userParcelPaqueteExpress.password = "";
                    this.userParcelPaqueteExpress.username = "";
                    this.userParcelPaqueteExpress.commissionDeclared = 0;
                    this.userParcelPaqueteExpress.extendedArea = 0;
                    this.userParcelPaqueteExpress.limitGuides = "";
                    this.userParcelPaqueteExpress.printType = "";
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelPaqueteExpress.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelPaqueteExpress.limitedGuidesNumber = 0;
                    }
                    this.userParcelPaqueteExpress.percentageDeclared = 0;
                    this.userParcelPaqueteExpress.reference = "";

                  }else{
                    this.userParcelPaqueteExpress.username = productArray[i].username;
                    this.userParcelPaqueteExpress.commissionDeclared = productArray[i].commissionDeclared;
                    this.userParcelPaqueteExpress.extendedArea = productArray[i].extendedArea;
                    this.userParcelPaqueteExpress.limitGuides = productArray[i].limitGuides;
                    this.userParcelPaqueteExpress.printType =  productArray[i].printType;
                    if(this.userParcelPaqueteExpress.printType =="P"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("pdfPaquete");
                        element.checked = true; }, 500);
                    }else if(this.userParcelFedEx.printType =="Z"){
                        setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("zebraPaquete");
                        element.checked = true; }, 500);
                    }
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelPaqueteExpress.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelPaqueteExpress.limitedGuidesNumber = 0;
                    }
                    this.userParcelPaqueteExpress.percentageDeclared = productArray[i].percentageDeclared;
                    this.userParcelPaqueteExpress.reference = productArray[i].reference;
                  }

                }
              }
              this.loadProductsPaqueteExpress = true;
              this.productService.getProductsByUser().subscribe(
                (responseProductsUser) =>{
                  if(!responseProductsUser){
                    this.loading = false;
                    this.petitionError = true;
                  }else{
                    var productsUser = responseProductsUser;
                    let counterFounded:number = 0;
                    this.parcelService.getProductsByParcel(parcelId).subscribe(
                      (successResponse) => {
                          if(!successResponse){
                            this.loading = false;
                            this.petitionError = true;
                          }else{
                            var productArray = successResponse;
                            this.response = successResponse;
                            this.productsPaqueteExpress = [];
                            for (var i = 0; i < productArray.length; i++) {
                              this.productsPaqueteExpress.push(
                                new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor)
                              );
                            }
                            for(let i=0; i<productsUser.length; i++){
                              for(let j=0; j<this.productsPaqueteExpress.length; j++){
                                if(productsUser[i].productId == this.productsPaqueteExpress[j].id){
                                  counterFounded++;
                                }
                              }
                            }
                            if(counterFounded < 1){
                              this.loadedPaquetexpress = true;
                              this.existProductsPaqueteExpress = false;
                              if(this.userParcelPaqueteExpress && this.userParcelPaqueteExpress.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                                element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                                element.checked = true;
                                this.guidesPaqueteExpress = true;
                              }
                              this.petitionError = false;

                            }else{
                              this.loadedPaquetexpress = true;
                              this.existProductsPaqueteExpress = true;
                              //Cargar elementos pagados
                              var productArray = successResponse;
                              this.response = successResponse;
                              this.productsPaqueteExpress = [];
                              for (var i = 0; i < productArray.length; i++) {
                                this.productsPaqueteExpress.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }
                              if(this.userParcelPaqueteExpress && this.userParcelPaqueteExpress.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                                element = <HTMLInputElement>document.getElementById("checkGuidesPaqueteExpress");
                                element.checked = true;
                                this.guidesPaqueteExpress = true;
                              }
                              this.petitionError = false;
                              this.productUserPricePaqueteExpress = [];
                              for(var i = 0; i < responseProductsUser.length; i++) {
                                for(var j=0; j < this.productsPaqueteExpress.length; j++){
                                  if(responseProductsUser[i].productId == this.productsPaqueteExpress[j].id){
                                    this.productUserPricePaqueteExpress.push(
                                      new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsPaqueteExpress[j].name)
                                    );
                                  }
                                }
                              }
                            }
                          }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }else{
      this.paqueteExpressForm = false;
      this.guidesPaqueteExpress = false;
      this.loadProductsPaqueteExpress = false;
    }
  }

  checkPaidGuidesFedEx(){
    var element = <HTMLInputElement>document.getElementById("checkGuideFedEx");
    element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
    if(element.checked == true){
      this.guidesFedEx = true;
    }else{
      this.guidesFedEx = false;
    }
  }

  checkFedEx(){
    var element = <HTMLInputElement>document.getElementById("test7");
    element = <HTMLInputElement>document.getElementById("test7");
    if(element.checked == true){
      this.fedExForm = true;
      let parcelId:number = 3;
      if(this.productService.operation == 0){
        this.parcelService.getProductsByParcel(parcelId).subscribe(
          (successResponse) => {
              if(!successResponse){
                this.loading = false;
                this.petitionError = true;
              }else{
                var productArray = successResponse;
                this.response = successResponse;
                this.productsFedEx = [];
                for (var i = 0; i < productArray.length; i++) {
                  if(productArray[i].name.indexOf('Economico') >= 0){
                    this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor));
                  }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                    this.productNextDayFedEx.push(
                      new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                              productArray[i].kg, productArray[i].factor)
                    );
                  }else{
                    this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor));
                  }
                  this.productsFedEx.push(
                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor)
                  );
                }
                if(this.userParcelFedEx && this.userParcelFedEx.limitGuides == 'Y'){
                  var element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                  element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                  element.checked = true;
                  this.guidesFedEx= true;
                }
                this.petitionError = false;
              }
          }
        );
        this.errorParcelData = false;
      }else if(this.productService.operation == 1){
        this.productService.getParcelsFromUser().subscribe(
          (responseParcels) =>{
            if(!responseParcels){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = responseParcels;
              this.userParcelFedEx = new User_Parcel();
              for (var i = 0; i < productArray.length; i++) {
                if(productArray[i].parcelId == 3){
                  this.userParcelFedEx.userId = productArray[i].userId;
                  this.userParcelFedEx.parcelId = productArray[i].parcelId;
                  this.userParcelFedEx.password = productArray[i].password;
                  if(this.userParcelFedEx.password == "n"){
                    this.userParcelFedEx.password = "";
                    this.userParcelFedEx.username = "";
                    this.userParcelFedEx.commissionDeclared = 0;
                    this.userParcelFedEx.extendedArea = 0;
                    this.userParcelFedEx.limitGuides = "";
                    this.userParcelFedEx.multiPieces = "";
                    this.userParcelFedEx.economic = "";
                    this.userParcelFedEx.nextDay = "";
                    this.userParcelFedEx.thirdAccount = "";
                    this.userParcelFedEx.printType = "";
                    if(this.userParcelFedEx.printType =="P"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("pdf");
                        element.checked = true; }, 500);
                    }else if(this.userParcelFedEx.printType =="Z"){
                        setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("zebra");
                        element.checked = true; }, 500);
                    }
                    if(this.userParcelFedEx.multiPieces == "Y"){
                      var element = <HTMLInputElement>document.getElementById("multipackFedEx");
                      element.checked = true;
                      this.multiPackFedEx = "Y";
                    }else{
                      this.multiPackFedEx = "N";
                    }
                    if(this.userParcelFedEx.economic == "Y"){
                      var element = <HTMLInputElement>document.getElementById("economicFedEx");
                      element.checked = true;
                      this.economicFedEx = "Y";
                    }else{
                      this.economicFedEx = "N";
                    }
                    if(this.userParcelFedEx.nextDay == "Y"){
                      var element = <HTMLInputElement>document.getElementById("nextDayFedEx");
                      element.checked = true;
                      this.nextDayFedEx = "Y";
                    }else{
                      this.nextDayFedEx = "N";
                    }
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelFedEx.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelFedEx.limitedGuidesNumber = 0;
                    }
                    this.userParcelFedEx.percentageDeclared = 0;
                    this.userParcelFedEx.reference = "";

                  }else{
                    this.userParcelFedEx.username = productArray[i].username;
                    this.userParcelFedEx.commissionDeclared = productArray[i].commissionDeclared;
                    this.userParcelFedEx.extendedArea = productArray[i].extendedArea;
                    this.userParcelFedEx.limitGuides = productArray[i].limitGuides;
                    this.userParcelFedEx.multiPieces = productArray[i].multiPieces;
                    this.userParcelFedEx.economic = productArray[i].economic;
                    this.userParcelFedEx.nextDay = productArray[i].nextDay;
                    this.userParcelFedEx.thirdAccount = productArray[i].thirdAccount;
                    this.userParcelFedEx.printType = productArray[i].printType;
                    if(this.userParcelFedEx.printType =="P"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("pdf");
                        element.checked = true; }, 500);
                    }else if(this.userParcelFedEx.printType =="Z"){
                        setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("zebra");
                        element.checked = true; }, 500);
                    }
                    if(this.userParcelFedEx.multiPieces == "Y"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("multipackFedEx");
                        element.checked = true;
                        this.multiPackFedEx = "Y";
                      }, 500);
                    }else{
                      this.multiPackFedEx = "N";
                    }
                    if(this.userParcelFedEx.economic == "Y"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("economicFedEx");
                        element.checked = true;
                        this.economicFedEx = "Y";
                      }, 500);
                    }else{
                      this.economicFedEx = "N";
                    }
                    if(this.userParcelFedEx.nextDay == "Y"){
                      setTimeout( () =>{
                        var element = <HTMLInputElement>document.getElementById("nextDayFedEx");
                        element.checked = true;
                        this.nextDayFedEx = "Y";
                      }, 500);
                    }else{
                      this.nextDayFedEx = "N";
                    }
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelFedEx.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelFedEx.limitedGuidesNumber = 0;
                    }
                    this.userParcelFedEx.percentageDeclared = productArray[i].percentageDeclared;
                    this.userParcelFedEx.reference = productArray[i].reference;
                  }
                }
              }
              this.loadProductsFedEx = true;
              this.productService.getProductsByUser().subscribe(
                (responseProductsUser) =>{
                  if(!responseProductsUser){
                    this.loading = false;
                    this.petitionError = true;
                  }else{
                    var productsUser = responseProductsUser;
                    let counterFounded:number = 0;
                    this.parcelService.getProductsByParcel(parcelId).subscribe(
                      (successResponse) => {
                          if(!successResponse){
                            this.loading = false;
                            this.petitionError = true;
                          }else{
                            var productArray = successResponse;
                            this.response = successResponse;
                            this.productsFedEx = [];
                            for (var i = 0; i < productArray.length; i++) {
                              if(productArray[i].name.indexOf('Economico') >= 0){
                                this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor));
                              }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                                this.productNextDayFedEx.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }else{
                                this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor));
                              }
                              this.productsFedEx.push(
                                new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor)
                              );
                            }
                            for(let i=0; i<productsUser.length; i++){
                              for(let j=0; j<this.productsFedEx.length; j++){
                                if(productsUser[i].productId == this.productsFedEx[j].id){
                                  counterFounded++;
                                }
                              }
                            }
                            if(counterFounded < 1){
                              this.loadedFedEx = true;
                              this.existProductsFedEx = false;
                              if(this.userParcelFedEx && this.userParcelFedEx.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                element.checked = true;
                                this.guidesFedEx = true;
                              }
                              this.petitionError = false;

                            }else{
                              this.loadedFedEx = true;
                              this.existProductsFedEx = true;
                              //Cargar elementos pagados
                              var productArray = successResponse;
                              this.response = successResponse;
                              this.productsFedEx = [];
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].name.indexOf('Economico') >= 0){
                                  this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor));
                                }else if(productArray[i].name.indexOf('Dia Siguiente') >= 0){
                                  this.productNextDayFedEx.push(
                                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                            productArray[i].kg, productArray[i].factor)
                                  );
                                }else{
                                  this.productEconomicFedEx.push(new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor));
                                }
                                this.productsFedEx.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }
                              if(this.userParcelFedEx && this.userParcelFedEx.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                element.checked = true;
                                this.guidesFedEx = true;
                              }
                              this.petitionError = false;
                              this.productUserPriceFedEx = [];
                              for(var i = 0; i < responseProductsUser.length; i++) {
                                for(var j=0; j < this.productsFedEx.length; j++){
                                  if(responseProductsUser[i].productId == this.productsFedEx[j].id){
                                    if(this.productsFedEx[j].name.indexOf('Economico') >= 0){
                                      this.productUserPriceEconomicFedEx.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsFedEx[j].name)
                                      );
                                    }else if(this.productsFedEx[j].name.indexOf('Dia Siguiente') >= 0){
                                      this.productUserPriceNextDayFedEx.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsFedEx[j].name)
                                      );
                                    }else{
                                      this.productUserPriceEconomicFedEx.push(
                                        new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsFedEx[j].name)
                                      );
                                    }
                                    this.productUserPriceFedEx.push(
                                      new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsFedEx[j].name)
                                    );
                                  }
                                }
                              }
                            }
                          }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
      this.errorParcelData = false;
    }else{
      this.fedExForm = false;
      this.guidesFedEx = false;
      this.loadProductsFedEx = false;
    }
  }

  checkPaidGuidesDHL(){
    var element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
    element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
    if(element.checked == true){
      this.guidesDHL = true;
    }else{
      this.guidesDHL = false;
    }
  }

  checkDHL(){
    var element = <HTMLInputElement>document.getElementById("test6");
    element = <HTMLInputElement>document.getElementById("test6");
    if(element.checked == true){
      this.dhlForm = true;
      let parcelId:number = 1;
      if(this.productService.operation == 0){
        this.parcelService.getProductsByParcel(parcelId).subscribe(
          (successResponse) => {
              if(!successResponse){
                this.loading = false;
                this.petitionError = true;
              }else{
                var productArray = successResponse;
                this.response = successResponse;
                this.productsDHL = [];
                for (var i = 0; i < productArray.length; i++) {
                  this.productsDHL.push(
                    new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                            productArray[i].kg, productArray[i].factor)
                  );
                }
                if(this.userParcelDHL && this.userParcelDHL.limitGuides == 'Y'){
                  var element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                  element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                  element.checked = true;
                  this.guidesDHL= true;
                }
                this.petitionError = false;
              }
          }
        );
        this.errorParcelData = false;
      }else if(this.productService.operation == 1){
        this.productService.getParcelsFromUser().subscribe(
          (responseParcels) =>{
            if(!responseParcels){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = responseParcels;
              this.userParcelDHL = new User_Parcel();
              for (var i = 0; i < productArray.length; i++) {
                if(productArray[i].parcelId == 1){
                  this.userParcelDHL.userId = productArray[i].userId;
                  this.userParcelDHL.parcelId = productArray[i].parcelId;
                  this.userParcelDHL.password = productArray[i].password;
                  if(this.userParcelDHL.password == "n"){
                    this.userParcelDHL.password = ""
                    this.userParcelDHL.username = "";
                    this.userParcelDHL.commissionDeclared = 0;
                    this.userParcelDHL.extendedArea = 0;
                    this.userParcelDHL.limitGuides = "";
                    this.userParcelDHL.printType = "";
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelDHL.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelDHL.limitedGuidesNumber = 0;
                    }
                    this.userParcelDHL.percentageDeclared = 0;
                    this.userParcelDHL.reference = "";

                  }else{
                    this.userParcelDHL.username = productArray[i].username;
                    this.userParcelDHL.commissionDeclared = productArray[i].commissionDeclared;
                    this.userParcelDHL.extendedArea = productArray[i].extendedArea;
                    this.userParcelDHL.limitGuides = productArray[i].limitGuides;
                    this.userParcelDHL.printType = "P";
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelDHL.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelDHL.limitedGuidesNumber = 0;
                    }
                    this.userParcelDHL.percentageDeclared = productArray[i].percentageDeclared;
                    this.userParcelDHL.reference = productArray[i].reference;
                  }
                }
              }
              this.loadProductsDHL = true;
              this.productService.getProductsByUser().subscribe(
                (responseProductsUser) =>{
                  if(!responseProductsUser){
                    this.loading = false;
                    this.petitionError = true;
                  }else{
                    var productsUser = responseProductsUser;
                    let counterFounded:number = 0;
                    this.parcelService.getProductsByParcel(parcelId).subscribe(
                      (successResponse) => {
                          if(!successResponse){
                            this.loading = false;
                            this.petitionError = true;
                          }else{
                            var productArray = successResponse;
                            this.response = successResponse;
                            this.productsDHL = [];
                            for (var i = 0; i < productArray.length; i++) {
                              this.productsDHL.push(
                                new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                        productArray[i].kg, productArray[i].factor)
                              );
                            }
                            for(let i=0; i<productsUser.length; i++){
                              for(let j=0; j<this.productsDHL.length; j++){
                                if(productsUser[i].productId == this.productsDHL[j].id){
                                  counterFounded++;
                                }
                              }
                            }
                            if(counterFounded < 1){
                              this.loadedDHL = true;
                              this.existProductsDHL = false;
                              if(this.userParcelDHL && this.userParcelDHL.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                element.checked = true;
                                this.guidesDHL = true;
                              }
                              this.petitionError = false;

                            }else{
                              this.loadedDHL = true;
                              this.existProductsDHL = true;
                              //Cargar elementos pagados
                              var productArray = successResponse;
                              this.response = successResponse;
                              this.productsDHL = [];
                              for (var i = 0; i < productArray.length; i++) {
                                this.productsDHL.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }
                              if(this.userParcelDHL && this.userParcelDHL.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                element.checked = true;
                                this.guidesDHL = true;
                              }
                              this.petitionError = false;
                              this.productUserPriceDHL = [];
                              for(var i = 0; i < responseProductsUser.length; i++) {
                                for(var j=0; j < this.productsDHL.length; j++){
                                  if(responseProductsUser[i].productId == this.productsDHL[j].id){
                                    this.productUserPriceDHL.push(
                                      new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsDHL[j].name)
                                    );
                                  }
                                }
                              }
                            }
                          }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }else{
        this.dhlForm = false;
        this.guidesDHL = false;
        this.loadProductsDHL = false;
    }
  }

  checkPaidGuidesEstafeta(){
    var element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
    element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
    if(element.checked == true){
      this.guidesEstafeta = true;
    }else{
      this.guidesEstafeta = false;
    }
  }

  checkEstafeta(){
    var element = <HTMLInputElement>document.getElementById("test8");
    element = <HTMLInputElement>document.getElementById("test8");
    if(element.checked == true){
      this.estafetaForm = true;
      let parcelId:number = 4;
      if(this.productService.operation == 0){
        this.parcelService.getProductsByParcel(parcelId).subscribe(
          (successResponse) => {
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
                if(this.userParcelEstafeta && this.userParcelEstafeta.limitGuides == 'Y'){
                  var element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                  element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                  element.checked = true;
                  this.guidesEstafeta= true;
                }
                this.petitionError = false;
              }
          }
        );
        this.errorParcelData = false;
      }else if(this.productService.operation == 1){
        this.productService.getParcelsFromUser().subscribe(
          (responseParcels) =>{
            if(!responseParcels){
              this.loading = false;
              this.petitionError = true;
            }else{
              var productArray = responseParcels;
              this.userParcelEstafeta = new User_Parcel();
              for (var i = 0; i < productArray.length; i++) {
                if(productArray[i].parcelId == 4){
                  this.userParcelEstafeta.userId = productArray[i].userId;
                  this.userParcelEstafeta.parcelId = productArray[i].parcelId;
                  this.userParcelEstafeta.password = productArray[i].password;
                  if(this.userParcelEstafeta.password == "n"){
                    this.userParcelEstafeta.username = "";
                    this.userParcelEstafeta.commissionDeclared = 0;
                    this.userParcelEstafeta.extendedArea = 0;
                    this.userParcelEstafeta.limitGuides = "";
                    this.userParcelEstafeta.printType = "";
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelEstafeta.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelEstafeta.limitedGuidesNumber = 0;
                    }
                    this.userParcelEstafeta.percentageDeclared = 0;
                    this.userParcelEstafeta.reference = "";

                  }else{
                    this.userParcelEstafeta.username = productArray[i].username;
                    this.userParcelEstafeta.commissionDeclared = productArray[i].commissionDeclared;
                    this.userParcelEstafeta.extendedArea = productArray[i].extendedArea;
                    this.userParcelEstafeta.limitGuides = productArray[i].limitGuides;
                    this.userParcelEstafeta.printType = "P";
                    if(productArray[i].limitedGuidesNumber > 0){
                      this.userParcelEstafeta.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                    }else{
                      this.userParcelEstafeta.limitedGuidesNumber = 0;
                    }
                    this.userParcelEstafeta.percentageDeclared = productArray[i].percentageDeclared;
                    this.userParcelEstafeta.reference = productArray[i].reference;
                  }
                }
              }
              this.loadProductsEstafeta = true;
              this.productService.getProductsByUser().subscribe(
                (responseProductsUser) =>{
                  if(!responseProductsUser){
                    this.loading = false;
                    this.petitionError = true;
                  }else{
                    var productsUser = responseProductsUser;
                    let counterFounded:number = 0;
                    this.parcelService.getProductsByParcel(parcelId).subscribe(
                      (successResponse) => {
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
                            for(let i=0; i<productsUser.length; i++){
                              for(let j=0; j<this.productsEstafeta.length; j++){
                                if(productsUser[i].productId == this.productsEstafeta[j].id){
                                  counterFounded++;
                                }
                              }
                            }
                            if(counterFounded < 1){
                              this.loadedEstafeta = true;
                              this.existProductsEstafeta = false;
                              if(this.userParcelEstafeta && this.userParcelEstafeta.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                element.checked = true;
                                this.guidesEstafeta = true;
                              }
                              this.petitionError = false;

                            }else{
                              this.loadedEstafeta = true;
                              this.existProductsEstafeta = true;
                              //Cargar elementos pagados
                              var productArray = successResponse;
                              this.response = successResponse;
                              this.productsEstafeta = [];
                              for (var i = 0; i < productArray.length; i++) {
                                this.productsEstafeta.push(
                                  new Product(productArray[i].id, productArray[i].parcelId, productArray[i].name, productArray[i].description,
                                          productArray[i].kg, productArray[i].factor)
                                );
                              }
                              if(this.userParcelEstafeta && this.userParcelEstafeta.limitGuides == 'Y'){
                                var element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                element.checked = true;
                                this.guidesEstafeta = true;
                              }
                              this.petitionError = false;
                              this.productUserPriceEstafeta = [];
                              for(var i = 0; i < responseProductsUser.length; i++) {
                                for(var j=0; j < this.productsEstafeta.length; j++){
                                  if(responseProductsUser[i].productId == this.productsEstafeta[j].id){
                                    this.productUserPriceEstafeta.push(
                                      new User_Product_Price(responseProductsUser[i].userId, responseProductsUser[i].productId, responseProductsUser[i].amount, this.productsEstafeta[j].name)
                                    );
                                  }
                                }
                              }
                            }
                          }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }else{
      this.estafetaForm = false;
      this.guidesEstafeta = false;
    }
  }

  validateNextDayFedEx(){
    var element = <HTMLInputElement>document.getElementById("nextDayFedEx");
    element = <HTMLInputElement>document.getElementById("nextDayFedEx");
    if(element.checked == true){
      this.nextDayFedEx = "Y";
    }else{
      this.nextDayFedEx = "N";
    }
  }

  validateEconomicFedEx(){
    var element = <HTMLInputElement>document.getElementById("economicFedEx");
    element = <HTMLInputElement>document.getElementById("economicFedEx");
    if(element.checked == true){
      this.economicFedEx = "Y";
    }else{
      this.economicFedEx = "N";
    }
  }

  validateMultipackFedEx(){
    var element = <HTMLInputElement>document.getElementById("multipackFedEx");
    element = <HTMLInputElement>document.getElementById("multipackFedEx");
    if(element.checked == true){
      this.multiPackFedEx = "Y";
    }else{
      this.multiPackFedEx = "N";
    }
  }

  validateMultipackRedPack(){
    var element = <HTMLInputElement>document.getElementById("multipackRedPack");
    element = <HTMLInputElement>document.getElementById("multipackRedPack");
    if(element.checked == true){
      this.multiPackRedPack = "Y";
    }else{
      this.multiPackRedPack = "N";
    }
  }

  validateNextDayRedPack(){
    var element = <HTMLInputElement>document.getElementById("nextDayRedPack");
    element = <HTMLInputElement>document.getElementById("nextDayRedPack");
    if(element.checked == true){
      this.nextDayRedPack = "Y";
    }else{
      this.nextDayRedPack = "N";
    }
  }

  validateEconomicRedPack(){
    var element = <HTMLInputElement>document.getElementById("economicRedPack");
    element = <HTMLInputElement>document.getElementById("economicRedPack");
    if(element.checked == true){
      this.economicRedPack = "Y";
    }else{
      this.economicRedPack = "N";
    }
  }

  ngOnInit() {
  }

}
