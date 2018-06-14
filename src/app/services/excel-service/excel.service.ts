import { Injectable } from '@angular/core';
import { ObjectExcel } from '../../classes/ObjectExcel';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Injectable()
export class ExcelService {

  constructor() {

  }

  try(objectExcel:ObjectExcel[]){
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true
    };
    let date:Date = new Date();
    let year:string = date.getFullYear().toString();
    let month:string = date.getMonth().toString();
    let day:string = date.getDay().toString();
    let hour:string = date.getHours().toString();
    let min:string = date.getMinutes().toString();
    let secs:String = date.getSeconds().toString();
    let filename:string = "Reporte " + day + "/" + month + "/" + year + hour + min + secs;
    new Angular2Csv(objectExcel, filename, { headers: Object.keys(objectExcel[0]) });
  }

}
