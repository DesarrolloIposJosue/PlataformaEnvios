import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { User } from '../../classes/Client';
import { Shipment } from '../../classes/Shipment';
import '../../rxjs/index';

@Injectable()
export class DownloadGuideService {
  private apiBase = 'http://bi-pos.servebeer.com:8080/WSGombar/Gombar.svc/';
  constructor(private http: Http) {

  }

  DownloadFile(filename:string){
    var operation:string = this.apiBase + 'DownloadFile';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();
    let path:string = "C:\fedex guides";

    console.log(filename);
    myHeaders.set('fileName', filename);
    myHeaders.set('fileExtension', 'pdf');
    myHeaders.set('filePath', 'C:/fedex guides/');

    console.log('C:/fedex guides/');

    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

}
