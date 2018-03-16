import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientService } from '../../services/client-service/client.service';
import { LogIn } from '../../classes/LogIn';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  //model: Client = new Client();
  error = '';
  loading: boolean = false;
  private user:any;
  private invalidForm = false;
  // @Input() client: Array<Client>;        Sirven para obtener y pasar información del componente padre al hijo
  // @Output() borrado: EventEmitter<Client>=new EventEmitter<Client>();
  // @Output() modificado: EventEmitter<Client>=new EventEmitter<Client>();

  //clients: Array<Client> = [];
  constructor(
    private router:Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {
    //clientService.getUsers().subscribe(p=>this.clients = p);
  }

  ngOnInit() {
    this.clientService.isLogged().then((result:boolean) => {
      if(result){
        this.router.navigate(['/home']);
      }
    })
    /*this.clientService.getClients().subscribe(data =>{
      this.clients = data;
      console.log(this.clients);
    });*/
  }

  login(forma:NgForm){
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      const logInData: LogIn = {
        username: forma.controls["username"].value,
        password: forma.controls["password"].value
      }
      this.loading = true;
      this.clientService.getUserLogged(logInData.username,logInData.password).subscribe(data => {
            //this.user  = data;
            console.log(data);
        });;
      //Realiza la autentifiacion
      /*if(true){
        if(typeof (Storage) !== 'undefined'){
          sessionStorage.setItem('User', logInData.username);
        }
        this.router.navigate(['/home']);
      }*/
    }
  }
}
