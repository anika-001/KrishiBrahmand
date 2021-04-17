import * as express from 'express';


import { Validator } from '../support/Validator';
import { FarmersModel } from '../ViewModels/FarmersModel';
import { I16 } from '../support/Interfaces';


class FarmersCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    FarmersCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/farmer/shipments')
      .get(Validator.validate, FarmersCntrlr.getShipments);
    // router.route('/farmer/address')
    //   .post(Validator.validate, FarmersCntrlr.postAddress);

  }

  /**
  * The method getShipments. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getShipments(req: express.Request, res: express.Response): void {
    console.log('getShipments -', req.url);
    let id: string = req.query.id?.toString()!;
    // console.log("farmer =", farmer); // TODO Delete this later
    // let body: I16 = req.body;

    FarmersModel.getShipments(id).then(resp => {
      res.status(200).send(resp);
  })
      .catch(resp => {
          res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

}


export let farmerscntrlr = new FarmersCntrlr();


