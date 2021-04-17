import * as express from 'express';
import { I4_0, I4_1, I4_2} from '../support/Interfaces';

import { Validator } from '../support/Validator';
import { ConsumerModel } from '../ViewModels/ConsumerModel';

class ConsumerCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        ConsumerCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/')

        router.route('/cart')
            .post(Validator.validate, ConsumerCntrlr.addCart)
            .get(Validator.validate, ConsumerCntrlr.getCart)
            .delete(Validator.validate, ConsumerCntrlr.deleteCart);

        router.route('/cart/item')
            .post(Validator.validate, ConsumerCntrlr.deleteCartItem)
        
        router.route('/order')
        .post(Validator.validate, ConsumerCntrlr.postOrder)

        router.route('/orders')
        .get(Validator.validate, ConsumerCntrlr.getOrders)

    }

    public static addCart(req: express.Request, res: express.Response): void {
        //console.log('postCart -', req.url);
        let body: I4_0 = req.body;

        ConsumerModel.addCart(body).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static getCart(req: express.Request, res: express.Response): void {
        //console.log('getCart -', req.url);
        //let body: I3_0 = req.body;
        let id: string = req.query.uid?.toString()!;
        ConsumerModel.getCart(id).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static deleteCart(req: express.Request, res: express.Response): void {
        //console.log('deleteCart -', req.url);
        let id: string = req.query.uid?.toString()!;
        ConsumerModel.deleteCart(id).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static deleteCartItem(req: express.Request, res: express.Response): void {
        //console.log('postCartItem -', req.url);
        let body: I4_1 = req.body;
        ConsumerModel.deleteCartItem(body).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static postOrder(req: express.Request, res: express.Response): void {
        //console.log('postOrder -', req.url);
        let body: I4_2 = req.body;
    
         ConsumerModel.postOrder(body).then(resp => {
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

      public static getOrders(req: express.Request, res: express.Response): void {
        //console.log('getOrders -', req.url);
        let id: string = req.query.id?.toString()!;
        let type: string = req.query.type?.toString()!;
        console.log(id, type);
        ConsumerModel.getOrders(id, type).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }
}

export let consumercntrlr = new ConsumerCntrlr();