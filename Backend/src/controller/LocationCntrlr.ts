import * as express from 'express';


import { Validator } from '../support/Validator';
import { LocationModel } from '../ViewModels/LocationModel';
import { I2_2 } from '../support/Interfaces';


class LocationCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        LocationCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/states')
            .get(Validator.validate, LocationCntrlr.getStates);

        router.route('/states/districts')
            .get(Validator.validate, LocationCntrlr.getDistricts);

    }

    /**
    * The method getStates. undefined
    *
    * @param req of type express.Request
    * @param res of type express.Response
    * @returns void
    */
    public static getStates(req: express.Request, res: express.Response): void {
        console.log('getStates -', req.url);

        LocationModel.getStates().then(resp => {
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
        //res.status(resp.status).send(resp.data);
    }

    /**
    * The method getDistricts. undefined
    *
    * @param req of type express.Request
    * @param res of type express.Response
    * @returns void
    */
    public static getDistricts(req: express.Request, res: express.Response): void {
        console.log('getDistricts -', req.url);
        let body: I2_2 = {state: req.query.state?.toString()};
        LocationModel.getDistricts(body).then(resp => {
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
        //res.status(resp.status).send(resp.data);
    }
}


export let locationcntrlr = new LocationCntrlr();


