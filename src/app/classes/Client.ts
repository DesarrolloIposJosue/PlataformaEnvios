export class User{
  public id: number;
  public name:string;
  public lastName:string;
  public userName:string;
  public password:string;
  public address:string;
  public email:string;
  public typeId:number;
  public address2:string;
  public colony:string;
  public city:string;
  public state:string;
  public zip:string;
  public country:string;
  public phoneNumber:string;

  constructor(_id:number, _name:string, _lastName:string, _userName:string, _password:string, _address:string, _email:string,
  _typeId:number, _address2:string, _colony:string, _city:string, _state:string, _zip:string, _country:string, _phoneNumber:string){
    this.id = _id;
    this.name = _name;
    this.lastName = _lastName;
    this.userName = _userName;
    this.password = _password;
    this.address = _address;
    this.email = _email;
    this.typeId = _typeId;
    this.address2 = _address2;
    this.colony = _colony;
    this.city = _city;
    this.state = _state;
    this.zip = _zip;
    this.country = _country;
    this.phoneNumber = _phoneNumber; 
  }

}
