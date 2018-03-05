export class Product{
  description:string;

  GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }
}
