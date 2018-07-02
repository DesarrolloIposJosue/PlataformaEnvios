import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Product } from '../../classes/Product';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { ProductService } from '../../services/product-service/product.service';
import { User_Parcel } from '../../classes/UserParcel';
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

  public productUserPriceEstafeta:User_Product_Price[] = [];
  public productUserPriceDHL:User_Product_Price[] = [];
  public productUserPriceRedPack:User_Product_Price[] = [];
  public productUserPriceFedEx:User_Product_Price[] = [];
  public productUserPricePaqueteExpress:User_Product_Price[] = [];

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
                var element = <HTMLInputElement>document.getElementById("test6");
                element = <HTMLInputElement>document.getElementById("test6");
                element.checked = true;
                this.checkDHL();
              }else if(productArray[i].parcelId == 2){
                //RedPack test5
                var element = <HTMLInputElement>document.getElementById("test5");
                element = <HTMLInputElement>document.getElementById("test5");
                element.checked = true;
                this.checkRedPack();
              }else if(productArray[i].parcelId == 3){
                //FedEx test7
                var element = <HTMLInputElement>document.getElementById("test7");
                element = <HTMLInputElement>document.getElementById("test7");
                element.checked = true;
                this.checkFedEx();
              }else if(productArray[i].parcelId == 4){
                //Estafeta test8
                var element = <HTMLInputElement>document.getElementById("test8");
                element = <HTMLInputElement>document.getElementById("test8");
                element.checked = true;
                this.checkEstafeta();
              }else if(productArray[i].parcelId == 5){
                //Paquetexpress paqueteExpress
                var element = <HTMLInputElement>document.getElementById("paqueteExpress");
                element = <HTMLInputElement>document.getElementById("paqueteExpress");
                element.checked = true;
                this.checkPaqueteExpress();
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
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
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
      if(this.userParcelRedPack && this.userParcelRedPack.extendedArea != undefined){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = this.userParcelRedPack.parcelId;
        parcInfoInd.userId = this.userParcelRedPack.userId;
        parcInfoInd.username = this.userParcelRedPack.username;
        parcInfoInd.password = this.userParcelRedPack.password;
        parcInfoInd.commissionDeclared = this.userParcelRedPack.commissionDeclared;
        parcInfoInd.extendedArea = this.userParcelRedPack.extendedArea;
        parcInfoInd.percentageDeclared = this.userParcelRedPack.percentageDeclared;
        parcInfoInd.reference = this.userParcelRedPack.reference;
        parcInfoInd.limitGuides = this.userParcelRedPack.limitGuides;
        parcInfoInd.limitedGuidesNumber = this.userParcelRedPack.limitedGuidesNumber;
        parcInfoInd.multiPieces = this.userParcelRedPack.multiPieces;
        parcInfoInd.thirdAccount = "";
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
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
      if(this.userParcelFedEx && this.userParcelFedEx.extendedArea != undefined){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = this.userParcelFedEx.parcelId;
        parcInfoInd.userId = this.userParcelFedEx.userId;
        parcInfoInd.username = this.userParcelFedEx.username;
        parcInfoInd.password = this.userParcelFedEx.password;
        parcInfoInd.commissionDeclared = this.userParcelFedEx.commissionDeclared;
        parcInfoInd.extendedArea = this.userParcelFedEx.extendedArea;
        parcInfoInd.percentageDeclared = this.userParcelFedEx.percentageDeclared;
        parcInfoInd.reference = this.userParcelFedEx.reference;
        parcInfoInd.limitGuides = this.userParcelFedEx.limitGuides;
        parcInfoInd.limitedGuidesNumber = this.userParcelFedEx.limitedGuidesNumber;
        parcInfoInd.multiPieces = this.userParcelFedEx.multiPieces;
        parcInfoInd.thirdAccount = forma.controls["thirdAccountFedEx"].value;
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
      if(this.userParcelDHL && this.userParcelDHL.extendedArea != undefined){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = this.userParcelDHL.parcelId;
        parcInfoInd.userId = this.userParcelDHL.userId;
        parcInfoInd.username = this.userParcelDHL.username;
        parcInfoInd.password = this.userParcelDHL.password;
        parcInfoInd.commissionDeclared = this.userParcelDHL.commissionDeclared;
        parcInfoInd.extendedArea = this.userParcelDHL.extendedArea;
        parcInfoInd.percentageDeclared = this.userParcelDHL.percentageDeclared;
        parcInfoInd.reference = this.userParcelDHL.reference;
        parcInfoInd.limitGuides = this.userParcelDHL.limitGuides;
        parcInfoInd.limitedGuidesNumber = this.userParcelDHL.limitedGuidesNumber;
        parcInfoInd.multiPieces = 'N';
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
        parcInfoInd.thirdAccount = "";
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
      if(this.userParcelEstafeta && this.userParcelEstafeta.extendedArea != undefined){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = this.userParcelEstafeta.parcelId;
        parcInfoInd.userId = this.userParcelEstafeta.userId;
        parcInfoInd.username = this.userParcelEstafeta.username;
        parcInfoInd.password = this.userParcelEstafeta.password;
        parcInfoInd.commissionDeclared = this.userParcelEstafeta.commissionDeclared;
        parcInfoInd.extendedArea = this.userParcelEstafeta.extendedArea;
        parcInfoInd.percentageDeclared = this.userParcelEstafeta.percentageDeclared;
        parcInfoInd.reference = this.userParcelEstafeta.reference;
        parcInfoInd.limitGuides = this.userParcelEstafeta.limitGuides;
        parcInfoInd.limitedGuidesNumber = this.userParcelEstafeta.limitedGuidesNumber;
        parcInfoInd.thirdAccount = "";
        parcInfoInd.multiPieces = 'N';
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
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
      if(this.userParcelPaqueteExpress && this.userParcelPaqueteExpress.extendedArea != undefined){
        parcInfoInd = new User_Parcel;
        parcInfoInd.parcelId = this.userParcelPaqueteExpress.parcelId;
        parcInfoInd.userId = this.userParcelPaqueteExpress.userId;
        parcInfoInd.username = this.userParcelPaqueteExpress.username;
        parcInfoInd.password = this.userParcelPaqueteExpress.password;
        parcInfoInd.commissionDeclared = this.userParcelPaqueteExpress.commissionDeclared;
        parcInfoInd.extendedArea = this.userParcelPaqueteExpress.extendedArea;
        parcInfoInd.percentageDeclared = this.userParcelPaqueteExpress.percentageDeclared;
        parcInfoInd.reference = this.userParcelPaqueteExpress.reference;
        parcInfoInd.limitGuides = this.userParcelPaqueteExpress.limitGuides;
        parcInfoInd.limitedGuidesNumber = this.userParcelPaqueteExpress.limitedGuidesNumber;
        parcInfoInd.multiPieces = 'N';
        parcInfoInd.economic = "Y";
        parcInfoInd.nextDay = "Y";
        parcInfoInd.thirdAccount = "";
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productUserPricePaqueteExpress.length; j++)
        {
          prodUserInfo.push(new User_Product(0, this.productUserPricePaqueteExpress[j].productId, this.productUserPricePaqueteExpress[j].amount));
        }
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
                  this.userParcelRedPack.username = productArray[i].username;
                  this.userParcelRedPack.commissionDeclared = productArray[i].commissionDeclared;
                  this.userParcelRedPack.extendedArea = productArray[i].extendedArea;
                  this.userParcelRedPack.limitGuides = productArray[i].limitGuides;
                  this.userParcelRedPack.multiPieces = productArray[i].multiPieces;
                  if(this.userParcelRedPack.multiPieces == "Y"){
                    var element = <HTMLInputElement>document.getElementById("multipackRedPack");
                    element = <HTMLInputElement>document.getElementById("multipackRedPack");
                    element.checked = true;
                    this.multiPackRedPack = "Y";
                  }else{
                    this.multiPackRedPack = "N";
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
                  this.userParcelPaqueteExpress.username = productArray[i].username;
                  this.userParcelPaqueteExpress.commissionDeclared = productArray[i].commissionDeclared;
                  this.userParcelPaqueteExpress.extendedArea = productArray[i].extendedArea;
                  this.userParcelPaqueteExpress.limitGuides = productArray[i].limitGuides;
                  if(productArray[i].limitedGuidesNumber > 0){
                    this.userParcelPaqueteExpress.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                  }else{
                    this.userParcelPaqueteExpress.limitedGuidesNumber = 0;
                  }
                  this.userParcelPaqueteExpress.percentageDeclared = productArray[i].percentageDeclared;
                  this.userParcelPaqueteExpress.reference = productArray[i].reference;
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
                  this.userParcelFedEx.username = productArray[i].username;
                  this.userParcelFedEx.commissionDeclared = productArray[i].commissionDeclared;
                  this.userParcelFedEx.extendedArea = productArray[i].extendedArea;
                  this.userParcelFedEx.limitGuides = productArray[i].limitGuides;
                  this.userParcelFedEx.multiPieces = productArray[i].multiPieces;
                  this.userParcelFedEx.economic = productArray[i].economic;
                  this.userParcelFedEx.nextDay = productArray[i].nextDay;
                  this.userParcelFedEx.thirdAccount = productArray[i].thirdAccount;
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
                  this.userParcelFedEx.percentageDeclared = productArray[i].percentageDeclared;
                  this.userParcelFedEx.reference = productArray[i].reference;
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
                  this.userParcelDHL.username = productArray[i].username;
                  this.userParcelDHL.commissionDeclared = productArray[i].commissionDeclared;
                  this.userParcelDHL.extendedArea = productArray[i].extendedArea;
                  this.userParcelDHL.limitGuides = productArray[i].limitGuides;
                  if(productArray[i].limitedGuidesNumber > 0){
                    this.userParcelDHL.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                  }else{
                    this.userParcelDHL.limitedGuidesNumber = 0;
                  }
                  this.userParcelDHL.percentageDeclared = productArray[i].percentageDeclared;
                  this.userParcelDHL.reference = productArray[i].reference;
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
                  this.userParcelEstafeta.username = productArray[i].username;
                  this.userParcelEstafeta.commissionDeclared = productArray[i].commissionDeclared;
                  this.userParcelEstafeta.extendedArea = productArray[i].extendedArea;
                  this.userParcelEstafeta.limitGuides = productArray[i].limitGuides;
                  if(productArray[i].limitedGuidesNumber > 0){
                    this.userParcelEstafeta.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                  }else{
                    this.userParcelEstafeta.limitedGuidesNumber = 0;
                  }
                  this.userParcelEstafeta.percentageDeclared = productArray[i].percentageDeclared;
                  this.userParcelEstafeta.reference = productArray[i].reference;
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

  ngOnInit() {
  }

}
