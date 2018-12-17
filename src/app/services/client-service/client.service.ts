import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ClientReference } from '../../classes/ClienteReferences';
import { Observable } from 'rxjs/Rx';
import { User } from "../../classes/Client";
import '../../rxjs/index';


@Injectable()
export class ClientService {
  private userLogged:boolean = false;
  public clientReferences:ClientReference;
  private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';
  //private apiBase = 'http://localhost:55679/Gombar.svc/';
  public userEdit:User;
  public operation:number = 0; //0 Create, 1 Edit

  constructor(private http: Http) { }

   /*getUsers(): Observable<Client[]> {
       return this.http.get('https://jsonplaceholder.typicode.com/users')
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }*/

    setUserEdit(user:User){
      let userAux:User = new User(user.id, user.name, user.lastName, user.userName, user.password, user.address, user.email, user.typeId,
      user.address2, user.colony, user.city, user.state, user.zip, user.country, user.phoneNumber, user.numberHouse, user.setCompany, user.lockInfo);
      this.userEdit = userAux;
    }

    isLogged(): Promise<boolean>{
      if(typeof(Storage) !== 'undefined'){
        if(sessionStorage.getItem('UserName')){
          this.userLogged = true;
          return Promise.resolve(true);
        }
        if(sessionStorage.getItem('ClientReference')){
          var obj = JSON.parse(sessionStorage.getItem('ClientReference'));
          this.clientReferences = new ClientReference(obj.redPackReference, obj.fedExReference, obj.paquetexpressReference);
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

    updatePostalCode(){
      var operation:string = this.apiBase + 'UpdatePostalCodes';
      return this.http.get(operation).map((res:Response) => res.json())
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

    getUsersByUserID(){
      var operation:string = this.apiBase + 'GetUsersByUserId';
      // Headers
      let myHeaders = new Headers();
      // Body or Search
      console.log(sessionStorage.getItem('Id'));
      let myParams: URLSearchParams = new URLSearchParams();
      myHeaders.set('UserId', sessionStorage.getItem('Id'));
      let options = new RequestOptions({ headers: myHeaders, search: myParams });

      return this.http.get(operation, options).map((res:Response) => res.json());
    }

    updateClient(client:User){
      var operation:string = this.apiBase + 'UpdateUserInfo';
      console.log(client);
      // Headers
      let myHeaders = new Headers();
      const User:User = client;
      // Body or Search
      myHeaders.set('UserName', sessionStorage.getItem('UserName'));
      myHeaders.set('Password', sessionStorage.getItem('Password'));
      let options = new RequestOptions({ headers: myHeaders});

      return this.http.put(operation, JSON.stringify(User), options).map((res:Response) => res.json());
    }
}
