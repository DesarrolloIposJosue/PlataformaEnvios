import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientService } from '../../services/client-service/client.service';
import { Client } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  model: Client = new Client();
  error = '';
  loading: boolean = false;

  clients: Array<Client> = [];
  constructor(
    private router:Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {
    //clientService.getUsers().subscribe(p=>this.clients = p);
  }

  ngOnInit() {
    this.authService.logout();
    /*this.clientService.getClients().subscribe(data =>{
      this.clients = data;
      console.log(this.clients);
    });*/
  }

  login(){
    this.loading = true;
    this.authService.login(this.model).subscribe(result => {
      if(result === true){
        this.router.navigate(['/']);
      }else{
        this.error = 'Credenciales incorrectas';
        this.loading = false;
      }
    }, e=>{
      this.error = 'Credenciales incorrectas';
      this.loading = false;
    });
}

  crear(model: Client){
    this.clientService.addClient(model).subscribe(data =>{
      this.clients.push(data);
    });
  }

}
