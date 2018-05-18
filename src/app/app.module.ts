import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { MainPageAdminComponent } from './modules/main-page-admin/main-page-admin.component';
import { MainPageClientAdminComponent } from './modules/main-page-client-admin/main-page-client-admin.component';
import { MainPageClientComponent } from './modules/main-page-client/main-page-client.component';
import { AddParcelToClientComponent } from './modules/add-parcel-to-client/add-parcel-to-client.component';
import { SelectClientEditParcelComponent } from './modules/select-client-edit-parcel/select-client-edit-parcel.component';

//APP_ROUTES
import { APP_ROUTING } from './app.route';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { QuotationComponent } from './modules/quotation/quotation.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { GoogleMapsComponent } from './modules/google-maps/google-maps.component';
import { AddClientComponent } from './modules/add-client/add-client.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { SelectClientEditComponent } from './modules/select-client-edit/select-client-edit.component';
import { RateComponent } from './modules/rate/rate.component';
import { SelectProductEditComponent } from './modules/select-product-edit/select-product-edit.component';
import { AddGuidesToClientComponent } from './modules/add-guides-to-client/add-guides-to-client.component';
import { SelectClientEditGuidesComponent } from './modules/select-client-edit-guides/select-client-edit-guides.component';
import { CreateGuideComponent } from './modules/create-guide/create-guide.component';

//Services
import { ClientService } from './services/client-service/client.service';
import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { AutoLogOutService } from './services/auto-log-out-service/auto-log-out.service';
import { ParcelService } from './services/parcel-service/parcel.service';
import { ProductService } from './services/product-service/product.service';
import { RateService } from './services/rate-service/rate.service';
import { GuidesService } from './services/guides/guides.service';
import { CreateGuideService } from './services/create-guide-service/create-guide.service';


//Pipes


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    QuotationComponent,
    TrackingComponent,
    LogInComponent,
    GoogleMapsComponent,
    AddClientComponent,
    AddProductComponent,
    MainPageAdminComponent,
    MainPageClientAdminComponent,
    MainPageClientComponent,
    AddParcelToClientComponent,
    SelectClientEditParcelComponent,
    SelectClientEditComponent,
    RateComponent,
    SelectProductEditComponent,
    AddGuidesToClientComponent,
    SelectClientEditGuidesComponent,
    CreateGuideComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    APP_ROUTING,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChvFc0BNQDufcLXZBnNTsKq4caaLlX3eA',
      libraries: ["places"]
    }),
  ],

  providers: [
    ClientService,
    AuthService,
    AuthGuardService,
    AutoLogOutService,
    ParcelService,
    ProductService,
    RateService,
    GuidesService,
    CreateGuideService
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
