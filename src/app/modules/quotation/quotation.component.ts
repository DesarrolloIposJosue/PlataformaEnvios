import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { NgForm } from '@angular/forms';
import { Package } from '../../classes/Package';
import { RateService } from '../../services/rate-service/rate.service';
import { Rate } from '../../classes/Rate';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  profile: any;
  loading:boolean;
  private invalidForm:boolean = false;
  private petitionError = false;
  private dataProducts:Rate[] = [];
  private response:any;
  private invalidNumber:boolean = false;
  private invalidPC:boolean = false;

  constructor(
    private auth: AuthService,
    private rateService: RateService,
    private router: Router
  ) { }

  ngOnInit() {
    //Obtain the info of the user
    /*if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }*/
  }

  addQuotation(forma:NgForm){
    console.log("Es válido?");
    console.log(forma.valid);
    this.loading = true;

    if(!forma.valid){
          this.invalidForm = true;
          this.loading = false;
    }else{
      this.invalidForm = false;
      const quotationData: Package = {
        id: 0,
        status: "iniciado",
        originAddress: forma.controls["origin_city"].value,
        postCodeOrigin: forma.controls["postal_code_origin"].value,
        destinationAddress: forma.controls["dest_city"].value,
        postCodeDest: forma.controls["postal_code_dest"].value,
        kindPackage: forma.controls["kindPackage"].value,
        weight: forma.controls["weight"].value,
        long: forma.controls["long"].value,
        width: forma.controls["width"].value,
        hight: forma.controls["hight"].value,
        idParcel: 0
      }

      console.log(quotationData);
      if(quotationData.postCodeOrigin > 0 && quotationData.postCodeDest > 0 && quotationData.weight > 0
      && quotationData.long > 0 && quotationData.width > 0 && quotationData.hight > 0 &&
      quotationData.postCodeOrigin.toString().length > 4 && quotationData.postCodeDest.toString().length > 4){
        this.invalidNumber = false;
        this.invalidPC = false;
        this.rateService.getQuotation(quotationData).subscribe(jsonData => {
          console.log("Panamez: "+jsonData);
          console.log(jsonData);
          if(!jsonData){
            this.loading = false;
            this.petitionError = true;
          }else{
            var rateArray = jsonData;
            this.response = jsonData;
            this.dataProducts = [];
            for (var i = 0; i < rateArray.length; i++) {
              this.dataProducts.push(
                new Rate(rateArray[i].id, rateArray[i].name, rateArray[i].description,
                        rateArray[i].kg, rateArray[i].factor, rateArray[i].parcelId,
                        rateArray[i].amount, rateArray[i].parcelName));

              /*this.dataProducts[i].amount = rateArray[i].amount;
              this.dataProducts[i].description = rateArray[i].description;
              this.dataProducts[i].factor = rateArray[i].factor;
              this.dataProducts[i].id = rateArray[i].id;
              this.dataProducts[i].kg = rateArray[i].kg;
              this.dataProducts[i].name = rateArray[i].name;
              this.dataProducts[i].parcelId = rateArray[i].parcelId;
              this.dataProducts[i].parcelName = rateArray[i].parcelName;*/
            }
            this.rateService.dataProducts = this.dataProducts;
            this.petitionError = false;
            console.log(this.rateService.dataProducts);
          }
          this.router.navigate(['/show-rate']);

        });
      }else{
        this.invalidForm = true;
        this.loading = false;
        if(quotationData.postCodeOrigin < 0 || quotationData.postCodeDest < 0 || quotationData.weight > 0
        || quotationData.long < 0 || quotationData.width < 0 || quotationData.hight < 0){
          this.invalidNumber = true;
        }
        if(quotationData.postCodeOrigin.toString().length < 4 || quotationData.postCodeDest.toString().length < 4){
          this.invalidPC = true;
        }
      }
    }
  }
}
