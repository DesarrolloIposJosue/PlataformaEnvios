import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { User } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

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
    private el: ElementRef,
    private prodSer: ProductService
  ) {
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
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
          typeId: forma.controls["clientType"].value,
          address2: forma.controls["address2"].value,
          colony: forma.controls["colony"].value,
          city: forma.controls["city"].value,
          state: forma.controls["state"].value,
          zip: forma.controls["zip"].value,
          country: forma.controls["country"].value,
          phoneNumber: forma.controls["phoneNumber"].value
        }
        console.log(clientData);
        this.clientService.addClient(clientData).subscribe(jsonData => {
              console.log("Panamez: "+jsonData);
              var checkUser = jsonData;
              if (jsonData == "SUCCESS: User Created") {
                console.log("Se creó correctamente");
                sessionStorage.setItem('NewUserName', forma.controls["username"].value);
                this.prodSer.operation = 0;
                this.router.navigate(['/add-parcel-to-client']);
              } else {
                  this.loading = false;
              }
          });
      }else if(this.clientService.operation == 1){
        console.log(this.clientService.userEdit);
        const updateClientData:User = {
          id: this.clientService.userEdit.id,
          name: forma.controls["name"].value,
          lastName: forma.controls["lastname"].value,
          userName: this.clientService.userEdit.userName,
          password: forma.controls["password"].value,
          address: forma.controls["address"].value,
          email: forma.controls["email"].value,
          typeId: this.clientService.userEdit.typeId,
          address2: forma.controls["address2"].value,
          colony: forma.controls["colony"].value,
          city: forma.controls["city"].value,
          state: this.clientService.userEdit.state,
          zip: forma.controls["zip"].value,
          country: this.clientService.userEdit.country,
          phoneNumber: forma.controls["phoneNumber"].value
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
