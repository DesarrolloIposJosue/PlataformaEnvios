import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-add-guides-to-client',
  templateUrl: './add-guides-to-client.component.html',
  styleUrls: ['./add-guides-to-client.component.css']
})
export class AddGuidesToClientComponent implements OnInit {

  constructor() {
    $(document).ready(function(){
      $('input[type=number]').on('wheel', function(e){
          return false;
      });
    });
  }

  ngOnInit() {
  }

}
