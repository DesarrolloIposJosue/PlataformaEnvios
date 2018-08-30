import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewEncapsulation, ViewChild, AfterViewChecked } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { ProductService } from '../../services/product-service/product.service';
import { User } from '../../classes/Client';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { ResponseCP } from '../../classes/ResponseCP';
import { RateService } from '../../services/rate-service/rate.service';
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
    private prodSer: ProductService,
    private rateService: RateService
  ) {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
    this.userType = sessionStorage.getItem('Type');


    if(this.userType == '1' && this.clientService.operation == 1 && this.clientService.userEdit.lockInfo == "Y"){
      setTimeout(() =>
      {
        var element = <HTMLInputElement>document.getElementById("lockInfo");
        element = <HTMLInputElement>document.getElementById("lockInfo");
        element.checked = true;
        this.lockInfoValue = "Y";
      },
      400);
    }

    if(this.userType == '1' && this.clientService.operation == 1 && this.clientService.userEdit.setCompany == "Y"){
      setTimeout(() =>
      {
        var element = <HTMLInputElement>document.getElementById("setCompany");
        element = <HTMLInputElement>document.getElementById("setCompany");
        element.checked = true;
        this.setCompanyValue = "Y";
      },
      400);
    }
   }

  loading:boolean;
  private formInvalid: boolean = false;
  private userType: string;
  private responseCP:ResponseCP = new ResponseCP();
  private noCP:boolean = false;
  private countryName:string = "Mexico";
  private lockInfoValue:string = "N";
  private setCompanyValue:string = "N";
  private userExists:boolean = false;
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


  loseFocusOrig(deviceValue){
    if(deviceValue.length > 4){
      this.rateService.getInfoByPostalCode(deviceValue).subscribe(
        (response) => {
          this.responseCP.postalCode = response.codigo_postal;
          this.responseCP.colonies = response.colonias;
          this.responseCP.municipality = response.municipio;
          this.responseCP.state = response.estado;


          if(response.colonias.length < 1){
            this.noCP = true;
          }else if(response.colonias.length > 0 && this.clientService.operation == 1){
            this.clientService.userEdit.state = response.estado;
            this.clientService.userEdit.zip = response.codigo_postal;
            this.clientService.userEdit.city = response.estado;
            this.clientService.userEdit.colony = "Elija una colonia";
          }
        }
      )
    }
  }

  setArrayEmptyOrig(){
    this.responseCP.colonies = [];
  }

  checkOrigCP(deviceValue){
    this.noCP = false;
    this.responseCP.colonies = [];
    this.rateService.getInfoByPostalCode(deviceValue).subscribe(
      (response) => {
        this.responseCP.postalCode = response.codigo_postal;
        this.responseCP.colonies = response.colonias;
        this.responseCP.municipality = response.municipio;
        this.responseCP.state = response.estado;

        if(response.colonias.length < 1){
          this.noCP = true;
        }else if(response.colonias.length > 0 && this.clientService.operation == 1){
          this.clientService.userEdit.state = response.estado;
          this.clientService.userEdit.zip = response.codigo_postal;
          this.clientService.userEdit.city = response.estado;
          this.clientService.userEdit.colony = "Elija una colonia";
        }
      }
    )
  }

  saveClient(forma:NgForm){
    this.userExists = false;

    if(!forma.valid){
      this.formInvalid = true;
    }else{
      this.formInvalid = false;
      this.loading = true;
      if(this.clientService.operation == 0){
        if(this.userType == "1"){
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
            country: this.countryName,
            phoneNumber: forma.controls["phoneNumber"].value,
            numberHouse: forma.controls["noHouse"].value,
            lockInfo: this.lockInfoValue,
            setCompany: this.setCompanyValue
          }

          this.clientService.addClient(clientData).subscribe(jsonData => {
                var checkUser = jsonData;

                if (jsonData == "SUCCESS: User Created") {
                  sessionStorage.setItem('NewUserName', forma.controls["username"].value);
                  this.prodSer.operation = 0;
                  this.router.navigate(['/add-parcel-to-client']);
                } else if(jsonData == "ERROR: Object reference not set to an instance of an object."){
                  this.loading = false;
                  this.userExists = true;
                }else{
                    this.loading = false;
                }
            },
            (errorResponse) => {

              this.loading = false;
            });
        }else{
          let date = new Date();
          let userNameAux:string = forma.controls["name"].value;
          let lastNameAux:string = forma.controls["lastname"].value;
          let userPass:string = userNameAux.substr(0,3) + lastNameAux.substr(0,3) + date.getDay().toString() + date.getHours().toString() + date.getSeconds().toString();
          const clientData: User = {
            id: 0,
            name: forma.controls["name"].value,
            lastName: forma.controls["lastname"].value,
            userName: userPass,
            password: userPass,
            address: forma.controls["address"].value,
            email: forma.controls["email"].value,
            typeId: 3,
            address2: forma.controls["address2"].value,
            colony: forma.controls["colony"].value,
            city: forma.controls["city"].value,
            state: forma.controls["state"].value,
            zip: forma.controls["zip"].value,
            country: "Mexico",
            phoneNumber: forma.controls["phoneNumber"].value,
            numberHouse: forma.controls["noHouse"].value,
            lockInfo: this.lockInfoValue,
            setCompany: this.setCompanyValue
          }
          this.clientService.addClient(clientData).subscribe(jsonData => {
                var checkUser = jsonData;
                if (jsonData == "SUCCESS: User Created") {
                  this.router.navigate(['/home']);
                } else if(jsonData == "ERROR: Object reference not set to an instance of an object."){
                  this.loading = false;
                  this.userExists = true;
                }else {
                    this.loading = false;
                }
            },
            (errorResponse) => {
              this.loading = false;
            });
        }
      }else if(this.clientService.operation == 1 && this.userType == '1'){
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
          phoneNumber: forma.controls["phoneNumber"].value,
          numberHouse: forma.controls["noHouse"].value,
          lockInfo: this.lockInfoValue,
          setCompany: this.setCompanyValue
        }
        this.clientService.updateClient(updateClientData).subscribe(jsonData => {
              var checkUser = jsonData;
              if (jsonData == "SUCCESS: User Updated.") {
                this.clientService.operation = 0;
                this.router.navigate(['/home']);
              } else {
                  this.loading = false;
              }
          });
      }else if(this.clientService.operation == 1 && this.userType == '2'){

        const updateClientData:User = {
          id: this.clientService.userEdit.id,
          name: forma.controls["name"].value,
          lastName: forma.controls["lastname"].value,
          userName: this.clientService.userEdit.userName,
          password: this.clientService.userEdit.password,
          address: forma.controls["address"].value,
          email: forma.controls["email"].value,
          typeId: this.clientService.userEdit.typeId,
          address2: forma.controls["address2"].value,
          colony: forma.controls["colony"].value,
          city: forma.controls["city"].value,
          state: this.clientService.userEdit.state,
          zip: forma.controls["zip"].value,
          country: this.clientService.userEdit.country,
          phoneNumber: forma.controls["phoneNumber"].value,
          numberHouse: forma.controls["noHouse"].value,
          lockInfo: this.clientService.userEdit.lockInfo,
          setCompany: this.clientService.userEdit.setCompany
        }
        this.clientService.updateClient(updateClientData).subscribe(jsonData => {
              var checkUser = jsonData;

              if (jsonData == "SUCCESS: User Updated.") {
                this.clientService.operation = 0;
                this.router.navigate(['/home']);
              } else {
                  this.loading = false;
              }
          });
      }
    }
  }

  checkCompany(){
    var element = <HTMLInputElement>document.getElementById("setCompany");
    element = <HTMLInputElement>document.getElementById("setCompany");
    if(element.checked == true){
      this.setCompanyValue = "Y";
    }else{
      this.setCompanyValue = "N";
    }
  }

  checkAutoFill(){
    var element = <HTMLInputElement>document.getElementById("lockInfo");
    element = <HTMLInputElement>document.getElementById("lockInfo");
    if(element.checked == true){
      this.lockInfoValue = "Y";
    }else{
      this.lockInfoValue = "N";
    }
  }
}
