import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Rate } from '../../classes/Rate';
import { Package } from '../../classes/Package';
import { Multipieces } from '../../classes/Multipieces';
import { User_Parcel } from "../../classes/UserParcel";
import '../../rxjs/index';


@Injectable()
export class RateService {
  private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';

  public dataProducts:Rate[] = [];

  constructor(private http: Http) { }

  getQuotation(packageToSend:Package, insurance:number){
    var operation:string = this.apiBase + 'GetQuotations';
    operation += "/" + packageToSend.weight.toString();
    operation += "/" + packageToSend.long.toString();
    operation += "/" + packageToSend.width.toString();
    operation += "/" + packageToSend.hight.toString();
    operation += "/" + packageToSend.postCodeOrigin.toString();
    operation += "/" + packageToSend.postCodeDest.toString();
    operation += "/" + insurance.toString();
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    myHeaders.set('UserId', sessionStorage.getItem('Id'));
    let options = new RequestOptions({ headers: myHeaders});
    console.log(operation);
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  GetQuotationMultiPieces(multipieces:Multipieces[], userId:number){
    var operation:string = this.apiBase + 'GetQuotationMultiPieces';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', userId.toString());
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.post(operation, JSON.stringify(multipieces), options).map((res:Response) => res.json());
  }

}
