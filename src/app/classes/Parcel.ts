export class Parcel{
  private name:string;

  constructor(
    name:string){
      this.name = name;
  }

  GetName():string{
    return this.name;
  }

  SetName(_name:string){
    this.name = _name;
  }
}
