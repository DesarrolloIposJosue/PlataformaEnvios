import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

import { User } from '../../classes/Client';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { Shipment } from '../../classes/Shipment';

import {CreateGuideService} from '../../services/create-guide-service/create-guide.service';
import {DownloadGuideService} from '../../services/download-guide-service/download-guide.service';

declare var jQuery:any;
declare var $:any;

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
  private totalAmount:number;
  private amountDetail:string;
  private numberHouse:string;

  private email:string;

  constructor(
    private router: Router,
    private el: ElementRef,
    private createGuideservice:CreateGuideService,
    private download:DownloadGuideService
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
    this.totalAmount = createGuideservice.totalAmount;
    this.amountDetail = createGuideservice.amountDetail;
    console.log(this.amountDetail);
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
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
        totalAmount: this.totalAmount,
        amountDetail: this.amountDetail,

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
        insurance: this.dataGuide.insurance,

        creationDate: new Date()
      }
      console.log(shipment);

      //FedEx
      if(this.parcelId == 3){
        shipment.destinyAddress =  forma.controls["destinyAddress"].value + " " + forma.controls["numberAddress"].value;
        console.log(shipment.destinyAddress);
        shipment.originColony = "Col " + forma.controls["originColony"].value;
        console.log(shipment.originColony);
        shipment.destinyColony = "Col " + forma.controls["destinyColony"].value;
        console.log(shipment.destinyColony);
        this.createGuideservice.GenerateGuideFedEx(shipment).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            console.log(jsonData);
            this.download.DownloadFileFedEx(jsonData).subscribe(document => {
              if(!document){

              }else{
                var byteCharacters = document;
                var byteArray = new Uint8Array(byteCharacters);
                var blob = new Blob([byteArray], {type: 'application/pdf'});
                var url= window.URL.createObjectURL(blob);
                window.open(url);
                this.router.navigate(['/home']);
              }
            });
          }
        });
      }

      //RedPack
      if(this.parcelId == 2){
        this.dlvyType = forma.controls["dlvyType"].value;
        this.email = forma.controls["email"].value;
        this.createGuideservice.GenerateGuideRedPack(shipment, this.dlvyType, this.email).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            console.log(jsonData);
            this.download.DownloadFileRedPack(jsonData).subscribe(document => {
              if(!document){

              }else{
                var byteCharacters = document;
                var byteArray = new Uint8Array(byteCharacters);
                var blob = new Blob([byteArray], {type: 'application/pdf'});
                var url= window.URL.createObjectURL(blob);
                window.open(url);
                this.router.navigate(['/home']);
              }
            });
          }
        });
      }

      //paquetexpress
      if(this.parcelId == 5){
        if(this.packageType == 1){
          this.shpCode = "1"
        }else{
          this.shpCode = forma.controls["shpCode"].value;
        }
        this.dlvyType = forma.controls["dlvyType"].value;
        this.packageContent = forma.controls["packageContent"].value;
        this.numberHouse = forma.controls["numberAddress"].value;
        this.createGuideservice.GenerateGuidePaquetexpress(shipment, this.packageContent, this.client.id, this.dlvyType, this.shpCode, this.numberHouse).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            console.log(jsonData);
            let tracking:string = jsonData;
            console.log(tracking);
            let url:string = "http://webbooking-pruebas.paquetexpress.com.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + tracking;
            window.open(url, "_blank");
            this.router.navigate(['/home']);
          }
        });
      }
    }
  }
}
