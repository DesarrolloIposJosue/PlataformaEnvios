import { Component, OnInit } from '@angular/core';
import { GuidesService } from '../../services/guides/guides.service';
import { Shipment } from '../../classes/Shipment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-guide',
  templateUrl: './summary-guide.component.html',
  styleUrls: ['./summary-guide.component.css']
})
export class SummaryGuideComponent implements OnInit {
  private guide:Shipment;

  constructor(
    private guideService:GuidesService,
    private router:Router
  ) {
    this.guide = this.guideService.selectedGuide;
  }

  ngOnInit() {

  }

  ready(){
    this.router.navigate(['/home']);
  }

}
