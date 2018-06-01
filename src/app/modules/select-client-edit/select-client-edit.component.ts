import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { User } from '../../classes/Client';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-select-client-edit',
  templateUrl: './select-client-edit.component.html',
  styleUrls: ['./select-client-edit.component.css']
})
export class SelectClientEditComponent implements OnInit {

  error = '';
  loading: boolean = false;
  private user:any;
  private invalidForm = false;
  private petitionError = false;
  private dataUser:any[] = [];
  private response:any;

  constructor(
    private el: ElementRef,
    private router:Router,
    private clientService:ClientService
  ) { }

  ngOnInit() {
    this.clientService.getUsersByUserID().subscribe(
      (successResponse) => {
        console.log(successResponse);
          if(!successResponse){
            this.loading = false;
            this.petitionError = true;
          }else{
            var userArray = successResponse;
            this.response = successResponse;
            this.dataUser = [];
            for (var i = 0; i < userArray.length; i++) {
              //console.log(countryArray[i].name);
              this.dataUser[userArray[i].name + " " + userArray[i].lastName] = null; //countryArray[i].flag or null
            }
            this.petitionError = false;
            $(this.el.nativeElement).find('input.autocomplete').autocomplete({
              data: this.dataUser,
              limit: 5
            });

          }
      },
      (errorResponse) => {
        console.log('Error al hacer el request');
        this.loading = false;
        this.petitionError = true;
      }
    );
  }

  selectClient(forma:NgForm){
    var element = <HTMLInputElement>document.getElementById("userData");
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      this.loading = true;
      console.log(this.response);
      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(element.value == userNameLastName){
          let userAux:User = new User(this.response[i].id, this.response[i].name, this.response[i].lastName,
            this.response[i].userName, this.response[i].password, this.response[i].address, this.response[i].email,
            this.response[i].typeId, this.response[i].address2, this.response[i].colony, this.response[i].city,
            this.response[i].state, this.response[i].zip, this.response[i].country, this.response[i].phoneNumber);
          this.clientService.setUserEdit(userAux);
          this.clientService.operation = 1;
          this.router.navigate(['/add-client']);
        }else{
          this.loading = false;
        }
      }
    }
  }
}
