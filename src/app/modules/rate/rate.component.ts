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
    console.log(productId);
    console.log(parcelId);
    this.createGuideService.parcelId = parcelId;
    this.createGuideService.productId = productId;
    this.createGuideService.totalAmount = amount;
    let amountDetail:string;
    console.log(amountDetails);
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

  showDivDetails(valueP: number)
  {
    var x = document.getElementById(valueP.toString());
    console.log(x.style.display);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

}
