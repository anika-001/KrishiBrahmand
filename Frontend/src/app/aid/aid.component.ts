import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-aid',
  templateUrl: './aid.component.html',
  styleUrls: ['./aid.component.scss']
})
export class AidComponent implements OnInit {

  pickups: any;
  error500: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private as: AuthService,private cs: CookieService) { }

  urls = {}
  

  ngOnInit(): void {

    if(this.cs.check('role')){
      if(this.cs.get('role') == 'consumer'){
        this.router.navigate(['/home']);
      }

    }

    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else{
        
      }
    },
      (err) => {
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
      }
    );

  }

}
