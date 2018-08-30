import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataAuxGuide } from '../../classes/DataAuxGuide';
import { User } from '../../classes/Client';
import { Shipment } from '../../classes/Shipment';
import '../../rxjs/index';

@Injectable()
export class DownloadGuideService {

  public printType:string;
  //private apiBase = 'http://localhost:55679/Gombar.svc/';
  private apiBase = 'http://162.248.52.104/WSGombar/Gombar.svc/';

  constructor(private http: Http) {

  }

  DownloadFileFedEx(filename:string){
    var operation:string = this.apiBase + 'DownloadFile';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();

    myHeaders.set('fileName', filename);
    if(this.printType == "Z"){
      myHeaders.set('fileExtension', 'txt');
    }else{
      myHeaders.set('fileExtension', 'pdf');
    }
    myHeaders.set('filePath', 'C:/fedex guides/');


    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  DownloadFilePaquete(filename:string){
    var operation:string = this.apiBase + 'DownloadFile';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();

    myHeaders.set('fileName', filename);
    if(this.printType == "Z"){
      myHeaders.set('fileExtension', 'txt');
    }else{
      myHeaders.set('fileExtension', 'pdf');
    }
    myHeaders.set('filePath', 'C:/paquetexpress guides/');

    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

  DownloadFileRedPack(filename:string){
    var operation:string = this.apiBase + 'DownloadFile';
    // Headers
    let myHeaders = new Headers();
    // Body or Search
    let myParams: URLSearchParams = new URLSearchParams();

    myHeaders.set('fileName', filename);
    if(this.printType == "Z"){
      myHeaders.set('fileExtension', 'txt');
    }else{
      myHeaders.set('fileExtension', 'pdf');
    }
    myHeaders.set('filePath', 'C:/redpack guides/');

    let options = new RequestOptions({ headers: myHeaders, search: myParams });

    return this.http.get(operation, options).map((res:Response) => res.json());
  }

}
