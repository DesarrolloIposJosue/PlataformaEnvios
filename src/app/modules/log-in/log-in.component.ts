import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientService } from '../../services/client-service/client.service';
import { Client } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  model: Client = new Client();
  error = '';
  loading: boolean = false;
  // @Input() client: Array<Client>;        Sirven para obtener y pasar información del componente padre al hijo
  // @Output() borrado: EventEmitter<Client>=new EventEmitter<Client>();
  // @Output() modificado: EventEmitter<Client>=new EventEmitter<Client>();

  clients: Array<Client> = [];
  constructor(
    private router:Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {
    //clientService.getUsers().subscribe(p=>this.clients = p);
  }

  ngOnInit() {

    /*this.clientService.getClients().subscribe(data =>{
      this.clients = data;
      console.log(this.clients);
    });*/
  }

  login(forma:NgForm){
    console.log(forma);
    console.log("Holis");
    this.loading = true;
  }
}
