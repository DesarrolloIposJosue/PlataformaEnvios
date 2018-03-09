import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { Client } from '../../classes/Client';
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
    private el: ElementRef,
  ) { }

  loading:boolean;

  ngOnInit() {

  }

  saveClient(forma:NgForm){
    console.log(forma);
    const clientData: Client = {
      id: 0,
      name: forma.controls["name"].value,
      password: forma.controls["password"].value,
      username: forma.controls["username"].value,
      type: forma.controls["clientType"].value
    }
    console.log(clientData);
    this.loading = true;
  }

}
