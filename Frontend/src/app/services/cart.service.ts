import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  private total = new BehaviorSubject<number>(0);
  private discount = new BehaviorSubject<number>(0);
  private delivery = new BehaviorSubject<number>(0);
  private subtotal = new BehaviorSubject<number>(0);
  private selectedDeliveryAddress = new BehaviorSubject<any>({});
  private itemsInfo = new BehaviorSubject<any>({});

  setValueItemsInfo(value: any){
    this.itemsInfo.next(value);
  }

  getValuesItemsInfo(){
    return this.itemsInfo.asObservable();
  }

  setValueSDA(value: any){
    this.selectedDeliveryAddress.next(value);
  }

  getValueSDA(){
    return this.selectedDeliveryAddress.asObservable();
  }
  
  setValueTotal(value: any){
    this.total.next(value);
  }

  getValueTotal(){
    return this.total.asObservable();
  }

  setValueDiscount(value: any){
    this.discount.next(value);
  }

  getValueDiscount(){
    return this.discount.asObservable();
  }

  setValueDelivery(value: any){
    this.delivery.next(value);
  }

  getValueDelivery(){
    return this.delivery.asObservable();
  }

  setValueSubtotal(value: any){
    this.subtotal.next(value);
  }

  getValueSubtotal(){
    return this.subtotal.asObservable();
  }

  getCart(uid: any){
    return this.httpClient.get<any>("http://localhost:5001/v1/consumer/cart" + "?uid=" + uid);
  }

  getItem(prodId: any){
    return this.httpClient.get<any>("http://localhost:5001/v1/products/categories/items/item"+ "?id=" + prodId);
  }

  postCart(data: any){
    return this.httpClient.post<any>("http://localhost:5001/v1/consumer/cart", data)
  }


}
