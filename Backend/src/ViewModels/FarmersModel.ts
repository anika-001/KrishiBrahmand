import { IGetResponse, IPostResponse } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import { product } from '../DatabaseSchemaModels/Product';
import { ongoingorders } from '../DatabaseSchemaModels/OngoingOrders';
import { logisticsorders } from '../DatabaseSchemaModels/LogisticsOrders';
import { Document } from 'mongoose';


interface IProduct{
  uid: string;
}
export class FarmersModel {

  /**
  * The method getShipments. undefined
  *
  * @param body of type any
  * @returns IResponse
  */

  public static getProduct(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      product.find({ uid: id }).then(res => {
        return resolve(res);
      })
        .catch(e => {
          return reject(e);
        })
    })
  }

  public static getFarmerShipments(ids: [string]): Promise<any> {
    return new Promise((resolve, reject) => {
      let regex = ids.map(function (e) { return new RegExp(e, "i"); });
      logisticsorders.find({ "ItemsId": { "$in": regex } }).then(res => {
        return resolve(res);
      })
        .catch(e => {
          return reject(e);
        })
    })
  }

  public static getShipments(id: String): Promise<IGetResponse> {
    return new Promise((resolve, reject) => {
      this.getProduct(id).then(res => {
        let arr: any = [];
        for (let x of res) {
          arr.push(x._id);
        }
        this.getFarmerShipments(arr).then(res => {
          return resolve({ "statusCode": 0, "message": "Farmer Ongoing Shipments", "payload": res });
        })
          .catch(e => {
            return reject({ "statusCode": 2, "message": e, "payload": "" });
          })

      })
        .catch(e => {
          return reject({ "statusCode": 2, "message": e, "payload": "" });
        })

    })
  }

}


export let farmersmodel = new FarmersModel();


