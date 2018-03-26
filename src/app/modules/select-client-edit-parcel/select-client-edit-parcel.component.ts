import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-select-client-edit-parcel',
  templateUrl: './select-client-edit-parcel.component.html',
  styleUrls: ['./select-client-edit-parcel.component.css']
})
export class SelectClientEditParcelComponent implements OnInit {
  error = '';
  loading: boolean = false;
  private user:any;
  private invalidForm = false;
  private petitionError = false;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {

  }

  selectClient(forma:NgForm){
    if(!forma.valid){
      this.invalidForm = true;
    }else{
      this.invalidForm = false;
      const userData =  forma.controls["userData"].value;
      this.loading = true;
      this.router.navigate(['/add-parcel-to-client']);
    }
  }
}
