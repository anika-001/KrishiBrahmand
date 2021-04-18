import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-farmer-bid',
  templateUrl: './farmer-bid.component.html',
  styleUrls: ['./farmer-bid.component.scss']
})
export class FarmerBidComponent implements OnInit {


  random = {
    'bla': "5"
  }

  status = ["Order Placed", "Item Picked", "In Transit", "Out for Delivery", "Delivered"];

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";
  shipments: any;
  dict: any = {};
  keys:any = [];
  ship: boolean = true;

  urls = {
    "orders": "http://localhost:5001/v1/consumer/orders",
    "item": "http://localhost:5001/v1/products/categories/items/item",
    "shipment": "http://localhost:5001/v1/farmers/farmer/shipments",
  }
  constructor(private httpClient: HttpClient, private router: Router, private as: AuthService, private cs: CartService, private cs_: CookieService) { }

  ngOnInit(): void {

    if(this.cs_.check('role')){
      if(this.cs_.get('role') == 'consumer'){
        this.router.navigate(['/home']);
      }

    }

    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else {
        console.log("Inside Shipments Component");
        this.httpClient.get<any>(this.urls.shipment + "?id=" + res.payload.uid).subscribe(
          (res) => {
            this.shipments = res.payload;
            //console.log(this.shipments);
            if (this.shipments == null) {
              this.ship = false;
            }
            else {
              for (let order of this.shipments) {
                order["orderdate"] = new Date(Number(order.ItemsId.split("?")[1])).toString().split(" ", 4).join(" ");
                let prodid = order.ItemsId.split("?")[2];
                this.callItem(prodid, order);
                if (!this.dict.hasOwnProperty(order["orderdate"])) {
                  this.dict.anotherKey = order["orderdate"];
                  this.dict[order["orderdate"]] = [order];
                  this.keys.push(order["orderdate"]);
                }
                else {
                  this.dict[order["orderdate"]].push(order);
                }
              }
              console.log(this.dict);
              console.log(this.keys);
              this.keys.sort(function (a: any, b: any) {
                var dateA = new Date(a);
                var dateB = new Date(b);
                return dateA >= dateB ? -1 : 1;
              });
              
              console.log("shipments");
              console.log(this.shipments);
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

  callItem(prodId: any, item: any) {
    this.cs.getItem(prodId).subscribe(
      (res) => {
        item["image"] = res.payload.image;
        item["sellername"] = res.payload.sellername;
        item["title"] = res.payload.title;
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
    let prodid = item.ItemsId.split("?")[2];
    this.router.navigate(['/item'], { queryParams: { id: prodid } });
  }

}

