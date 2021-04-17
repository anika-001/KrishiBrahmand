import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  authError: any;
  user: any;

  url = "http://localhost:5001/v1/users/changepassword"
  error: boolean = false;
  password: boolean = false;
  messagepassword: string = "";
  confirmpassword: boolean = false;
  messageconfirmpassword: string = "";
  errormessage: string = "";

  error500: boolean = false;

  token: any;


  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.error = false;
    this.error500 = false;
    this.token = this.route.snapshot.queryParams['token'];
    if(this.token == undefined) this.router.navigate(['/login']);

  }

  form = new FormGroup({
    password: new FormControl(''),
    confirmpassword: new FormControl('')

  })

  validate() {
    var flag = 'true';
    this.error = false;
    this.password = false;
    this.confirmpassword=false;
    
   

    // if (this.form.get("password")?.value == "" || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.form.get("password")?.value))) {
    //   this.password = true;
    //   this.messagepassword = "A strong 8 character password must contain at least:[a-z],[A-Z],[0-9],a special character";
    //   flag = 'false';
    // }

    if (this.form.get("confirmpassword")?.value != this.form.get("password")?.value || this.form.get("confirmpassword")?.value == "") {
      this.confirmpassword = true;
      if (this.form.get("confirmpassword")?.value == "") { this.messageconfirmpassword = "Confirm password field is empty"; }
      else { this.messageconfirmpassword = "Confirm password mismatch"; }
      flag = 'false';
    }


    if (flag == 'true') {
      console.log("success");
      //this.router.navigate(['/login']);
      this.submit();
    }
  }

  submit() {
    let data = {
      "token": this.token,
      "password": this.form.get('password')?.value
    }
    this.form.get('password')?.setValue('');
    this.form.get('confirmpassword')?.setValue('');
    this.httpClient.post<any>(this.url, data).subscribe(
      (res) => {
        if (res.message != "Password changed") {
          this.error = true;
          this.errormessage = res.message;
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
          this.errormessage = "Unable to change password. Please contact customer service or try again later.";
        }
      }
    );
    

    // this.auth.login(this.form.value);
  }

}

