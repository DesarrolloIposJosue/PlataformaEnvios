export class UserLogged {
  public status: boolean;
  public username: string;
  public name: string;
  public type: number;

  //Getters

  public getStatus(){
    return this.status;
  }

  public getUsername(){
    return this.username;
  }

  public getName(){
    return this.name;
  }

  public getType(){
    return this.type;
  }

  //Setters

  public setStatus(status:boolean){
    this.status = status;
  }

  public setUsername(username:string){
    this.username = username;
  }

  public setName(name:string){
    this.name = name;
  }

  public setType(type:number){
    this.type = type;
  }
}
