import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from "../../classes/Client";
import '../../rxjs/index';


@Injectable()
export class ClientService {
  private userLogged:boolean = false;
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';

  constructor(private http: Http) { }

   /*getUsers(): Observable<Client[]> {
       return this.http.get('https://jsonplaceholder.typicode.com/users')
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }*/


    isLogged(): Promise<boolean>{
      if(typeof(Storage) !== 'undefined'){
        if(sessionStorage.getItem('UserName')){
          this.userLogged = true;
          return Promise.resolve(true);
        }
      }
      this.userLogged = false;
      return Promise.resolve(false);
    }

    isAuthenticated():boolean{
      return this.userLogged;
    }

    logOut(): Promise<boolean>{
      sessionStorage.clear();
      sessionStorage.removeItem('UserName');
      return Promise.resolve(false);
    }

    /*createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Basic ' +
        btoa('username:password'));
    }*/

    getUserLogged(username:string, password:string){
      var operation:string = this.apiBase + 'validateUser';

      // Headers
      let myHeaders = new Headers();
      myHeaders.set('Content-Type', 'application/json');
      // Body or Search
      let myParams: URLSearchParams = new URLSearchParams();
      myHeaders.set('UserName', username);
      myHeaders.set('Password', password);
      let options = new RequestOptions({ headers: myHeaders, search: myParams });
      return this.http.get(operation, options).map((res:Response) => res.json())
    }

    //Add client method
    addClient(client:User){
      var operation:string = this.apiBase + 'CreateNewUser';
      // Headers
      let myHeaders = new Headers();
      const User:User = client;
      // Body or Search
      let myParams: URLSearchParams = new URLSearchParams();
      myHeaders.set('UserName', sessionStorage.getItem('UserName'));
      myHeaders.set('Password', sessionStorage.getItem('Password'));
      myHeaders.set('UserId', sessionStorage.getItem('Id'));
      let options = new RequestOptions({ headers: myHeaders, search: myParams });
      
      return this.http.post(operation, JSON.stringify(User), options).map((res:Response) => res.json());
    }

}
