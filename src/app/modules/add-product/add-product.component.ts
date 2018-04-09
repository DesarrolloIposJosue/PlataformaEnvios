import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../classes/Product';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  loading:boolean;
  private invalidForm:boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private parcelService: ParcelService,
    private el: ElementRef
  ) {
      console.log(this.productService.productEdit);
  }

  ngOnInit() {
      console.log(this.productService.productEdit);
      console.log("A ver");
      console.log(this.parcelService.productEdit);
      console.log(this.productService.operation);
  }

  addProduct(forma:NgForm){
    console.log(forma);

    if(!forma.valid){
      console.log("Holis");
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      console.log("Holiwiws");

      this.loading = true;
      if(this.productService.operation == 0){
        const productData: Product = {
          id: 0,
          parcelId: forma.controls["parcel"].value,
          name: forma.controls["productName"].value,
          description: forma.controls["description"].value,
          kg: forma.controls["weight"].value,
          factor: forma.controls["factor"].value
        }
        console.log(productData);
        this.productService.addProduct(productData).subscribe(jsonData => {
              console.log("Panamez: "+jsonData);
              var checkUser = jsonData;
              if (jsonData == "SUCCESS: Product Created") {
                console.log("Se creó correctamente");
                this.router.navigate(['/home']);
              } else {
                  this.loading = false;
              }
          });
      }else if(this.productService.operation == 1){
        console.log(this.productService.productEdit);
        const updateProductData:Product = {
          id: this.parcelService.productEdit.id,
          parcelId: this.parcelService.productEdit.parcelId,
          name: forma.controls["productName"].value,
          description: forma.controls["description"].value,
          kg: forma.controls["weight"].value,
          factor: forma.controls["factor"].value
        }
        this.productService.updateProduct(updateProductData).subscribe(jsonData => {
              console.log("Panamez: "+jsonData);
              var checkUser = jsonData;
              console.log(jsonData);
              if (jsonData == "SUCCESS: Product Updated.") {
                this.productService.operation = 0;
                console.log("Se actualizo correctamente");
                this.router.navigate(['/home']);
              } else {
                  this.loading = false;
              }
          });
      }
    }

  }

}
