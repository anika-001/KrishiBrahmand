import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;
  user: any;

  error500: boolean = false;

  url = "http://localhost:5001/v1/users/login";

  error: boolean = false;
  email: boolean = false;
  messageemail: string = "";
  password: boolean = false;
  messagepassword: string = "";
  errormessage: string = "";

  resendemail: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient, private as : AuthService, private cs: CookieService, private ac: AppComponent) {
  }

  ngOnInit(): void {
    this.error = false;
    this.error500 = false;
    this.resendemail = false;

    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      console.log(res);
      
      if(res.payload != "Unauthorized")
      {
        if(this.cs.check('role')){
          if(this.cs.get('role') == 'farmer'){
            this.router.navigate(['/home/farmer']);
            // this.ac.setSelectedRole("farmer");
            // this.ac.setShow(true);
          }
    
          if(this.cs.get('role') == 'consumer'){
            this.router.navigate(['/home']);
            // this.ac.setSelectedRole("consumer");
            // this.show = true;
          }
    
          if(this.cs.get('role') == 'consumeronly'){
            this.router.navigate(['/home']);
            //this.show = false;
          }
    
        }
      }
    })
  }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  validate() {
    var flag = 'true';
    this.error = false;
    this.email = false;
    this.password = false;

    if (this.form.get("email")?.value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("email")?.value))) {
      this.email = true;
      this.messageemail = "Email badly formatted."
      flag = 'false';
    }

    if (this.form.get("password")?.value == "") {
      this.password = true;
      this.messagepassword = "Password cannot be blank."
      flag = 'false';
    }


    if (flag == 'true') {
      console.log("success");
      this.submit();
    }
  }

  resendmail(){
    this.router.navigate(['/resendemail']);
}

  submit() {
    let data = this.form.value;
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
    this.httpClient.post<any>(this.url, data, {withCredentials: true}).subscribe(
      (res) => {
        if(res.statusCode == 0) {
          this.as.getUser().subscribe(res => {
            if(res.payload == "Unauthorized")
            {
              this.router.navigate(['/401']);
            }
            this.as.setUserEmail(res.payload.email);
            this.as.getProfile(res.payload.uid).subscribe(
              res2 => {
                if(res2.payload.role == "farmer"){
                    this.cs.set( 'role', 'farmer', {path: '/'});
                    this.ac.setShow(true);
                    this.ac.setSelectedRole("farmer");
                    this.router.navigate(['/home/farmer']);
                    //this.ac.setValuerole('farmer');
                }
                else{
                  this.cs.set( 'role', 'consumeronly' );
                  this.ac.setShow(false);
                  this.router.navigate(['/home']);
                  //this.ac.setValuerole('consumeron');
                }
              //   this.profile = res2;
              //   this.role = res2.payload.role;
              //   if(this.role == "farmer")
              //     this.roleFarmer = true;
               }
            )
          })
          //this.router.navigate(['/home']);
        }
        else{
          this.error = true;
          this.errormessage = res.message;
          if (this.errormessage == "Please verify email") this.resendemail = true;
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else{
          this.error = true;
          this.errormessage = "Unable to register. Please contact customer service or try again later."
        }
      }
    );
    
  }

}
