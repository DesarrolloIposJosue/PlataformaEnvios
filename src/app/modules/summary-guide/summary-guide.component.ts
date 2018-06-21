import { Component, OnInit } from '@angular/core';
import { GuidesService } from '../../services/guides/guides.service';
import { Shipment } from '../../classes/Shipment';
import { ValidDateGuide } from '../../classes/ValidDateGuide';
import { Router, NavigationEnd } from '@angular/router';

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
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }

  ngOnInit() {

  }

  ready(){
    this.router.navigate(['/home']);
    this.guideService.selectedGuide = null;
    this.guideService.selectedGuides = [];
    this.guideService.selectedMultiguides = [];
  }

}
