export class Product{
  public id: number;
  public parcelId:number;
  public name:string;
  public description:string;
  public kg:number;
  public factor:number;


  constructor(
   _id?:number, _parcelId?:number, _name?:string, _description?:string, _kg?:number, _factor?:number);
  constructor(
   _id:number, _parcelId:number, _name:string, _description:string, _kg:number, _factor:number){
     this.id = _id;
     this.name = _name;
     this.description = _description;
     this.kg = _kg;
     this.factor = _factor;
     this.parcelId = _parcelId;
 }


  /*constructor(
    description:string){
      this.description = description;
  }

  GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }*/
}
