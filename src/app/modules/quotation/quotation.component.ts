import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { NgForm } from '@angular/forms';
import { Package } from '../../classes/Package';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  profile: any;
  loading:boolean;

  constructor(private auth: AuthService) { }

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
    console.log("Entre");
    console.log(forma);

    const quotationData: Package = {
      id: 0,
      status: "iniciado",
      originAddress: forma.controls["origin_city"].value,
      postCodeOrigin: forma.controls["postal_code_origin"].value,
      destinationAddress: forma.controls["dest_city"].value,
      postCodeDest: forma.controls["postal_code_dest"].value,
      kindPackage: forma.controls["kindPackage"].value,
      weight: forma.controls["weight"].value,
      large: forma.controls["large"].value,
      width: forma.controls["width"].value,
      high: forma.controls["high"].value,
      idParcel: 0
    }
    console.log(quotationData);
    this.loading = true;
  }

}
