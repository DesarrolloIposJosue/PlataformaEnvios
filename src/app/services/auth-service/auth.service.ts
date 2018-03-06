import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../../rxjs/index';
import { Client } from '../../classes/Client';

@Injectable()
export class AuthService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: Http) { }

  login(Client: Client): Observable<boolean>{
    let body = 'Login=' + Client.email + '&password=' + Client.username;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({'headers':headers});

    return this.http.post(this.getUrl('jwt'), body, options).map(this.getDatos).catch(this.error);
  }

  logout(): void{
    sessionStorage.removeItem('token');
  }

  private error(error:any){
    let msg = (error.message) ? error.message : 'Error desconocido';
    console.error(msg);
    return Observable.throw(msg);
  }

  private getDatos(data: Response){
    let datos = data.json();
    if(datos && datos.access_token){
      sessionStorage.setItem('token', datos.access_token);
      return true;
    }
    return false;
  }

  private getUrl(modelo: string){
    return this.apiUrl + modelo;
  }



}
