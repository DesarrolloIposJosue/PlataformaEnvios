import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GuidesService } from '../../services/guides/guides.service';
import { RedPackNumberGuide } from '../../classes/RedPackNumberGuide';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-define-guides-redpack',
  templateUrl: './define-guides-redpack.component.html',
  styleUrls: ['./define-guides-redpack.component.css']
})
export class DefineGuidesRedpackComponent implements OnInit {
  private activeActualVal:boolean = false;
  private redPackNumberGuide:RedPackNumberGuide = new RedPackNumberGuide();
  private sendRedPackNumberGuide:RedPackNumberGuide = new RedPackNumberGuide();

  constructor(
    private router:Router,
    private guidesService:GuidesService
  ) {
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
    this.guidesService.GetRedPackNumberGuides().subscribe(
      (successResponse) => {
          if(!successResponse){

          }else{
            console.log(successResponse);
            if(successResponse.CurrentValue > 0 && successResponse.LimitValue > 0 && successResponse.StartValue > 0){
              this.redPackNumberGuide.currentValue = successResponse.CurrentValue;
              this.redPackNumberGuide.limitValue = successResponse.LimitValue;
              this.redPackNumberGuide.startValue = successResponse.StartValue;

              console.log(this.redPackNumberGuide.startValue);
            }else{
              this.redPackNumberGuide.currentValue = 0;
              this.redPackNumberGuide.limitValue = 0;
              this.redPackNumberGuide.startValue = 0;
            }
         }
      }
    );
  }

  ngOnInit() {
  }

  activeActVal(){
    var element = <HTMLInputElement>document.getElementById("activeActVal");
    element = <HTMLInputElement>document.getElementById("activeActVal");
    if(element.checked == true){
      this.activeActualVal = true;
    }
    if(element.checked == false){
      this.activeActualVal = false;
    }
  }

  defineGuides(forma:NgForm){
    this.sendRedPackNumberGuide.currentValue = forma.controls["currentValue"].value;
    this.sendRedPackNumberGuide.startValue = forma.controls["startValue"].value;
    this.sendRedPackNumberGuide.limitValue = forma.controls["limitValue"].value;

    this.guidesService.UpdateRedpackNumberGuide(this.sendRedPackNumberGuide).subscribe(json =>{
      if(json){
        console.log(json);
        if(json == "SUCCESS: RedPack Number Guides Updated."){
          this.router.navigate(['/home']);
        }
      }
    });
  }

}
