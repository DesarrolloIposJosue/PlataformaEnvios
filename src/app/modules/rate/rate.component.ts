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

  }

  ngOnInit() {
    if(this.rateService.dataProducts.length == 0){
      this.noDelivery = true;
    }
    /*else
    {
      for(let i=0; i<this.rateService.dataProducts.length; i++)
      {
        var x = document.getElementById(i.toString());
        x.style.display = "none";
      }
    }*/

  }

  selectProduct(productId:number, parcelId:number, amount:number, amountDetails:string[]){
    this.createGuideService.GetPrepaidGuide(parcelId).subscribe(json => {
      if(json == -2){
        this.createGuideService.parcelId = parcelId;
        this.createGuideService.productId = productId;
        this.createGuideService.totalAmount = amount;
        let amountDetail:string;
        for(let i=0; i<amountDetails.length; i++){
          if(i == 0){
            amountDetail = amountDetails[i];
          }else{
            amountDetail = amountDetail + "," + amountDetails[i];
          }
        }
        this.createGuideService.amountDetail = amountDetail;
        this.router.navigate(['/create-guide']);
      }else if(json == -1){
        this.router.navigate(['/home']);
      }else if(json == 0){
        this.router.navigate(['/buy-guides']);
      }else if(json > 0){
        this.createGuideService.parcelId = parcelId;
        this.createGuideService.productId = productId;
        this.createGuideService.totalAmount = amount;
        let amountDetail:string;
        for(let i=0; i<amountDetails.length; i++){
          if(i == 0){
            amountDetail = amountDetails[i];
          }else{
            amountDetail = amountDetail + "," + amountDetails[i];
          }
        }
        this.createGuideService.amountDetail = amountDetail;
        this.router.navigate(['/create-guide']);
      }
    })

  }

  showDivDetails(valueP: number)
  {
    var x = document.getElementById(valueP.toString());
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

}
