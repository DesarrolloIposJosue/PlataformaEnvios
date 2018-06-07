import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

import { User } from '../../classes/Client';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { Shipment } from '../../classes/Shipment';
import { GuideMPSResponse } from '../../classes/GuideMPSResponse';

import {CreateGuideService} from '../../services/create-guide-service/create-guide.service';
import {DownloadGuideService} from '../../services/download-guide-service/download-guide.service';
import { GuidesService } from '../../services/guides/guides.service';

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

  private shipment:Shipment;
  private arrayShipment:Shipment[] = [];

  private dataMultipieces:GuideMPSResponse = new GuideMPSResponse();

  private email:string;

  constructor(
    private router: Router,
    private el: ElementRef,
    private createGuideservice:CreateGuideService,
    private download:DownloadGuideService,
    private guides:GuidesService
  ) {
    this.dataGuide = createGuideservice.dataAuxGuide;
    this.client = createGuideservice.userActual;
    this.productId = createGuideservice.productId;
    this.parcelId = createGuideservice.parcelId;
    this.packageType = createGuideservice.packageType;
    this.city = createGuideservice.city;
    this.destCity = createGuideservice.destinyCity;
    this.zip = createGuideservice.zip;
    this.destZip = createGuideservice.destinyZip;
    this.clientName = this.client.name + " " + this.client.lastName;
    this.totalAmount = createGuideservice.totalAmount;
    this.amountDetail = createGuideservice.amountDetail;
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
      var x = document.getElementById("preloaderRate");
      x.style.display = "block";
      this.invalidForm = false;
      if(this.createGuideservice.multipiecesData.length > 0){
        for(let i=0; i<this.createGuideservice.multipiecesData.length; i++){
          this.arrayShipment.push(new Shipment(0,this.client.id,this.parcelId,this.productId,this.totalAmount,this.amountDetail,forma.controls["originCompany"].value,
        forma.controls["originAddress"].value,forma.controls["originAddress2"].value,forma.controls["originColony"].value,forma.controls["originCity"].value,
        forma.controls["originState"].value,this.createGuideservice.multipiecesData[i].originCP,forma.controls["originCountry"].value,forma.controls["originPhoneNumber"].value,
      forma.controls["originUserName"].value,forma.controls["destinyCompany"].value, forma.controls["destinyAddress"].value,
    forma.controls["destinyAddress2"].value,forma.controls["destinyColony"].value,forma.controls["destinyCity"].value,forma.controls["destinyState"].value,
  this.createGuideservice.multipiecesData[i].destinyCP,forma.controls["destinyCountry"].value,forma.controls["destinyPhoneNumber"].value,forma.controls["destinyUserName"].value,
  "","Generando",this.createGuideservice.multipiecesData[i].weight,this.createGuideservice.multipiecesData[i].length,
  this.createGuideservice.multipiecesData[i].width,this.createGuideservice.multipiecesData[i].height,this.createGuideservice.multipiecesData[i].insurance,new Date(),"","","Y","",0,0))
        }
        console.log(this.arrayShipment);
      }else{
        this.shipment = new Shipment(0,this.client.id,this.parcelId,this.productId,this.totalAmount,this.amountDetail,forma.controls["originCompany"].value,
      forma.controls["originAddress"].value,forma.controls["originAddress2"].value,forma.controls["originColony"].value,forma.controls["originCity"].value,
      forma.controls["originState"].value,forma.controls["originZip"].value,forma.controls["originCountry"].value,forma.controls["originPhoneNumber"].value,
    forma.controls["originUserName"].value,forma.controls["destinyCompany"].value, forma.controls["destinyAddress"].value,
  forma.controls["destinyAddress2"].value,forma.controls["destinyColony"].value,forma.controls["destinyCity"].value,forma.controls["destinyState"].value,
forma.controls["destinyZip"].value,forma.controls["destinyCountry"].value,forma.controls["destinyPhoneNumber"].value,forma.controls["destinyUserName"].value,
"","Generando",this.dataGuide.weight,this.dataGuide.long,this.dataGuide.width,this.dataGuide.hight,this.dataGuide.insurance,new Date(),"","","N","",0,0);
      }

      //FedEx
      if(this.parcelId == 3){
        if(this.createGuideservice.multipiecesData.length > 0){
          for(let i=0; i<this.arrayShipment.length; i++){
            this.arrayShipment[i].destinyAddress = forma.controls["destinyAddress"].value + " " + forma.controls["numberAddress"].value;
            this.arrayShipment[i].originColony = "Col " + forma.controls["originColony"].value;
            this.arrayShipment[i].destinyColony = "Col " + forma.controls["destinyColony"].value;
          }
          this.createGuideservice.GenerateGuideMPS(this.arrayShipment).subscribe(jsonData => {
            console.log(jsonData);
            this.dataMultipieces.response = jsonData.response;
            this.dataMultipieces.trackings = jsonData.trackings;
            if(this.dataMultipieces.response == "SUCCESS: Guides Generated"){
              for(let i=0; i<this.dataMultipieces.trackings.length; i++){
                this.download.DownloadFileFedEx(this.dataMultipieces.trackings[i]).subscribe(document => {
                  if(!document){

                  }else{
                    var byteCharacters = document;
                    var byteArray = new Uint8Array(byteCharacters);
                    var blob = new Blob([byteArray], {type: 'application/pdf'});
                    var url= window.URL.createObjectURL(blob);
                    window.open(url);
                    /*this.guides.selectedGuide = this.shipment;
                    this.router.navigate(['/summary']);*/
                  }
                });
                this.guides.selectedGuides = this.arrayShipment;
                this.router.navigate(['/summary']);
              }
            }else if(this.dataMultipieces.response == "ERROR: BUY MORE PREPAID GUIDES"){
              this.router.navigate(['/buy-guides']);
            }
          });
        }else{
          this.shipment.destinyAddress =  forma.controls["destinyAddress"].value + " " + forma.controls["numberAddress"].value;
          console.log(this.shipment.destinyAddress);
          this.shipment.originColony = "Col " + forma.controls["originColony"].value;
          console.log(this.shipment.originColony);
          this.shipment.destinyColony = "Col " + forma.controls["destinyColony"].value;
          console.log(this.shipment.destinyColony);
          this.createGuideservice.GenerateGuideFedEx(this.shipment).subscribe(jsonData => {
            if(!jsonData){
              this.loading = false;
              this.petitionError = true;
            }else{
              console.log(jsonData);
              if(jsonData == "ERROR: BUY MORE PREPAID GUIDES"){
                this.router.navigate(['/buy-guides']);
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
                    this.guides.selectedGuide = this.shipment;
                    this.router.navigate(['/summary']);
                  }
                });
              }
            }
          });
        }
      }

      //RedPack
      if(this.parcelId == 2){
        if(this.createGuideservice.multipiecesData.length > 0){
          this.dlvyType = forma.controls["dlvyType"].value;
          this.email = forma.controls["email"].value;
          this.createGuideservice.GenerateGuideMPSRedPack(this.arrayShipment, this.dlvyType, this.email).subscribe(jsonData => {
            console.log(jsonData);
            this.dataMultipieces.response = jsonData.response;
            this.dataMultipieces.trackings = jsonData.trackings;
            if(this.dataMultipieces.response == "SUCCESS: Guides Generated"){
              for(let i=0; i<this.dataMultipieces.trackings.length; i++){
                this.download.DownloadFileRedPack(this.dataMultipieces.trackings[i]).subscribe(document => {
                  if(!document){

                  }else{
                    var byteCharacters = document;
                    var byteArray = new Uint8Array(byteCharacters);
                    var blob = new Blob([byteArray], {type: 'application/pdf'});
                    var url= window.URL.createObjectURL(blob);
                    window.open(url);
                    /*this.guides.selectedGuide = this.shipment;
                    this.router.navigate(['/summary']);*/
                  }
                });
                this.guides.selectedGuides = this.arrayShipment;
                this.router.navigate(['/summary']);
              }
            }else if(this.dataMultipieces.response == "ERROR: BUY MORE PREPAID GUIDES"){
              this.router.navigate(['/buy-guides']);
            }
          });
        }else{
          this.dlvyType = forma.controls["dlvyType"].value;
          this.email = forma.controls["email"].value;
          this.createGuideservice.GenerateGuideRedPack(this.shipment, this.dlvyType, this.email).subscribe(jsonData => {
            if(!jsonData){
              this.loading = false;
              this.petitionError = true;
            }else{
              if(jsonData == "ERROR: BUY MORE PREPAID GUIDES"){
                this.router.navigate(['/buy-guides']);
              }else{
              this.download.DownloadFileRedPack(jsonData).subscribe(document => {
                if(!document){

                }else{
                  var byteCharacters = document;
                  var byteArray = new Uint8Array(byteCharacters);
                  var blob = new Blob([byteArray], {type: 'application/pdf'});
                  var url= window.URL.createObjectURL(blob);
                  window.open(url);
                  this.guides.selectedGuide = this.shipment;
                  this.router.navigate(['/summary']);
                }
              });
              }
              console.log(jsonData);

            }
          });
        }
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
        this.createGuideservice.GenerateGuidePaquetexpress(this.shipment, this.packageContent, this.client.id, this.dlvyType, this.shpCode, this.numberHouse).subscribe(jsonData => {
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            if(jsonData == "ERROR: BUY MORE PREPAID GUIDES"){
              //Show message
              this.router.navigate(['/buy-guides']);
            }else{
              console.log(jsonData);
              let tracking:string = jsonData;
              console.log(tracking);
              let url:string = "http://webbooking-pruebas.paquetexpress.com.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + tracking;
              window.open(url, "_blank");
              this.guides.selectedGuide = this.shipment;
              this.router.navigate(['/summary']);
            }
          }
        });
      }
    }
  }
}
