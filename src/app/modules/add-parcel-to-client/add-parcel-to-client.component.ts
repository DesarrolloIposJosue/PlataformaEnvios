import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { User_Parcel } from '../../classes/UserParcel';
import { Observable } from 'rxjs/Rx';

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
  public errorAddParcelsToClient:boolean = false;

  constructor(
    private parcelService:ParcelService,
    private router:Router
  ) {
    console.log(sessionStorage.getItem('UserNameNewUser'));
    console.log(sessionStorage.getItem('PasswordNewUser'));
  }

  assignParcel(forma:NgForm){

    var parcInfo:User_Parcel[] = [];
    var parcInfoInd:User_Parcel = new User_Parcel;

    if(this.redPackForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordRedPack"].value == "" || forma.controls["usernameRedPack"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 2;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameRedPack"].value;
        parcInfoInd.password = forma.controls["passwordRedPack"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.fedExForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordFedEx"].value == "" || forma.controls["usernameFedEx"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 3;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameFedEx"].value;
        parcInfoInd.password = forma.controls["passwordFedEx"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.dhlForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordDHL"].value == "" || forma.controls["usernameDHL"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 1;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameDHL"].value;
        parcInfoInd.password = forma.controls["passwordDHL"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(this.estafetaForm){
      parcInfoInd = new User_Parcel;
      if(forma.controls["passwordEstafeta"].value == "" || forma.controls["usernameEstafeta"].value == ""){
        console.log("Faltan valores");
        this.errorParcelData = true;
      }else{
        this.errorParcelData = false;
        parcInfoInd.parcelId = 4;
        parcInfoInd.userId = 0;
        parcInfoInd.username = forma.controls["usernameEstafeta"].value;
        parcInfoInd.password = forma.controls["passwordEstafeta"].value;
        parcInfo.push(parcInfoInd);
      }
    }

    if(!this.errorParcelData){
      //Entra a enviar
      this.loading = true;
      this.parcelService.addParcelToClient(parcInfo).subscribe(jsonData => {
            console.log(jsonData);
            var checkUser = jsonData;
            if (jsonData == "SUCCESS: Parcels assigned to User") {
              console.log("Se creó correctamente");
              this.router.navigate(['/home']);
            } else {
                this.loading = false;
                this.errorAddParcelsToClient = true;
            }
        });
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
