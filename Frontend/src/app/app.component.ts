import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  x: boolean = true;
  opened: boolean = false;
  user: any;
  title = 'Krishi-Bazaar';
  error500: boolean = false;
  selectedRole: string = "";
  //consumeron: boolean = false;
  subscription: Subscription;
  //private role = new BehaviorSubject<string>("");
  show: Boolean = false;

  constructor(private as: AuthService, private router: Router, private cookieService: CookieService) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  // setValuerole(value: any)
  // {
  //   this.role.next(value);
  // }

  // getValuerole(){
  //   return this.role.asObservable();
  // }

  setShow(val: Boolean) {
    this.show = val;
  }

  setSelectedRole(val: string) {
    this.selectedRole = val;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    (function (d, m) {
      var kommunicateSettings = { "appId": "19d8672dfe4946903ad4557af8f048e6b", "popupWidget": true, "automaticChatOpenOnNavigation": true };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});

    // this.getValuerole().subscribe(res => {
    //   if(res == "consumeron"){
    //     this.consumeron = true;
    //   }
    //   else{
    //     this.selectedRole = res;
    //     this.consumeron = false;
    //     if(res == "farmer"){
    //       this.router.navigate(['/home/farmer'])
    //     }
    //   }
    // })

    if (this.cookieService.check('role')) {
      if (this.cookieService.get('role') == 'farmer') {
        this.selectedRole = "farmer";
        this.show = true;
      }

      if (this.cookieService.get('role') == 'consumer') {
        this.selectedRole = "consumer";
        this.show = true;
      }

      if (this.cookieService.get('role') == 'consumeronly') {
        this.show = false;
      }

    }
    // else{
    //   this.cookieService.set( 'role', 'consumer' );
    // }
    // console.log(this.auth)
    // this.auth.getUserState()
    //   .subscribe(user => {
    //     this.user = user;
    //   });
    //   (function(d, m){
    //     var kommunicateSettings = 
    //         {"appId":"33cc8c1dd547d6c935ffd8618edbe661d","popupWidget":true,"automaticChatOpenOnNavigation":true};
    //     var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    //     var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    //     (window as any).kommunicate = m; m._globals = kommunicateSettings;
    // })(document, (window as any).kommunicate || {});
  }


  logout() {
    this.as.logout().subscribe(
      (res) => {
        //console.log(res);
        //console.log(this.cs.);
        // this.cs.delete('connect.sid', '/');
        this.cookieService.delete('role', '/');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        this.error500 = true;
      }
    )
  }

  changeroletofarmer() {

    this.cookieService.delete('role', '/');
    this.cookieService.set('role', 'farmer', { path: '/' });
    // if(this.selectedRole == 'farmer');

    //this.setValuerole("farmer");
    this.router.navigate(['/home/farmer']);

    // }

    // if(this.selectedRole == 'consumer'){
    //   this.cookieService.set( 'role', 'consumer' );
    //   //this.setValuerole("consumer");
    //   this.router.navigate(['/home']);

    // }

  }

  changeroletoconsumer() {
    this.cookieService.delete('role', '/');
    this.cookieService.set('role', 'consumer', { path: '/' });
    //this.setValuerole("consumer");
    this.router.navigate(['/home']);
  }
}

//kommunicate
