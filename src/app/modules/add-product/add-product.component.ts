import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../classes/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  loading:boolean;
  private invalidForm:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  addProduct(forma:NgForm){
    console.log(forma);

    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      const clientData: Product = {
        id: 0,
        parcel: forma.controls["parcel"].value,
        productName: forma.controls["productName"].value,
        description: forma.controls["description"].value,
        prices: [forma.controls["priceOne"].value, forma.controls["priceTwo"].value, forma.controls["priceThree"].value]
      }
      console.log(clientData);
      this.loading = true;
    }

  }

}
