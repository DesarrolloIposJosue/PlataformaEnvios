import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ClientService } from '../../services/client-service/client.service';
import { User } from '../../classes/Client';
import {Shipment} from "../../classes/Shipment";
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { GuidesService } from '../../services/guides/guides.service';

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
  private loaded:boolean = false;
  private loadedClients:boolean = false;

  constructor(
    private clientService:ClientService,
    private guideService:GuidesService
  ) {
    this.clientService.getUsersByUserID().subscribe(response =>{
      if(!response){
        this.loading = false;
        this.petitionError = true;
      }else{
        for(let i=0; i < response.length; i++){
          this.clients.push(
            new User(response[i].id, response[i].name, response[i].lastName, response[i].userName, response[i].password,
              response[i].address, response[i].email, response[i].typeId, response[i].address2, response[i].colony,
              response[i].city, response[i].state, response[i].zip, response[i].country, response[i].phoneNumber));
        }
        if(this.clients.length > 0){
          this.loadedClients = true;
        }
      }
    });

  }

  ngOnInit() {
  }

  checkReports(forma:NgForm){
    this.shipments = [];

    let startDate:string = forma.controls["startDate"].value;
    let finishDate:string = forma.controls["finishDate"].value
    let idClient:number = forma.controls["client"].value

    this.guideService.GetShipmentsByUserAndDates(startDate, finishDate, idClient).subscribe(response =>{
      if(response){

        for(let i = 0; i < response.length; i++){

          this.shipments.push(new Shipment(response[i].Id, response[i].UserId, response[i].ParcelId, response[i].ProductId,
          response[i].TotalAmount, response[i].AmountDetail, response[i].OriginCompany, response[i].OriginAddress, response[i].OriginAddress2,
        response[i].OriginColony, response[i].OriginCity, response[i].OriginState, response[i].OriginZIP, response[i].OriginCountry, response[i].OriginPhoneNumber,
      response[i].OriginUserName, response[i].DestinyCompany, response[i].DestinyAddress, response[i].DestinyAddress2, response[i].DestinyColony, response[i].DestinyCity,
      response[i].DestinyState, response[i].DestinyZIP, response[i].DestinyCountry, response[i].DestinyPhoneNumber, response[i].DestinyUserName, response[i].TrackingKey,
    response[i].Status, response[i].Weight, response[i].Length, response[i].Width, response[i].Height, response[i].Insurance, response[i].CreationDate, response[i].CreationDateString));
        }
        if(this.shipments.length > 0){
          this.loaded = true;
        }else{
          this.loaded = false;
          console.log("Si entre");
        }
      }
    });
  }

  loadReport(reportId:number){
    console.log(reportId);
  }
}
