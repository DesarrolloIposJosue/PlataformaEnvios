import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
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

  constructor(
    private router: Router,
    private clientService: ClientService,
    private el: ElementRef
  ) { }

  loading:boolean;
  private formInvalid: boolean = false;
  private errorCreateUser: boolean = false;

  ngOnInit() {

  }

  saveClient(forma:NgForm){
    console.log(forma);
    if(!forma.valid){
      this.formInvalid = true;
      console.log("Error");
    }else{
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
      this.formInvalid = false;
      this.loading = true;
      this.clientService.addClient(clientData).subscribe(jsonData => {
            console.log(jsonData.CreateNewUserResult);
            var checkUser = jsonData;
            if (jsonData.CreateNewUserResult == "SUCCESS: User Created") {
              console.log("Se creó correctamente");
              this.router.navigate(['/home']);
            } else {
                this.loading = false;
                this.errorCreateUser = true;
            }
        });
    }
  }

}
