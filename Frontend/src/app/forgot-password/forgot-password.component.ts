import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  authError: any;
  user: any;

  url = "http://localhost:5001/v1/emailservice";

  error: boolean = false;
  email: boolean = false;
  messageemail: string = "";
  errormessage: string = "";

  resendemail: boolean = false;

  error500: boolean = false;


  constructor(private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.error = false;
    this.error500 = false;
    this.resendemail = false;
    
  }

  form = new FormGroup({
    email: new FormControl(''),
  })

  validate() {
    var flag = 'true';
    this.error = false;
    this.email = false;

    if (this.form.get("email")?.value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("email")?.value))) {
      //window.alert("Please enter a valid e-mail address."); 
      this.email = true;
      this.messageemail = "E-mail badly formatted."
      flag = 'false';
    }


    if (flag == 'true') {
      console.log("success");
      this.submit();
    }
  }

  resendmail() {
    this.router.navigate(['/resendemail']);
  }

  submit() {
    let data = this.form.value;
    data["type"] = "forgotpass";
    this.form.get('email')?.setValue('');
    this.httpClient.post<any>(this.url, data).subscribe(
      (res) => {
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
          this.errormessage = "Unable to send mail. Please contact customer service or try again later.";
        }
      }
    );
    
  }

}

