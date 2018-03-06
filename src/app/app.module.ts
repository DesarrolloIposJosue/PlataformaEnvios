import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


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

//Services
import { ClientService } from './services/client-service/client.service';
import { AuthService } from './services/auth-service/auth.service';

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
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChvFc0BNQDufcLXZBnNTsKq4caaLlX3eA',
      libraries: ["places"]
    }),
  ],

  providers: [
    ClientService,
    AuthService
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
