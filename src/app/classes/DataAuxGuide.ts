export class DataAuxGuide{
  public postalCodeOrigin: number;
  public postalCodeDest: number;
  public cityOrigin: string;
  public cityDest: string;
  public typeOfPackage: number;
  public width: number;
  public long: number;
  public hight: number;
  public weight: number;
  public insurance: number;

  constructor(_postalCodeOrigin:number, _postalCodeDest:number, _cityOrigin:string, _cityDest:string, _typeOfPackage:number,
  _width:number, _long:number, _hight:number, _weigth:number, _insurance:number){
    this.postalCodeOrigin = _postalCodeOrigin;
    this.postalCodeDest = _postalCodeDest;
    this.cityOrigin = _cityOrigin;
    this.cityDest = _cityDest;
    this.typeOfPackage = _typeOfPackage;
    this.width = _width;
    this.long = _long;
    this.hight = _hight;
    this.weight = _weigth;
    this.insurance = _insurance;
  };
}
