import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import firebase from 'firebase/app';
import 'firebase/auth'
import { PhoneNumber } from '../phone-number';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-phone-ver',
  templateUrl: './phone-ver.component.html',
  styleUrls: ['./phone-ver.component.scss']
})



export class PhoneVerComponent implements OnInit {

  //;

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string = "";

  user: any;

  recaptchaWidgetId: any;

  constructor(private win: WindowService, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    //console.log(this.windowRef);
    //firebase.initializeApp(environment.firebaseConfig, 'Krishi Bazaar');

    var hc = this.httpClient;
    //firebase.auth().settings.appVerificationDisabledForTesting = true;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
    {
      'size': 'invisible',
      'callback': function(response: any) {
        console.log(response + "nnn");
        // reCAPTCHA solved - will proceed with submit function
      },
      'expired-callback': function() {
        // Reset reCAPTCHA?
      }
    }
    );
  
    // 

    this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
      this.recaptchaWidgetId = widgetId;
      console.log(widgetId);
    });

    //this.windowRef.grecaptcha.render(this.windowRef.recaptchaVerifier);

  }

  returnConfirmationCode = (): Promise<firebase.auth.UserCredential> => {
    return this.windowRef.confirm(this.verificationCode);
  }

  sendLoginCode() {
    console.log(firebase.auth) // Undefined

    const appVerifier = this.windowRef.recaptchaVerifier;

    console.log(appVerifier.getResponse(this.recaptchaWidgetId));
    const num = "+919967031549";

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));

  }

  verifyLoginCode() {
    this.returnConfirmationCode()
      .then(result => {

        this.user = result.user;

      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  onSignInSubmit() {

    //var recaptchaResponse = grecaptcha.getResponse(this.recaptchaWidgetId);

    //this.windowRef.grecaptcha.render(this.windowRef.recaptchaVerifier);
    //console.log(recaptchaResponse);
    var data = {
      //"recaptchaToken": recaptchaResponse,
      "phoneNumber": "+919967031549",
    //     // Error; SMS not sent
    //     // ...
    //   });
    // // [END auth_phone_signin]
    }


    const appVerifier = this.windowRef.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber("99999999999", appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));
    }


}
