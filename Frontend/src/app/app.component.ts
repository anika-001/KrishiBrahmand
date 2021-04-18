import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Container, Main } from 'tsparticles';
import { MatSidenav } from '@angular/material/sidenav';



export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

  id = "tsparticles";

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
  userEmail:any;

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

    this.as.getUserEmail().subscribe(res => {
      this.userEmail = res;
      console.log("User Email");
      console.log(this.userEmail)
    })

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

  particlesOptions = {
    background: {
      color: {
        value: "rgb(54, 106, 86)"
      },
      image: "radial-gradient(#d9d7ca, #3c8d93)"
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        //value: "#ffffff"
        value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"]
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "spiral"
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }
}

//kommunicate
