import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Product } from "../../classes/Product";
import '../../rxjs/index';
@Injectable()
export class ProductService {

  //private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  private apiBase = 'http://localhost:55679/Gombar.svc/';
  public productEdit:Product = new Product;
  public operation:number = 0; //0 Create, 1 Edit

  constructor(private http: Http) { }

  //Add client method
  addProduct(product:Product){
    var operation:string = this.apiBase + 'CreateNewProduct';
    // Headers
    let myHeaders = new Headers();
    const Product:Product = product;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    myHeaders.set('UserId', sessionStorage.getItem('Id'));
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Product), options).map((res:Response) => res.json());
  }

  getProductsByUser(){
    var operation:string = this.apiBase + 'GetProductsByUser';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', sessionStorage.getItem('NewUserId'));
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  getParcelsFromUser(){
    var operation:string = this.apiBase + 'GetParcelsFromUser';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', sessionStorage.getItem('NewUserId'));
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  getParcelsFromUserQuotation(userId:number){
    var operation:string = this.apiBase + 'GetParcelsFromUser';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', userId.toString());
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  updateProduct(product:Product){
    var operation:string = this.apiBase + 'UpdateProduct';
    // Headers
    let myHeaders = new Headers();
    const Product:Product = product;
    // Body or Search
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    let options = new RequestOptions({ headers: myHeaders});

    return this.http.put(operation, JSON.stringify(Product), options).map((res:Response) => res.json());
  }

}
