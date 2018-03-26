import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { AutoLogOutService } from '../../services/auto-log-out-service/auto-log-out.service';
import { Router } from '@angular/router';
import { MaterializeModule } from "angular2-materialize";
import { M } from "materialize-css";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private clientService:ClientService,
    private router: Router,
    private autoLogOut:AutoLogOutService
  ) {

  }

  ngOnInit() {

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
  setTimeout(autoplay, 8500);
}

    this.clientService.isLogged().then((result:boolean) => {
      if(!result){
        this.router.navigate(['/log-in']);
      }
    })
    this.autoLogOut.reset();
  }

}
