import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-buy-guides',
  templateUrl: './buy-guides.component.html',
  styleUrls: ['./buy-guides.component.css']
})
export class BuyGuidesComponent implements OnInit {

  constructor(
    private router:Router
  ) {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
   }

  ngOnInit() {
  }

  confirmed(){
    this.router.navigate(['/home']);
  }
}
