import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-guides',
  templateUrl: './buy-guides.component.html',
  styleUrls: ['./buy-guides.component.css']
})
export class BuyGuidesComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  confirmed(){
    this.router.navigate(['/home']);
  }
}
