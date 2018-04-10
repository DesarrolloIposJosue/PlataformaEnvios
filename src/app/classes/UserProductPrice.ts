export class User_Product_Price{
  public userId: number;
  public productId: number;
  public amount: number;
  public name:string;

   constructor(
    _userId:number, _productId:number, _amount: number, _name:string){
      this.userId = _userId;
      this.productId = _productId;
      this.amount = _amount;
      this.name = _name;
  }

  /*GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }*/
}
