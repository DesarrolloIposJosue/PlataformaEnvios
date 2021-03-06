import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientService } from '../../services/client-service/client.service';
import { CreateGuideService } from '../../services/create-guide-service/create-guide.service';
import { ProductService } from '../../services/product-service/product.service';
import { User } from '../../classes/Client';
import { ClientReference } from '../../classes/ClienteReferences';
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
  error = '';
  loading: boolean = false;
  private user:any;
  private invalidForm = false;
  private petitionError = false;
  private invalidUser = false;
  private countErrors:number = 0;

  constructor(
    private router:Router,
    private clientService: ClientService,
    private authService: AuthService,
    private autoLogOut: AutoLogOutService,
    private createGuideservice:CreateGuideService,
    private productService: ProductService
  ) {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    autoLogOut.stop();
  }

  ngOnInit() {
    this.clientService.isLogged().then((result:boolean) => {
      if(result){
        this.router.navigate(['/home']);
      }
    })
  }

  updateCP(){
    this.clientService.updatePostalCode().subscribe(
      (successResponse) => {
        console.log("Holis");
      }
    ),(error) =>{
      console.log("Error");
    };
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
            if(!successResponse){
              this.loading = false;
              this.petitionError = true;
            }else{
              if(successResponse.id > 0){
                this.invalidUser = false;
                if(typeof (Storage) !== 'undefined'){
                  let user:User = new User(successResponse.id, successResponse.name, successResponse.lastName, successResponse.userName,
                  successResponse.password, successResponse.address, successResponse.email, successResponse.typeId, successResponse.address2,
                successResponse.colony, successResponse.city, successResponse.state, successResponse.zip, successResponse.country,
              successResponse.phoneNumber, successResponse.numberHouse, successResponse.setCompany, successResponse.lockInfo);

                  this.createGuideservice.userActual = user;

                  sessionStorage.setItem('ActualUser', JSON.stringify(user));

                  sessionStorage.setItem('UserName', logInData.username);
                  sessionStorage.setItem('Password', logInData.password);
                  sessionStorage.setItem('Type', successResponse.typeId);
                  sessionStorage.setItem('Id', successResponse.id);

                  this.productService.getParcelsFromUser().subscribe(
                    responseParcels => {
                      console.log(responseParcels);
                      var productArray = responseParcels;
                      let referencePaquete, referenceRedPack, referenceFedEx;
                      for( let i=0; i < productArray.length; i++){
                        switch(productArray[i].parcelId){
                          case 2:{
                            referenceRedPack = productArray[i].reference;
                            break;
                          }
                          case 3:{
                            referenceFedEx = productArray[i].reference;
                            break;
                          }
                          case 5:{
                            referencePaquete = productArray[i].reference;
                            break;
                          }
                        }
                      }
                      let clientReference:ClientReference = new ClientReference(referenceRedPack, referenceFedEx, referencePaquete);
                      this.clientService.clientReferences = clientReference;
                      sessionStorage.setItem('ClientReference', JSON.stringify(clientReference));
                    }
                  );

                }
                this.petitionError = false;
                this.router.navigate(['/home']);
              }else{
                this.invalidUser = true;
                this.loading = false;
              }
            }
        },
        (errorResponse) => {
          if(this.countErrors < 2){
            this.login(forma);
          }else{
            this.loading = false;
            this.petitionError = true;
          }
          this.countErrors++;
        }
      );
    }
  }
}
