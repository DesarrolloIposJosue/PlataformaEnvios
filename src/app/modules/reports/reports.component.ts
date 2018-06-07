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

  constructor(
    private clientService:ClientService,
    private guideService:GuidesService,
    private el: ElementRef,
    private router:Router,
    private createGuideService:CreateGuideService,
    private download:DownloadGuideService
  ) {

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

    if(this.reportType == 2 || this.reportType == 3){
      startDate = forma.controls["startDate"].value;
      finishDate = forma.controls["finishDate"].value;
    }

    if((this.reportType == 1 || this.reportType == 2) && this.user.typeId == 1){
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
    }

    if(this.reportType == 2){
      this.guideService.GetShipmentsByUserAndDates(startDate, finishDate, idClient).subscribe(response =>{
        if(response){
            for(let i = 0; i < response.length; i++){
              let valid:boolean = false;
              let x = response[i].CreationDateString.split("/");
              let day:string = x[0];
              let month:string = x[1];
              let year:string = x[2];
              let dateString:string = year + "-" + month + "-" + day;

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
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, valid));
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
                /*
                lastMasterId = masterId;
                masterId = this.validDateGuide[i].multiPiecesMasterId;
                if(lastMasterId != masterId && start){
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
                    console.log("Entro?");
                    console.log(this.validDateGuide[i].trackingKey);
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                }else if(i == this.validDateGuide.length-1){
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    console.log("Entro?");
                    console.log(this.validDateGuide[i].trackingKey);
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  console.log(counterMatches);
                }else{
                  counterMatches++;
                  if(this.validDateGuide[i].parcelId == 2){
                    this.trackings.push(this.validDateGuide[i].numGuide);
                  }else{
                    console.log("Entro?");
                    console.log(this.validDateGuide[i].trackingKey);
                    this.trackings.push(this.validDateGuide[i].trackingKey);
                  }
                  this.guidesId.push(this.validDateGuide[i].id.toString());
                  console.log(counterMatches);
                }
                start = true;
                this.validDateGuideAux = this.validDateGuide[i];*/
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
    for(let i=0; i < this.validDateGuide.length; i++){
      if(this.validDateGuide[i].id == reportId){
        this.guideService.selectedGuide = this.validDateGuide[i];
        this.shipment[0] = this.validDateGuide[i];
      }
    }

    let data = JSON.stringify(this.shipment);
    this.downloadReport(data);
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
          window.open(url);
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
          window.open(url);
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
            window.open(url);
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
            window.open(url);
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
    let shipments:ValidDateGuide[] = [];
    for(let i=0; i < shipmentsId.length; i++){
      var idString = shipmentsId[i];
      var compare = +idString;
      let item = this.validDateGuide.find(j => j.id === compare);
      shipments.push(item);
    }
    this.guideService.selectedMultiguides = shipments;
    this.router.navigate(['/summary']);
  }

  downloadReport(data){
    var csvData = this.ConvertToCSV(data);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Example.csv';
    a.click();
    return 'success';
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

}
