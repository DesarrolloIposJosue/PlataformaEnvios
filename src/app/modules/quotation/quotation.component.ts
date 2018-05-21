import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { NgForm } from '@angular/forms';
import { Package } from '../../classes/Package';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { RateService } from '../../services/rate-service/rate.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { Rate } from '../../classes/Rate';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from '../../classes/Client';

import { DownloadGuideService } from '../../services/download-guide-service/download-guide.service';

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


  constructor(
    private auth: AuthService,
    private rateService: RateService,
    private router: Router,
    private createGuideService:CreateGuideService,
    private download:DownloadGuideService
  ) {
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });

    var obj = JSON.parse(sessionStorage.getItem('ActualUser')); // An object :D
    let user:User = new User(obj.id, obj.name, obj.lastName, obj.userName, obj.password, obj.address, obj.email, obj.typeId, obj.address2,
  obj.colony, obj.city, obj.state, obj.zip, obj.country, obj.phoneNumber);

    this.createGuideService.userActual = user;

    console.log(user);
  }

  ngOnInit() {

  }

  checkSeguro(){
    var element = <HTMLInputElement>document.getElementById("seguro");
    element = <HTMLInputElement>document.getElementById("seguro");
    if(element.checked == true){
      this.seguro = true;
    }else{
      this.seguro = false;
    }
  }

  addQuotation(forma:NgForm){
    this.loading = true;
    let insurance:number = 0;

    if(!forma.valid){
          this.invalidForm = true;
          this.loading = false;
    }else{
      this.invalidForm = false;
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
      }else{
        insurance = 0;
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
          }else{
            var rateArray = jsonData;
            this.response = jsonData;
            this.dataProducts = [];
            for (var i = 0; i < rateArray.length; i++) {
              this.dataProducts.push(
                new Rate(rateArray[i].id, rateArray[i].name, rateArray[i].description,
                        rateArray[i].kg, rateArray[i].factor, rateArray[i].parcelId,
                        rateArray[i].amount, rateArray[i].parcelName, rateArray[i].deliveryDateSpecified,
                         rateArray[i].deliveryDate, rateArray[i].amountDetails));
            }
            console.log(this.dataProducts);
            this.rateService.dataProducts = this.dataProducts;
            this.petitionError = false;
            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.destinyCity = forma.controls["dest_city"].value;
            console.log(this.createGuideService.destinyCity);
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
            console.log(this.createGuideService.zip);
            this.createGuideService.destinyZip = forma.controls["postal_code_dest"].value;
            console.log(this.createGuideService.destinyZip);
            this.createGuideService.packageType = forma.controls["kindPackage"].value;
          }
          this.router.navigate(['/show-rate']);
        });
      }else{
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
