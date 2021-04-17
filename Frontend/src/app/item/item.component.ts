import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  prodId: string = "";
  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";
  item: any;

  items: any;

  user: any;
  qty: any = 1;
  totalCost: number = 0;
  discount: number = 0;
  data = {
    "uid": "",
    "itemsList": {
      "productId": "",
      "quantity": 0
    }
  }
  urls = {
    'cart': "http://localhost:5001/v1/consumer/cart",
    'default': "http://localhost:5001/v1/products/categories/items/item",
  };

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService,
    private fb: FormBuilder,private cs: CookieService) { }

  form = this.fb.group({
    quantity: [5, Validators.required]
  })

  ngOnInit(): void {

    if(this.cs.check('role')){
      if(this.cs.get('role') == 'farmer'){
        this.router.navigate(['/home/farmer']);
      }

    }

    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user.payload.uid);
      this.data.uid = this.user.payload.uid;
      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      this.callCart(this.user.payload.uid);
    })
    this.prodId = this.route.snapshot.queryParams['id'];
    this.data.itemsList.productId = this.prodId;
    this.defaultApiCall();

  }

  defaultApiCall() {
    this.httpClient.get<any>(this.urls.default + "?id=" + this.prodId +"&uid="+this.user.payload.uid).subscribe(
      (res) => {
        console.log(res);
        this.item = res.payload;
        console.log(this.item);
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

  calcTotalCost() {
    let qty = this.qty;
    for (let q of this.item.costing) {
      //console.log(q);
      if (qty <= q.quantity) {
        this.totalCost = qty * ((100 - q.discount) * this.item.baseprice / 100);
        break;
      }
      else {
        this.totalCost = qty * ((100 - q.discount) * this.item.baseprice / 100);
      }
    }
    //this.data.itemsList.totalCost = this.totalCost;
    this.discount = Number(((qty * this.item.baseprice) - this.totalCost).toFixed(2));
    return this.totalCost.toFixed(2);
  }



  addToCart(data: any) {

    //this.data.itemsList.quantity = this.form.get('quantity')!.value;
    //console.log("Quantity value:", this.form.get('quantity')!.value);
    this.data.itemsList.quantity = this.qty;
    console.log("Quantity value:", this.qty);
    console.log("Add to cart clicked and data is:", data);
    this.httpClient.post<any>(this.urls.cart, data).subscribe(
      (res) => {
        console.log(res.message);
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

  callCart(uid: any) {
    this.httpClient.get<any>(this.urls.cart + "?uid=" + uid).subscribe(
      (res) => {

        if (res.payload == null) {
          return;
        }

        this.items = res.payload.itemsList;
        //console.log("cart items");
        //console.log(this.items);
        for (let x of this.items) {
          if (this.prodId == x.productId) {
            this.qty = x.quantity;
            console.log(this.qty);
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
          this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
        }
      }
    );

  }

  addQty() {
    this.qty = this.qty + 1;
    this.calcTotalCost();
  }

  subQty() {
    if (this.qty == 1)
      return;
    this.qty = this.qty - 1;
    this.calcTotalCost();
  }

}
