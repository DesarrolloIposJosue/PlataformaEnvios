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
  //private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  private apiBase = 'http://localhost:55679/Gombar.svc/';
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

  public thirdAccount:string;
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
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    myHeaders.set('ThirdAccount', this.thirdAccount);
    myHeaders.set('PrintType', this.printType);
    const Ship:Shipment = shipment;
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, search: myParams });
    
    

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuideRedPack(shipment:Shipment, dlvyType:string, email:string){
    var operation:string = this.apiBase + 'GenerateGuide';

    // Headers
    let myHeaders = new Headers();
    const Ship:Shipment = shipment;

    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('RDPCKOriginEmail', email);
    myHeaders.set('RDPCKTipoEntrega', dlvyType);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuidePaquetexpress(shipment:Shipment, contentPackage:string, numberClient:number, dlvyType:string, shpCode:string, numberHouse:string){
    var operation:string = this.apiBase + 'GenerateGuide';
    // Headers
    let myHeaders = new Headers();
    const Ship:Shipment = shipment;
    // Body or Search

    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('ContentPackage', contentPackage);
    myHeaders.set('NumberClient', numberClient.toString());
    myHeaders.set('DlvyType', dlvyType);
    myHeaders.set('ShpCode', shpCode);
    myHeaders.set('NumberHouse', numberHouse);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(Ship), options).map((res:Response) => res.json());
  }

  GenerateGuideMPS(shipments:Shipment[]){
    var operation:string = this.apiBase + 'GenerateGuideMPS';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    myHeaders.set('ThirdAccount', this.thirdAccount);

    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(shipments), options).map((res:Response) => res.json());
  }

  GenerateGuideMPSRedPack(shipments:Shipment[], dlvyType:string, email:string){
    var operation:string = this.apiBase + 'GenerateGuideMPS';

    // Headers
    let myHeaders = new Headers();

    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('RDPCKOriginEmail', email);
    myHeaders.set('RDPCKTipoEntrega', dlvyType);
    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.post(operation, JSON.stringify(shipments), options).map((res:Response) => res.json());
  }

}
