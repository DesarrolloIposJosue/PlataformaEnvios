import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { User } from '../../classes/Client';
import { Multipieces } from '../../classes/Multipieces';
import { Shipment } from '../../classes/Shipment';
import '../../rxjs/index';

@Injectable()
export class CreateGuideService {
  private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  //private apiBase = 'http://localhost:55679/Gombar.svc/';
  public multipiecesData:Multipieces[] = [];

  public dataAuxGuide:DataAuxGuide;
  public userActual:User;
  public parcelId:number;
  public productId:number;
  public city:string;
  public destinyCity:string;
  public zip:string;
  public destinyZip:string;
  public packageType:number;
  public productName:string;

  public totalAmount:number;
  public amountDetail:string;
  public printType:string;
  public printTypeFedEx:string;
  public printTypePaquete:string;
  public printTypeRedPack:string;
  public thirdAccount:string;
  public reference:string;
  public stateCode:string;
  public stateOriginCode:string;

  public deliveryType:number;
  public volumetricWeight:number;
  public outOfArea:number;

  public originState:string;
  public originColony:string;
  public originCity:string;
  public originZIP:string;
  public originZipChange:boolean;


  constructor(private http: Http) {

  }

  GetPrepaidGuide(parcelId:number){
    var operation:string = this.apiBase + 'GetPrepaidGuide';

    // Headers
    let myHeaders = new Headers();

    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', sessionStorage.getItem('Id'));
    myHeaders.set('ParcelId', parcelId.toString());
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  GenerateGuideFedEx(shipment:Shipment){
    this.printType = this.printTypeFedEx;
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    myHeaders.set('ThirdAccount', this.thirdAccount);
    myHeaders.set('DeliveryType', this.deliveryType.toString());
    myHeaders.set('PrintType', this.printType);
    myHeaders.set('Reference', this.reference);
    const Ship:Shipment = shipment;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuideRedPack(shipment:Shipment, email:string){
    this.printType = this.printTypeRedPack;
    var operation:string = this.apiBase + 'GenerateGuide';

    // Headers
    let myHeaders = new Headers();
    const Ship:Shipment = shipment;

    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('RDPCKOriginEmail', email);
    myHeaders.set('RDPCKTipoEntrega', this.deliveryType.toString());
    myHeaders.set('Reference', this.reference);
    myHeaders.set('PrintType', this.printType);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuidePaquetexpress(shipment:Shipment, contentPackage:string, numberClient:number, shpCode:string, numberHouse:string){
    this.printType = this.printTypePaquete;
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    let date = new Date();
    const Ship:Shipment = shipment;
    let numClient:string = date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString() + date.getMinutes().toString() + date.getSeconds().toString();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('ContentPackage', contentPackage);
    myHeaders.set('NumberClient', numClient);
    myHeaders.set('DeliveryType', (this.deliveryType).toString());
    myHeaders.set('ShpCode', shpCode);
    myHeaders.set('Reference', this.reference);
    myHeaders.set('NumberHouse', numberHouse);
    myHeaders.set('PrintType', this.printType);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuideMPS(shipments:Shipment[]){
    this.printType = this.printTypeFedEx;
    var operation:string = this.apiBase + 'GenerateGuideMPS';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    myHeaders.set('PrintType', this.printType);
    myHeaders.set('ThirdAccount', this.thirdAccount);
    myHeaders.set('DeliveryType', this.deliveryType.toString());
    myHeaders.set('Reference', this.reference);

    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(shipments), options).map((res:Response) => res.json());
  }

  GenerateGuideMPSRedPack(shipments:Shipment[], email:string){
    this.printType = this.printTypeRedPack;
    var operation:string = this.apiBase + 'GenerateGuideMPS';

    // Headers
    let myHeaders = new Headers();

    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('RDPCKOriginEmail', email);
    myHeaders.set('RDPCKTipoEntrega', this.deliveryType.toString());
    myHeaders.set('Reference', this.reference);
    myHeaders.set('PrintType', this.printType);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(shipments), options).map((res:Response) => res.json());
  }

}
