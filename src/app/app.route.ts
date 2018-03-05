import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { QuotationComponent } from './modules/quotation/quotation.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { GoogleMapsComponent } from './modules/google-maps/google-maps.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quotation', component: QuotationComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'google-maps', component: GoogleMapsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
