export class Client{
  private name:string;
  private password:string;
  private username:string;

  constructor(
    name:string,
    password:string,
    username:string){
      this.name = name;
      this.password = password;
      this.username = username;
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

}
