import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { AutoLogOutService } from '../../services/auto-log-out-service/auto-log-out.service';
import { Router } from '@angular/router';

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
    this.clientService.isLogged().then((result:boolean) => {
      if(!result){
        this.router.navigate(['/log-in']);
      }
    })
    this.autoLogOut.reset();
  }

}
