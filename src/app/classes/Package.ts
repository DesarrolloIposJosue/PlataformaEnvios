export class Package{
  private status:string;
  private originAddress:string;
  private destinationAddress:string;
  private idParcel:string;

  constructor(
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
  }

}
