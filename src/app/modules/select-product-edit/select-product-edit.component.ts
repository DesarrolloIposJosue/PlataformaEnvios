import { Component, OnInit, ElementRef } from '@angular/core';
import { ParcelService } from '../../services/parcel-service/parcel.service';
import { NgForm } from '@angular/forms';
import { Parcel } from '../../classes/Parcel';
import { Product } from '../../classes/Product';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { Observable } from 'rxjs/Rx';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-select-product-edit',
  templateUrl: './select-product-edit.component.html',
  styleUrls: ['./select-product-edit.component.css']
})
export class SelectProductEditComponent implements OnInit {
  loading:boolean;
  private invalidForm:boolean = false;
  private product:any;
  private petitionError = false;
  private dataProducts:any[] = [];
  private response:any;
  private qtyProducts:number = 0;

  constructor(
    private parcelService:ParcelService,
    private productService:ProductService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {

  }

  loadProductsParcel(parcelId: number) {
    this.parcelService.getProductsByParcel(parcelId).subscribe(
      (successResponse) => {
          if(!successResponse){
            this.loading = false;
            this.petitionError = true;
          }else{
            var productArray = successResponse;
            this.response = successResponse;
            this.qtyProducts = productArray.length;
            this.dataProducts = [];
            for (var i = 0; i < productArray.length; i++) {
              //console.log(countryArray[i].name);
              this.dataProducts[productArray[i].name] = null;
            }

            this.petitionError = false;
            $(this.el.nativeElement).find('input.autocomplete').autocomplete({
              data: this.dataProducts,
              limit: 5
            });
          }
      }
    );
  }

  onParcelChange($event, parcelId: number) {
    this.loadProductsParcel(parcelId);
  }

  selectProduct(forma:NgForm){
    var element = <HTMLInputElement>document.getElementById("productData");
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      this.loading = true;
      for(var i = 0; i < this.response.length; i++){
        var nameProduct = this.response[i].name;
        if(element.value == nameProduct){
          this.parcelService.productEdit.id = this.response[i].id;
          this.parcelService.productEdit.description = this.response[i].description;
          this.parcelService.productEdit.factor = this.response[i].factor;
          this.parcelService.productEdit.kg = this.response[i].kg;
          this.parcelService.productEdit.name = this.response[i].name;
          this.parcelService.productEdit.parcelId = this.response[i].parcelId;
          this.productService.operation = 1;
          this.router.navigate(['/add-product']);
        }else{
          this.loading = false;
        }
      }
    }
  }

}
