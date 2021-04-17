import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilldbentryService {

  constructor(private httpClient: HttpClient) { }

  filldb(data: any){
    return this.httpClient.post<any>("http://localhost:5001/v1/products/product", data);
  }


}
