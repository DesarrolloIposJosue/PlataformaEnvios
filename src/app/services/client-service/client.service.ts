import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Client } from "../../classes/Client";
import '../../rxjs/index';


@Injectable()
export class ClientService {

  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';
  private apiURL = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: Http) { }

   /*getUsers(): Observable<Client[]> {
       return this.http.get('https://jsonplaceholder.typicode.com/users')
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }*/


    isLogged(): Promise<boolean>{
      if(typeof(Storage) !== 'undefined'){
        if(sessionStorage.getItem('User')){
          return Promise.resolve(true);
        }
      }
      return Promise.resolve(false);
    }

    createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Basic ' +
        btoa('username:password'));
    }

    getUserLogged(username:string, password:string){
      var operation:string = this.apiBase + 'validateUser';
      let params = new URLSearchParams();
      params.append("UserName", username);
      params.append("Password", password);
      //console.log("Operacion");
      //console.log(operation);
      //console.log(params);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(operation, { headers: headers, search: params }).map((res:Response) => res.json())
      /*var headers = new Headers();
      let url="http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/validateUser";
      headers.append('Content-Type', 'application/json');*/
    }

    /*getClients(): Observable<Client[]>{
      return this.http.get(this.getUrl('users'), this.getOptions()).map(this.getDatos).catch(this.error);
    }

    addClient(model: Client): Observable<Client>{
      return this.http.post(this.getUrl('users'), model, this.getOptions()).map(this.getDatos).catch(this.error);
    }

    updateClient(model: Client){
      return this.http.put(this.getUrl('users'), model, this.getOptions()).catch(this.error);
    }

    removeClient(model: Client){
      return this.http.delete(this.getUrl('users') + '/' + model.id, this.getOptions()).catch(this.error);
    }

    private error(error:any){
      let msg = (error.message) ? error.message : 'Error desconocido';
      console.error(msg);
      return Observable.throw(msg);
    }

    private getDatos(data: Response){
      console.log(data);
      let datos = data.json();
      return datos || [];
    }

    private getUrl(modelo: String){
      return this.apiURL + modelo;
    }

    private getOptions(): RequestOptions{
      let auth = new Headers({'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      let options = new RequestOptions({ headers: auth});
      return options;
    }*/

}
