import { I0_1, I0_2, I0_3, I0_4, I0_5, IGetResponse, IPostResponse } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import { account } from '../DatabaseSchemaModels/Account';
import { tempusers } from '../DatabaseSchemaModels/TempUsers';
import * as bcrypt from 'bcrypt';
import { users } from '../DatabaseSchemaModels/UserData';
import { keys } from '../support/Keys';
import { EmailserviceModel } from './EmailserviceModel';
import { address } from '../DatabaseSchemaModels/Address';
import { DatabaseOperations } from '../support/DatabaseOperations';


export class UsersModel {

  public static validatepassword(password: String, userpass: String): Promise<Boolean> {
    //validate hash and input passwords
    return bcrypt.compare(String(password), String(userpass));
  }

  public static hashpassword(password: string): Promise<String> {
    //hash password logic function
    return bcrypt.hash(password, 10);
  }

  public static iffarmer() {
    return true
  }

  public static login(body: I0_1): IPostResponse {
    return { "statusCode": 0, "message": "Logged in!" };
  }

  public static authenticate(email: String, password: String, done: Function) {
    let Varuser: any;
    DatabaseOperations.FindOneOp(tempusers, { "email": email })
      .then((val: any) => { if (val) {done("Please verify email", false); return Promise.reject("Early return")} else { return DatabaseOperations.FindOneOp(account, { 'email': email }) } })
      .then((user) => { if (!user) {done("User not found with given username", false); return Promise.reject("Early return")} else { Varuser = user; return UsersModel.validatepassword(password, user.password) } })
      .then((val) => { if (val) {done(null, Varuser); return Promise.reject("Early return")} else { done("Invalid password", false); return Promise.reject("Early return")} })
      .catch(e => { if(e != "Early return") return done(e); })
  }

  public static registrationCopy(body: I0_2): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      DatabaseOperations.FindOneOp(users, { 'email': body.email })
        .then((val) => { if (val) return resolve({ "statusCode": 1, "message": "User with the given username already exists" }); else { return DatabaseOperations.FindOneOp(tempusers, { 'email': body.email }) } })
        .then((val) => {
          if (val) resolve({ "statusCode": 1, "message": "Please verify email" });
          if (!UsersModel.iffarmer() && body.role == "farmer") resolve({ "statusCode": 1, "message": "Farmer Verification Failed" });
          else return UsersModel.hashpassword(String(body.password)); 
        })
        .then((hashed) => { body.password = String(hashed); return DatabaseOperations.SaveOp(tempusers, body) })
        .then((val) => { return EmailserviceModel.sendemail(String(body.email), "Please verify your email.", "Hi user! \n Welcome to Krishi Brahmand \n Please click on the link below to verify your email.", "http://localhost:4200/verifyemail", keys.serverkeys.Secretemail) })
        .then((val) => { resolve({ "statusCode": 0, "message": "Saved!" }); })
        .catch(e => {
          reject({ "statusCode": 2, "message": e });
        })
    })
  }

  public static enableUserCopy(body: I0_3): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      let userdeets: any; let id: String; let tempid: String;
      let token = EmailserviceModel.decodetoken(body.token, keys.serverkeys.Secretemail);
      if (Math.floor(token.time / 1000) <= 600) {
        DatabaseOperations.FindOneOp(tempusers, { 'email': token.email })
          .then((user) => {
            if (!user) resolve({ "statusCode": 1, "message": "Invalid user" });
            let temp = JSON.parse(JSON.stringify(user)); delete temp._id; delete temp.__v; userdeets = temp; tempid = user._id;
            return DatabaseOperations.SaveOp(users, userdeets);
          })
          .then((val) => { id = val._id; return DatabaseOperations.SaveOp(account, { uid: val._id, email: userdeets.email, password: userdeets.password }); })
          .then((val) => { return DatabaseOperations.SaveOp(address, { uid: id, defaultaddress: { address: userdeets.address, state: userdeets.state, district: userdeets.district, pincode: userdeets.pincode } }) })
          .then(val => { if (val) return DatabaseOperations.FindandDeleteOneOp(tempusers, { _id: tempid }); })
          .then((val) => { return resolve({ "statusCode": 0, "message": "Success" }); })
          .catch(e => {
            reject({ "statusCode": 2, "message": e });
          })
      }
      else return resolve({ "statusCode": 1, "message": "Invalid token or Token Expired!" });
    })
  }

  public static changepasswordCopy(body: I0_4): Promise<IPostResponse> {

    return new Promise((resolve, reject) => {
      let token = EmailserviceModel.decodetoken(body.token, keys.serverkeys.Secretpassword);
      if (Math.floor(token.time / 1000) <= 600) {
        UsersModel.hashpassword(String(body.password))
          .then((hashed) => { return DatabaseOperations.UpdateOneOp(account, { 'email': token.email }, { password: hashed }) })
          .then((val) => { resolve({ "statusCode": 0, "message": "Password changed" }); })
          .catch(e => { return reject({ "statusCode": 2, "message": e }); })
      }

      else resolve({ "statusCode": 1, "message": "Invalid token or Token Expired!" });
    })
  }

  public static getAddressCopy(uid: string): Promise<IGetResponse> {
    return new Promise((resolve, reject) => {
      DatabaseOperations.FindOneOp(address, { uid: uid })
        .then(res => { if (res == null) resolve({ "statusCode": 3, "message": "User unauthorized", "payload": null }); else resolve({ "statusCode": 0, "message": "Address", "payload": res }); })
        .catch(e => { reject({ "statusCode": 2, "message": e, "payload": "" }); })
    })
  }

  public static getProfileCopy(uid: string): Promise<IGetResponse> {
    return new Promise((resolve, reject) => {
      DatabaseOperations.FindOneOp(users, { _id: uid })
        .then(res => { if (res == null) resolve({ "statusCode": 3, "message": "User unauthorized", "payload": null }); else resolve({ "statusCode": 0, "message": "User found", "payload": res }); })
        .catch(e => { return reject({ "statusCode": 2, "message": e, "payload": "" }); })
    })
  }

  public static postAddressCopy(body: I0_5): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      DatabaseOperations.UpdateOneOp(address, {uid: body.uid}, { $push: { createnewaddress: body.newaddress } })
      .then(res => {if (res == null) resolve({ "statusCode": 3, "message": "User unauthorized" }); else resolve({ "statusCode": 0, "message": "Address posted" })})
      .catch(e => {reject({ "statusCode": 2, "message": e });})
    })
  }

  /* *****Extra Functions***** */

  public static userenabled(useremail: String): Promise<any> {
    // check in users db if user exists
    return new Promise((resolve, reject) => {
      users.findOne({ 'email': useremail }).then(user => {
        if (user) resolve(user);
        else resolve(false);
      })
        .catch(e => {
          reject(false);
        })
    });
  }

  public static userdisabled(username: String): Promise<any> {

    // check in temp db if user exists but has not verfied
    return new Promise((resolve, reject) => {
      tempusers.findOne({ 'email': username }).then(user => {
        if (user) resolve(user);
        else resolve(false);
      })
        .catch(e => {
          reject(false);
        })
    });
  }


  public static authenticateCopy(email: String, password: String, done: Function) {
    //Check if user has verified email
    tempusers.findOne({ "email": email })
      .then(val => {
        if (val) return done("Please verify email", false);
        else {
          account.findOne({ 'email': email }).then(retuser => {
            let user: any = retuser;
            // Username does not exist, log the error and redirect back
            if (!user) {
              return done("User not found with given username", false);
            }

            //Match Password hash
            UsersModel.validatepassword(password, user.password).then(val => {
              if (val == true) {
                return done(null, user);
              }

              else {
                return done("Invalid password", false);
              }
            })
              .catch(e => {
                return done(e);
              })
          })
            .catch(e => {
              return done(e, false);

            })
        }
      })
      .catch(e => {
        return done(e);
      });
  }


  public static temporarytoactive(userdeets: any): Promise<any> {
    //copy users to the users collection from the temporary collection to activate users
    return new Promise((resolve, reject) => {
      //userdeets["_id"] = "60462ac253ded793a434ab94";
      //userdeets["_id"] = "6045f3208d38e13d902e844e";
      let user = new users(userdeets);
      user.save().then(val => {
        let user = new account({ uid: val._id, email: userdeets.email, password: userdeets.password });
        user.save().then(vall => {
          let add = new address({ uid: val._id, defaultaddress: { address: userdeets.address, state: userdeets.state, district: userdeets.district, pincode: userdeets.pincode } });
          add.save().then(val => {
            resolve(val)
          }).catch(e => {
            reject(e)
          })
        })
          .catch(e => {
            reject(e);
          })

      })
        .catch(e => {
          reject(e);
        })
    })
  }

  /**
  * The method Login. undefined
  *
  * @param body of type I0_1
  * @returns IPostResponse
  */


  /**
  * The method Registration. Adds user to temporary database.
  *
  * @param body of type I0_2
  * @returns IPostResponse
  */


  public static registration(body: I0_2): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      // Check if user has already registered
      UsersModel.userenabled(String(body.email)).then(val => {
        if (val) resolve({ "statusCode": 1, "message": "User with the given username already exists" });
        else {
          // Check if user has registered but not verified email
          UsersModel.userdisabled(String(body.email)).then(val => {
            if (val) resolve({ "statusCode": 1, "message": "Please verify email" });
            else {
              //Verify if farmer
              if (!UsersModel.iffarmer() && body.role == "farmer") resolve({ "statusCode": 1, "message": "Farmer Verification Failed" });
              // If user has never registered, hash password
              UsersModel.hashpassword(String(body.password)).then(hashed => {
                body.password = String(hashed);
                let user = new tempusers(body);
                // Store user data in temporary account collection
                user.save().then(val => {
                  //send verification mail
                  EmailserviceModel.sendemail(String(body.email), "Please verify your email.", "Hi user! \n Welcome to Krishi Brahmand \n Please click on the link below to verify your email.", "http://localhost:4200/verifyemail", keys.serverkeys.Secretemail)
                    .then(info => {
                      resolve({ "statusCode": 0, "message": "Saved!" });
                    })
                    .catch(e => {
                      reject({ "statusCode": 2, "message": e });
                    })
                })
                  .catch(e => {
                    reject({ "statusCode": 2, "message": e });
                  })
              })
                .catch(e => {
                  reject({ "statusCode": 2, "message": e });
                })
            }
          })
            .catch(e => {
              reject({ "statusCode": 2, "message": e });
            })
        }
      })
        .catch(e => {
          reject({ "statusCode": 2, "message": e });
        })

    })
  }

  /**
  * The method getStates. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */




  public static enableUser(body: I0_3): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      let token = EmailserviceModel.decodetoken(body.token, keys.serverkeys.Secretemail);
      if (Math.floor(token.time / 1000) <= 600) {

        //Check if user in temporary db
        UsersModel.userdisabled(token.email).then(user => {
          if (!user) {
            return resolve({ "statusCode": 1, "message": "Invalid user" });
          }

          else {

            let temp = JSON.parse(JSON.stringify(user));
            delete temp._id;
            delete temp.__v;
            let userdeets = temp;

            //Store user in final database
            UsersModel.temporarytoactive(userdeets).then(val => {
              if (val) {
                //Delete user from temporary database
                tempusers.findByIdAndDelete(user._id).then(val => {
                  return resolve({ "statusCode": 0, "message": "Success" });
                })
                  .catch(e => {
                    reject({ "statusCode": 2, "message": e });;
                  })
              }
            })
              .catch(e => {
                reject({ "statusCode": 2, "message": e });
              })
          }
        })
          .catch(e => {
            reject({ "statusCode": 2, "message": e });
          })
      }

      else {
        return resolve({ "statusCode": 1, "message": "Invalid token or Token Expired!" })
      }
    })
  }

  /**
      * The method Changepassword. undefined
      *
      * @param body of type any
      * @returns IPostResponse
      */


  public static changepassword(body: I0_4): Promise<IPostResponse> {

    return new Promise((resolve, reject) => {
      let token = EmailserviceModel.decodetoken(body.token, keys.serverkeys.Secretpassword);

      if (Math.floor(token.time / 1000) <= 600) {
        // Hash and store password
        UsersModel.hashpassword(String(body.password)).then(hashed => {
          account.updateOne({ 'email': token.email }, {
            password: hashed
          }).then(val => {
            return resolve({ "statusCode": 0, "message": "Password changed" });
          }).catch(e => {
            return reject({ "statusCode": 2, "message": e });
          })
        }).catch(e => {
          return reject({ "statusCode": 2, "message": e });
        })

      }

      else {
        return resolve({ "statusCode": 1, "message": "Invalid token or Token Expired!" })
      }
    })

  }

  /**
  * The method Logout. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */

  /**
  * The method getUser. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */

  /**
  * The method getProfile. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */


  public static getProfile(uid: string): Promise<IGetResponse> {

    return new Promise((resolve, reject) => {
      users.findById(uid).then(res => {
        if (res == null) {
          return resolve({ "statusCode": 3, "message": "User unauthorized", "payload": null });
        }
        else {
          return resolve({ "statusCode": 0, "message": "User found", "payload": res });
        }
      })
        .catch(e => {
          return reject({ "statusCode": 2, "message": e, "payload": "" });
        })
    })
  }



  public static getAddress(uid: string): Promise<IGetResponse> {

    return new Promise((resolve, reject) => {
      address.findOne({ uid: uid }).then(res => {
        if (res == null) {
          return resolve({ "statusCode": 3, "message": "User unauthorized", "payload": null });
        }
        else {
          return resolve({ "statusCode": 0, "message": "Address", "payload": res });
        }
      })
        .catch(e => {
          return reject({ "statusCode": 2, "message": e, "payload": "" });
        })
    })
  }

  public static postAddress(body: I0_5): Promise<IPostResponse> {

    return new Promise((resolve, reject) => {
      address.updateOne({ uid: body.uid }, { $push: { createnewaddress: body.newaddress } }).then(res => {
        if (res == null) {
          return resolve({ "statusCode": 3, "message": "User unauthorized" });
        }
        else {
          return resolve({ "statusCode": 0, "message": "Address posted" });
        }
      })
        .catch(e => {
          return reject({ "statusCode": 2, "message": e });
        })
    })
  }

}


export let usersmodel = new UsersModel();


