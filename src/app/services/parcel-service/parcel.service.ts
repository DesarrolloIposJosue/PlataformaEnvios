import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../classes/Product';
import { User_Parcel } from "../../classes/UserParcel";
import { User_Product } from "../../classes/UserProduct";
import '../../rxjs/index';

@Injectable()
export class ParcelService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  constructor(private http: Http) { }

  public productEdit:Product = new Product();
  public operation:number = 0;

  addParcelToClient(parcels:User_Parcel[]){
    console.log(parcels);
    var operation:string = this.apiBase + 'SetParcelsToUser';
    // Headers
    let myHeaders = new Headers();
    const Parcels:User_Parcel[] = parcels;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    myHeaders.set('NewUserName', sessionStorage.getItem('NewUserName'));
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation,  JSON.stringify(Parcels), options).map((res:Response) => res.json());
  }

  getProductsByParcel(parcelId:number){
    console.log("Dentro de products by parcel");
    console.log(parcelId);
    var operation:string = this.apiBase + 'GetProductsByParcel';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('ParcelId', parcelId.toString());
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.get(operation, options).map((res:Response) => res.json());
  }



  addProductsToClient(products:User_Product[]){
    console.log(products);
    var operation:string = this.apiBase + 'InsertUserProduct';
    // Headers
    let myHeaders = new Headers();
    const Products:User_Product[] = products;
    // Body or Search
    console.log(sessionStorage.getItem('NewUserName'));
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    myHeaders.set('NewUserName', sessionStorage.getItem('NewUserName'));
    let options = new RequestOptions({ headers: myHeaders, search: myParams });
    sessionStorage.removeItem('NewUserName');
    return this.http.post(operation,  JSON.stringify(Products), options).map((res:Response) => res.json());
  }

}
