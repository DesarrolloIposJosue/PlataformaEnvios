export class Client{
  name:string;
  password:string;
  username:string;

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
