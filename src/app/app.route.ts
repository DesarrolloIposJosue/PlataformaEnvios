import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { QuotationComponent } from './modules/quotation/quotation.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { GoogleMapsComponent } from './modules/google-maps/google-maps.component';
import { AddClientComponent } from './modules/add-client/add-client.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { AddParcelToClientComponent } from './modules/add-parcel-to-client/add-parcel-to-client.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quotation', component: QuotationComponent, },
  { path: 'tracking', component: TrackingComponent, canActivate:[ AuthGuardService ] },
  { path: 'log-in', component: LogInComponent },
  { path: 'google-maps', component: GoogleMapsComponent, },
  { path: 'add-product', component: AddProductComponent, },
  { path: 'add-client', component: AddClientComponent,},
  { path: 'add-parcel-to-client', component: AddParcelToClientComponent, },
  { path: '**', pathMatch: 'full', redirectTo: 'log-in' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
