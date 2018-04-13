import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Product } from '../../classes/Product';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { ProductService } from '../../services/product-service/product.service';
import { User_Parcel } from '../../classes/UserParcel';
import { User_Product } from '../../classes/UserProduct';
import { User_Product_Price } from '../../classes/UserProductPrice';
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
  private responseProductPrice:any;

  public productsEstafeta:Product[] = [];
  public productsDHL:Product[] = [];
  public productsRedPack:Product[] = [];
  public productsFedEx:Product[] = [];

  public productsPricesEstafeta:User_Product[] = [];
  public productsPricesDHL:User_Product[] = [];
  public productsPricesFedEx:User_Product[] = [];
  public productsPricesRedPack:User_Product[] = [];


  public productUserPriceEstafeta:User_Product_Price[] = [];
  public productUserPriceDHL:User_Product_Price[] = [];
  public productUserPriceRedPack:User_Product_Price[] = [];
  public productUserPriceFedEx:User_Product_Price[] = [];

  public userParcelEstafeta:User_Parcel;
  public userParcelDHL:User_Parcel;
  public userParcelRedPack:User_Parcel;
  public userParcelFedEx:User_Parcel;

  public errorParcelData:boolean = false;
  public errorAddParcelsToClient:boolean = false;

  private guidesEstafeta:boolean = false;
  private guidesRedPack:boolean = false;
  private guidesDHL:boolean = false;
  private guidesFedEx:boolean = false;

  constructor(
    private parcelService:ParcelService,
    private router:Router,
    private productService: ProductService
  ) {
  }

  assignParcel(forma:NgForm){

    console.log(forma.controls["extAreaEstafeta"].value);
    console.log(forma.controls["referenceEstafeta"].value);
    console.log(forma.controls["porcValDeclEstafeta"].value);
    console.log(forma.controls["comitionEstafeta"].value);

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
        if(this.guidesRedPack){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesRedPack"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        console.log(parcInfoInd);
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productsRedPack.length; j++)
        {
          var elementAux = <HTMLInputElement>document.getElementById(this.productsRedPack[j].id.toString());
          prodUserInfo.push(new User_Product(0, this.productsRedPack[j].id, Number(elementAux.value)));
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
        if(this.guidesFedEx){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesFedEx"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        console.log(parcInfoInd);
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productsFedEx.length; j++)
        {
          var elementAux = <HTMLInputElement>document.getElementById(this.productsFedEx[j].id.toString());
          prodUserInfo.push(new User_Product(0, this.productsFedEx[j].id, Number(elementAux.value)));
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
        if(this.guidesDHL){
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesDHL"].value;
        }else{
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        console.log(parcInfoInd);
        parcInfo.push(parcInfoInd);
        for(var j=0; j<this.productsDHL.length; j++)
        {
          var elementAux = <HTMLInputElement>document.getElementById(this.productsDHL[j].id.toString());
          prodUserInfo.push(new User_Product(0, this.productsDHL[j].id, Number(elementAux.value)));
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
        if(this.guidesEstafeta){
          console.log("Entre true");
          parcInfoInd.limitGuides = 'Y';
          parcInfoInd.limitedGuidesNumber = forma.controls["qtyGuidesEstafeta"].value;
        }else{
          console.log("Entre true");
          parcInfoInd.limitGuides = 'N';
          parcInfoInd.limitedGuidesNumber = 0;
        }
        console.log(parcInfoInd);
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
              this.petitionError = false;

              //Edit
              if(this.productService.operation == 1){
                this.productService.getProductsByUser().subscribe(
                  (responseProducts) =>{
                      if(!responseProducts){
                        this.loading = false;
                        this.petitionError = true;
                      }else{
                        var productArray = responseProducts;
                        this.responseProductPrice = responseProducts;
                        this.productsPricesRedPack = [];
                        for (var i = 0; i < productArray.length; i++) {
                          this.productsPricesRedPack.push(
                            new User_Product(productArray[i].userId, productArray[i].productId, productArray[i].amount)
                          );
                        }

                        this.productUserPriceRedPack = [];
                        for(var i = 0; i < productArray.length; i++) {
                          for(var j=0; j < this.productsRedPack.length; j++){
                            if(productArray[i].productId == this.productsRedPack[j].id){
                              this.productUserPriceRedPack.push(
                                new User_Product_Price(productArray[i].userId, productArray[i].productId, productArray[i].amount, this.productsEstafeta[j].name)
                              );
                            }
                          }
                        }

                        this.productService.getParcelsFromUser().subscribe(
                          (responseParcels) =>{
                            console.log(responseParcels)
                            if(!responseParcels){
                              this.loading = false;
                              this.petitionError = true;
                            }else{
                              var productArray = responseParcels;
                              this.userParcelRedPack = new User_Parcel();
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].parcelId == parcelId){
                                  this.userParcelRedPack.password = productArray[i].password;
                                  this.userParcelRedPack.username = productArray[i].username;
                                  this.userParcelRedPack.commissionDeclared = productArray[i].commissionDeclared;
                                  this.userParcelRedPack.extendedArea = productArray[i].extendedArea;
                                  this.userParcelRedPack.limitGuides = productArray[i].limitGuides;
                                  this.userParcelRedPack.limitedGuidesNumber = 0;
                                  this.userParcelRedPack.percentageDeclared = productArray[i].percentageDeclared;
                                  this.userParcelRedPack.reference = productArray[i].reference;
                                  if(this.userParcelRedPack.limitGuides == 'Y'){
                                    var element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                    element = <HTMLInputElement>document.getElementById("checkGuidesRedPack");
                                    element.checked = true;
                                    this.guidesRedPack = true;
                                    this.userParcelRedPack.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                                  }
                                }
                              }
                            }
                          }
                        );
                        this.petitionError = false;
                      }

                  }
                );
              }
            }
        }
      );
      this.errorParcelData = false;
    }else{
      this.redPackForm = false;
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
              console.log(this.productsFedEx);
              this.petitionError = false;

              //Edit
              if(this.productService.operation == 1){
                this.productService.getProductsByUser().subscribe(
                  (responseProducts) =>{
                      if(!responseProducts){
                        this.loading = false;
                        this.petitionError = true;
                      }else{
                        var productArray = responseProducts;
                        console.log(responseProducts);
                        this.responseProductPrice = responseProducts;
                        this.productsPricesFedEx = [];
                        for (var i = 0; i < productArray.length; i++) {
                          this.productsPricesFedEx.push(
                            new User_Product(productArray[i].userId, productArray[i].productId, productArray[i].amount)
                          );
                        }

                        this.productUserPriceFedEx = [];
                        for(var i = 0; i < productArray.length; i++) {
                          for(var j=0; j < this.productsFedEx.length; j++){
                            if(productArray[i].productId == this.productsFedEx[j].id){
                              this.productUserPriceFedEx.push(
                                new User_Product_Price(productArray[i].userId, productArray[i].productId, productArray[i].amount, this.productsEstafeta[j].name)
                              );
                            }
                          }
                        }
                        console.log("A ver");
                        console.log(this.productUserPriceFedEx);

                        this.productService.getParcelsFromUser().subscribe(
                          (responseParcels) =>{
                            console.log(responseParcels)
                            if(!responseParcels){
                              this.loading = false;
                              this.petitionError = true;
                            }else{
                              var productArray = responseParcels;
                              this.userParcelFedEx = new User_Parcel();
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].parcelId == parcelId){
                                  this.userParcelFedEx.password = productArray[i].password;
                                  this.userParcelFedEx.username = productArray[i].username;
                                  this.userParcelFedEx.commissionDeclared = productArray[i].commissionDeclared;
                                  this.userParcelFedEx.extendedArea = productArray[i].extendedArea;
                                  this.userParcelFedEx.limitGuides = productArray[i].limitGuides;
                                  this.userParcelFedEx.limitedGuidesNumber = 0;
                                  this.userParcelFedEx.percentageDeclared = productArray[i].percentageDeclared;
                                  this.userParcelFedEx.reference = productArray[i].reference;
                                  if(this.userParcelFedEx.limitGuides == 'Y'){
                                    var element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                    element = <HTMLInputElement>document.getElementById("checkGuidesFedEx");
                                    element.checked = true;
                                    this.guidesFedEx = true;
                                    this.userParcelFedEx.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                                  }
                                }
                              }
                            }
                          }
                        );
                        this.petitionError = false;
                      }

                  }
                );
              }
            }
        }
      );
      this.errorParcelData = false;
    }else{
      this.fedExForm = false;
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
              this.petitionError = false;

              //Edit
              if(this.productService.operation == 1){
                this.productService.getProductsByUser().subscribe(
                  (responseProducts) =>{
                      if(!responseProducts){
                        this.loading = false;
                        this.petitionError = true;
                      }else{
                        var productArray = responseProducts;
                        this.responseProductPrice = responseProducts;
                        this.productsPricesDHL = [];
                        for (var i = 0; i < productArray.length; i++) {
                          this.productsPricesDHL.push(
                            new User_Product(productArray[i].userId, productArray[i].productId, productArray[i].amount)
                          );
                        }

                        this.productUserPriceDHL = [];
                        for(var i = 0; i < productArray.length; i++) {
                          for(var j=0; j < this.productsDHL.length; j++){
                            if(productArray[i].productId == this.productsDHL[j].id){
                              this.productUserPriceDHL.push(
                                new User_Product_Price(productArray[i].userId, productArray[i].productId, productArray[i].amount, this.productsEstafeta[j].name)
                              );
                            }
                          }
                        }

                        this.productService.getParcelsFromUser().subscribe(
                          (responseParcels) =>{
                            console.log(responseParcels)
                            if(!responseParcels){
                              this.loading = false;
                              this.petitionError = true;
                            }else{
                              var productArray = responseParcels;
                              this.userParcelDHL = new User_Parcel();
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].parcelId == parcelId){
                                  this.userParcelDHL.password = productArray[i].password;
                                  this.userParcelDHL.username = productArray[i].username;
                                  this.userParcelDHL.commissionDeclared = productArray[i].commissionDeclared;
                                  this.userParcelDHL.extendedArea = productArray[i].extendedArea;
                                  this.userParcelDHL.limitGuides = productArray[i].limitGuides;
                                  this.userParcelDHL.limitedGuidesNumber = 0;
                                  this.userParcelDHL.percentageDeclared = productArray[i].percentageDeclared;
                                  this.userParcelDHL.reference = productArray[i].reference;
                                  if(this.userParcelDHL.limitGuides == 'Y'){
                                    var element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                    element = <HTMLInputElement>document.getElementById("checkGuidesDHL");
                                    element.checked = true;
                                    this.guidesDHL = true;
                                    this.userParcelDHL.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                                  }
                                }
                              }
                            }
                          }
                        );
                        this.petitionError = false;
                      }

                  }
                );
              }
            }
        }
      );
      this.errorParcelData = false;
    }else{
        this.dhlForm = false;
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
              this.petitionError = false;

              //Edit
              if(this.productService.operation == 1){
                this.productService.getProductsByUser().subscribe(
                  (responseProducts) =>{
                      if(!responseProducts){
                        this.loading = false;
                        this.petitionError = true;
                      }else{
                        var productArray = responseProducts;
                        this.responseProductPrice = responseProducts;
                        this.productsPricesEstafeta = [];
                        for (var i = 0; i < productArray.length; i++) {
                          this.productsPricesEstafeta.push(
                            new User_Product(productArray[i].userId, productArray[i].productId, productArray[i].amount)
                          );
                        }

                        this.productUserPriceEstafeta = [];
                        for(var i = 0; i < productArray.length; i++) {
                          for(var j=0; j < this.productsEstafeta.length; j++){
                            if(productArray[i].productId == this.productsEstafeta[j].id){
                              this.productUserPriceEstafeta.push(
                                new User_Product_Price(productArray[i].userId, productArray[i].productId, productArray[i].amount, this.productsEstafeta[j].name)
                              );
                            }
                          }
                        }

                        this.productService.getParcelsFromUser().subscribe(
                          (responseParcels) =>{
                            console.log(responseParcels)
                            if(!responseParcels){
                              this.loading = false;
                              this.petitionError = true;
                            }else{
                              var productArray = responseParcels;
                              this.userParcelEstafeta = new User_Parcel();
                              for (var i = 0; i < productArray.length; i++) {
                                if(productArray[i].parcelId == parcelId){
                                  this.userParcelEstafeta.password = productArray[i].password;
                                  this.userParcelEstafeta.username = productArray[i].username;
                                  this.userParcelEstafeta.commissionDeclared = productArray[i].commissionDeclared;
                                  this.userParcelEstafeta.extendedArea = productArray[i].extendedArea;
                                  this.userParcelEstafeta.limitGuides = productArray[i].limitGuides;
                                  this.userParcelEstafeta.limitedGuidesNumber = 0;
                                  this.userParcelEstafeta.percentageDeclared = productArray[i].percentageDeclared;
                                  this.userParcelEstafeta.reference = productArray[i].reference;
                                  if(this.userParcelEstafeta.limitGuides == 'Y'){
                                    var element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                    element = <HTMLInputElement>document.getElementById("checkGuidesEstafeta");
                                    element.checked = true;
                                    this.guidesEstafeta = true;
                                    this.userParcelEstafeta.limitedGuidesNumber = productArray[i].limitedGuidesNumber;
                                  }
                                }
                              }
                            }
                          }
                        );
                        this.petitionError = false;
                      }

                  }
                );
              }
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
