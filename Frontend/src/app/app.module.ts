import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import * as Hammer from 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { PhoneVerComponent } from './phone-ver/phone-ver.component';
import { WindowService } from './window.service';

// import { Client } from '@speechly/browser-client'

import firebase from 'firebase/app';
import {NgParticlesModule} from "ng-particles";

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { Error401Component } from './error401/error401.component';
import { Error500Component } from './error500/error500.component';
import { ResendemailComponent } from './resendemail/resendemail.component';
import { AddItemsComponent } from './add-items/add-items.component';
// import { ConsumerHomepageComponent } from './consumer-homepage/consumer-homepage.component';
import { ItemsComponent } from './items/items.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { OrdersComponent } from './orders/orders.component';
import { FarmerHomeComponent } from './farmer-home/farmer-home.component';
import { PickupComponent } from './pickup/pickup.component';
import { PaymentComponent } from './payment/payment.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ProductsStatisticsComponent } from './products-statistics/products-statistics.component';
import { AidComponent } from './aid/aid.component';
import { FarmerBidComponent } from './farmer-bid/farmer-bid.component';
import { ConsumerBidComponent } from './consumer-bid/consumer-bid.component';
import { FooterComponent } from './footer/footer.component';
import { ProdbidComponent } from './prodbid/prodbid.component';
import { ServiceWorkerModule } from '@angular/service-worker'

firebase.initializeApp(environment.firebaseConfig);


@Injectable({providedIn: 'root'})
export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-y",
    });
    return mc;
  }
} 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PhoneVerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailverificationComponent,
    Error401Component,
    Error500Component,
    ResendemailComponent,
    AddItemsComponent,
    // ConsumerHomepageComponent,
    ItemsComponent,
    ItemComponent,
    CartComponent,
    AddressComponent,
    OrdersummaryComponent,
    OrdersComponent,
    FarmerHomeComponent,
    PickupComponent,
    PaymentComponent,
    ShipmentsComponent,
    ProductsStatisticsComponent,
    AidComponent,
    FarmerBidComponent,
    ConsumerBidComponent,
    FooterComponent,
    ProdbidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Krishi-Brahmand'),
    AngularFirestoreModule,
    MatSelectModule,
    NgbModule,
    MatRadioModule,
    ChartsModule,
    NgParticlesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
