import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent implements OnInit {

  random = {
    'bla': "5"
  };

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";
  ongoingorders: any;
  pastorders: any;

  oo: boolean = true;
  messageoo: string = "";
  po: boolean = true;
  messagepo: string = "";

  status = ["Order Placed", "Item Picked", "In Transit", "Out for Delivery", "Delivered"];


  show = {
    "oo": false,
    "po": false
  };

  urls = {
    "orders": "http://localhost:5001/v1/consumer/orders",
    'item': "http://localhost:5001/v1/products/categories/items/item",
  };

  constructor(private httpClient: HttpClient, private router: Router, private as: AuthService, private cs: CartService,private cs_: CookieService) { }

  ngOnInit(): void {

    if(this.cs_.check('role')){
      if(this.cs_.get('role') == 'farmer'){
        this.router.navigate(['/home/farmer']);
      }

    }

    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else {
        console.log("Inside Orders Component");
        this.httpClient.get<any>(this.urls.orders + "?id=" + res.payload.uid + "&type=ongoing").subscribe(
          (res) => {
            this.ongoingorders = res.payload;
            if (this.ongoingorders == null) {
              this.oo = false;
            }
            else {

              for (let order of this.ongoingorders) {
                order["orderdate"] = new Date(Number(order.OrderId.split("?")[1])).toString().split(" ", 4).join(" ");
                for (let item of order.itemsList) {
                  let prodid = item.itemId.split("?")[2];
                  this.callItem(prodid, item);
                }
              }

              this.ongoingorders.sort(function(a:any, b:any ){
                var dateA = new Date(a.orderdate);
                var dateB = new Date(b.orderdate);
                return dateA >= dateB ? -1 : 1;  
              });

              console.log("ongoingorders");
              console.log(this.ongoingorders);
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

        this.httpClient.get<any>(this.urls.orders + "?id=" + res.payload.uid + "&type=past").subscribe(
          (res) => {
            if (res.payload == null) {
              this.po = false;
              console.log("po", this.pastorders);
            }
            else {
              this.pastorders = res.payload.Orders;
              for (let order of this.pastorders) {
                order["orderdate"] = new Date(Number(order.OrderId.split("?")[1])).toString().split(" ", 4).join(" ");

                for (let item of order.itemsList) {
                  let prodid = item.itemId.split("?")[2];
                  this.callItem(prodid, item);
                  item.deliveredOn = new Date(item.deliveredOn).toString().split(" ", 4).join(" ");
                }
              }

              this.pastorders.sort(function(a:any, b:any ){
                var dateA = new Date(a.orderdate);
                var dateB = new Date(b.orderdate);
                return dateA >= dateB ? -1 : 1;  
              });


              console.log("pastorders");
              console.log(this.pastorders);
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

  onChange(e: any) {
    let isChecked: boolean = e.target.checked;
    let id: string = e.target.id;
    if (isChecked && id == "po") {
      this.show.po = true;
    }
    if (isChecked && id == "oo") {
      this.show.oo = true;
    }
    if (!isChecked && id == "oo") {
      this.show.oo = false;
    }
    if (!isChecked && id == "po") {
      this.show.po = false;
    }

  }

  showOrders() {
    if (this.show.po == true && this.pastorders != undefined) {
      this.po = true;
    }
    else {
      this.po = false;
    }
    if (this.show.oo == true && this.ongoingorders != null) {
      this.oo = true;
    }
    else {
      this.oo = false;
    }
    if (this.show.po == false && this.show.oo == false) {
      if (this.pastorders != undefined)
        this.po = true;
      if (this.ongoingorders != null)
        this.oo = true;
    }

    console.log(this.po, this.oo)
  }

  gotoItem(item: any) {
    let prodid = item.itemId.split("?")[2];
    this.router.navigate(['/item'], { queryParams: { id: prodid } });
  }
}
