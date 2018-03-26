import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Package } from "../../classes/Package";
import '../../rxjs/index';


@Injectable()
export class QuotationService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  constructor(private http: Http) {

  }

  addQuotation(quotation:Package){
    console.log(quotation);
    var operation:string = this.apiBase + 'CreateNewUser';
    // Headers
    let myHeaders = new Headers();
    const Parcels:Package = quotation;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    let options = new RequestOptions({search: myParams });

    return this.http.post(operation,  JSON.stringify(Parcels), options).map((res:Response) => res.json());
  }

}
