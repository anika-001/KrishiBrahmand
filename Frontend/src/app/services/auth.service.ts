import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getUser(){
    return this.httpClient.get<any>("http://localhost:5001/v1/users/user", {withCredentials: true});
  }

  logout(){
    return this.httpClient.post<any>("http://localhost:5001/v1/users/logout", {}, {withCredentials: true});
  }

  getProfile(uid:any){
    return this.httpClient.get<any>("http://localhost:5001/v1/users/profile" + "?uid=" + uid);
  }

}