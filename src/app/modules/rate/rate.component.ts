import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { RateService } from '../../services/rate-service/rate.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { ProductService } from '../../services/product-service/product.service';
import { Rate } from '../../classes/Rate';
import { ValidRate } from '../../classes/ValidRate';
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
  private validRates:ValidRate[] = [];
  private quantityOfPerm:number = 0;

  constructor(
    private rateService:RateService,
    private createGuideService:CreateGuideService,
    private router:Router,
    private download:DownloadGuideService,
    private productService:ProductService
  ) {
    sessionStorage.setItem("NewUserId", sessionStorage.getItem("Id"));
    this.productService.getParcelsFromUser().subscribe(
      (response) => {
        if(response){
          let index:number=0;
          let economicFedEx:boolean = false;
          let nextDayFedEx:boolean = false;
          let economicRedPack:boolean = false;
          let nextDayRedPack:boolean = false;

          let paquete:boolean = false;
          let fedex:boolean = false;
          let redPack:boolean = false;
          for(let item of response){
            if(item.parcelId == 5){
              if(item.password != "n"){
                paquete = true;
              }
            }
            if(item.parcelId == 2){
              if(item.password != "n"){
                redPack = true;
              }
            }
            if(item.parcelId == 3){
              if(item.password != "n"){
                fedex = true;
              }
            }
            if(item.parcelId == 3 && item.economic == "Y"){
              economicFedEx = true;
              this.quantityOfPerm++;
            }
            if(item.parcelId == 3 && item.nextDay == "Y"){
              nextDayFedEx = true;
              this.quantityOfPerm++;
            }
            if(item.parcelId == 2 && item.economic == "Y"){
              economicRedPack = true;
              this.quantityOfPerm++;
            }
            if(item.parcelId == 2 && item.nextDay == "Y"){
              nextDayRedPack = true;
              this.quantityOfPerm++;
            }
            if(item.parcelId == 1 || item.parcelId == 4 || item.parcelId == 5 ){
              this.quantityOfPerm++;
            }
          }
          if(this.quantityOfPerm > 1 && this.rateService.dataProducts.length > 1){
            console.log(this.rateService.dataProducts.length);
            for(let item of this.rateService.dataProducts){
              if(item.description.indexOf('Economico') >= 0 && (item.parcelId == 3 || item.parcelId == 2 )){
                if(3 == item.parcelId && economicFedEx && fedex){
                  this.validRates.push(new ValidRate(item.id, item.name, item.description, item.kg, item.volumetricWeight, item.factor,
                    item.parcelId, item.amount, item.parcelName, item.deliveryDateSpecified, item.deliveryDate, item.amountDetails, "Y"));
                }
                if(2 == item.parcelId && economicRedPack && redPack){
                  this.validRates.push(new ValidRate(item.id, item.name, item.description, item.kg, item.volumetricWeight, item.factor,
                    item.parcelId, item.amount, item.parcelName, item.deliveryDateSpecified, item.deliveryDate, item.amountDetails, "Y"));
                }
              }else if(item.description.indexOf('Dia Siguiente') >= 0 && (item.parcelId == 3 || item.parcelId == 2 )){
                if(3 == item.parcelId && nextDayFedEx && fedex){
                  this.validRates.push(new ValidRate(item.id, item.name, item.description, item.kg, item.volumetricWeight, item.factor,
                    item.parcelId, item.amount, item.parcelName, item.deliveryDateSpecified, item.deliveryDate, item.amountDetails, "Y"));
                }
                if(2 == item.parcelId && nextDayRedPack && redPack){
                  this.validRates.push(new ValidRate(item.id, item.name, item.description, item.kg, item.volumetricWeight, item.factor,
                    item.parcelId, item.amount, item.parcelName, item.deliveryDateSpecified, item.deliveryDate, item.amountDetails, "Y"));
                }
              }else{
                if(paquete){
                  this.validRates.push(new ValidRate(item.id, item.name, item.description, item.kg, item.volumetricWeight, item.factor,
                    item.parcelId, item.amount, item.parcelName, item.deliveryDateSpecified, item.deliveryDate, item.amountDetails, "Y"));
                }
              }
              index++;
            }
            console.log(this.validRates);
          }else{
            for(let item of this.rateService.dataProducts){
              this.selectProduct(item.id, item.parcelId, item.amount, item.amountDetails, item.description)
            }
          }
        }
      }
    );

    sessionStorage.removeItem("NewUserId");

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
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

  selectProduct(productId:number, parcelId:number, amount:number, amountDetails:string[], description:string){
    this.createGuideService.GetPrepaidGuide(parcelId).subscribe(json => {
      if(json == -2){
        this.createGuideService.parcelId = parcelId;
        this.createGuideService.productId = productId;
        this.createGuideService.totalAmount = amount;
        this.createGuideService.productName = description;
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
        this.createGuideService.productName = description;
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
