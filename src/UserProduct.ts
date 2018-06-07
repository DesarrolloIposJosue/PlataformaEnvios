export class User_Product{
  public userId: number;
  public productId: number;
  public amount: number;

   constructor(
    _userId:number, _productId:number, _amount: number){
      this.userId = _userId;
      this.productId = _productId;
      this.amount = _amount;
  }

  /*GetDescription():string{
    return this.description
  }

  SetDescription(_description:string){
    this.description = _description;
  }*/
}
