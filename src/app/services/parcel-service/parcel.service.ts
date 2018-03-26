import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User_Parcel } from "../../classes/UserParcel";
import '../../rxjs/index';

@Injectable()
export class ParcelService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  constructor(private http: Http) { }

  addParcelToClient(parcels:User_Parcel[]){
    console.log(parcels);
    var operation:string = this.apiBase + 'SetParcelsToUser';
    // Headers
    let myHeaders = new Headers();
    const Parcels:User_Parcel[] = parcels;
    // Body or Search
    console.log(sessionStorage.getItem('NewUserName'));
    let myParams: URLSearchParams = new URLSearchParams();
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    myHeaders.set('NewUserName', sessionStorage.getItem('NewUserName'));    
    let options = new RequestOptions({ headers: myHeaders, search: myParams });
    sessionStorage.removeItem('NewUserName');
    return this.http.post(operation,  JSON.stringify(Parcels), options).map((res:Response) => res.json());
  }

}
