import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Rate } from '../../classes/Rate';
import { Package } from '../../classes/Package';
import { User_Parcel } from "../../classes/UserParcel";
import '../../rxjs/index';


@Injectable()
export class RateService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  public dataProducts:Rate[] = [];

  constructor(private http: Http) { }

  getQuotation(packageToSend:Package){
    console.log(packageToSend);
    var operation:string = this.apiBase + 'GetQuotations';
    operation += "/" + packageToSend.weight.toString();
    operation += "/" + packageToSend.long.toString();
    operation += "/" + packageToSend.width.toString();
    operation += "/" + packageToSend.hight.toString();
    operation += "/" + packageToSend.postCodeOrigin.toString();
    operation += "/" + packageToSend.postCodeDest.toString();
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    myHeaders.set('UserId', sessionStorage.getItem('Id'));
    let options = new RequestOptions({ headers: myHeaders});
    console.log(operation);
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

}
