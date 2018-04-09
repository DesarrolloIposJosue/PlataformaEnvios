export class Rate{
  public id: number;
  public name:string;
  public description:string;
  public kg:number;
  public factor:number;
  public parcelId:number;
  public amount:number;
  public parcelName:string;

   constructor(
    _id:number, _name:string, _description: string, _kg: number, _factor: number,
    _parcelId: number, _amount:number, _parcelName: string){
      this.id = _id;
      this.name = _name;
      this.description = _description;
      this.kg = _kg;
      this.factor = _factor;
      this.parcelId = _parcelId;
      this.amount = _amount;
      this.parcelName = _parcelName;
  }

  /*GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }*/
}
