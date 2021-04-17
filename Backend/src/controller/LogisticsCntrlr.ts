import * as express from 'express';
import { account } from '../DatabaseSchemaModels/Account';
import { DatabaseOperations } from '../support/DatabaseOperations';
import { I5_0, I5_1 } from '../support/Interfaces';


import { Validator } from '../support/Validator';
import { LogisticsModel } from '../ViewModels/LogisticsModel';


class LogicticsCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        LogicticsCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/orderdetails')
            .post(Validator.validate, LogicticsCntrlr.addOrderDetails)
            .get(Validator.validate, LogicticsCntrlr.getOrderDetails)

        router.route('/pickup')
            .post(Validator.validate, LogicticsCntrlr.addPickup)
            .get(Validator.validate, LogicticsCntrlr.getPickup)

        router.route('/test')
            .get(Validator.validate, LogicticsCntrlr.test)


    }

    public static test(): void{
        DatabaseOperations.FindOneOp(account, {email: "vaishnavisdesai@gmail.com"});
    }

    public static addOrderDetails(req: express.Request, res: express.Response): void {
        //console.log('postOrderDetails -', req.url);
        let body: I5_0 = req.body;

        LogisticsModel.addOrderDetails(body).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static getOrderDetails(req: express.Request, res: express.Response): void {
        //console.log('getOrderDetails -', req.url);
        LogisticsModel.getOrderDetails().then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static addPickup(req: express.Request, res: express.Response): void {
        //console.log('postOrderDetails -', req.url);
        let body: I5_1 = req.body;

        LogisticsModel.addPickup(body).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

    public static getPickup(req: express.Request, res: express.Response): void {
        //console.log('getOrderDetails -', req.url);
        let id: string = req.query.id?.toString()!;
        LogisticsModel.getPickup(id).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });;
    }

}


export let logicticscntrlr = new LogicticsCntrlr();


