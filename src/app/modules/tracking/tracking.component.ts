import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  goEstafeta(){
    let url:string = "http://www.estafeta.com/Rastreo/";
    window.open(url, "_blank");
  }

  goFedEx(){
    let url:string = "https://www.fedex.com/apps/fedextrack/?action=track&cntry_code=mx";
    window.open(url, "_blank");
  }

  goRedPack(){
    let url:string = "http://www.redpack.com.mx/rastreo-de-envios/";
    window.open(url, "_blank");
  }

  goDHL(){
    let url:string = "http://www.dhl.com.mx/es/express/rastreo/monitorear_envios.html";
    window.open(url, "_blank");
  }

  goPaquetexpress(){
    let url:string = "https://www.paquetexpress.com.mx/";
    window.open(url, "_blank");
  }

}
