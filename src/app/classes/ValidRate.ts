export class ValidRate{
  public id: number;
  public name:string;
  public description:string;
  public kg:number;
  public volumetricWeight:number;
  public factor:number;
  public parcelId:number;
  public amount:number;
  public parcelName:string;
  public deliveryDateSpecified:boolean;
  public deliveryDate:string;
  public amountDetails:string[];
  public valid:string;

   constructor(
    _id:number, _name:string, _description: string, _kg: number, _volumetricWeight:number, _factor: number,
    _parcelId: number, _amount:number, _parcelName: string, _deliveryDateSpec: boolean, _deliveryDate: string,
    _amountDetails:string[], _valid:string){
      this.id = _id;
      this.name = _name;
      this.description = _description;
      this.kg = _kg;
      this.volumetricWeight = _volumetricWeight;
      this.factor = _factor;
      this.parcelId = _parcelId;
      this.amount = _amount;
      this.parcelName = _parcelName;
      this.deliveryDateSpecified = _deliveryDateSpec;
      this.deliveryDate = _deliveryDate;
      this.amountDetails = _amountDetails;
      this.valid = _valid;
  }

  /*GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }*/


}
