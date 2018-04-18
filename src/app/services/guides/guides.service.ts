import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../classes/Product';
import { User_PrepaidGuides } from "../../classes/User_PrepaidGuides";
import '../../rxjs/index';

@Injectable()
export class GuidesService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  constructor(private http: Http) { }

  public productEdit:Product = new Product();
  public operation:number = 0;

  selectPrepaidGuidesFromUser(userId:number){
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
    console.log(guides);
    myHeaders.set('UserName', sessionStorage.getItem('UserName'));
    myHeaders.set('Password', sessionStorage.getItem('Password'));
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.put(operation, JSON.stringify(guides), options).map((res:Response) => res.json());
  }

}
