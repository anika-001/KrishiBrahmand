import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

import { browserRefresh } from '../app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public browserRefresh: boolean = false;

  constructor(private as: AuthService, private cs: CartService, private router: Router, private httpClient: HttpClient,private cs_: CookieService) {}

  number = [1, 2, 3, 4, 5, 6, 7]
  user: any;
  items: any;
  itemsInfo: any[] = [];
  discount: number = 0;
  total: number = 0;
  cartTotal: number = 0;
  cartDiscount: number = 0;
  deliveryCharge: number = 0;
  cartSubtotal: number = 0;
  isempty: boolean = false;
  item: any;
  data = {
    "uid": "",
    "itemsList": {
      "productId": "",
      "quantity": 0
    }
  }

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";

  urls = {
    'cart': "http://localhost:5001/v1/consumer/cart",
    'item': "http://localhost:5001/v1/products/categories/items/item",
    'deleteitem': "http://localhost:5001/v1/consumer/cart/item",
  };

  ngOnInit(): void {

    if(this.cs_.check('role')){
      if(this.cs_.get('role') == 'farmer'){
        this.router.navigate(['/home/farmer']);
      }

    }

    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    
    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log("this.user : ");
      console.log(this.user);
      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      console.log("user uid : ");
      console.log(this.user.payload.uid)
      this.callCart(this.user.payload.uid);
    })
  }

  callCart(uid: any) {
    this.cs.getCart(uid).subscribe(
      (res) => {
        console.log("getCart called");
        console.log(res);

        if (res.payload == null) {
          this.isempty = true;
          return;
        }
        this.items = res.payload.itemsList;


        for (let x of this.items) {
          this.callItem(x.productId, x);
        }
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

  callItem(prodId: any, x: any) {
    this.cs.getItem(prodId).subscribe(
      (res) => {
        console.log("x");
        console.log(x);
        let payl = res.payload;
        payl["quantity"] = x.quantity;
        payl["productid"] = x.productId;
        let disctot = this.updateDiscTotal(payl.quantity, payl.costing, payl.baseprice);
        payl["total"] = disctot.total;
        payl["discount"] = disctot.discount;
        this.itemsInfo.push(payl);
        console.log("itemsinfo");
        console.log(this.itemsInfo);
        this.cartTotalDisc();
        //return res.payload;
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


  clickOnItem(productid: any) {
    this.router.navigate(['/item'], { queryParams: { id: productid } });
  }



  updateDiscTotal(quantity: any, costing: any, baseprice: any) {

    let total: any = 0;
    let discount: any = 0;
    for (let q of costing) {
      if (quantity <= q.quantity) {
        total = quantity * ((100 - q.discount) * baseprice / 100);
        break;
      }
      else {
        total = quantity * ((100 - q.discount) * baseprice / 100);
      }
    }
    total = Number(total.toFixed(2));
    discount = (quantity * baseprice) - total;
    discount = Number(discount.toFixed(2));
    return { "total": total, "discount": discount };

  }

  addqty(x: any) {
    this.data.uid = this.user.payload.uid;
    this.data.itemsList.productId = x.productid;
    x.quantity = x.quantity + 1
    this.data.itemsList.quantity = x.quantity;
    this.cs.postCart(this.data).subscribe(
      (res) => {
        console.log(res.message);
        let disctot = this.updateDiscTotal(x.quantity, x.costing, x.baseprice);
        x.total = disctot.total;
        x.discount = disctot.discount;
        this.cartTotalDisc();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add item qty. Please contact customer service or try again later.";
        }
      }
    );

  }

  subqty(x: any) {
    if ((x.quantity - 1) < 1) return;
    x.quantity = x.quantity - 1
    this.data.uid = this.user.payload.uid;
    this.data.itemsList.productId = x.productid;
    this.data.itemsList.quantity = x.quantity;
    this.cs.postCart(this.data).subscribe(
      (res) => {
        console.log(res.message);
        let disctot = this.updateDiscTotal(x.quantity, x.costing, x.baseprice);
        x.total = disctot.total;
        x.discount = disctot.discount;
        this.cartTotalDisc();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to subtract item qty. Please contact customer service or try again later.";
        }
      }
    );
  }

  cartTotalDisc() {
    this.cartTotal = 0;
    this.cartDiscount = 0;
    this.cartSubtotal = 0;
    for (let x of this.itemsInfo) {
      this.cartTotal = this.cartTotal + x.total;
      this.cartDiscount = this.cartDiscount + x.discount;
    }

    this.cartTotal = Number(this.cartTotal.toFixed(2));

    if (this.cartTotal == 0)
      this.deliveryCharge = 0;
    else
      this.deliveryCharge = 100;

    this.cartDiscount = Number(this.cartDiscount.toFixed(2));
    this.cartSubtotal = this.cartTotal + this.deliveryCharge;
    this.cartSubtotal = Number(this.cartSubtotal.toFixed(2));
    // console.log("total cart total " + this.cartTotal);
    // console.log("total cart discount " + this.cartDiscount);
    // console.log("total cart subtotal " + this.cartSubtotal);

    this.cs.setValueTotal(this.cartTotal);
    this.cs.setValueDiscount(this.cartDiscount);
    this.cs.setValueDelivery(this.deliveryCharge);
    this.cs.setValueSubtotal(this.cartSubtotal);
    this.cs.setValueItemsInfo(this.itemsInfo);
  }

  deleteCart() {
    // let data = {
    //   "uid" : this.user.payload.uid
    // };
    this.httpClient.delete<any>(this.urls.cart + "?uid=" + this.user.payload.uid).subscribe(
      (res) => {
        console.log("Cart Deleted");

        this.itemsInfo = [];
        this.isempty = true;
        this.cartTotalDisc();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to delete cart. Please contact customer service or try again later.";
        }
      }
    );


  }

  deleteItem(productId: any) {

    if (this.itemsInfo.length == 1)
      this.deleteCart();

    let data = {
      "uid": this.user.payload.uid,
      "productId": productId
    }
    this.httpClient.post<any>(this.urls.deleteitem, data).subscribe(
      (res) => {
        console.log(productId);
        console.log("Item Deleted");
        for (var i = 0; i < this.itemsInfo.length; i++) {
          if (this.itemsInfo[i].productid == productId) {
            this.itemsInfo.splice(i, 1);
          }
        }

        this.cartTotalDisc();

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

}

