import e = require("cors");
import { logisticsorders } from "../DatabaseSchemaModels/LogisticsOrders";
import { logisticspickup } from "../DatabaseSchemaModels/LogisticsPickup";
import { ongoingorders } from "../DatabaseSchemaModels/OngoingOrders";
import { pastorders } from "../DatabaseSchemaModels/PastOrders";
import { pickup } from "../DatabaseSchemaModels/Pickup";
import { product } from "../DatabaseSchemaModels/Product";
import { I5_0, I5_1, IGetResponse, IPostResponse } from "../support/Interfaces";

export class LogisticsModel {


    public static getLogisticsOrdersData(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            logisticsorders.findById(id).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static updateLogistics(body: I5_0): Promise<any> {
        return new Promise((resolve, reject) => {
            //using just updateOne and then doing FindOne also works
            this.getLogisticsOrdersData(body.trackingId).then(res => {
                logisticsorders.findOneAndUpdate({ _id: body.trackingId }, { "$set": { DeliveryBy: (body.DeliveryBy != '' && body?.DeliveryBy) ? body.DeliveryBy : res.DeliveryBy, "DeliveryPerson": (body.DeliveryPerson != '' && body?.DeliveryPerson) ? body.DeliveryPerson : res.DeliveryPerson, "tracking": (body.tracking != '' && body?.tracking) ? body.tracking : res.tracking } }, { new: true }).then(res => {
                    //logisticsorders.findOneAndUpdate({ _id: body.trackingId }, { "$set": { DeliveryBy: body?.DeliveryBy, DeliveryPerson: body?.DeliveryPerson, tracking: body?.tracking } }, { new: true }).then(res => {
                    console.log("...", res)
                    return resolve(res);
                })
                    .catch(e => {
                        console.log(e, "...")
                        return reject(e);
                    })
            })
                .catch(e => {

                })

        })
    }

    public static findOngoing(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            ongoingorders.findOne({ OrderId: id }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })

        })
    }

    public static updateOnGoing(id: string, body: I5_0): Promise<any> {
        return new Promise((resolve, reject) => {
            let orderid = id.split("?")[0] + "?" + id.split("?")[1]
            console.log(orderid);
            this.findOngoing(orderid).then(res => {
                let ogobj: any;
                for (let x of res.itemsList) {
                    if (x.itemId == id) {
                        ogobj = x;
                    }
                }
                ongoingorders.updateOne({ OrderId: orderid, "itemsList.itemId": id }, { "$set": { "itemsList.$.DeliveryBy": (body.DeliveryBy != '' && body?.DeliveryBy) ? body.DeliveryBy : ogobj.DeliveryBy, "itemsList.$.DeliveryPerson": (body.DeliveryPerson != '' && body?.DeliveryPerson) ? body.DeliveryPerson : ogobj.DeliveryPerson, "itemsList.$.tracking": (body.tracking != '' && body?.tracking) ? body.tracking : ogobj.tracking } }).then(res => {
                    return resolve(res);
                })
                    .catch(e => {
                        return reject(e);
                    })
            })
                .catch(e => {
                    return reject(e);
                })

        })
    }

    public static deleteFromLogistics(id: String) {
        return new Promise((resolve, reject) => {
            //using just updateOne and then doing FindOne also works
            logisticsorders.findOneAndDelete({ _id: id }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static deleteFromOngoing(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ongoingorders.findOneAndUpdate({ OrderId: body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1] }, { $pull: { itemsList: { itemId: body.ItemsId } } }, { new: true }).then(res => {
                console.log(res, body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1])
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static deleteOnGoing(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ongoingorders.deleteOne({ OrderId: body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1] }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static findtotal(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            ongoingorders.findOne({ OrderId: id.split("?")[0] + "?" + id.split("?")[1] }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static addToPastOrders(body: any, deliveredon: Date): Promise<any> {
        return new Promise((resolve, reject) => {
            let uid = body.ItemsId.split("?")[0]

            this.findtotal(body.ItemsId).then(res => {
                for (let x of res.itemsList) {
                    if (x.itemId == body.ItemsId) {
                        let total = x.total;
                        let discount = x.discount;
                        console.log(total, discount)
                        pastorders.findOne({ uid: uid }).then(res => {
                            if (res) {

                                pastorders.findOne({ uid: uid, "Orders.OrderId": body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1] }).then(res => {
                                    if (res) {
                                        pastorders.updateOne({ uid: uid, "Orders.OrderId": body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1] }, { $push: { "Orders.$.itemsList": { itemId: body.ItemsId, quantity: body.quantity, deliveredOn: deliveredon, total: total, discount: discount } } }).then(res => {
                                            return resolve(res);
                                        })
                                            .catch(e => {
                                                console.log(e)
                                                return reject(e);
                                            })
                                    }

                                    else {
                                        let orders = { OrderId: body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1], itemsList: { itemId: body.ItemsId, quantity: body.quantity, deliveredOn: deliveredon }, deliveryaddress: body.deliveryaddress, total: total, discount: discount }
                                        pastorders.updateOne({ uid: uid }, { $push: { Orders: orders } }).then(res => {
                                            return resolve(res);
                                        })
                                            .catch(e => {
                                                return reject(e);
                                            })
                                    }
                                })
                                    .catch(e => {
                                        return reject(e);
                                    })
                            }

                            else {
                                let pastorder = new pastorders({ uid: uid, Orders: [{ OrderId: body.ItemsId.split("?")[0] + "?" + body.ItemsId.split("?")[1], itemsList: [{ itemId: body.ItemsId, quantity: body.quantity, deliveredOn: deliveredon, total: total, discount: discount }], deliveryaddress: body.deliveryaddress }] })
                                pastorder.save().then(res => {
                                    return resolve(res);
                                })
                                    .catch(e => {
                                        return reject(e);
                                    })
                            }
                        })
                            .catch(e => {
                                return reject(e);
                            })
                    }
                }

            })
                .catch(e => {
                    return reject(e);
                })

        })
    }

    public static addOrderDetails(body: I5_0): Promise<IPostResponse> {
        return new Promise((resolve, reject) => {

            if (body?.tracking == "5") {
                this.deleteFromLogistics(body.trackingId).then(val => {
                    this.addToPastOrders(val, body.deliveredon!).then(res => {
                        this.deleteFromOngoing(val).then(res => {
                            console.log(res)
                            if (res.itemsList.length == 0) {
                                this.deleteOnGoing(val).then(res => {
                                    resolve({ statusCode: 0, message: "Logistics Updated" });
                                })
                                    .catch(e => {
                                        reject({ statusCode: 2, message: e });
                                    })
                            }

                            else {
                                resolve({ statusCode: 0, message: "Logistics Updated" });
                            }
                        })
                            .catch(e => {
                                reject({ statusCode: 2, message: e });
                            })
                    })
                        .catch(e => {
                            reject({ statusCode: 2, message: e });
                        })

                })
                    .catch(e => {
                        reject({ statusCode: 2, message: e });
                    })
            }

            else {
                this.updateLogistics(body).then(res => {
                    this.updateOnGoing(res.ItemsId, body).then(res => {

                        resolve({ statusCode: 0, message: "Logistics Updated" });
                    })
                        .catch(e => {
                            reject({ statusCode: 2, message: e });
                        })
                })
                    .catch(e => {
                        console.log(e, "...");
                        reject({ statusCode: 2, message: e });
                    })
            }
        })
    }

    public static getOrderDetails(): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            logisticsorders.find().then(res => {
                resolve({ statusCode: 0, message: "Logistics Data", payload: res });
            })
                .catch(e => {
                    reject({ statusCode: 2, message: e, payload: "" });
                })
        })
    }

    public static farmeraddress(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            pickup.findOne({ productId: id }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static findPickup(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            logisticspickup.findOne({ ReqId: id }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }
    public static addPickup(body: I5_1): Promise<IPostResponse> {
        return new Promise((resolve, reject) => {
            this.findPickup(body.ReqId).then(res => {
                if (res) {

                    if (body?.status == "2") {
                        logisticspickup.deleteOne({ ReqId: body.ReqId }).then(res => {
                            resolve({ statusCode: 0, message: "Logistics Pickup Updated" });
                        })
                            .catch(e => {
                                reject({ statusCode: 2, message: e });
                            })
                    }
                    else {
                        logisticspickup.findOneAndUpdate({ ReqId: body.ReqId }, { "$set": { ProductId: (body.ProductId != '' && body?.ProductId) ? body.ProductId : res.ProductId, quantity: (body.quantity != '' && body?.quantity) ? body.quantity : res.quantity, status: (body.status != '' && body?.status) ? body.status : res.status, pickupDate: (body.pickupDate != null && body?.pickupDate) ? body.pickupDate : res.pickupDate, pickupPerson: (body.pickupPerson != '' && body?.pickupPerson) ? body.pickupPerson : res.pickupPerson } }).then(res => {
                            resolve({ statusCode: 0, message: "Logistics Pickup Updated" });
                        })
                            .catch(e => {
                                reject({ statusCode: 2, message: e });
                            })
                    }

                }

                else {
                    this.farmeraddress(body.ProductId!).then(res => {
                        let pickup_: any = body;
                        pickup_["status"] = "1";
                        pickup_["pickupaddress"] = res.pickupaddress;
                        let pickup = new logisticspickup(body);
                        pickup.save().then(res => {
                            resolve({ statusCode: 0, message: "Logistics Pickup Updated" });
                        })
                            .catch(e => {
                                reject({ statusCode: 2, message: e });
                            })
                    })
                        .catch(e => {
                            reject({ statusCode: 2, message: e });
                        })
                }
            })
                .catch(e => {
                    reject({ statusCode: 2, message: e });
                })


        })
    }


    public static findfarmer(id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            product.find({ uid: id }).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static getPickup(id: String): Promise<IGetResponse> {

        return new Promise((resolve, reject) => {
            if (id) {
                this.findfarmer(id).then(res => {
                    let arr: any = [];
                    for (let x of res) {
                        arr.push(x._id)
                    }
                    logisticspickup.find({ ProductId: { "$in": arr } }).then(res => {
                        resolve({ statusCode: 0, message: "Pickup Data", payload: res });
                    })
                        .catch(e => {
                            reject({ statusCode: 2, message: e, payload: "" });
                        })
                })
                    .catch(e => {
                        reject({ statusCode: 2, message: e, payload: "" });
                    })
            }
            else {
                logisticspickup.find().then(res => {
                    resolve({ statusCode: 0, message: "Pickup Data", payload: res });
                })
                    .catch(e => {
                        reject({ statusCode: 2, message: e, payload: "" });
                    })
            }
        })
    }
}
export let logisticsmodel = new LogisticsModel();