import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Shipment } from '../../classes/Shipment';
import { Product } from '../../classes/Product';
import { ValidDateGuide } from '../../classes/ValidDateGuide';
import { RedPackNumberGuide } from '../../classes/RedPackNumberGuide';
import { User_PrepaidGuides } from "../../classes/User_PrepaidGuides";
import { Multipieces } from "../../classes/Multipieces";
import '../../rxjs/index';

@Injectable()
export class GuidesService {
  private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  //private apiBase = 'http://localhost:55679/Gombar.svc/';

  constructor(private http: Http) { }

  public productEdit:Product = new Product();
  public operation:number = 0;
  public selectedGuide:Shipment;
  public selectedGuides:Shipment[] = [];
  public selectedMultiguides:ValidDateGuide[] = [];

  selectPrepaidGuidesFromUser(userId:number){
    console.log(userId);
    var operation:string = this.apiBase + 'SelectPrepaidGuidesFromUser';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', userId.toString());
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  updatePrepaidGuides(guides:User_PrepaidGuides[]){
    var operation:string = this.apiBase + 'UpdatePrepaidGuides';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    console.log(sessionStorage.getItem('UserName'));
    console.log(sessionStorage.getItem('Password'));
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.put(operation, JSON.stringify(guides), options).map((res:Response) => res.json());
  }

  GetShipmentsByUserAndDates(startDate:string, finishDate:string, userId:number){
    console.log(startDate);
    console.log(finishDate);
    console.log(userId);
    var operation:string = this.apiBase + 'GetShipmentsByUserAndDates';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('StartDate', startDate);
    myHeaders.set('EndDate', finishDate);
    myHeaders.set('UserId', userId.toString());
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  GetRedPackNumberGuides(){
    var operation:string = this.apiBase + 'GetRedPackNumberGuides';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  UpdateRedpackNumberGuide(redpackguides:RedPackNumberGuide){
    var operation:string = this.apiBase + 'UpdateRedpackNumberGuide';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.put(operation, JSON.stringify(redpackguides), options).map((res:Response) => res.json());
  }

  CancelGuide(shipment:Shipment){
    var operation:string = this.apiBase + 'CancelShipment';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.post(operation, JSON.stringify(shipment), options).map((res:Response) => res.json());
  }


}
