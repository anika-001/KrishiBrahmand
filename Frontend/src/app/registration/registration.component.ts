import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth'
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../window.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError: any;

  selectedRole: String = "farmer";
  selectedState: String = "";
  selectedDistrict: String = "";
  windowRef: any;

  error: boolean = false;
  name: boolean = false;
  messagename: string = "";
  email: boolean = false;
  messageemail: string = "";
  phone: boolean = false;
  messagephone: string = "";
  password: boolean = false;
  messagepassword: string = "";
  errormessage: string = "";
  confirmpassword: boolean = false;
  messageconfirmpassword: string = "";
  address: boolean = false;
  messageaddress: string = "";
  district: boolean = false;
  messagedistrict: string = "";
  state: boolean = false;
  messagestate: string = "";
  pincode:boolean = false;
  messagepincode: string = "";

  phoneVerified: boolean = false;
  verificationCode: string = "";
  phuser: any;

  resendemail: boolean = false;

  error500: boolean = false;
  user:any;

  urls = {
    'register' : "http://localhost:5001/v1/users/registration",
    'state' : "http://localhost:5001/v1/location/states",
    'district' : "http://localhost:5001/v1/location/states/districts"
  }

  states: any;
  districts: any;

  constructor(private router: Router, private httpClient: HttpClient, private win: WindowService, private as : AuthService) { }

  ngOnInit(): void {

    this.getStates();
    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      console.log(res);
      if(res.payload != "Unauthorized")
      {
        this.router.navigate(['/home']);
      }
    })
    
    this.phoneVerified = false;
    this.resendemail = false;
    this.error500 = false;
    this.error = false;
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
      {
        'size': 'invisible'
      }
    );

    this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });

  }

  //url = "http://localhost:5001/authentication/registration";

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('farmer'),
    confirmpassword: new FormControl(''),
    address: new FormControl(''),
    district: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
  })

  form2 = new FormGroup({
    code: new FormControl(''),
  })

  validate() {
    var flag = 'true';
    this.error = false;
    this.name = false;
    this.email = false;
    this.phone = false;
    this.password = false;
    this.confirmpassword = false;
    this.address = false;
    this.district = false;
    this.state = false;
    this.pincode = false;

    if (this.form.get("name")?.value == "" || !(/^[a-zA-Z][a-zA-Z ]+$/.test(this.form.get("name")?.value))) {
      this.name = true;
      this.messagename = "Invalid name. A name starts with and contains only Alphabets."
      flag = 'false';
    }


    if (this.form.get("phone")?.value == "" || !(/^\d{10}$/.test(this.form.get("phone")?.value))) {
      this.phone = true;
      this.messagephone = "Invalid Phone number. Please enter a 10 digit valid phone number."
      flag = 'false';
    }

    if (this.form.get("email")?.value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("email")?.value))) {
      this.email = true;
      this.messageemail = "Invalid email. Email is badly formatted."
      flag = 'false';
    }

    if (this.form.get("password")?.value == "" || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.form.get("password")?.value))) {
      this.password = true;
      this.messagepassword = "A strong 8 character password must contain at least:[a-z],[A-Z],[0-9],a special character";
      flag = 'false';
    }

    if (this.form.get("confirmpassword")?.value != this.form.get("password")?.value || this.form.get("confirmpassword")?.value == "") {
      this.confirmpassword = true;
      if (this.form.get("confirmpassword")?.value == "") { this.messageconfirmpassword = "Confirm password field is empty"; }
      else { this.messageconfirmpassword = "Confirm password mismatch"; }
      flag = 'false';
    }

    if (this.form.get("address")?.value == "" || !(/^[a-zA-Za-zA-Z0-9()\-,. ]+$/.test(this.form.get("address")?.value))) {
      this.address = true;
      this.messageaddress = "Invalid Address. Address is badly formatted."
      flag = 'false';
    }

    if (this.form.get("pincode")?.value == "" || !(/^\d{6}$/.test(this.form.get("pincode")?.value))) {
      this.pincode = true;
      this.messagepincode = "Invalid Pincode. Pincode is badly formatted."
      flag = 'false';
    }

    // if (this.form.get("district")?.value == "" || !(/^[a-zA-Z][a-zA-Z ]+$/.test(this.form.get("district")?.value))) {
    //   this.district = true;
    //   this.messagedistrict = "Invalid District. A district starts with and contains only Alphabets."
    //   flag = 'false';
    // }

    // if (this.form.get("state")?.value == "" || !(/^[a-zA-Z]+$/.test(this.form.get("state")?.value))) {
    //   this.state = true;
    //   this.messagestate = "Invalid State. A state contains only Alphabets."
    //   flag = 'false';
    // }

    if (flag == 'true') {
      console.log("success");
      return true;
    }

    else {
      return false;
    }

  }

  resendmail() {
    this.router.navigate(['/resendemail']);
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = "+91" + this.form.get("phone")?.value;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => {
        console.log(error);
        this.error = true;
        this.errormessage = "Cannot send verification code. Please try again later.";
      });

  }

  returnConfirmationCode = (): Promise<firebase.auth.UserCredential> => {
    console.log(this.form2.get("code")?.value);
    return this.windowRef.confirmationResult.confirm(this.form2.get("code")?.value.toString());
  }

  verifyLoginCode() {
    this.returnConfirmationCode()
      .then(result => {

        this.phuser = result.user;
        firebase.auth().currentUser?.delete().then(val => {
          this.phoneVerified = true;
          let data = this.form.value;
          delete data.confirmpassword;
          data.role = this.selectedRole; //selectedRole
          data.state = this.selectedState;
          data.district = this.selectedDistrict;

          // this.form.get('email')?.setValue('');
          // this.form.get('password')?.setValue('');
          // this.form.get('confirmpassword')?.setValue('');
          // this.form.get('name')?.setValue('');
          // this.form.get('address')?.setValue('');
          // this.form.get('state')?.setValue('');
          // this.form.get('district')?.setValue('');
          // this.form.get('phone')?.setValue('');
          // this.form.get('role')?.setValue('');

          this.httpClient.post<any>(this.urls.register, data).subscribe(
            (res) => {
              console.log(res.message);
              if (res.statusCode != 0) {
                this.error = true;
                this.errormessage = res.message;
                if (this.errormessage == "Please verify email") this.resendemail = true;
              }
              else {
                this.router.navigate(['/login']);
              }

            },
            (err) => {
              console.log(err);
              if (err.status == 0 || err.status == 500) {
                this.error500 = true;
              }
              else {
                this.error = true;
                this.errormessage = "Unable to register. Please contact customer service or try again later.";
              }
            }
          );

        })
          .catch(e => {
            this.error = true;
            this.errormessage = "Unable to register. Please try again later.";
          })

      })
      .catch(error => {
        console.log(error, "Incorrect code entered?")
        this.error = true;
        this.errormessage = "Incorrect code or code expired. Please try again"
      });
  }


  submit() {

    if (!this.validate()) return;
    this.sendLoginCode();

  }

  getStates(){
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
          this.errormessage = "Unable to register. Please contact customer service or try again later.";
        }
      }
    );
  }

  getDistricts(state:String){
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
          this.errormessage = "Unable to register. Please contact customer service or try again later.";
        }
      }
    );
  }
}
