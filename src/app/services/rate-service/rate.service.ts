import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Rate } from '../../classes/Rate';
import { Package } from '../../classes/Package';
import { Multipieces } from '../../classes/Multipieces';
import { User_Parcel } from "../../classes/UserParcel";
import { ResponseToGuide } from '../../classes/ResponseCP';
import { User } from '../../classes/Client';
import '../../rxjs/index';


@Injectable()
export class RateService {
  //private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  private apiBase = 'http://localhost:55679/Gombar.svc/';
  private postalCodeAPI = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/';

  public dataProducts:Rate[] = [];

  public dataCpOrig:ResponseToGuide = new ResponseToGuide();
  public dataCpDest:ResponseToGuide = new ResponseToGuide();

  public weight:number;
  public selectedUser:User;
  public uniqueParcel:boolean = false;

  constructor(private http: Http) { }

  getInfoByPostalCode(postalCode:string){
    let searchPostalCode:string = this.postalCodeAPI + postalCode;
    return this.http.get(searchPostalCode).map((res:Response) => res.json());
  }

  getQuotation(packageToSend:Package, insurance:number, extArea:number){
    var operation:string = this.apiBase + 'GetQuotations';
    operation += "/" + packageToSend.weight.toString();
    operation += "/" + packageToSend.long.toString();
    operation += "/" + packageToSend.width.toString();
    operation += "/" + packageToSend.hight.toString();
    operation += "/" + packageToSend.postCodeOrigin.toString();
    operation += "/" + packageToSend.postCodeDest.toString();
    operation += "/" + insurance.toString();
    operation += "/" + extArea.toString();
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    myHeaders.set('UserId', sessionStorage.getItem('Id'));
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  GetQuotationMultiPieces(multipieces:Multipieces[], userId:number, extArea:number){
    var operation:string = this.apiBase + 'GetQuotationMultiPieces';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserId', userId.toString());
    myHeaders.set('ExtArea', extArea.toString());
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.post(operation, JSON.stringify(multipieces), options).map((res:Response) => res.json());
  }

}
