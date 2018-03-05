export class Cost{
  price:number;
  type:number;

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
