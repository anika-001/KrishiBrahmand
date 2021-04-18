import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodbid',
  templateUrl: './prodbid.component.html',
  styleUrls: ['./prodbid.component.scss']
})
export class ProdbidComponent implements OnInit {

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";

  bids: any;
  bid: boolean = true;
  vals: any = [];

  prodId:any;

  urls = {
    "orders": "http://localhost:5001/v1/consumer/orders",
    "item": "http://localhost:5001/v1/products/categories/items/item",
    "bid": "http://localhost:5001/v1/products/product/bid",
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService,
    private cs: CartService, private cs_: CookieService) { }

  ngOnInit(): void {
    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else {
        this.prodId = this.route.snapshot.queryParams['id'];
        console.log("Inside Prod Bid Component");
        this.httpClient.get<any>(this.urls.bid + "?role=product" + "&id=" + this.prodId).subscribe(
          (res) => {
            this.bids = res.payload;
            console.log(this.bids);
            if (this.bids.length == 0) {
              this.bid = false;
            }
            else {
              for (let prodId of this.bids) {
                this.cs.getItem(prodId).subscribe(
                  (res) => {

                    this.vals.push({
                      'prodId': prodId, 'image': res.payload.image, 'sellername': res.payload.sellername,
                      'title': res.payload.title, 'description': res.payload.description
                    });

                    console.log(this.vals);
                    // item["image"] = res.payload.image;
                    // item["sellername"] = res.payload.sellername;
                    // item["title"] = res.payload.title;
                  },
                  (err) => {
                    console.log(err);
                    if (err.status == 0 || err.status == 500) {
                      this.error500 = true;
                    }
                    else {
                      this.error = true;
                      this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
                    }
                  }
                );

              }

            }

          },
          (err) => {
            console.log(err);
            if (err.status == 0 || err.status == 500) {
              this.error500 = true;
            }
            else {
              this.error = true;
              this.errormessage = "Unable to delete item. Please contact customer service or try again later.";
            }
          }
        );
      }
    })
  }

  callItem(prodId: any) {
    this.cs.getItem(prodId).subscribe(
      (res) => {

        this.vals.push({
          'prodId': prodId, 'image': res.payload.image, 'sellername': res.payload.sellername,
          'title': res.payload.title
        });
        // item["image"] = res.payload.image;
        // item["sellername"] = res.payload.sellername;
        // item["title"] = res.payload.title;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
        }
      }
    );
  }

}
