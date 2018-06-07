import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientService } from '../../services/client-service/client.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { User } from '../../classes/Client';
import { AutoLogOutService } from '../../services/auto-log-out-service/auto-log-out.service';
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
  private petitionError = false;

  constructor(
    private router:Router,
    private clientService: ClientService,
    private authService: AuthService,
    private autoLogOut: AutoLogOutService,
    private createGuideservice:CreateGuideService
  ) {
    autoLogOut.stop();
  }

  ngOnInit() {
    this.clientService.isLogged().then((result:boolean) => {
      if(result){
        this.router.navigate(['/home']);
      }
    })
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
      this.clientService.getUserLogged(logInData.username, logInData.password).subscribe(
        (successResponse) => {
            if(!successResponse.address){
              this.loading = false;
              this.petitionError = true;
            }else{
              if(typeof (Storage) !== 'undefined'){
                let user:User = new User(successResponse.id, successResponse.name, successResponse.lastName, successResponse.userName,
                successResponse.password, successResponse.address, successResponse.email, successResponse.typeId, successResponse.address2,
              successResponse.colony, successResponse.city, successResponse.state, successResponse.zip, successResponse.country,
            successResponse.phoneNumber);

                this.createGuideservice.userActual = user;

                sessionStorage.setItem('ActualUser', JSON.stringify(user));

                sessionStorage.setItem('UserName', logInData.username);
                sessionStorage.setItem('Password', logInData.password);
                sessionStorage.setItem('Type', successResponse.typeId);
                sessionStorage.setItem('Id', successResponse.id);

              }
              this.petitionError = false;
              this.router.navigate(['/home']);
            }
        },
        (errorResponse) => {
          this.loading = false;
          this.petitionError = true;
        }
      );
    }
  }
}
