import { I2_2, IGetResponse } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import { states } from '../DatabaseSchemaModels/States';
import { districts } from '../DatabaseSchemaModels/Districts';


export class LocationModel {



    /**
    * The method getStates. undefined
    *
    * @param body of type any
    * @returns IPostResponse
    */
    public static getStates(): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            states.find({}).then(val => {
                resolve({ "statusCode": 0, "message": "Retrieved states.", "payload": val })
            })
            .catch(e => {
                reject({ "statusCode": 2, "message": e, "payload": "" });
            })
        })
    }

    /**
    * The method getDistricts. undefined
    *
    * @param body of type any
    * @returns IPostResponse
    */
    public static getDistricts(body: I2_2): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            districts.findOne({name: body.state}).then(val => {
               resolve({ "statusCode": 0, "message": "Retrieved distict with state: " + body.state, "payload": val })
            })
            .catch(e => {
                reject({ "statusCode": 2, "message": e, "payload": "" });
            })
        })
    }

}


export let locationmodel = new LocationModel();


