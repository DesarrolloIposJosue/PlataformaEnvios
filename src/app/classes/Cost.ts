export class Cost{
  private price:number;
  private type:number;

  constructor(
    price:number,
    type:number){
      this.price = price;
      this.type = type;
  }

  GetPrice():number{
    return this.price;
  }

  SetPrice(_price:number){
    this.price = _price;
  }

  GetType():number{
    return this.type;
  }

  SetType(_type:number){
    this.type = _type;
  }

}
