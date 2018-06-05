export class ShowMultiPieces{
  id:number
  trackingKey:string;
  numberGuide:string;
  amount:number;
  quantity:number;
  originUserName:string;
  destinyUserName:string;
  status:string;
  date:string;
  validDate:boolean;
  parcelId:number;

  constructor(_id:number, _trackingKey:string, _numberGuide, _amount:number, _quantity:number, _originUserName:string,
  _destinyUserName:string, _status:string, _date:string, _validDate:boolean, _parcelId:number){
    this.id = _id;
    this.trackingKey = _trackingKey;
    this.numberGuide = _numberGuide;
    this.amount = _amount;
    this.quantity = _quantity;
    this.originUserName = _originUserName;
    this.destinyUserName = _destinyUserName;
    this.status = _status;
    this.date = _date;
    this.validDate = _validDate;
    this.parcelId = _parcelId;
  }
}
