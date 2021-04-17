import * as express from 'express';


import { Validator } from '../support/Validator';
import { UsersModel } from '../ViewModels/UsersModel';
import { I0_1, I0_2, I0_3, I0_4, I0_5, I12,} from '../support/Interfaces';
import { middleware } from '../support/Middlewares';


class UsersCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    UsersCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/login')
      .post(middleware.passportauthenticatemiddleware, UsersCntrlr.login);

    router.route('/registration')
      .post(Validator.validate, UsersCntrlr.registration);

    router.route('/enableuser')
      .post(Validator.validate, UsersCntrlr.enableUser);

    router.route('/changepassword')
      .post(Validator.validate, UsersCntrlr.changepassword);

    router.route('/logout')
      .post(Validator.validate, UsersCntrlr.logout);

    router.route('/user')
      .get(Validator.validate, UsersCntrlr.getUser);

    router.route('/profile')
      .get(Validator.validate, UsersCntrlr.getProfile);

    router.route('/address')
      .get(Validator.validate, UsersCntrlr.getAddress);

    router.route('/address')
      .post(Validator.validate, UsersCntrlr.postAddress);

  }

  /**
  * The method Login. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static login(req: express.Request, res: express.Response): void {
    console.log('postLogin -', req.url);
    let body: I0_1 = req.body;

    let resp = UsersModel.login(body);
    let statusCode: any;
    if (resp.statusCode == 0) statusCode = 200;
    else if (resp.statusCode == 1) statusCode = 200;
    else if (resp.statusCode == 2) statusCode = 500;
    else if (resp.statusCode == 3) statusCode = 401;
    res.status(statusCode).send(resp);
  }

  /**
  * The method Registration. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static registration(req: express.Request, res: express.Response): void {
    console.log('postRegistration -', req.url);
    let body: I0_2 = req.body;

    UsersModel.registration(body).then(resp => {
      let statusCode: any;
      if (resp.statusCode == 0) statusCode = 200;
      else if (resp.statusCode == 1) statusCode = 200;
      res.status(statusCode).send(resp);
    })
      .catch(resp => {
        let statusCode: any;
        if (resp.statusCode == 2) statusCode = 500;
        else if (resp.statusCode == 3) statusCode = 401;
        res.status(statusCode).send(resp);
      });
  }

  /**
* The method Changepassword. undefined
*
* @param req of type express.Request
* @param res of type express.Response
* @returns void
*/
  public static enableUser(req: express.Request, res: express.Response): void {
    console.log('postEnableUser-', req.url);
    let body: I0_3 = req.body;

    let resp = UsersModel.enableUser(body).then(resp => {
      let statusCode: any;
      if (resp.statusCode == 0) statusCode = 200;
      else if (resp.statusCode == 1) statusCode = 200;
      res.status(statusCode).send(resp);
    })
      .catch(resp => {
        let statusCode: any;
        if (resp.statusCode == 2) statusCode = 500;
        else if (resp.statusCode == 3) statusCode = 401;
        res.status(statusCode).send(resp);
      });
  
  }

   /**
  * The method Changepassword. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
 public static changepassword(req: express.Request, res: express.Response): void {
  console.log('postChangepassword -', req.url);
  let body: I0_4 = req.body;

  UsersModel.changepassword(body).then(resp => {
    let statusCode: any;
    if (resp.statusCode == 0) statusCode = 200;
    else if (resp.statusCode == 1) statusCode = 200;
    res.status(statusCode).send(resp);
  })
    .catch(resp => {
      let statusCode: any;
      if (resp.statusCode == 2) statusCode = 500;
      else if (resp.statusCode == 3) statusCode = 401;
      res.status(statusCode).send(resp);
    });
}

  /**
  * The method Logout. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static logout(req: express.Request, res: express.Response): void {
    console.log('postLogout -', req.url);
    console.log(req.user);
    req.logOut();
    req.session.destroy(function(err){
      if(err) { res.status(500).send({ "statusCode": 2, "message": "Server error."});}
      else {res.status(200).send({ "statusCode": 0, "message": "Logged out."});}
    }); 
    
  }

  /**
  * The method getUser. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getUser(req: express.Request, res: express.Response): void {
    console.log('getUser -', req.url);
    console.log(req.user)
    if(req.user) res.status(200).send({ "statusCode": 0, "message": "", "payload": req.user});
    else res.status(200).send({ "statusCode": 0, "message": "", "payload": "Unauthorized"});
  }

  /**
  * The method getProfile. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getProfile(req: express.Request, res: express.Response): void {
    console.log('getProfile -', req.url);
    let id: string = req.query.uid?.toString()!;
    console.log("id =", id); // TODO Delete this later
    //let body: I12 = req.body;

    UsersModel.getProfile(id).then(resp => {
      let statusCode: any;
      if (resp.statusCode == 0) statusCode = 200;
      else if (resp.statusCode == 1) statusCode = 200;
      res.status(statusCode).send(resp);
    })
      .catch(resp => {
        let statusCode: any;
        if (resp.statusCode == 2) statusCode = 500;
        else if (resp.statusCode == 3) statusCode = 401;
        res.status(statusCode).send(resp);
      });
  }

  public static getAddress(req: express.Request, res: express.Response): void {
    console.log('getAddress -', req.url);
    let id: string = req.query.uid?.toString()!;
    console.log("id =", id); // TODO Delete this later
    //let body: I12 = req.body;

    UsersModel.getAddress(id).then(resp => {
      let statusCode: any;
      if (resp.statusCode == 0) statusCode = 200;
      else if (resp.statusCode == 1) statusCode = 200;
      res.status(statusCode).send(resp);
    })
      .catch(resp => {
        let statusCode: any;
        if (resp.statusCode == 2) statusCode = 500;
        else if (resp.statusCode == 3) statusCode = 401;
        res.status(statusCode).send(resp);
      });
  }

  public static postAddress(req: express.Request, res: express.Response): void {
    console.log('postAddress -', req.url);
    let body: I0_5 = req.body;

    UsersModel.postAddress(body).then(resp => {
      let statusCode: any;
      if (resp.statusCode == 0) statusCode = 200;
      else if (resp.statusCode == 1) statusCode = 200;
      res.status(statusCode).send(resp);
    })
      .catch(resp => {
        let statusCode: any;
        if (resp.statusCode == 2) statusCode = 500;
        else if (resp.statusCode == 3) statusCode = 401;
        res.status(statusCode).send(resp);
      });
  }

}


export let userscntrlr = new UsersCntrlr();


