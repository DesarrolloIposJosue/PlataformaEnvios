export class Product{
  private description:string;

  constructor(
    description:string){
      this.description = description;
  }

  GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }
}
