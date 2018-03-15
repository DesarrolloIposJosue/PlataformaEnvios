import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParcelClient } from '../../classes/ParcelClient';

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

  public errorParcelData:boolean = false;

  constructor() { }

  assignParcel(forma:NgForm){

    var parcInfo:ParcelClient[] = [];
    var parcInfoInd:ParcelClient = new ParcelClient;

    if(this.redPackForm){
      parcInfoInd = new ParcelClient;
      if(forma.controls["passwordRedPack"].value == "" || forma.controls["usernameRedPack"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.usernames = forma.controls["usernameRedPack"].value;
        parcInfoInd.passwords = forma.controls["passwordRedPack"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.fedExForm){
      parcInfoInd = new ParcelClient;
      if(forma.controls["passwordFedEx"].value == "" || forma.controls["usernameFedEx"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.usernames = forma.controls["usernameFedEx"].value;
        parcInfoInd.passwords = forma.controls["passwordFedEx"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.dhlForm){
      parcInfoInd = new ParcelClient;
      if(forma.controls["passwordDHL"].value == "" || forma.controls["usernameDHL"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.usernames = forma.controls["usernameDHL"].value;
        parcInfoInd.passwords = forma.controls["passwordDHL"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.estafetaForm){
      parcInfoInd = new ParcelClient;
      if(forma.controls["passwordEstafeta"].value == "" || forma.controls["usernameEstafeta"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.usernames = forma.controls["usernameEstafeta"].value;
        parcInfoInd.passwords = forma.controls["passwordEstafeta"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(!this.errorParcelData){
      //Entra a enviar
      this.loading = true;
    }else{
      console.log("No puede guardar");
    }

    console.log(parcInfo.length);

    console.log(parcInfo);
  }

  checkRedPack(){
    var element = <HTMLInputElement>document.getElementById("test5");
    element = <HTMLInputElement>document.getElementById("test5");
    if(element.checked == true){
      this.redPackForm = true;
    }else{
      this.redPackForm = false;
    }
  }

  checkFedEx(){
    var element = <HTMLInputElement>document.getElementById("test7");
    element = <HTMLInputElement>document.getElementById("test7");
    if(element.checked == true){
      this.fedExForm = true;
    }else{
      this.fedExForm = false;
    }
  }

  checkDHL(){
    var element = <HTMLInputElement>document.getElementById("test6");
    element = <HTMLInputElement>document.getElementById("test6");
    if(element.checked == true){
      this.dhlForm = true;
    }else{
        this.dhlForm = false;
    }
  }

  checkEstafeta(){
    var element = <HTMLInputElement>document.getElementById("test8");
    element = <HTMLInputElement>document.getElementById("test8");
    if(element.checked == true){
      this.estafetaForm = true;
    }else{
      this.estafetaForm = false;
    }
  }


  ngOnInit() {
  }

}
