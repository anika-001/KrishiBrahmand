import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']
})
export class OrdersummaryComponent implements OnInit {

  constructor(private as: AuthService, private cs: CartService, private router: Router, private httpClient: HttpClient,) { }

  cartTotal: number = 0;
  cartDiscount: number = 0;
  deliveryCharge: number = 0;
  cartSubtotal: number = 0;


  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";


  ngOnInit(): void {


    this.cs.getValueTotal().subscribe(res => {
      this.cartTotal = res;
      console.log("Order Summary Total: ", this.cartTotal);
    })

    this.cs.getValueDiscount().subscribe(res => {
      this.cartDiscount = res;
      console.log("Order Summary Discount: ", this.cartDiscount);
    })

    this.cs.getValueDelivery().subscribe(res => {
      this.deliveryCharge = res;
      console.log("Order Summary Delivery charge: ", this.deliveryCharge);
    })

    this.cs.getValueSubtotal().subscribe(res => {
      this.cartSubtotal = res;
      console.log("Order Summary Subtotal: ", this.cartSubtotal);
    })
    

  }


}
