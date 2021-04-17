import { I1_1, IPostResponse } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import * as nm from 'nodemailer';
import * as Base64 from 'crypto-js/enc-base64';
import * as CJS from 'crypto-js';
import { UsersModel } from './UsersModel';
import { keys } from '../support/Keys';


export class EmailserviceModel {


  public static sendemail(email: string, message: string, body: string, felink: string, key: string): Promise<any> {

    var token = Base64.stringify(CJS.enc.Utf8.parse(CJS.AES.encrypt(email + "???" + Date.now(), key).toString()));

    var link = felink + "?token=" + token;
    var transporter = nm.createTransport({
      service: 'gmail',
      auth: {
        user: 'projecthts.16.4@gmail.com',
        pass: 'hts_project16'
      }
    });

    var mailOptions = {
      from: 'projecthts.16.4@gmail.com',
      to: String(email),
      subject: message,
      html: "Hello,<br>" + body + "<br><div style = \" background-color: #FFF4F4; display: flex; justify-content: center; \"><a href=" + link + " style = \" font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; padding: 2%; background-color: black; margin: 5%; margin-left: 45%; border-radius: 5px; color: white; font-weight: bold; align-self: center; font-size: 150%; \">Click here</a></div>"
    };

    return transporter.sendMail(mailOptions);
  }

  public static decodetoken(token: string, key: string): { email: String, time: number } {
    let decoded = CJS.enc.Utf8.stringify(CJS.enc.Base64.parse(token));
    let detoken = CJS.AES.decrypt(decoded, key).toString(CJS.enc.Utf8);
    let tokens = detoken.split("???");
    let email = tokens[0];
    let time = Date.now() - Number(tokens[1]);
    return ({ email: email, time: time })
  }

  /**
  * The method addEmailservice. undefined
  *
  * @param body of type any
  * @returns IResponse
  */
  public static addEmailservice(body: I1_1): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      UsersModel.userenabled(body.email).then(useren => {
        UsersModel.userdisabled(body.email).then(userdis => {
          if (body.type === "emailver") {
            if (useren) {
              resolve({ "statusCode": 1, "message": "User has already verified email." });
            }
            else {
              if (userdis) {
                EmailserviceModel.sendemail(body.email, "Please verify your email.", "Hi user! \n Welcome to Krishi Brahmand \n Please click on the link below to veryfiy your email.", "http://localhost:4200/verifyemail", keys.serverkeys.Secretemail).then(info => {
                  resolve({ "statusCode": 0, "message": "Email to verify email sent successfully." });
                }).catch(e => {
                  reject({ "statusCode": 2, "message": e });
                })
              }
              else {
                resolve({ "statusCode": 1, "message": "User does not exist." });
              }
            }
          }

          if (body.type === "forgotpass") {
            if (userdis) {
              resolve({ "statusCode": 1, "message": "Please verify email" });
            }
            else {
              if (useren) {
                EmailserviceModel.sendemail(body.email, "Reset Password", "Hi user! \n Welcome to Krishi Brahmand \n Please click on the link below to reset your password.", "http://localhost:4200/resetPassword", keys.serverkeys.Secretpassword).then(info => {
                  resolve({ "statusCode": 0, "message": "Email to reset password sent successfully." });
                }).catch(e => {
                  console.log("cannot send mail")
                  reject({ "statusCode": 2, "message": e });
                })
              }
              else {
                resolve({ "statusCode": 1, "message": "User does not exist." });
              }
            }
          }

        }).catch(e => {
          reject({ "statusCode": 2, "message": e });
        })

      }).catch(e => {
        reject({ "statusCode": 2, "message": e });
      })

    })


    //let resp: IPostResponse = { "statusCode": StatusCodes.INTERNAL_SERVER_ERROR, "message": "NOT IMPLEMENTED" };


    //return resp;
  }


}




export let emailservicemodel = new EmailserviceModel();


