import * as express from 'express';


import { Validator } from '../support/Validator';
import { ProductsModel } from '../ViewModels/ProductsModel';
import { I13, I14, I15, I3_0 } from '../support/Interfaces';


class ProductsCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    ProductsCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/categories')
      .get(Validator.validate, ProductsCntrlr.getCategories);

    router.route('/categories/items/items')
      .get(Validator.validate, ProductsCntrlr.getItems);

    router.route('/categories/items/item')
      .get(Validator.validate, ProductsCntrlr.getItem);

    router.route('/categories/items/filteritems')
      .get(Validator.validate, ProductsCntrlr.getFilterItems);

    router.route('/product')
      .post(Validator.validate, ProductsCntrlr.addProduct);

  }

  /**
  * The method getCategories. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getCategories(req: express.Request, res: express.Response): void {
    //console.log('getCategories -', req.url);
    let body: I13 = req.body;

    let resp = ProductsModel.getCategories(req.body);
    //res.status(resp.status).send(resp.data);
  }

  /**
  * The method getItems. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getItems(req: express.Request, res: express.Response): void {
    console.log('getItems -', req.url);
    let id: string = req.query.id?.toString()!;
    let uid: string = req.query.uid?.toString()!;
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getItems(id, uid).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  public static getFilterItems(req: express.Request, res: express.Response): void {
    //console.log('getFilterItems -', req.url);
    let id: Array<any> = [];
    if (Array.isArray(req.query.id!)) { id = req.query.id! }
    else { id = [req.query.id!.toString()] }
    //let id: string[] = req.query.id!.map();
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getFilterItems(id, req.query.uid?.toString()).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  public static getItem(req: express.Request, res: express.Response): void {
    //console.log('getItem -', req.url);
    let id: string = req.query.id?.toString()!;
    let uid: string = req.query.uid?.toString()!;
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getItem(id, uid).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  /**
  * The method addProduct. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static addProduct(req: express.Request, res: express.Response): void {
    //console.log('postProduct -', req.url);
    let body: I3_0 = req.body;

    ProductsModel.addProduct(body).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });;
  }

}


export let productscntrlr = new ProductsCntrlr();


