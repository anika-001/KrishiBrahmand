import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {

  //pickups: CPickupRecord[] = [];

  pickups: any;
  error500: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private as: AuthService,private cs: CookieService) { }

  urls = {
    "pickup": "http://localhost:5001/v1/logistics/pickup",
    "product": "http://localhost:5001/v1/products/categories/items/item",
  }

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

      else {
        this.apiCall(res.payload.uid);
      }
    },
      (err) => {
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
      }
    );
    // this.pickups.push(new CPickupRecord('prod 1', 10, new Date(), "Lokwa", "1025, Mulgaon, Bhandar PO, Next to Hanuman Mandir, Maharashtra, PIN 401 012" ));
    // this.pickups.push(new CPickupRecord('prod 2', 20, new Date(), "phulwa", "1025, Somevati, Unknown PO, Next to NH 27, Maharashtra, PIN 401 012"));
  }


  apiCall(uid: String) {
    this.httpClient.get<any>(this.urls.pickup + "?id=" + uid).subscribe(
      (res) => {
        this.pickups = res.payload;
        for(let x of this.pickups){
          this.httpClient.get<any>(this.urls.product + "?id=" + x.ProductId).subscribe(
            (res) => {
              x["name"] = res.payload.title
            },
            (err) => {
              console.log(err);
              if (err.status == 0 || err.status == 500) {
                this.error500 = true;
              }
            }
          );
        }

      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
      }
    );
  }


}

// class CPickupRecord {
//   constructor(public productName: string, public quantity: number, public pickupDate: Date, public person: string, public address: string) {
//   }
// }


