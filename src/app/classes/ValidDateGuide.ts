export class ValidDateGuide{
  public id: number;
  public userId: number;
  public parcelId: number;
  public productId: number;
  public totalAmount: number;
  public amountDetail: string;

  public originCompany: string;
  public originAddress: string;
  public originAddress2: string;
  public originColony: string;
  public originCity: string;
  public originState: string;
  public originZip: number;
  public originCountry: string;
  public originPhoneNumber:string;
  public originUserName:string; //nombre de las personas

  public destinyCompany: string;
  public destinyAddress: string;
  public destinyAddress2: string;
  public destinyColony: string;
  public destinyCity: string; //No editable
  public destinyState: string;
  public destinyZip: number; //No editable
  public destinyCountry: string; //No editable
  public destinyPhoneNumber:string;
  public destinyUserName:string;

  public trackingKey:string;
  public status:string; //Enviar como generating

  public weight:number;
  public length: number;
  public width: number;
  public height: number;
  public insurance: number;

  public creationDate : Date = new Date();
  public creationDateString: string;

  public numGuide: string;
  public multiPieces: string;
  public multiPiecesMasterTracking: string;
  public multiPiecesMasterId:number;
  public multiPiecesSequenceNumber:number;
  public productName:string;

  public printType:string;
  public parcelName:string;
  public validDate:boolean;
  public reference:string;
  public username:string;

  public volumetricWeight:number;
  public outOfArea:number;

   constructor(
    _id:number, _userId:number, _parcelId:number, _productId:number, _totalAmount:number, _amountDetail:string,
    _originCompany:string, _originAddress:string, _originAddress2:string, _originColony:string, _originCity:string,
    _originState:string, _originZip:number, _originCountry:string, _originPhoneNumber:string, _originUserName:string,
    _destinyCompany:string, _destinyAddress:string, _destinyAddress2:string, _destinyColony:string, _destinyCity:string,
    _destinyState:string, _destinyZip:number, _destinyCountry:string, _destinyPhoneNumber:string, _destinyUserName:string,
    _trackingKey:string, _status:string, _weight:number, _length:number, _width:number, _height:number, _insurance:number,
    _creationDate:Date, _creationDateString:string, _numGuide:string, _multiPieces:string, _multiPiecesMasterTracking:string,
    _multiPiecesMasterId:number, _multiPiecesSequenceNumber:number, _productName:string, _parcelName:string, _validDate:boolean,
     _printType:string, _reference:string, _username:string, _volumetricWeight:number, _outOfArea:number){
    this.id = _id;
    this.userId = _userId;
    this.parcelId = _parcelId;
    this.productId = _productId;
    this.totalAmount = _totalAmount;
    this.amountDetail = _amountDetail;

    this.originCompany = _originCompany;
    this.originAddress = _originAddress;
    this.originAddress2 = _originAddress2;
    this.originColony = _originColony;
    this.originCity = _originCity;
    this.originState = _originState;
    this.originZip = _originZip;
    this.originCountry = _originCountry;
    this.originPhoneNumber = _originPhoneNumber;
    this.originUserName = _originUserName;

    this.destinyCompany = _destinyCompany;
    this.destinyAddress = _destinyAddress;
    this.destinyAddress2 = _destinyAddress2;
    this.destinyColony = _destinyColony;
    this.destinyCity = _destinyCity;
    this.destinyState = _destinyState;
    this.destinyZip = _destinyZip;
    this.destinyCountry = _destinyCountry;
    this.destinyPhoneNumber = _destinyPhoneNumber;
    this.destinyUserName = _destinyUserName;

    this.trackingKey = _trackingKey;
    this.status = _status;

    this.weight = _weight;
    this.length = _length;
    this.width = _width;
    this.height = _height;
    this.insurance = _insurance;

    this.creationDate = _creationDate;
    this.creationDateString = _creationDateString;

    this.numGuide = _numGuide;
    this.multiPieces = _multiPieces;
    this.multiPiecesMasterTracking = _multiPiecesMasterTracking;
    this.multiPiecesMasterId = _multiPiecesMasterId;
    this.multiPiecesSequenceNumber = _multiPiecesSequenceNumber;
    this.productName = _productName;
    this.printType = _printType;
    this.parcelName = _parcelName;
    this.validDate = _validDate;
    this.reference = _reference;

    this.username = _username;
    this.volumetricWeight = _volumetricWeight;
    this.outOfArea = _outOfArea;
  }

}
