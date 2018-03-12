export class Package{
  public id:number;
  public status:string;
  public originAddress:string;
  public postCodeOrigin:number;
  public destinationAddress:string;
  public postCodeDest:number;
  public kindPackage: number;
  public weight:number;
  public long:number;
  public width:number;
  public hight:number;
  public idParcel:number;

  /*constructor(
    status:string,
    originAddress:string,
    destinationAddress:string,
    idParcel:string){
      this.status = status;
      this.originAddress = originAddress;
      this.destinationAddress = destinationAddress;
      this.idParcel = idParcel;
  }


  GetStatus():string{
    return this.status;
  }

  SetStatus(_status:string){
    this.status = _status;
  }

  GetOriginAddress():string{
    return this.originAddress;
  }

  SetOriginAddress(_originAddress:string){
    this.originAddress = _originAddress;
  }

  GetDestinationAddress():string{
    return this.destinationAddress;
  }

  SetDestinationAddress(_destinationAddress:string){
    this.destinationAddress = _destinationAddress;
  }

  GetIdParcel():string{
    return this.idParcel;
  }

  SetIdParcel(_idParcel:string){
    this.idParcel = _idParcel;
  }*/

}
