import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resendemail',
  templateUrl: './resendemail.component.html',
  styleUrls: ['./resendemail.component.scss']
})
export class ResendemailComponent implements OnInit {

  error: boolean = false;
  errormessage: String = "";

  messageemail: String = "";
  email: boolean = false;

  emailsent: boolean = false;
  error500: boolean = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.error = false;
    this.errormessage = "";
  
    this.messageemail = "";
    this.email = false;

    this.emailsent = false;
    this.error500 = false;
  }

  form = new FormGroup({
    email: new FormControl(''),
  })

  validate(){
    if (this.form.get("email")?.value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("email")?.value))) {
      this.email = true;
      this.messageemail = "Invalid email. Email is badly formatted."
      return;
    }

    this.emailsent = false;
    let url = "http://localhost:5001/v1/emailservice"
    let data = {
      email: this.form.get("email")?.value,
      type: "emailver"
    }
    this.httpClient.post<any>(url, data).subscribe(
      (res) => {
        console.log(res.message);
        if (res.statusCode != 0) {
          this.error = true;
          this.errormessage = res.message;
        }
        else {
          //this.error = true;
          this.errormessage = "Email Sent!"
          this.emailsent = true;
        }

      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else{
          this.error = true;
          this.errormessage = "Unable to send email. Please contact customer service or try again later.";
        }
      }
    );
  }

}
