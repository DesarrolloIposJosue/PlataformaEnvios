import { Component, OnInit, ElementRef, EventEmitter  } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';
import { AutoLogOutService } from '../../services/auto-log-out-service/auto-log-out.service';
import { MaterializeModule } from "angular2-materialize";
import { M } from "materialize-css";
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import "materialize-css";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public drop: boolean = true;
  dropdownActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private clientService:ClientService,
    private router: Router,
    private autoLogOut:AutoLogOutService
  ) {
    $(document).ready(function(){
      $('.carousel').carousel({
      fullWidth: true,
      indicators: true,
      });
      $('.carousel').carousel({
        padding: 200
      });
      autoplay()
      function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 5000);
      }
    });
  }

  toggle() {
      this.drop = !this.drop;
      if (this.drop) {
        this.dropdownActions.emit({action:"dropdown",params:null});
      }
    }

  ngOnInit() {



    this.clientService.isLogged().then((result:boolean) => {
      if(!result){
        this.router.navigate(['/log-in']);
      }
    })
    this.autoLogOut.reset();
  }

  goQuotation() {
      this.router.navigate(['/quotation']);
  }


}
