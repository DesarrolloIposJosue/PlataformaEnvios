import { Component, OnInit } from '@angular/core';
import { GuidesService } from '../../services/guides/guides.service';
import { Shipment } from '../../classes/Shipment';
import { ValidDateGuide } from '../../classes/ValidDateGuide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-guide',
  templateUrl: './summary-guide.component.html',
  styleUrls: ['./summary-guide.component.css']
})
export class SummaryGuideComponent implements OnInit {
  private guide:Shipment;
  private guides:Shipment[] = [];
  private multiguides:ValidDateGuide[] = []

  constructor(
    private guideService:GuidesService,
    private router:Router
  ) {
    this.guide = this.guideService.selectedGuide;
    this.guides = this.guideService.selectedGuides;
    this.multiguides = this.guideService.selectedMultiguides;
  }

  ngOnInit() {

  }

  ready(){
    this.router.navigate(['/home']);
  }

}
