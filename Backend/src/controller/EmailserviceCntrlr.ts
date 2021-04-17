import * as express from 'express';


import { Validator } from '../support/Validator';
import { EmailserviceModel } from '../ViewModels/EmailserviceModel';
import { I1_1 } from '../support/Interfaces';


class EmailserviceCntrlr {

public router: express.Router = express.Router();

/**
* The method constructor. Constructor
*
*/
public constructor() {
EmailserviceCntrlr.setRouterMiddleWare(this.router);
}

/**
* The method setRouterMiddleWare. 
*
* @param router of type express.Router
* @returns void
*/
public static setRouterMiddleWare(router: express.Router): void {
router.route('/')
.post(Validator.validate, EmailserviceCntrlr.addEmailservice);

}

/**
* The method addEmailservice. undefined
*
* @param req of type express.Request
* @param res of type express.Response
* @returns void
*/
public static addEmailservice(req: express.Request,res: express.Response): void {
console.log('postEmailservice -', req.url);
let body: I1_1 = req.body;

EmailserviceModel.addEmailservice(body).then(resp => {
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
    });;
//res.status(resp.statusCode).send(resp.message);
}

}


export let emailservicecntrlr = new EmailserviceCntrlr();


