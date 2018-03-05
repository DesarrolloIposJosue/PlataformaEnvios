export class Client{
  name:string;
  password:string;
  username:string;
  type:number;

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
