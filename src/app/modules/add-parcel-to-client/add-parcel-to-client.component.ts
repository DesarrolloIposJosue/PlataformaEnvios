import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-parcel-to-client',
  templateUrl: './add-parcel-to-client.component.html',
  styleUrls: ['./add-parcel-to-client.component.css']
})
export class AddParcelToClientComponent implements OnInit {
  public redPackForm:boolean = false;
  public fedExForm:boolean = false;
  public dhlForm:boolean = false;
  public estafetaForm:boolean = false;

  constructor() { }

  checkRedPack(){
    console.log("redPack");
    var element = <HTMLInputElement>document.getElementById("test5");
    element = <HTMLInputElement>document.getElementById("test5");
    if(element.checked == true){
      console.log("Checado :P");
      this.redPackForm = true;
    }else{
      this.redPackForm = false;
    }
  }

  checkFedEx(){
    console.log("fedEx");
    var element = <HTMLInputElement>document.getElementById("test7");
    element = <HTMLInputElement>document.getElementById("test7");
    if(element.checked == true){
      console.log("Checado :P");
      this.fedExForm = true;
    }else{
      this.fedExForm = false;
    }
  }

  checkDHL(){
    console.log("DHL");
    var element = <HTMLInputElement>document.getElementById("test6");
    element = <HTMLInputElement>document.getElementById("test6");
    if(element.checked == true){
      console.log("Checado :P");
      this.dhlForm = true;
    }else{
        this.dhlForm = false;
    }
  }

  checkEstafeta(){
    console.log("Estafeta");
    var element = <HTMLInputElement>document.getElementById("test8");
    element = <HTMLInputElement>document.getElementById("test8");
    if(element.checked == true){
      console.log("Checado :P");
      this.estafetaForm = true;
    }else{
      this.estafetaForm = false;
    }
  }


  ngOnInit() {
  }

}
