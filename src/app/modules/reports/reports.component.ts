import { Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
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
//import * as browserPrint from 'BrowserPrint'
import { test1 } from '../../../assets/javascript/demo';
//'../../../assets/BrowserPrint-';

declare var jQuery:any;
declare var $:any;
declare var BrowserPrint:any;

var available_printers = null;
var selected_category = null;
var default_printer = null;
var selected_printer = null;
var format_start = "^XA^LL200^FO80,50^A0N36,36^FD";
var format_end = "^FS^XZ";
var default_mode = true;
var existPrinters:boolean = false;
var errorGuide:number = 0;

function setup_web_print()
{
  $('#printer_select').on('change', onPrinterSelected);
  showLoading("Loading Printer Information...");
  default_mode = true;
  selected_printer = null;
  available_printers = null;
  selected_category = null;
  default_printer = null;

  BrowserPrint.getDefaultDevice('printer', function(printer)
  {
    default_printer = printer
    if((printer != null) && (printer.connection != undefined))
    {
      selected_printer = printer;
      if(printer){
        existPrinters = true;
      }
      var printer_details = $('#printer_details');
      var selected_printer_div = $('#selected_printer');

      selected_printer_div.text("Using Default Printer: " + printer.name);
      hideLoading();
      printer_details.show();
      $('#print_form').show();

    }
    BrowserPrint.getLocalDevices(function(printers)
      {
        available_printers = printers;

        var sel = document.getElementById("printers");
        var printers_available = false;
        sel.innerHTML = "";
        if (printers != undefined)
        {

          for(var i = 0; i < printers.length; i++)
          {
            if (printers[i].connection == 'usb')
            {
              var opt = document.createElement("option");
              opt.innerHTML = printers[i].connection + ": " + printers[i].uid;
              opt.value = printers[i].uid;
              sel.appendChild(opt);
              printers_available = true;
            }
          }
        }

        if(!printers_available)
        {
          showErrorMessage("No Zebra Printers could be found!");
          hideLoading();
          $('#print_form').hide();
          return;
        }
        else if(selected_printer == null)
        {
          default_mode = false;
          changePrinter();
          $('#print_form').show();
          hideLoading();
        }
      }, undefined, 'printer');
  },
  function(error_response)
  {
    errorGuide = 1;
    showBrowserPrintNotFound();
  });
};
function showBrowserPrintNotFound()
{
  showErrorMessage("An error occured while attempting to connect to your Zebra Printer. You may not have Zebra Browser Print installed, or it may not be running. Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again.");

};
function sendData()
{
  showLoading("Printing...");
  checkPrinterStatus( function (text){
    if (text == "Ready to Print")
    {

      var zpl="^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20\n^FO12,301^GB753,2,2^FS\n^FO12,567^GB777,2,2^FS\n^FO464,170^GB2,129,2^FS\n^FO32,172^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS\n^FO224,172^AdN,0,0^FWN^FH^FD36755558^FS\n^FO32,190^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS\n^FO32,208^AdN,0,0^FWN^FH^FD^FS\n^FO32,226^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS\n^FO32,244^AdN,0,0^FWN^FH^FD^FS\n^FO32,262^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS\n^FO32,280^AdN,0,0^FWN^FH^FDMEXICO MX^FS\n^FO478,208^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS\n^FO28,909^A0N,24,24^FWN^FH^FDTRK#^FS\n^FO28,967^A0N,27,32^FWN^FH^FD^FS\n^FO136,879^A0N,27,36^FWN^FH^FD^FS\n^FO15,313^A0N,21,21^FWN^FH^FDTO^FS\n^FO60,311^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS\n^FO60,353^A0N,38,38^FWN^FH^FD^FS\n^FO60,395^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS\n^FO60,437^A0N,38,38^FWN^FH^FD^FS\n^FO60,479^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS\n^FO35,521^A0N,21,21^FWN^FH^FD31456879^FS\n^FO677,673^GB104,10,10^FS\n^FO677,683^GB10,112,10^FS\n^FO771,683^GB10,112,10^FS\n^FO677,795^GB104,10,10^FS\n^FO652,611^A0N,43,58^FWN^FH^FDFedEx^FS\n^FO708,650^A0N,19,26^FWN^FH^FDExpress^FS\n^FO697,691^A0N,128,137^FWN^FH^FDE^FS\n^FO21,575^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D20_1D7818258222440455_1DFDE_1D873385448_1D193_1D_1D1/1_1D3.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013486121941137761600781825822244_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS\n^FO478,262^AdN,0,0^FWN^FH^FDBILL SENDER^FS\n^FO12,856^GB777,2,2^FS\n^FO494,1052^A0N,43,43^FWN^FH^FD^FS\n^FO791,282^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS\n^FO95,913^A0N,53,40^FWN^FH^FD7818 2582 2244^FS\n^FO409,862^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS\n^FO309,914^A0N,51,38^FWN^FH^FB490,,,R,^FD            ECONOMY^FS\n^FO413,966^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS\n^FO495,1008^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS\n^FO574,1068^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS\n^FO695,1052^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS\n^FO39,1094^A0N,27,32^FWN^FH^FD^FS\n^FO75,1155^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013486121941137761600781825822244^FS\n^FO28,1004^A0N,107,96^FWN^FH^FD8Z LOMA ^FS\n^FO790,675^A0N,13,18^FWB^FH^FDJ181118012601uv^FS\n^FO478,172^AdN,0,0^FWN^FH^FDSHIP DATE: 12JUL18^FS\n^FO478,190^AdN,0,0^FWN^FH^FDACTWGT: 3.00 KG^FS\n^FO478,226^AdN,0,0^FWN^FH^FDDIMS: 30x30x30 CM^FS\n^FO708,482^A0N,35,45^FWN^FH^FD(MX)^FS\n^FO328,526^AbN,11,7^FWN^FH^FDREF: ^FS\n^FO38,540^AbN,11,7^FWN^FH^FDINV: ^FS\n^FO38,554^AbN,11,7^FWN^FH^FDPO: ^FS\n^FO428,554^AbN,11,7^FWN^FH^FDDEPT: ^FS\n^FO25,930^GB58,1,1^FS\n^FO25,930^GB1,26,1^FS\n^FO83,930^GB1,26,1^FS\n^FO25,956^GB58,1,1^FS\n^FO31,936^AdN,0,0^FWN^FH^FD0455^FS\n^PQ1\n^XZ\n"
        selected_printer.send(zpl, printComplete, printerError);
    }
    else
    {
      printerError(text);
    }
  });
};
function checkPrinterStatus(finishedFunction)
{

  selected_printer.sendThenRead("~HQES",
        function(text){

            var that = this;
            var statuses = new Array();
            var ok = false;
            var is_error = text.charAt(70);
            var media = text.charAt(88);
            var head = text.charAt(87);
            var pause = text.charAt(84);
            // check each flag that prevents printing
            if (is_error == '0')
            {
              ok = true;
              statuses.push("Ready to Print");
            }
            if (media == '1')
              statuses.push("Paper out");
            if (media == '2')
              statuses.push("Ribbon Out");
            if (media == '4')
              statuses.push("Media Door Open");
            if (media == '8')
              statuses.push("Cutter Fault");
            if (head == '1')
              statuses.push("Printhead Overheating");
            if (head == '2')
              statuses.push("Motor Overheating");
            if (head == '4')
              statuses.push("Printhead Fault");
            if (head == '8')
              statuses.push("Incorrect Printhead");
            if (pause == '1')
              statuses.push("Printer Paused");
            if ((!ok) && (statuses.length == 0))
              statuses.push("Error: Unknown Error");
            finishedFunction(statuses.join());
      }, printerError);

      var error = printerError.toString()
      if(error.indexOf('An error occurred while printing.') >= 0){
        errorGuide = 1;
      }
};
function hidePrintForm()
{
  $('#print_form').hide();
};
function showPrintForm()
{
  $('#print_form').show();
};
function showLoading(text)
{
  $('#loading_message').text(text);
  $('#printer_data_loading').show();
  hidePrintForm();
  $('#printer_details').hide();
  $('#printer_select').hide();
};
function printComplete()
{
  hideLoading();
  alert ("Printing complete");
  errorGuide = 2;
}
function hideLoading()
{
  $('#printer_data_loading').hide();
  if(default_mode == true)
  {
    showPrintForm();
    $('#printer_details').show();
  }
  else
  {
    $('#printer_select').show();
    showPrintForm();
  }
};
function changePrinter()
{
  default_mode = false;
  selected_printer = null;
  $('#printer_details').hide();
  if(available_printers == null)
  {
    showLoading("Finding Printers...");
    $('#print_form').hide();
    setTimeout(changePrinter, 200);
    return;
  }
  $('#printer_select').show();
  onPrinterSelected();

}
function onPrinterSelected()
{
  selected_printer = available_printers[$('#printers')[0].selectedIndex];
}
function showErrorMessage(text)
{
  $('#main').hide();
  $('#error_div').show();
  $('#error_message').html(text);
}
function printerError(text)
{
  showErrorMessage("An error occurred while printing. Please try again." + text);
}
function trySetupAgain()
{
  $('#main').show();
  $('#error_div').hide();
  setup_web_print();
  //hideLoading();
}

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
  private validDateGuideForReports:ValidDateGuide[] = [];
  private validDateGuideAux:ValidDateGuide;

  private multipiecesObject:ShowMultiPieces[] = [];
  private trackings:string[] = [];
  private guidesId:string[] = [];

  private totalCalculated:boolean = false;
  private total:number = 0;

  private ObjectExcel:ObjectExcel[] = [];
  private tryExcel:ValidDateGuide[] = [];

  private canceledGuide:boolean = false;
  private canceledPressed:number = 0;

  private stringPrint:string = "";
  private existPrinter:boolean = false;

  private errorGuideModal:number = 0;

  private startingDate:string;
  private endingDate:string;

  private validReport:boolean = true;

  constructor(
    private clientService:ClientService,
    private guideService:GuidesService,
    private el: ElementRef,
    private router:Router,
    private createGuideService:CreateGuideService,
    private download:DownloadGuideService,
    private excelService:ExcelService
  ) {
    $(document).ready(setup_web_print);
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

    this.excelService = excelService;
    this.date = new Date();
    this.limitDate = new Date();
    this.limitDate.setMonth(this.limitDate.getMonth() - 1);

    var obj = JSON.parse(sessionStorage.getItem('ActualUser')); // An object :D
    this.user = new User(obj.id, obj.name, obj.lastName, obj.userName, obj.password, obj.address, obj.email, obj.typeId, obj.address2,
  obj.colony, obj.city, obj.state, obj.zip, obj.country, obj.phoneNumber, obj.numberHouse, obj.setCompany, obj.lockInfo);


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

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {

    this.modalActions.emit({action:"modal",params:['open']});

  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.canceledPressed = 0
  }

  ngOnInit() {
  }

  checkReports(forma:NgForm){
    this.validReport = true;
    this.validDateGuide = [];
    this.validDateGuideForReports = [];
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
      this.startingDate = startDate;
      finishDate = forma.controls["finishDate"].value;
      this.endingDate = finishDate;
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
          let parcelName:string;
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

              if(response[i].ParcelId == 1){
                parcelName = "DHL";
              }else if(response[i].ParcelId == 2){
                parcelName = "RedPack";
              }else if(response[i].ParcelId == 3){
                parcelName = "FedEx";
              }else if(response[i].ParcelId == 4){
                parcelName = "Estafeta";
              }else{
                parcelName = "Paquetexpress";
              }


              this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
              response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
            response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
          response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
          response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
        response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
        parcelName, valid, response[i].PrintType, response[i].Reference,  response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

        this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
        response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
      response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
    response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
    response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
  response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
  response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
  parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));
            }



          if(this.shipments.length > 0 || this.validDateGuide.length > 0){
            this.loaded = true;
            let masterGuide:Shipment;
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
                    masterGuide.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                    masterGuide.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));

                }else{
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                    masterGuide.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                }
              }else if(this.validDateGuide[i].multiPieces == "Y"){
                if(this.validDateGuide[i].multiPiecesMasterId == 0){
                  masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                  this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                  this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                  this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                  this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                  this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                  this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                  this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                  if(counterMatches > 0){
                    this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  masterGuide.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                    masterGuide.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                  this.trackings = [];
                  this.guidesId = [];
                  counterMatches = 0;
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                }
              }
            }
            let tempFiles = this.validDateGuide.slice(0);
            tempFiles.forEach((element) => {
              if(element.multiPieces == "Y"){
                let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                this.validDateGuide.splice(removeIndex, 1);
              }
            });

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
      let parcelName:string;

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
              parcelName = "";
              if(response[i].ParcelId == 1){
                parcelName = "DHL";
              }else if(response[i].ParcelId == 2){
                parcelName = "RedPack";
              }else if(response[i].ParcelId == 3){
                parcelName = "FedEx";
              }else if(response[i].ParcelId == 4){
                parcelName = "Estafeta";
              }else{
                parcelName = "Paquetexpress";
              }

              this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
              response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
            response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
          response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
          response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
        response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
        parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

        this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
        response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
      response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
    response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
    response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
  response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
  response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
  parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

            }

          if(this.shipments.length > 0 || this.validDateGuide.length > 0){
            this.loaded = true;
            let masterGuide:Shipment;
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
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                }else{
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                  this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                }
              }else if(this.validDateGuide[i].multiPieces == "Y"){
                if(this.validDateGuide[i].multiPiecesMasterId == 0){
                  masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                  this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                  this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                  this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                  this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                  this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                  this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                  this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                  if(counterMatches > 0){
                    this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                    this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                  this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                  this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                  this.trackings = [];
                  this.guidesId = [];
                  counterMatches = 0;
                  this.total = this.validDateGuide[i].totalAmount + this.total;
                }
              }
            }

            let tempFiles = this.validDateGuide.slice(0);
            tempFiles.forEach((element) => {
              if(element.multiPieces == "Y"){
                let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                this.validDateGuide.splice(removeIndex, 1);
              }
            });
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
      let data:ObjectExcel[] = this.PrepareDataCSV(this.tryExcel);

      let json = JSON.stringify(data);
      this.excelService.try(data);
    this.router.navigate(['/summary']);
  }

  checkGuide(parcelId:number, trackingKey:string, printType:string){

    this.download.printType = printType;
    if(parcelId == 3){
      this.download.DownloadFileFedEx(trackingKey).subscribe(document => {
        if(!document){

        }else{
          var byteCharacters = document;
          var byteArray = new Uint8Array(byteCharacters);

          if(printType == "Z"){
            if(existPrinters){
              const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
              var count = byteCharacters.length;
              var str = "";
              for (var index = 0;index < count;)
              {
                var ch = byteCharacters[index++];
                if (ch & 0x80)
                {
                  var extra = extraByteMap[(ch >> 3) & 0x07];
                  if (!(ch & 0x40) || !extra || ((index + extra) > count)){

                  }

                  ch = ch & (0x3F >> extra);
                  for (;extra > 0;extra -= 1)
                  {
                    var chx = byteCharacters[index++];
                    if ((chx & 0xC0) != 0x80){

                    }

                    ch = (ch << 6) | (chx & 0x3F);
                  }
                }
                str += String.fromCharCode(ch);
              }
              this.existPrinter = existPrinters;
              this.sendDataPro(str);

            }else{

              this.existPrinter = existPrinters;
              this.openModal();
            }

          }else{
            var blob = new Blob([byteArray], {type: 'application/pdf'});

            var url= window.URL.createObjectURL(blob);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
            }
            else {
                //var objectUrl = URL.createObjectURL(blob);
                //window.open(objectUrl);
                window.open(url);
            }
          }
        }
      });
    }
    if(parcelId == 2){
      this.download.DownloadFileRedPack(trackingKey).subscribe(document => {
        if(!document){

        }else{
          var byteCharacters = document;
          if(printType == "Z"){
            if(existPrinters){
              const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
              var count = byteCharacters.length;
              var str = "";
              for (var index = 0;index < count;)
              {
                var ch = byteCharacters[index++];
                if (ch & 0x80)
                {
                  var extra = extraByteMap[(ch >> 3) & 0x07];
                  if (!(ch & 0x40) || !extra || ((index + extra) > count)){

                  }

                  ch = ch & (0x3F >> extra);
                  for (;extra > 0;extra -= 1)
                  {
                    var chx = byteCharacters[index++];
                    if ((chx & 0xC0) != 0x80){

                    }

                    ch = (ch << 6) | (chx & 0x3F);
                  }
                }
                str += String.fromCharCode(ch);
              }
              this.existPrinter = existPrinters;
              this.sendDataPro(str);

            }else{

              this.existPrinter = existPrinters;
              this.openModal();
            }
          }else{
            var byteArray = new Uint8Array(byteCharacters);
            var blob = new Blob([byteArray], {type: 'application/pdf'});
            var url= window.URL.createObjectURL(blob);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
            }
            else {
                //var objectUrl = URL.createObjectURL(blob);
                //window.open(objectUrl);
                window.open(url);
            }
          }
        }
      });
    }
    if(parcelId == 5){
      if(printType == "Z"){
        this.download.DownloadFilePaquete(trackingKey).subscribe(document => {
          if(!document){

          }else{
            var byteCharacters = document;
            if(existPrinters){
              const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
              var count = byteCharacters.length;
              var str = "";
              for (var index = 0;index < count;)
              {
                var ch = byteCharacters[index++];
                if (ch & 0x80)
                {
                  var extra = extraByteMap[(ch >> 3) & 0x07];
                  if (!(ch & 0x40) || !extra || ((index + extra) > count)){

                  }

                  ch = ch & (0x3F >> extra);
                  for (;extra > 0;extra -= 1)
                  {
                    var chx = byteCharacters[index++];
                    if ((chx & 0xC0) != 0x80){

                    }

                    ch = (ch << 6) | (chx & 0x3F);
                  }
                }
                str += String.fromCharCode(ch);
              }
              this.existPrinter = existPrinters;
              this.sendDataPro(str);

            }else{

              this.existPrinter = existPrinters;
              this.openModal();
            }
          }
        });
      }else{
        let url:string = "http://webbooking.paquetexpress.com.mx:8104/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + trackingKey;
        window.open(url, "_blank");
      }
    }
  }

  checkMultiguides(parcelId:number, trackingKeys:string[], printType:string){
    this.download.printType = printType;
    var strCommand = "";
    for(let tracking = 0; tracking < trackingKeys.length; tracking++){
      if(parcelId == 3){
        this.download.DownloadFileFedEx(trackingKeys[tracking]).subscribe(document => {
          if(!document){

          }else{
            var byteCharacters = document;
            var byteArray = new Uint8Array(byteCharacters);
            if(printType == "Z"){
              if(existPrinters){
                const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
                var count = byteCharacters.length;

                for (var index = 0;index < count;)
                {
                  var ch = byteCharacters[index++];
                  if (ch & 0x80)
                  {
                    var extra = extraByteMap[(ch >> 3) & 0x07];
                    if (!(ch & 0x40) || !extra || ((index + extra) > count)){

                    }

                    ch = ch & (0x3F >> extra);
                    for (;extra > 0;extra -= 1)
                    {
                      var chx = byteCharacters[index++];
                      if ((chx & 0xC0) != 0x80){

                      }

                      ch = (ch << 6) | (chx & 0x3F);
                    }
                  }

                  strCommand += String.fromCharCode(ch);
                }
                this.existPrinter = existPrinters;
                if(tracking == trackingKeys.length-1){
                  this.sendDataPro(strCommand);
                }
              }else{
                this.existPrinter = existPrinters;
                this.openModal();
              }
            }else{
              var blob = new Blob([byteArray], {type: 'application/pdf'});

              var url= window.URL.createObjectURL(blob);
              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveOrOpenBlob(blob);
              }
              else {
                  //var objectUrl = URL.createObjectURL(blob);
                  //window.open(objectUrl);
                  window.open(url);
              }
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
            if(printType == "Z"){
              if(existPrinters){
                const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
                var count = byteCharacters.length;

                for (var index = 0;index < count;)
                {
                  var ch = byteCharacters[index++];
                  if (ch & 0x80)
                  {
                    var extra = extraByteMap[(ch >> 3) & 0x07];
                    if (!(ch & 0x40) || !extra || ((index + extra) > count)){

                    }

                    ch = ch & (0x3F >> extra);
                    for (;extra > 0;extra -= 1)
                    {
                      var chx = byteCharacters[index++];
                      if ((chx & 0xC0) != 0x80){

                      }

                      ch = (ch << 6) | (chx & 0x3F);
                    }
                  }

                  strCommand += String.fromCharCode(ch);
                }
                this.existPrinter = existPrinters;
                if(tracking == trackingKeys.length-1){
                  this.sendDataPro(strCommand);
                }
              }else{
                this.existPrinter = existPrinters;
                this.openModal();
              }
            }else{
              var blob = new Blob([byteArray], {type: 'application/pdf'});

              var url= window.URL.createObjectURL(blob);
              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveOrOpenBlob(blob);
              }
              else {
                  //var objectUrl = URL.createObjectURL(blob);
                  //window.open(objectUrl);
                  window.open(url);
              }
            }
          }
        });
      }
      if(parcelId == 5){
        let url:string = "http://webbooking.paquetexpress.com.mx:8104/wsReportPaquetexpress/GenCartaPorte?trackingNoGen=" + trackingKeys[tracking];
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

    let data:ObjectExcel[] = this.PrepareDataCSV(this.validDateGuideForReports);

    let json = JSON.stringify(data);
    this.excelService.try(data);
    this.validReport = false;
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
    this.validReport = true;
    this.validDateGuideForReports = [];
    this.validDateGuide = [];
    this.canceledPressed = 1
    this.guideService.CancelGuide(shipment).subscribe(response =>{
      if(response){
        if(response == "SUCCESS: Shipment Canceled"){
          this.canceledGuide = true;
          this.openModal();
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
            startDate = this.startingDate;
            finishDate = this.endingDate;
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
                let parcelName:string;
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

                    if(response[i].ParcelId == 1){
                      parcelName = "DHL";
                    }else if(response[i].ParcelId == 2){
                      parcelName = "RedPack";
                    }else if(response[i].ParcelId == 3){
                      parcelName = "FedEx";
                    }else if(response[i].ParcelId == 4){
                      parcelName = "Estafeta";
                    }else{
                      parcelName = "Paquetexpress";
                    }

                    this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                    response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
                  response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
                response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
                response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
              response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
              response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
              parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

              this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
              response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
            response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
          response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
          response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
        response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
        response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
        parcelName, valid, response[i].PrintType,  response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));
                  }


                if(this.shipments.length > 0 || this.validDateGuide.length > 0){
                  this.loaded = true;
                  let masterGuide:Shipment;
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                      }else{
                        this.total = this.validDateGuide[i].totalAmount + this.total;
                        this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                          this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                        this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                      }
                    }else if(this.validDateGuide[i].multiPieces == "Y"){
                      if(this.validDateGuide[i].multiPiecesMasterId == 0){
                        masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                        this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                        this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                        this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                        this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                        this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                        this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                        this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                        if(counterMatches > 0){
                          this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                          this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                        this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        this.trackings = [];
                        this.guidesId = [];
                        counterMatches = 0;
                        this.total = this.validDateGuide[i].totalAmount + this.total;
                      }
                    }
                  }
                  let tempFiles = this.validDateGuide.slice(0);
                  tempFiles.forEach((element) => {
                    if(element.multiPieces == "Y"){
                      let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                      this.validDateGuide.splice(removeIndex, 1);
                    }
                  });

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
            let parcelName:string;

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
                    parcelName = "";
                    if(response[i].ParcelId == 1){
                      parcelName = "DHL";
                    }else if(response[i].ParcelId == 2){
                      parcelName = "RedPack";
                    }else if(response[i].ParcelId == 3){
                      parcelName = "FedEx";
                    }else if(response[i].ParcelId == 4){
                      parcelName = "Estafeta";
                    }else{
                      parcelName = "Paquetexpress";
                    }

                    this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                    response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
                  response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
                response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
                response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
              response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
              response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
              parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

                  this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                  response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
                response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
              response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
              response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
            response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
            response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
            parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));
                  }


                if(this.shipments.length > 0 || this.validDateGuide.length > 0){
                  this.loaded = true;
                  let masterGuide:Shipment;
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                      }else{
                        this.total = this.validDateGuide[i].totalAmount + this.total;
                        this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                          this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                        this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                      }
                    }else if(this.validDateGuide[i].multiPieces == "Y"){
                      if(this.validDateGuide[i].multiPiecesMasterId == 0){
                        masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                        this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                        this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                        this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                        this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                        this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                        this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                        this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                        if(counterMatches > 0){
                          this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                          this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                        this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                        this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        this.trackings = [];
                        this.guidesId = [];
                        counterMatches = 0;
                        this.total = this.validDateGuide[i].totalAmount + this.total;
                      }
                    }
                  }
                  let tempFiles = this.validDateGuide.slice(0);
                  tempFiles.forEach((element) => {
                    if(element.multiPieces == "Y"){
                      let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                      this.validDateGuide.splice(removeIndex, 1);
                    }
                  });
                  if(this.total > 0){
                    this.totalCalculated = true;
                  }
                }else{
                  this.loaded = false;
                }
              }
            });
          }
        }else{

          this.canceledGuide = false;
          this.openModal();
        }
      }
    });
  }

  cancelGuideMPS(shipment:ShowMultiPieces){
    this.validReport = true;

    this.canceledPressed = 1;
    this.validDateGuide = [];
    this.validDateGuideForReports = [];
    if(shipment.parcelId == 3){
      this.guideService.CancelGuide(shipment.masterGuide).subscribe(response =>{
        if(response){
          if(response == "SUCCESS: Shipment Canceled"){
            this.canceledGuide = true;
            this.openModal();
            let startDate:string;
            let finishDate:string;
            let idClient:number;

            if(this.reportType == 2 || this.reportType == 1){
              startDate = this.startingDate;
              finishDate = this.endingDate;
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
                  let parcelName:string;
                  this.validDateGuide = [];
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

                      if(response[i].ParcelId == 1){
                        parcelName = "DHL";
                      }else if(response[i].ParcelId == 2){
                        parcelName = "RedPack";
                      }else if(response[i].ParcelId == 3){
                        parcelName = "FedEx";
                      }else if(response[i].ParcelId == 4){
                        parcelName = "Estafeta";
                      }else{
                        parcelName = "Paquetexpress";
                      }

                      this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                      response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
                    response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
                  response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
                  response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
                response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
                response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
                parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

                this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
              response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
            response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
            response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
          response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
          response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
          parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));
                    }


                  if(this.shipments.length > 0 || this.validDateGuide.length > 0){
                    this.loaded = true;
                    let masterGuide:Shipment;
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        }else{
                          this.total = this.validDateGuide[i].totalAmount + this.total;
                          this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                            this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                          this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        }
                      }else if(this.validDateGuide[i].multiPieces == "Y"){
                        if(this.validDateGuide[i].multiPiecesMasterId == 0){
                          masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                          this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                          this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                          this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                          this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                          this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                          this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                          this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                          if(counterMatches > 0){
                            this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                            this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                          this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                          this.trackings = [];
                          this.guidesId = [];
                          counterMatches = 0;
                          this.total = this.validDateGuide[i].totalAmount + this.total;
                        }
                      }
                    }
                    let tempFiles = this.validDateGuide.slice(0);
                    tempFiles.forEach((element) => {
                      if(element.multiPieces == "Y"){
                        let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                        this.validDateGuide.splice(removeIndex, 1);
                      }
                    });

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
              let parcelName:string;

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
                      parcelName = "";
                      if(response[i].ParcelId == 1){
                        parcelName = "DHL";
                      }else if(response[i].ParcelId == 2){
                        parcelName = "RedPack";
                      }else if(response[i].ParcelId == 3){
                        parcelName = "FedEx";
                      }else if(response[i].ParcelId == 4){
                        parcelName = "Estafeta";
                      }else{
                        parcelName = "Paquetexpress";
                      }

                      this.validDateGuide.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                      response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
                    response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
                  response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
                  response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
                response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
                response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
                parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));

                this.validDateGuideForReports.push(new ValidDateGuide(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
                response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
              response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
            response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
            response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
          response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString,
          response[i].NumGuide, response[i].MultiPieces, response[i].MultiPiecesMasterTracking, response[i].MultiPiecesMasterId, response[i].MultiPiecesSequenceNumber, response[i].ProductName,
          parcelName, valid, response[i].PrintType, response[i].Reference, response[i].Username, response[i].VolumetricWeight, response[i].OutOfArea));
                    }


                  if(this.shipments.length > 0 || this.validDateGuide.length > 0){
                    this.loaded = true;
                    let masterGuide:Shipment;
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        }else{
                          this.total = this.validDateGuide[i].totalAmount + this.total;
                          this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                            this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                          this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                        }
                      }else if(this.validDateGuide[i].multiPieces == "Y"){
                        if(this.validDateGuide[i].multiPiecesMasterId == 0){
                          masterGuide = new Shipment(this.validDateGuide[i].id, this.validDateGuide[i].userId, this.validDateGuide[i].parcelId, this.validDateGuide[i].productId,
                          this.validDateGuide[i].totalAmount, this.validDateGuide[i].amountDetail, this.validDateGuide[i].originCompany, this.validDateGuide[i].originAddress, this.validDateGuide[i].originAddress2,
                          this.validDateGuide[i].originColony, this.validDateGuide[i].originCity, this.validDateGuide[i].originState, this.validDateGuide[i].originZip, this.validDateGuide[i].originCountry, this.validDateGuide[i].originPhoneNumber,
                          this.validDateGuide[i].originUserName, this.validDateGuide[i].destinyCompany, this.validDateGuide[i].destinyAddress, this.validDateGuide[i].destinyAddress2, this.validDateGuide[i].destinyColony, this.validDateGuide[i].destinyCity,
                          this.validDateGuide[i].destinyState, this.validDateGuide[i].destinyZip, this.validDateGuide[i].destinyCountry, this.validDateGuide[i].destinyPhoneNumber, this.validDateGuide[i].destinyUserName, this.validDateGuide[i].trackingKey,
                          this.validDateGuide[i].status, this.validDateGuide[i].weight, this.validDateGuide[i].length, this.validDateGuide[i].width, this.validDateGuide[i].height, this.validDateGuide[i].insurance, this.validDateGuide[i].creationDate,
                          this.validDateGuide[i].creationDateString, this.validDateGuide[i].numGuide, this.validDateGuide[i].multiPieces, this.validDateGuide[i].multiPiecesMasterTracking, this.validDateGuide[i].multiPiecesMasterId, this.validDateGuide[i].multiPiecesSequenceNumber,
                          this.validDateGuide[i].printType, this.validDateGuide[i].productName, this.validDateGuide[i].reference, this.validDateGuide[i].username, this.validDateGuide[i].volumetricWeight, this.validDateGuide[i].outOfArea);
                          if(counterMatches > 0){
                            this.multipiecesObject.push(new ShowMultiPieces(this.validDateGuideAux.id, this.validDateGuideAux.trackingKey, this.validDateGuideAux.numGuide,
                            this.validDateGuideAux.totalAmount, counterMatches, this.validDateGuideAux.originUserName, this.validDateGuideAux.destinyUserName,
                          this.validDateGuideAux.status, this.validDateGuideAux.creationDateString, this.validDateGuideAux.validDate, this.validDateGuideAux.parcelId,
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
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
                          this.trackings, this.guidesId, this.validDateGuideAux.parcelName, this.validDateGuideAux.printType, masterGuide));
                          this.trackings = [];
                          this.guidesId = [];
                          counterMatches = 0;
                          this.total = this.validDateGuide[i].totalAmount + this.total;
                        }
                      }
                    }
                    let tempFiles = this.validDateGuide.slice(0);
                    tempFiles.forEach((element) => {
                      if(element.multiPieces == "Y"){
                        let removeIndex = this.validDateGuide.map((item) => item['multiPieces']).indexOf(element['multiPieces']);
                        this.validDateGuide.splice(removeIndex, 1);
                      }
                    });
                    if(this.total > 0){
                      this.totalCalculated = true;
                    }
                  }else{
                    this.loaded = false;
                  }
                }
              });
            }
          }else{
            this.canceledGuide = false;
            this.openModal();
          }
        }
      });
    }else{
      shipment.trackings.forEach((item) =>{

      });
    }
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

            indexNo = porcentajeString.indexOf('ro');
            let indexEnd = porcentajeString.indexOf('%');
            porcentajeString = porcentajeString.substring(indexNo+2, indexEnd);

            let porcentajeValue = +porcentajeString;
            insurancePerc = (item.insurance * porcentajeValue)/100;

            indexNo = item.amountDetail.indexOf('C');
            let comiString = item.amountDetail.substring(indexNo);
            indexNo = comiString.indexOf('$');
            if(comiString.indexOf(',')){
              indexEnd = comiString.indexOf(',');
              if(indexEnd > 0){
                comiString = comiString.substring(indexNo+1, indexEnd);
                insuranceComi = +comiString;
                if(item.multiPiecesMasterId == 0){
                  insuranceCost = insurancePerc + insuranceComi;
                }else{
                  insuranceCost = insurancePerc;
                }
              }else{
                comiString = comiString.substring(indexNo+1);
                insuranceComi = +comiString;
                if(item.multiPiecesMasterId == 0){
                  insuranceCost = insurancePerc + insuranceComi;
                }else{
                  insuranceCost = insurancePerc;
                }
              }
              /*comiString = comiString.substring(indexNo+1);
              console.log(comiString)
              insuranceComi = +comiString;
              console.log(insuranceComi);
              if(item.multiPiecesMasterId == 0){
                insuranceCost = insurancePerc + insuranceComi;
                console.log(insuranceCost);
              }else{
                insuranceCost = insurancePerc;
                console.log(insuranceCost);
              }*/
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
              if(indexEnd > 0){
                comiString = comiString.substring(indexNo+1, indexEnd);
                insuranceComi = +comiString;
                insuranceCost = insuranceComi + insurancePerc;
              }else{
                comiString = comiString.substring(indexNo+1);
                insuranceComi = +comiString;
                insuranceCost = insuranceComi + insurancePerc;
              }

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
          multipieces, extraKg, insuranceCost, item.trackingKey, item.reference, item.username, item.volumetricWeight, item.status, item.outOfArea));
      }else{
        this.ObjectExcel.push(new ObjectExcel(item.id, parcel, item.productName, item.totalAmount, item.amountDetail,
          item.originUserName, item.originCompany, item.originCountry, item.originState, item.originCity, item.originZip,
          item.originColony, item.originAddress, item.originAddress2, item.originPhoneNumber,
          item.destinyUserName, item.destinyCompany, item.destinyCountry, item.destinyState, item.destinyCity, item.destinyZip,
          item.destinyColony, item.destinyAddress, item.destinyAddress2, item.destinyPhoneNumber,
          item.trackingKey, item.status, item.weight, item.length, item.width, item.height, item.insurance, item.creationDateString,
          multipieces, extraKg, insuranceCost, item.trackingKey, item.reference, item.username, item.volumetricWeight, item.status, item.outOfArea));
      }
    }
    return this.ObjectExcel;
  }

  tracking(shipment:Shipment){
    this.guideService.TrackingGuide(shipment).subscribe(response =>{

    });
  }

  sendDataPro(print:string)
  {
    showLoading("Printing...");

    checkPrinterStatus( function (text){

      if (text == "Ready to Print")
      {
        //selected_printer.send(zpl, printComplete, printerError);
        selected_printer.send(print, printComplete, printerError);

      }
      else
      {
        printerError(text);
      }
    });
    setTimeout( () => { /*Your Code*/

      if(errorGuide == 1){

        this.errorGuideModal = errorGuide;

        this.openModal();
      }
    }, 2000 );
  };
}
