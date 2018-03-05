import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { Client } from '../../classes/client';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  clients;
  constructor(private clientService: ClientService) {
    //clientService.getUsers().subscribe(p=>this.clients = p);
  }

  ngOnInit() {
  }

}
