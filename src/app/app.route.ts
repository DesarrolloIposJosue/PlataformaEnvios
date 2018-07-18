import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { QuotationComponent } from './modules/quotation/quotation.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { GoogleMapsComponent } from './modules/google-maps/google-maps.component';
import { AddClientComponent } from './modules/add-client/add-client.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { AddParcelToClientComponent } from './modules/add-parcel-to-client/add-parcel-to-client.component';
import { SelectClientEditParcelComponent } from './modules/select-client-edit-parcel/select-client-edit-parcel.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { SelectClientEditComponent } from './modules/select-client-edit/select-client-edit.component';
import { SelectProductEditComponent } from './modules/select-product-edit/select-product-edit.component';
import { SelectClientEditGuidesComponent } from './modules/select-client-edit-guides/select-client-edit-guides.component';
import { RateComponent } from './modules/rate/rate.component';
import { AddGuidesToClientComponent } from './modules/add-guides-to-client/add-guides-to-client.component';
import { CreateGuideComponent } from './modules/create-guide/create-guide.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { SummaryGuideComponent } from './modules/summary-guide/summary-guide.component';
import { BuyGuidesComponent } from './modules/buy-guides/buy-guides.component';
import { DefineGuidesRedpackComponent } from './modules/define-guides-redpack/define-guides-redpack.component';
import { PrintLabelComponent } from './modules/print-label/print-label.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quotation', component: QuotationComponent, canActivate:[ AuthGuardService ]},
  { path: 'tracking', component: TrackingComponent, canActivate:[ AuthGuardService ] },
  { path: 'log-in', component: LogInComponent },
  { path: 'google-maps', component: GoogleMapsComponent, canActivate:[ AuthGuardService ]},
  { path: 'add-product', component: AddProductComponent, canActivate:[ AuthGuardService ]},
  { path: 'add-client', component: AddClientComponent, },
  { path: 'add-parcel-to-client', component: AddParcelToClientComponent, canActivate:[ AuthGuardService ]},
  { path: 'select-client-to-edit-parcel', component: SelectClientEditParcelComponent, canActivate:[ AuthGuardService ]},
  { path: 'select-client-to-edit', component: SelectClientEditComponent, canActivate:[AuthGuardService]},
  { path: 'select-product-to-edit', component: SelectProductEditComponent, canActivate:[AuthGuardService]},
  { path: 'select-client-to-edit-guides', component: SelectClientEditGuidesComponent, canActivate:[ AuthGuardService ]},
  { path: 'show-rate', component: RateComponent, canActivate:[AuthGuardService]},
  { path: 'add-guides-to-client', component: AddGuidesToClientComponent, canActivate:[AuthGuardService]},
  { path: 'create-guide', component: CreateGuideComponent, canActivate:[AuthGuardService]},
  { path: 'reports', component: ReportsComponent, canActivate:[AuthGuardService]},
  { path: 'guides', component: ReportsComponent, canActivate:[AuthGuardService]},
  { path: 'summary', component: SummaryGuideComponent, canActivate:[AuthGuardService]},
  { path: 'tracking', component: TrackingComponent, canActivate:[AuthGuardService]},
  { path: 'buy-guides', component: BuyGuidesComponent, canActivate:[AuthGuardService]},
  { path: 'define-guides-redpack', component: DefineGuidesRedpackComponent, canActivate:[AuthGuardService]},
  { path: 'print-label', component: PrintLabelComponent, canActivate:[AuthGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'log-in' },
  { path: '**', component: LogInComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
