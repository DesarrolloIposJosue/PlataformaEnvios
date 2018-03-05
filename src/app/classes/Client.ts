export class Client{
  /*constructor(
      public id: string,
      public name: string,
      public username: string,
      public email: string
   ) {}*/

  private name:string;
  private password:string;
  private username:string;
  private type:number;

  constructor(
    name:string,
    password:string,
    username:string,
    type:number){
      this.name = name;
      this.password = password;
      this.username = username;
      this.type = type;
  }

  GetName():string{
    return this.name;
  }

  SetName(_name:string){
    this.name = _name;
  }

  GetPassword():string{
    return this.password;
  }

  SetPassword(_password:string){
    this.password = _password;
  }

  GetUsername():string{
    return this.username;
  }

  SetUsername(_username:string){
    this.username = _username;
  }

  GetType():number{
    return this.type;
  }

  SetType(_type:number){
    this.type = _type;
  }

}
