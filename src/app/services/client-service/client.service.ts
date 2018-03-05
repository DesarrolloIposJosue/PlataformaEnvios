import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Client } from "../../classes/Client";


@Injectable()
export class ClientService {

  constructor(private http: Http) { }

   /*getUsers(): Observable<Client[]> {
       return this.http.get('https://jsonplaceholder.typicode.com/users')
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }*/

}
