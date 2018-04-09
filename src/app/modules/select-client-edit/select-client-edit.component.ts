import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

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
    console.log("entre");
    var element = <HTMLInputElement>document.getElementById("userData");
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      this.loading = true;      
      for(var i = 0; i < this.response.length; i++){
        var userNameLastName = this.response[i].name + " " + this.response[i].lastName;
        if(element.value == userNameLastName){
          this.clientService.userEdit.address = this.response[i].address;
          this.clientService.userEdit.email = this.response[i].email;
          this.clientService.userEdit.id = this.response[i].id;
          this.clientService.userEdit.lastName = this.response[i].lastName;
          this.clientService.userEdit.name = this.response[i].name;
          this.clientService.userEdit.password = this.response[i].password;
          this.clientService.userEdit.typeId = this.response[i].typeId;
          this.clientService.userEdit.userName = this.response[i].userName;
          this.clientService.operation = 1;
          this.router.navigate(['/add-client']);
        }else{
          this.loading = false;
        }
      }
    }
  }
}
