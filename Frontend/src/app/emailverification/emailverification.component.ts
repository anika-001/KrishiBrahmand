import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  token: any;

  url = "http://localhost:5001/v1/users/enableUser";

  error: Boolean = false;
  errormessage: String = "";

  error500: boolean = false;

  ngOnInit(): void {

    this.error500 = false;
    this.token = this.route.snapshot.queryParams['token'];
    if(this.token == undefined) this.router.navigate(['/login']);

    let data = {
      "token": this.token
    }


    this.httpClient.post<any>(this.url, data).subscribe(
      (res) => { 
        if (res.statusCode != 0) {
          this.error = true;
          this.errormessage = res.message;
        }
        else {
          this.router.navigate(['/login']);
        }

      },
      (err) => {
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

  resendmail(){
      this.router.navigate(['/resendemail']);
  }

}
