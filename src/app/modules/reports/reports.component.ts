import { Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ClientService } from '../../services/client-service/client.service';
import { User } from '../../classes/Client';
import { ShowMultiPieces } from '../../classes/ShowMultipieces';
import { Shipment } from "../../classes/Shipment";
import { ValidDateGuide } from "../../classes/ValidDateGuide";
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { GuidesService } from '../../services/guides/guides.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import {DownloadGuideService} from '../../services/download-guide-service/download-guide.service';
import { ObjectExcel } from '../../classes/ObjectExcel';
import { ExcelService } from '../../services/excel-service/excel.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  loading:boolean;
  private invalidForm:boolean = false;
  private petitionError = false;
  private clients:User[] = [];
  private shipments:Shipment[] = [];
  private shipment:Shipment[] = [];
  private loaded:boolean = false;
  private loadedClients:boolean = false;
  private reportType:number = 0;
  private dataUser:any[] = [];
  private response:any;
  private user:User;
  private clientName:string;
  private date:Date;
  private limitDate:Date;

  private validDateGuide:ValidDateGuide[] = [];
  private validDateGuideAux:ValidDateGuide;

  private multipiecesObject:ShowMultiPieces[] = [];
  private trackings:string[] = [];
  private guidesId:string[] = [];

  private totalCalculated:boolean = false;
  private total:number = 0;

  private ObjectExcel:ObjectExcel[] = [];
  private tryExcel:ValidDateGuide[] = [];

  constructor(
    private clientService:ClientService,
    private guideService:GuidesService,
    private el: ElementRef,
    private router:Router,
    private createGuideService:CreateGuideService,
    private download:DownloadGuideService,
    private excelService:ExcelService
  ) {
    this.excelService = excelService;
    this.date = new Date();
    this.limitDate = new Date();
    this.limitDate.setMonth(this.limitDate.getMonth() - 1);

    var obj = JSON.parse(sessionStorage.getItem('ActualUser')); // An object :D
    this.user = new User(obj.id, obj.name, obj.lastName, obj.userName, obj.password, obj.address, obj.email, obj.typeId, obj.address2,
  obj.colony, obj.city, obj.state, obj.zip, obj.country, obj.phoneNumber);

  if(this.user.typeId == 2){
    this.reportType = 2;
  }

    this.createGuideService.userActual = this.user;

    this.clientService.getUsersByUserID().subscribe(
      (successResponse) => {
          if(!successResponse){
            this.loading = false;
            this.petitionError = true;
          }else{
            var userArray = successResponse;
            this.response = successResponse;
            this.dataUser = [];
            for (var i = 0; i < userArray.length; i++) {
              //console.log(countryArray[i].name);
              this.dataUser[userArray[i].name + " " + userArray[i].lastName] = null; //countryArray[i].flag or null
            }
            this.petitionError = false;
            $(this.el.nativeElement).find('input.autocomplete').autocomplete({
              data: this.dataUser,
              limit: 5
            });

          }
      },
      (errorResponse) => {
        this.loading = false;
        this.petitionError = true;
      }
    );
  }

  ngOnInit() {
  }

  checkReports(forma:NgForm){
    this.total = 0;
    this.validDateGuide = [];
    this.multipiecesObject = [];
    var element = <HTMLInputElement>document.getElementById("userData");
    this.shipments = [];
    this.trackings = [];

    let startDate:string;
    let finishDate:string;
    let idClient:number;

    if(this.reportType == 2 || this.reportType == 1){
      startDate = forma.controls["startDate"].value;
      finishDate = forma.controls["finishDate"].value;
    }

    if((this.reportType == 2) && this.user.typeId == 1){
      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(element.value == userNameLastName){
          idClient = this.response[i].id;
        }
      }
    }else{
      idClient = this.user.id;
    }

    if(this.reportType == 1){
      //Código para reportes por cliente
      let x = startDate.split("/");
      let day:string = x[0];
      let month:string = x[1];
      let year:string = x[2];
      let startDateValid:string = year + "-" + month + "-" + day;

      x = finishDate.split("/");
      day = x[0];
      month = x[1];
      year = x[2];
      let finishDateValid:string = year + "-" + month + "-" + day;

      this.guideService.GetShipmentsByUserAndDates(startDateValid, finishDateValid, 0).subscribe(response =>{
        if(response){
            for(let i = 0; i < response.length; i++){
              let valid:boolean = false;
              let x = response[i].CreationDateString.split("/");
              let day:string = x[0];
              let month:string = x[1];
              let year:string = x[2];
              let dateString:string = year + "-" + day + "-" + month;

              let newDate:Date = new Date(dateString);

              if(newDate > this.limitDate){
                valid = true;
              }

              this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
              response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
            response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
          response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
          response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
        response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName, valid));
            }

          if(this.shipments.length > 0 || this.validDateGuide.length > 0){
            this.loaded = true;
            let masterId:number = 0;
            let lastMasterId:number = 0;
            let counterMatches:number = 0;
            let start:boolean = false;
            for(let i=0; i<this.validDateGuide.length; i++){
              if(this.validDateGuide[i].multiPieces == "N"){
                this.total = this.validDateGuide[i].totalAmount + this.total;
                if(counterMatches > 0){
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  this.shipments = [];
                  this.trackings = [];
                  counterMatches = 0;
                }
              }else if(i == this.validDateGuide.length-1){
                if(this.validDateGuide[i].multiPieces == "Y"){
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  this.validDateGuideAux = this.validDateGuide[i];
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                }else{
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                }
              }else if(this.validDateGuide[i].multiPieces == "Y"){
                if(this.validDateGuide[i].multiPiecesMasterId == 0){
                  if(counterMatches > 0){
                    this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  }
                  counterMatches = 1;
                  this.trackings = [];
                  this.guidesId = []
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  if(i != this.validDateGuide.length-2){
                    this.total = this.validDateGuide[i].totalAmount + this.total;
                  }
                }else if(i == this.validDateGuide.length-1){
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                }else{
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                }
                start = true;
                this.validDateGuideAux = this.validDateGuide[i];
              }else{
                if(counterMatches > 1){
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                  this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  this.trackings = [];
                  this.guidesId = [];
                  counterMatches = 0;
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                }
              }
            }

            if(this.total > 0){
              this.totalCalculated = true;
            }
          }else{
            this.loaded = false;
          }
        }
      });
    }

    if(this.reportType == 2){
      let x = startDate.split("/");
      let day:string = x[0];
      let month:string = x[1];
      let year:string = x[2];
      let startDateValid:string = year + "-" + month + "-" + day;
      x = finishDate.split("/");
      day = x[0];
      month = x[1];
      year = x[2];
      let finishDateValid:string = year + "-" + month + "-" + day;

      this.guideService.GetShipmentsByUserAndDates(startDateValid, finishDateValid, idClient).subscribe(response =>{
        if(response){
            for(let i = 0; i < response.length; i++){
              let valid:boolean = false;
              let x = response[i].CreationDateString.split("/");
              let day:string = x[0];
              let month:string = x[1];
              let year:string = x[2];
              let dateString:string = year + "-" + day + "-" + month;

              let newDate:Date = new Date(dateString);
              if(newDate > this.limitDate){
                valid = true;
              }

              this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
              response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
            response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
          response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
          response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
        response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName, valid));
            }

          if(this.shipments.length > 0 || this.validDateGuide.length > 0){
            this.loaded = true;
            let masterId:number = 0;
            let lastMasterId:number = 0;
            let counterMatches:number = 0;
            let start:boolean = false;
            for(let i=0; i<this.validDateGuide.length; i++){
              if(this.validDateGuide[i].multiPieces == "N"){
                this.total = this.validDateGuide[i].totalAmount + this.total;
                if(counterMatches > 0){
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  this.shipments = [];
                  this.trackings = [];
                  counterMatches = 0;
                }
              }else if(i == this.validDateGuide.length-1){
                if(this.validDateGuide[i].multiPieces == "Y"){
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  this.validDateGuideAux = this.validDateGuide[i];
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                }else{
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                }
              }else if(this.validDateGuide[i].multiPieces == "Y"){
                if(this.validDateGuide[i].multiPiecesMasterId == 0){
                  if(counterMatches > 0){
                    this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  }
                  counterMatches = 1;
                  this.trackings = [];
                  this.guidesId = []
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  if(i != this.validDateGuide.length-2){
                    this.total = this.validDateGuide[i].totalAmount + this.total;
                  }
                }else if(i == this.validDateGuide.length-1){
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                }else{
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                }
                start = true;
                this.validDateGuideAux = this.validDateGuide[i];
              }else{
                if(counterMatches > 1){
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                  this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId));
                  this.trackings = [];
                  this.guidesId = [];
                  counterMatches = 0;
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                }
              }
            }

            if(this.total > 0){
              this.totalCalculated = true;
            }
            console.log(this.validDateGuide);
            console.log(this.multipiecesObject);
          }else{
            this.loaded = false;
          }
        }
      });
    }

    if(this.reportType == 3){
      //Código para traer todos los reportes por fecha
    }

  }

  onChange(deviceValue) {
    this.reportType = deviceValue;
    if(deviceValue == 1 || deviceValue == 2){
      this.clientService.getUsersByUserID().subscribe(
        (successResponse) => {
            if(!successResponse){
              this.loading = false;
              this.petitionError = true;
            }else{
              var userArray = successResponse;
              this.response = successResponse;
              this.dataUser = [];
              for (var i = 0; i < userArray.length; i++) {
                //console.log(countryArray[i].name);
                this.dataUser[userArray[i].name + " " + userArray[i].lastName] = null; //countryArray[i].flag or null
              }
              this.petitionError = false;
              $(this.el.nativeElement).find('input.autocomplete').autocomplete({
                data: this.dataUser,
                limit: 5
              });

            }
        },
        (errorResponse) => {
          this.loading = false;
          this.petitionError = true;
        }
      );
    }
  }

  loadReport(reportId:number){
    this.guideService.selectedGuide = null;
    this.guideService.selectedGuides = [];
    this.guideService.selectedMultiguides = [];
    for(let i=0; i < this.validDateGuide.length; i++){
      if(this.validDateGuide[i].id == reportId){
        this.guideService.selectedGuide = this.validDateGuide[i];
        this.tryExcel[0] = this.validDateGuide[i];
        //this.shipment[0] = this.validDateGuide[i];
      }
    }

    //let data = JSON.stringify(this.shipment);
      //this.downloadReport(data);
      let data:ObjectExcel[] = this.PrepareDataCSV(this.tryExcel);
      console.log(data);
      let json = JSON.stringify(data);
      this.excelService.try(data);
      //this.downloadReport(json);
    this.router.navigate(['/summary']);
  }

  checkGuide(parcelId:number, trackingKey:string){
    if(parcelId == 3){
      this.download.DownloadFileFedEx(trackingKey).subscribe(document => {
        if(!document){

        }else{
          var byteCharacters = document;
          var byteArray = new Uint8Array(byteCharacters);
          var blob = new Blob([byteArray], {type: 'application/pdf'});
          var url= window.URL.createObjectURL(blob);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob);
              console.log("Edge");
          }
          else {
              //var objectUrl = URL.createObjectURL(blob);
              //window.open(objectUrl);
              window.open(url);
              console.log("Otros");
          }
        }
      });
    }
    if(parcelId == 2){
      this.download.DownloadFileRedPack(trackingKey).subscribe(document => {
        if(!document){

        }else{
          var byteCharacters = document;
          var byteArray = new Uint8Array(byteCharacters);
          var blob = new Blob([byteArray], {type: 'application/pdf'});
          var url= window.URL.createObjectURL(blob);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            console.log("Edge");
              window.navigator.msSaveOrOpenBlob(blob);

          }
          else {
              //var objectUrl = URL.createObjectURL(blob);
              //window.open(objectUrl);
              console.log("Otros");
              window.open(url);
              console.log("Otros");
          }
        }
      });
    }
    if(parcelId == 5){
      let url:string = "http://webbooking-pruebas.paquetexpress.com.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + trackingKey;
      window.open(url, "_blank");
    }
  }

  checkMultiguides(parcelId:number, trackingKeys:string[]){
    for(let tracking = 0; tracking < trackingKeys.length; tracking++){
      if(parcelId == 3){
        this.download.DownloadFileFedEx(trackingKeys[tracking]).subscribe(document => {
          if(!document){

          }else{
            var byteCharacters = document;
            var byteArray = new Uint8Array(byteCharacters);
            var blob = new Blob([byteArray], {type: 'application/pdf'});
            var url= window.URL.createObjectURL(blob);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
                console.log("Edge");
            }
            else {
                //var objectUrl = URL.createObjectURL(blob);
                //window.open(objectUrl);
                window.open(url);
                console.log("Otros");
            }
          }
        });
      }
      if(parcelId == 2){
        this.download.DownloadFileRedPack(trackingKeys[tracking]).subscribe(document => {
          if(!document){

          }else{
            var byteCharacters = document;
            var byteArray = new Uint8Array(byteCharacters);
            var blob = new Blob([byteArray], {type: 'application/pdf'});
            var url= window.URL.createObjectURL(blob);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              console.log("Edge");
                window.navigator.msSaveOrOpenBlob(blob);

            }
            else {
                //var objectUrl = URL.createObjectURL(blob);
                //window.open(objectUrl);
                console.log("Otros");
                window.open(url);
                console.log("Otros");
            }
          }
        });
      }
      if(parcelId == 5){
        let url:string = "http://webbooking-pruebas.paquetexpress.com.mx:8082/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + trackingKeys[tracking];
        window.open(url, "_blank");
      }
    }
  }

  loadReportMultiguides(shipmentsId:string[]){
    this.guideService.selectedGuide = null;
    this.guideService.selectedGuides = [];
    this.guideService.selectedMultiguides = [];
    let shipments:ValidDateGuide[] = [];
    for(let i=0; i < shipmentsId.length; i++){
      var idString = shipmentsId[i];
      var compare = +idString;
      let item = this.validDateGuide.find(j => j.id === compare);
      shipments.push(item);
    }
    this.guideService.selectedMultiguides = shipments;
      //this.downloadReport(data);
      let data:ObjectExcel[] = this.PrepareDataCSV(shipments);
      console.log(data);
      let json = JSON.stringify(data);
      this.excelService.try(data);
      //this.downloadReport(json);
    this.router.navigate(['/summary']);
  }

  downloadReport(data){
    var csvData = this.ConvertToCSV(data);
    let day = this.date.getDay();
    let month = this.date.getMonth();
    let year = this.date.getFullYear();
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = day.toString()+"/"+month.toString()+"/"+year.toString()+".csv";
    a.click();
    return 'success';
  }

  downloadReports(){
    let data:ObjectExcel[] = this.PrepareDataCSV(this.validDateGuide);
    console.log(data);
    let json = JSON.stringify(data);
    this.excelService.try(data);
  }

   ConvertToCSV(objArray) {

     //Crear código para cuando sea solo un objeto ya que solo esta implementado para arreglos
     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     var str = '';
     var row = "";
     for (var index in objArray[0]) {
       //Now convert each value to string and comma-separated
       row += index + ',';
     }
     row = row.slice(0, -1);
     //append Label row with line break
     str += row + '\r\n';
     for (var i = 0; i < array.length; i++) {
       var line = '';
       for (var index in array[i]) {
         if (line != '') line += ','
          line += array[i][index];
       }
       str += line + '\r\n';
     }
     return str;
  }

  cancelGuide(shipment:Shipment){
    this.guideService.CancelGuide(shipment).subscribe(response =>{
      if(response){
        this.router.navigate(['/home']);
      }
    });
  }

  PrepareDataCSV(data:ValidDateGuide[]):ObjectExcel[]{
    this.ObjectExcel = [];
    let masterId = 0;
    let totalAmount:number = 0;
    let insuranceCost:number = 0;
    let insurancePerc:number = 0;
    let insuranceComi:number = 0;
    for(let item of data){
      let parcel:string;
      switch(item.parcelId){
        case 1:
          parcel = "DHL";
        break;
        case 2:
          parcel = "RedPack";
        break;
        case 3:
          parcel = "FedEx";
        break;
        case 4:
          parcel = "Estafeta";
        break;
        case 5:
          parcel = "Paquetexpress";
        break;
      }
      let multipieces:string;
      let amountDetail:string
      switch(item.multiPieces){
        case 'Y':
          multipieces = "Si";
          if(item.multiPiecesMasterId == 0){
            masterId = item.id;
            totalAmount = item.totalAmount;
            amountDetail = item.amountDetail;
          }else if(item.multiPiecesMasterId == masterId){
            totalAmount = 0;
            amountDetail = "";
          }
          if(item.amountDetail.indexOf(',P') >= 0){
            let indexNo:number = item.amountDetail.indexOf(',P');
            let porcentajeString = item.amountDetail.substring(indexNo);
            console.log(porcentajeString);
            indexNo = porcentajeString.indexOf('ro');
            let indexEnd = porcentajeString.indexOf('%');
            porcentajeString = porcentajeString.substring(indexNo+2, indexEnd);
            console.log(porcentajeString);
            let porcentajeValue = +porcentajeString;
            insurancePerc = (item.insurance * porcentajeValue)/100;
            console.log(insurancePerc);
            indexNo = item.amountDetail.indexOf('C');
            let comiString = item.amountDetail.substring(indexNo);
            indexNo = comiString.indexOf('$');
            console.log(comiString);
            if(comiString.indexOf(',')){
              indexEnd = comiString.indexOf(',');
              console.log(indexNo);
              comiString = comiString.substring(indexNo+1);
              console.log(comiString);
              insuranceComi = +comiString;
              if(item.multiPiecesMasterId == 0){
                insuranceCost = insurancePerc + insuranceComi;
              }else{
                insuranceCost = insurancePerc;
              }
               //+ insuranceComi +;
            }else{
              comiString = comiString.substring(indexNo+1)
              insuranceComi = +comiString;
              insuranceCost = insuranceComi + insurancePerc;
            }
          }
        break;
        case 'N':
          multipieces = "No";
          if(item.amountDetail.indexOf(',P') >= 0){
            let indexNo:number = item.amountDetail.indexOf(',P');
            let porcentajeString = item.amountDetail.substring(indexNo);
            indexNo = item.amountDetail.indexOf('P');
            porcentajeString = porcentajeString.substring(indexNo);
            indexNo = porcentajeString.indexOf('$');
            let indexEnd = porcentajeString.indexOf(',');
            porcentajeString = porcentajeString.substring(indexNo+1, indexEnd);
            insurancePerc = +porcentajeString;
            indexNo = item.amountDetail.indexOf('C');
            let comiString = item.amountDetail.substring(indexNo);
            indexNo = comiString.indexOf('$');
            if(comiString.indexOf(',')){
              indexEnd = comiString.indexOf(',');
              comiString = comiString.substring(indexNo+1, indexEnd);
              insuranceComi = +comiString;
              insuranceCost = insuranceComi + insurancePerc;
            }else{
              comiString = comiString.substring(indexNo+1);
              insuranceComi = +comiString;
              insuranceCost = insuranceComi + insurancePerc;
            }
          }
        break;
      }
      let extraKg:number = 0;

      if(item.amountDetail.indexOf('Extra:') >= 0){
        let indexNo:number = item.amountDetail.indexOf('Extra:');
        let stringExtraKg = item.amountDetail.substring(indexNo);
        indexNo = stringExtraKg.indexOf('$');
        stringExtraKg = stringExtraKg.substring(indexNo+1);
        extraKg = +stringExtraKg;
      }

      if(item.multiPieces == 'Y'){
        this.ObjectExcel.push(new ObjectExcel(item.id, parcel, item.productName, totalAmount, amountDetail,
          item.originUserName, item.originCompany, item.originCountry, item.originState, item.originCity, item.originZip,
          item.originColony, item.originAddress, item.originAddress2, item.originPhoneNumber,
          item.destinyUserName, item.destinyCompany, item.destinyCountry, item.destinyState, item.destinyCity, item.destinyZip,
          item.destinyColony, item.destinyAddress, item.destinyAddress2, item.destinyPhoneNumber,
          item.trackingKey, item.status, item.weight, item.length, item.width, item.height, item.insurance, item.creationDateString,
          multipieces, extraKg, insuranceCost));
      }else{
        this.ObjectExcel.push(new ObjectExcel(item.id, parcel, item.productName, item.totalAmount, item.amountDetail,
          item.originUserName, item.originCompany, item.originCountry, item.originState, item.originCity, item.originZip,
          item.originColony, item.originAddress, item.originAddress2, item.originPhoneNumber,
          item.destinyUserName, item.destinyCompany, item.destinyCountry, item.destinyState, item.destinyCity, item.destinyZip,
          item.destinyColony, item.destinyAddress, item.destinyAddress2, item.destinyPhoneNumber,
          item.trackingKey, item.status, item.weight, item.length, item.width, item.height, item.insurance, item.creationDateString,
          multipieces, extraKg, insuranceCost));
      }
    }
    return this.ObjectExcel;
  }
}
