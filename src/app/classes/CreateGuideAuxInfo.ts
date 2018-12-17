export class CreateGuideAuxInfo{

  public originCompany:string;
  public originCountry:string;
  public originState:string;
  public originCity:string;
  public originColony:string;
  public originAddress:string;
  public originAddress2:string;
  public originZip:string;
  public originPhone:string;
  public originName:string;

  public destinyCompany:string;
  public destinyCountry:string;
  public destinyState:string;
  public destinyCity:string;
  public destinyColony:string;
  public destinyAddress:string;
  public destinyNumberAddress:string;
  public destinyAddress2:string;
  public destinyZip:string;
  public destinyPhone:string;
  public destinyName:string;

  public email:string;
  public packageContent:string;
  public kindOfPackage:string;
  public reference:string;

  constructor(_oriCompany:string, _oriCountry:string, _oriState:string, _oriCity:string, _oriColony:string, _oriAddress:string,
  _oriAddress2:string, _oriZip:string, _oriPhone:string, _oriName:string, _destCompany:string, _destCountry:string, _destState:string,
  _destCity:string, _destColony:string, _destAddress:string, _destinyNumberAddress:string, _destAddress2:string, _destZip:string,
  _destPhone:string, _destName:string, _email:string, _packageContent:string, _kindOfPackage:string, _reference:string){
    this.originCompany = _oriCompany;
    this.originCountry = _oriCountry;
    this.originState = _oriState;
    this.originCity = _oriCity;
    this.originColony = _oriColony;
    this.originAddress = _oriAddress;
    this.originAddress2 = _oriAddress2;
    this.originZip = _oriZip;
    this.originPhone = _oriPhone;
    this.originName= _oriName;

    this.destinyCompany = _destCompany;
    this.destinyCountry = _destCountry;
    this.destinyState = _destState;
    this.destinyCity = _destCity;
    this.destinyColony = _destColony;
    this.destinyAddress = _destAddress;
    this.destinyNumberAddress = _destinyNumberAddress;
    this.destinyAddress2 = _destAddress2;
    this.destinyZip = _destZip;
    this.destinyPhone = _destPhone;
    this.destinyName= _destName;

    this.email = _email;
    this.packageContent = _packageContent;
    this.kindOfPackage = _kindOfPackage;
    this.reference = _reference;
  }
}
