export class MultipiecesForm{
  public weight:string;
  public length:string;
  public width:string;
  public height:string;
  public insurance:string;

  constructor(_weight:string, _length:string, _width:string, _height:string, _insurance:string){
      this.weight = _weight;
      this.length = _length;
      this.width = _width;
      this.height = _height;
      this.insurance = _insurance;
  }
}
