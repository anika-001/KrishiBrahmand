import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth'
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../window.service';
import { AuthService } from '../services/auth.service';
import { browserRefresh } from '../app.component';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public browserRefresh: boolean = false;

  isempty: boolean = false;
  error500: boolean = false;
  number = [1, 2, 3, 4, 5, 6]


  error: boolean = false; //added by twinkle
  errormessage: string = "";

  selectedDeliveryAddress: any;
  existingadd:boolean = false;
  messageexistingadd: string = "";

  addressesList: any[] = [];

  /* Pickup Address Tab validation variables */  //added by twinkle
  addresstitle: boolean = false;
  messageaddresstitle: string = "";
  pickupaddress: boolean = false;
  messagepickupaddress: string = "";
  pickuppincode: boolean = false;
  messagepickuppincode: string = "";

  selectedState: string = "";
  selectedDistrict: string = "";

  pickupstate:boolean = false;
  messagepickupstate:string = "";
  pickupdistrict:boolean = false;
  messagepickupdistrict:string = "";

  urls = {
    'state': "http://localhost:5001/v1/location/states",
    'district': "http://localhost:5001/v1/location/states/districts",
    'address': "http://localhost:5001/v1/users/address",
  }

  states: any;
  districts: any;

  user: any;

  newAddress = {
    "uid": "",
    "newaddress": {
      "addresstitle": "",
      "address": "",
      "district": "",
      "state": "",
      "pincode": "",
    }
  }

  constructor(private router: Router, private httpClient: HttpClient, private win: WindowService, private fb: FormBuilder,
    private as: AuthService, private cs: CartService,private cs_: CookieService) { }

  ngOnInit(): void {

    if(this.cs_.check('role')){
      if(this.cs_.get('role') == 'farmer'){
        this.router.navigate(['/home/farmer']);
      }

    }

    this.getStates();

    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    if (browserRefresh)
      this.router.navigateByUrl("/cart");

    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      this.newAddress.uid = this.user.payload.uid;
      this.existingAddress();
    });
  }
  
  //added by twinkle start
  form = this.fb.group({
    addresstitle: ['', Validators.required],
    pickupaddress: ['', Validators.required],
    pickuppincode: ['', Validators.required],
  });

  checkout(){

    if(this.selectedDeliveryAddress == null)
    {
      this.existingadd = true; //vaish this is the boolean value for showing error
      this.messageexistingadd = "You need to choose a delivery address."
      return;
    }
    else
    {
      this.cs.setValueSDA(this.selectedDeliveryAddress);
      this.router.navigateByUrl("/payment");
    }

  }

  addressValidate() {

    var flag = 'true';
    this.error = false;
    this.addresstitle = false;
    this.pickupaddress = false;
    this.pickuppincode = false;
    this.pickupdistrict = false;
    this.pickupstate = false;

    if (this.form.get("addresstitle")?.value == "" || !(/^[a-zA-Za-zA-Z0-9()\-,. ]+$/.test(this.form.get("addresstitle")?.value))) {
      this.addresstitle = true;
      this.messageaddresstitle = "Invalid Address Title. It is badly formatted."
      flag = 'false';
    }

    if (this.form.get("pickupaddress")?.value == "" || !(/^[a-zA-Za-zA-Z0-9()\-,. ]+$/.test(this.form.get("pickupaddress")?.value))) {
      this.pickupaddress = true;
      this.messagepickupaddress = "Invalid Address. Address is badly formatted."
      flag = 'false';
    }

    if (this.form.get("pickuppincode")?.value == "" || !(/^\d{6}$/.test(this.form.get("pickuppincode")?.value))) {
      this.pickuppincode = true;
      this.messagepickuppincode = "Invalid Pincode. Pincode is badly formatted."
      flag = 'false';
    }

    if(this.selectedState == ""){
      this.pickupstate = true;
      this.messagepickupstate = "Invalid pickup state. State cannot be empty";
      flag = 'false';
    }

    if(this.selectedDistrict == ""){
      this.pickupdistrict = true;
      this.messagepickupdistrict = "Invalid pickup district. District cannot be empty";
      flag = 'false';
    }

    if (flag == 'true') {
      console.log("success");
      return true;
    }

    else {
      return false;
    }
  }

  existingAddress() {
    this.addressesList = [];
    this.httpClient.get<any>(this.urls.address + "?uid=" + this.user.payload.uid).subscribe(
      (res) => {
        console.log(res.payload);
        this.addressesList.push(res.payload.defaultaddress);
        this.addressesList[0].addresstitle = "Registered Address";
        for (let add of res.payload.createnewaddress) {
          this.addressesList.push(add);
        }
        console.log(this.addressesList);
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
          console.log("Error");
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add items. Please contact customer service or try again later."
        }
      }
    );

  }

  getStates() {
    this.httpClient.get<any>(this.urls.state).subscribe(
      (res) => {
        console.log(res);
        this.states = res.payload;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add item. Please contact customer service or try again later.";
        }
      }
    );
  }

  getDistricts(state: String) {
    console.log(state);
    this.httpClient.get<any>(this.urls.district + "?state=" + state).subscribe(
      (res) => {
        console.log(res);
        this.districts = res.payload.districts;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add item. Please contact customer service or try again later.";
        }
      }
    );
  }

  addAddress(){

    if(!this.addressValidate())
    {
      console.log(this.selectedState);
      console.log(this.selectedDistrict);
      console.log("address invalid");
      return;
    }
    this.newAddress.newaddress.addresstitle = this.form.get("addresstitle")?.value;
    this.newAddress.newaddress.pincode = this.form.get("pickuppincode")?.value;
    this.newAddress.newaddress.address = this.form.get("pickupaddress")?.value;
    this.newAddress.newaddress.district = this.selectedDistrict;
    this.newAddress.newaddress.state = this.selectedState;
    this.httpClient.post<any>(this.urls.address, this.newAddress).subscribe(
        (res) => {
          this.form.controls.addresstitle.setValue('');
          this.form.controls.pickupaddress.setValue('');
          this.form.controls.pickuppincode.setValue('');
          this.states = undefined;
          this.districts = undefined;
          console.log(res.message);
          this.existingAddress();
        },
        (err) => {
          console.log(err);
          if (err.status == 0 || err.status == 500) {
            this.error500 = true;
            console.log("Error");
          }
          else {
            this.error = true;
            this.errormessage = "Unable to add items. Please contact customer service or try again later."
          }
        }
      );
  }

}
