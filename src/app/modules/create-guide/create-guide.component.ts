import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

import { User } from '../../classes/Client';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { Shipment } from '../../classes/Shipment';

import {CreateGuideService} from '../../services/create-guide-service/create-guide.service';

@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.css']
})

export class CreateGuideComponent implements OnInit {

  private dataGuide:DataAuxGuide;
  private parcelId:number;
  private productId:number;
  private packageType:number;
  private city:string;
  private destCity:string;
  private client:User;
  private zip:string;
  private destZip:string;
  private clientName:string

  loading:boolean;
  private invalidForm:boolean = false;
  private petitionError = false;

  private shpCode:string;
  private dlvyType:string;
  private packageContent:string;


  constructor(
    private router: Router,
    private el: ElementRef,
    private createGuideservice:CreateGuideService
  ) {
    this.dataGuide = createGuideservice.dataAuxGuide;
    this.client = createGuideservice.userActual;
    this.productId = createGuideservice.productId;
    this.parcelId = createGuideservice.parcelId;
    this.packageType = createGuideservice.packageType;
    this.city = createGuideservice.city;
    this.destCity = createGuideservice.destinyCity;
    console.log(this.destCity);
    this.zip = createGuideservice.zip;
    this.destZip = createGuideservice.destinyZip;
    console.log(this.destZip);
    this.clientName = this.client.name + " " + this.client.lastName;
    console.log(this.clientName);
   }

  ngOnInit() {

  }

  createGuide(forma:NgForm){
    this.loading = true;

    if(!forma.valid){
          this.invalidForm = true;
          this.loading = false;
    }else{
      this.invalidForm = false;
      const shipment: Shipment = {
        id: 0,
        userId: this.client.id,
        parcelId: this.parcelId,
        productId: this.productId,
        totalAmount: 0,
        amountDetail: "",

        originCompany: forma.controls["originCompany"].value,
        originAddress: forma.controls["originAddress"].value,
        originAddress2: forma.controls["originAddress2"].value,
        originColony: forma.controls["originColony"].value,
        originCity: forma.controls["originCity"].value,
        originState: forma.controls["originState"].value,
        originZip: forma.controls["originZip"].value,
        originCountry: forma.controls["originCountry"].value,
        originPhoneNumber: forma.controls["originPhoneNumber"].value,
        originUserName: forma.controls["originUserName"].value,

        destinyCompany: forma.controls["destinyCompany"].value,
        destinyAddress: forma.controls["destinyAddress"].value,
        destinyAddress2: forma.controls["destinyAddress2"].value,
        destinyColony: forma.controls["destinyColony"].value,
        destinyCity: forma.controls["destinyCity"].value,
        destinyState: forma.controls["destinyState"].value,
        destinyZip: forma.controls["destinyZip"].value,
        destinyCountry: forma.controls["destinyCountry"].value,
        destinyPhoneNumber: forma.controls["destinyPhoneNumber"].value,
        destinyUserName: forma.controls["destinyUserName"].value,

        trackingKey: "",
        status: "Generando",

        weight: this.dataGuide.weight,
        length: this.dataGuide.long,
        width: this.dataGuide.width,
        height: this.dataGuide.hight,
        insurance: this.dataGuide.insurance
      }
      console.log(shipment);

      if(this.packageType == 1){
        this.shpCode = "1"
      }else{
        this.shpCode = forma.controls["destinyUserName"].value;
      }

      this.dlvyType = forma.controls["dlvyType"].value;
      this.packageContent = forma.controls["packageContent"].value;

      if(this.parcelId == 3){
        this.createGuideservice.GenerateGuideFedEx(shipment).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            console.log(jsonData);
          }
        });
      }

      if(this.parcelId == 5){
        this.createGuideservice.GenerateGuidePaquetexpress(shipment, this.packageContent, this.client.id, this.dlvyType, this.shpCode).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            console.log(jsonData);
            let tracking:string = jsonData;
            console.log(tracking);
            let url:string = "http://webbooking-pruebas.paquetexpress.com.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + tracking;
            window.open(url, "_blank");
          }
        });
      }

      /*
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
                         rateArray[i].deliveryDate));
            }
            this.rateService.dataProducts = this.dataProducts;
            this.petitionError = false;
            this.createGuideService.city = forma.controls["origin_city"].value;
            this.createGuideService.zip = forma.controls["postal_code_origin"].value;
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
      }*/
    }
  }
}
