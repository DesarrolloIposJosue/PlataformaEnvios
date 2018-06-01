import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-add-guides-to-client',
  templateUrl: './add-guides-to-client.component.html',
  styleUrls: ['./add-guides-to-client.component.css']
})
export class AddGuidesToClientComponent implements OnInit {

  private guidesEstafeta:boolean = false;
  private guidesDHL:boolean = false;
  private guidesRedPack:boolean = false;
  private guidesPaquetexpress:boolean = false;
  private guidesFedEx:boolean = false;

  constructor() {
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
  }

  ngOnInit() {
  }

  checkEstafeta(){
    var element = <HTMLInputElement>document.getElementById("estafetaCheck");
    element = <HTMLInputElement>document.getElementById("estafetaCheck");
    if(element.checked == true){
      this.guidesEstafeta = true;
    }
  }

  checkDHL(){
    var element = <HTMLInputElement>document.getElementById("dhlCheck");
    element = <HTMLInputElement>document.getElementById("dhlCheck");
    if(element.checked == true){
      this.guidesDHL = true;
    }
  }

  checkRedPack(){
    var element = <HTMLInputElement>document.getElementById("redPackCheck");
    element = <HTMLInputElement>document.getElementById("redPackCheck");
    if(element.checked == true){
      this.guidesRedPack = true;
    }
  }

  checkPaquetexpress(){
    var element = <HTMLInputElement>document.getElementById("paquetexpressCheck");
    element = <HTMLInputElement>document.getElementById("paquetexpressCheck");
    if(element.checked == true){
      this.guidesPaquetexpress = true;
    }
  }

  checkFedEx(){
    var element = <HTMLInputElement>document.getElementById("fedExCheck");
    element = <HTMLInputElement>document.getElementById("fedExCheck");
    if(element.checked == true){
      this.guidesFedEx = true;
    }
  }
}
