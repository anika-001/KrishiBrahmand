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
  item: any;
  prodId: any;
  permission: Boolean = false;
  user: any;

  bidCost: any;
  bidQty: any;

  urls = {
    "orders": "http://localhost:5001/v1/consumer/orders",
    "item": "http://localhost:5001/v1/products/categories/items/item",
    "bid": "http://localhost:5001/v1/products/product/bid",
    "acceptbid": "http://localhost:5001/v1/farmers/farmer/bid",
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService,
    private cs: CartService, private cs_: CookieService) { }

  ngOnInit(): void {
    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else {
        this.user = res.payload;
        this.prodId = this.route.snapshot.queryParams['id'];
        this.callItem(this.prodId);
        console.log(this.prodId);
        console.log("Inside Prod Bid Component");
        this.httpClient.get<any>(this.urls.bid + "?role=product" + "&id=" + this.prodId).subscribe(
          (res) => {
            this.bids = res.payload;
            console.log(this.bids);
             
            console.log(this.item);
            if (this.bids.length == 0) {
              this.bid = false;
            }
            else {
              for (let item of this.bids) {
                this.callUser(item.uid, item);
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

  acceptBid(bid:any) {

    console.log(bid);

    let bidData = {
      farmuid: this.user.uid,
      consumeruid: bid.uid,
      productid: bid.productId,
      quantity: bid.quantity,
      cost: bid.cost,
      bidid: bid._id
    };
    this.httpClient.post<any>(this.urls.acceptbid, bidData).subscribe(
      (res) => {
        console.log(res);
        location.reload();
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

  postBid() {
    let bidData = {
      uid: this.user.uid,
      productId: this.prodId,
      cost: this.bidCost,
      quantity: this.bidQty,
      date: Date.now(),
      status: "Not Accepted"
    }

    console.log(bidData);

    this.httpClient.post<any>(this.urls.bid, bidData).subscribe(
      (res) => {
        console.log(res);
        location.reload();
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

  callUser(uid: any, item: any) {
    this.as.getProfile(uid).subscribe(
      (res) => {
        console.log("Inside Call User function");
        item["name"] = res.payload.name;
        item["email"] = res.payload.email;
        item["phone"] = res.payload.phone;
        item["role"] = res.payload.role;
        console.log(res.payload);
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

  callItem(prodId: any) {
    this.cs.getItem(prodId).subscribe(
      (res) => {
        console.log("Inside Call Item function");
        this.item = res.payload;
        if (this.user.uid == res.payload.uid) {
          this.permission = true;
        }
        // this.item["image"] = res.payload.image;
        // this.item["sellername"] = res.payload.sellername;
        // this.item["title"] = res.payload.title;
        // this.item["description"] = res.payload.description;

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
