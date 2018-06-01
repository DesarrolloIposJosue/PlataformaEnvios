export class Multipieces{
  public originCP:string;
  public destinyCP:string;
  public weight:number;
  public length:number;
  public width:number;
  public height:number;
  public insurance:number;

  constructor(_originCP:string, _destinyCP:string, _weight:number, _length:number, _width:number, _height:number, _insurance:number){
      this.originCP = _originCP;
      this.destinyCP = _destinyCP;
      this.weight = _weight;
      this.length = _length;
      this.width = _width;
      this.height = _height;
      this.insurance = _insurance;
  }
}
