export class DataGuidePaquetexpress{
    public destClienteId:string;
    public destClientName:string;
    public destStreetClient:string;
    public destNumberClient:string;
    public destColonyClient:string;
    public destZipCodeClient:string;
    public destPhoneClient:string;
    public destStateClient:string;

    public contentPackage:string;
    public quantity:number;
    public shpCode:string;
    public slabNo:string;
    public dlvyType:string;
    public ackType:string;
    public invType:string;
    public paymentType:number;
    public weight:number;
    public volumen:number;
    public longShip:number;
    public widthShip:number;
    public highShip:number

    constructor(_destClienteId:string, _destClientName:string, _destStreetClient:string, _destNumberClient:string, _destColonyClient:string,
      _destZipCodeClient:string, _destPhoneClient:string, _destStateClient:string, _contentPackage:string, _quantity:number, _shpCode:string, _slabNo:string,
      _dlvyType:string, _ackType:string, _invType:string, _paymentType:number, _weight:number, _volumen:number, _longShip:number,
      _widthShip:number, _highShip:number
     ){
       this.destClienteId = _destClienteId;
       this.destClientName = _destClientName;
       this.destStreetClient = _destStreetClient;
       this.destNumberClient = _destNumberClient;
       this.destColonyClient = _destColonyClient;
       this.destZipCodeClient = _destZipCodeClient;
       this.destPhoneClient = _destPhoneClient;
       this.destStateClient = _destStateClient;
       this.contentPackage = _contentPackage;
       this.quantity = _quantity;
       this.shpCode = _shpCode;
       this.slabNo = _slabNo;
       this.dlvyType = _dlvyType;
       this.ackType = _ackType;
       this.invType = _invType;
       this.paymentType = _paymentType;
       this.weight = _weight;
       this.volumen = _volumen;
       this.longShip = _longShip;
       this.widthShip = _widthShip;
       this.highShip = _highShip;
   };
}
