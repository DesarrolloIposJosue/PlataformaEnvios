import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { RateService } from '../../services/rate-service/rate.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { Rate } from '../../classes/Rate';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { DownloadGuideService } from '../../services/download-guide-service/download-guide.service';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})

export class RateComponent implements OnInit {
  private noDelivery:boolean = false;

  constructor(
    private rateService:RateService,
    private createGuideService:CreateGuideService,
    private router:Router,
    private download:DownloadGuideService
  ) {
    console.log(this.rateService.dataProducts);
    this.download.DownloadFile().subscribe(jsonData => {
      if(!jsonData){

      }else{
        /*console.log(jsonData);
        var byteCharacters = jsonData;
        console.log("Samunazi:")
        console.log(byteCharacters);
        /*var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }*/
        /*var byteArray = new Uint8Array(byteCharacters);
        var blob = new Blob([byteArray], {type: 'application/pdf'});
        var url= window.URL.createObjectURL(blob);
        window.open(url);*/
      }
    });

  }

  ngOnInit() {
    if(this.rateService.dataProducts.length == 0){
      this.noDelivery = true;
    }
  }

  selectProduct(productId:number, parcelId:number, amount:number, amountDetails:string[]){
    console.log(productId);
    console.log(parcelId);
    this.createGuideService.parcelId = parcelId;
    this.createGuideService.productId = productId;
    this.createGuideService.totalAmount = amount;
    for(let i=0; i<amountDetails.length; i++){
      if(i == 0){
        this.createGuideService.amountDetail = amountDetails[i];
      }
      this.createGuideService.amountDetail = this.createGuideService.amountDetail + "," + amountDetails[i];
    }
    this.router.navigate(['/create-guide']);
  }

}
