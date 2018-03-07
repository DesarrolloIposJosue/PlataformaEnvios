import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { Client } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(private router: Router, private clientService: ClientService) { }

  client: Array<Client>;
  borrado: EventEmitter<Client> = new EventEmitter<Client>();
  modificado: EventEmitter<Client> = new EventEmitter<Client>();

  ngOnInit() {

  }

}
