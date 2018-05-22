import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ClientService } from '../../services/client-service/client.service';
import { User } from '../../classes/Client';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';

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

  constructor(
    private clientService:ClientService
  ) {
    /*$(document).ready(function(){
      $('.datepicker').datepicker();
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, options);
    });*/


    this.clientService.getUsersByUserID().subscribe(response =>{
      if(!response){
        this.loading = false;
        this.petitionError = true;
      }else{
        console.log(response);
        for(let i=0; i < response.length; i++){
          this.clients.push(
            new User(response[i].id, response[i].name, response[i].lastName, response[i].userName, response[i].password,
              response[i].address, response[i].email, response[i].typeId, response[i].address2, response[i].colony,
              response[i].city, response[i].state, response[i].zip, response[i].country, response[i].phoneNumber));
        }
        console.log(this.clients);
      }
    });

  }

  ngOnInit() {
  }

  checkReports(forma:NgForm){
    console.log(forma);
    let startDate:string = forma.controls["startDate"].value;
    let finishDate:string = forma.controls["finishDate"].value
    let idClient:number = forma.controls["client"].value

    console.log(startDate);
    console.log(finishDate);
    console.log(idClient);
  }

}
