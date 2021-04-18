import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEmail = new BehaviorSubject<any>({});

  constructor(private httpClient: HttpClient) { }

  setUserEmail(value: any){
    this.userEmail.next(value);
  }

  getUserEmail(){
    return this.userEmail.asObservable();
  }


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