import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-consumer-bid',
  templateUrl: './consumer-bid.component.html',
  styleUrls: ['./consumer-bid.component.scss']
})
export class ConsumerBidComponent implements OnInit {
  
  
    random = {
      'bla': "5"
    }
  
    status = ["Order Placed", "Item Picked", "In Transit", "Out for Delivery", "Delivered"];
  
    error500: boolean = false;
    error: boolean = false;
    errormessage: string = "";
  
    shipments: any;
    dict: any = {};
    keys: any = [];
    ship: boolean = true;
  
    bids: any;
    bid: boolean = true;
    vals: any=[];
  
    urls = {
      "orders": "http://localhost:5001/v1/consumer/orders",
      "item": "http://localhost:5001/v1/products/categories/items/item",
      "bid": "http://localhost:5001/v1/products/product/bid",
    }
    constructor(private httpClient: HttpClient, private router: Router, private as: AuthService, private cs: CartService, private cs_: CookieService) { }
  
    ngOnInit(): void {
  
  
      this.as.getUser().subscribe(res => {
  
        if (res.payload == "Unauthorized") {
          this.router.navigate(['/401']);
        }
        else {
          console.log("Inside Consumer Bid Component");
          this.httpClient.get<any>(this.urls.bid + "?role=consumer" + "&id=" + res.payload.uid).subscribe(
            (res) => {
              this.bids = res.payload;
              console.log(this.bids);
              if (this.bids.length == 0) {
                this.bid = false;
              }
              else {
                for (let item of this.bids) {
                  this.callItem(item.productId, item);
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
  
    callItem(prodId: any, item:any) {
      this.cs.getItem(prodId).subscribe(
        (res) => {
  
          // this.vals.push({
          //   'prodId': prodId, 'image': res.payload.image, 'sellername': res.payload.sellername,
          //   'title': res.payload.title
          // });
          item["image"] = res.payload.image;
          item["sellername"] = res.payload.sellername;
          item["title"] = res.payload.title;
          item["description"] = res.payload.description;
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
  
    gotoItem(item: any) {
      let prodid = item.productId;
      this.router.navigate(['/prodbid'], { queryParams: { id: prodid } });
    }
  
  }
  
  


