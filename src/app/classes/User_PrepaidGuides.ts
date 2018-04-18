export class User_PrepaidGuides{
  public userId:number;
  public limitedGuidesNumber:number;
  public parcelId:number;

  constructor(
   _userId:number, _limitedGuidesNumber:number, _parcelId: number){
     this.userId = _userId;
     this.limitedGuidesNumber = _limitedGuidesNumber;
     this.parcelId = _parcelId;
 }
}
