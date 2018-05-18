import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { User } from '../../classes/Client';
import { Shipment } from '../../classes/Shipment';
import '../../rxjs/index';

@Injectable()
export class CreateGuideService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';
  public dataAuxGuide:DataAuxGuide;
  public userActual:User;
  public parcelId:number;
  public productId:number;
  public city:string;
  public destinyCity:string;
  public zip:string;
  public destinyZip:string;
  public packageType:number;

  public totalAmount:number;
  public amountDetail:string;
  constructor(private http: Http) {

  }

  GenerateGuideFedEx(shipment:Shipment){
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    const Ship:Shipment = shipment;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuidePaquetexpress(shipment:Shipment, contentPackage:string, numberClient:number, dlvyType:string, shpCode:string, numberHouse:string){
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    const Ship:Shipment = shipment;
    // Body or Search
    console.log(shpCode);

    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('ContentPackage', contentPackage);
    myHeaders.set('NumberClient', numberClient.toString());
    myHeaders.set('DlvyType', dlvyType);
    myHeaders.set('ShpCode', shpCode);
    myHeaders.set('NumberHouse', numberHouse);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

}
