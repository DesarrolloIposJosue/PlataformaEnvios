import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { User } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
  //encapsulation: ViewEncapsulation.None
})
export class AddClientComponent implements OnInit {
@ViewChild('name') inputName:ElementRef;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private el: ElementRef
  ) {
    this.userType = sessionStorage.getItem('Type');
   }

  loading:boolean;
  private formInvalid: boolean = false;
  private userType: string;

  ngOnInit() {
    
  }

  /*ngAfterViewChecked() {
    console.log("khe");
    if(this.clientService.operation == 1){
      console.log(this.clientService.operation);
      console.log(this.clientService.userEdit.name);
      this.inputName.nativeElement.value = this.clientService.userEdit.name;
      console.log(this.clientService.userEdit.name);
      (<HTMLInputElement>document.getElementById('lastname')).value = this.clientService.userEdit.lastName;
    }
  }*/

  saveClient(forma:NgForm){
    console.log(forma);
    if(!forma.valid){
      this.formInvalid = true;
      console.log("Error");
    }else{
      this.formInvalid = false;
      this.loading = true;
      if(this.clientService.operation == 0){
        const clientData: User = {
          id: 0,
          name: forma.controls["name"].value,
          lastName: forma.controls["lastname"].value,
          userName: forma.controls["username"].value,
          password: forma.controls["password"].value,
          address: forma.controls["address"].value,
          email: forma.controls["email"].value,
          typeId: forma.controls["clientType"].value
        }
        console.log(clientData);
        this.clientService.addClient(clientData).subscribe(jsonData => {
              console.log("Panamez: "+jsonData);
              var checkUser = jsonData;
              if (jsonData == "SUCCESS: User Created") {
                console.log("Se creó correctamente");
                sessionStorage.setItem('NewUserName', forma.controls["username"].value);
                this.router.navigate(['/add-parcel-to-client']);
              } else {
                  this.loading = false;
              }
          });
      }else if(this.clientService.operation == 1){

        const updateClientData:User = {
          id: this.clientService.userEdit.id,
          name: forma.controls["name"].value,
          lastName: forma.controls["lastname"].value,
          userName: this.clientService.userEdit.userName,
          password: forma.controls["password"].value,
          address: forma.controls["address"].value,
          email: forma.controls["email"].value,
          typeId: this.clientService.userEdit.typeId,
        }
        this.clientService.updateClient(updateClientData).subscribe(jsonData => {
              console.log("Panamez: "+jsonData);
              var checkUser = jsonData;
              console.log(jsonData);
              if (jsonData == "SUCCESS: User Updated.") {
                this.clientService.operation = 0;
                console.log("Se actualizo correctamente");
                this.router.navigate(['/home']);
              } else {
                  this.loading = false;
              }
          });
      }
    }
  }
}
