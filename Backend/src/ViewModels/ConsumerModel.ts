import { carts } from "../DatabaseSchemaModels/Carts";
import { logisticsorders } from "../DatabaseSchemaModels/LogisticsOrders";
import { ongoingorders } from "../DatabaseSchemaModels/OngoingOrders";
import { pastorders } from "../DatabaseSchemaModels/PastOrders";
import { pickup } from "../DatabaseSchemaModels/Pickup";
import { product } from "../DatabaseSchemaModels/Product";
import { users } from "../DatabaseSchemaModels/UserData";
import { I4_0, I4_1, I4_2, IGetResponse, IPostResponse } from "../support/Interfaces";

export class ConsumerModel {
    public static addCart(body: I4_0): Promise<IPostResponse> {
        return new Promise((resolve, reject) => {
            let cart = new carts(body);
            carts.findOne({ uid: body.uid }).then(val => {
                console.log(val);
                if (val == null) {
                    cart.save().then(data => {
                        resolve({ statusCode: 0, message: "Product added to cart" });
                    })
                        .catch(e => {
                            console.log(e);
                            reject({ statusCode: 2, message: e });
                        })
                }

                else {
                    // "itemsList" :{$elemMatch: {"productId": body.itemsList.productId}}
                    carts.updateOne({ _id: val._id, "itemsList.productId": body.itemsList.productId }, { "$set": { "itemsList.$.productId": body.itemsList.productId, "itemsList.$.quantity": body.itemsList.quantity } }).then(vall => {
                        if (vall.nModified == 0 && vall.n == 0) {
                            carts.updateOne({ _id: val._id }, { $push: { itemsList: body.itemsList } }).then(val => {
                                console.log(val)
                                resolve({ statusCode: 0, message: "Cart Updated" });
                            })
                                .catch(e => {
                                    reject({ statusCode: 2, message: e });
                                })
                        }
                        else {
                            resolve({ statusCode: 0, message: "Cart Updated" });
                        }

                    })
                        .catch(e => {
                            reject({ statusCode: 2, message: e });
                        })
                }
            })
        })
    }

    public static getCart(id: any): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            carts.findOne({ uid: id }).then(val => {
                return resolve({ "statusCode": 0, "message": "User Cart", "payload": val });
            })
                .catch(e => {
                    return reject({ "statusCode": 2, "message": e, "payload": "" });
                })
        })
    }

    public static deleteCart(id: string): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            carts.deleteOne({ uid: id }).then(val => {
                return resolve({ "statusCode": 0, "message": "User Cart deleted", "payload": val });
            })
                .catch(e => {
                    return reject({ "statusCode": 2, "message": e, "payload": "" });
                })
        })
    }

    public static deleteCartItem(body: I4_1): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            carts.updateOne({ uid: body.uid }, { $pull: { "itemsList": { "productId": body.productId } } }).then(val => {
                return resolve({ "statusCode": 0, "message": "User Cart iten deleted", "payload": val });
            })
                .catch(e => {
                    return reject({ "statusCode": 2, "message": e, "payload": "" });
                })
        })
    }

    public static findpickupadd(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            pickup.findOne({ productId: id }).then(res => {
                return resolve(res)
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static findfarmer(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            product.findById(id).then(res => {
                return resolve(res)
            })
                .catch(e => {
                    return reject(e);
                })
        })

    }

    public static findname(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            users.findById(id).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static findproduct(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            product.findById(id).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static deleteproduct(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            product.findByIdAndDelete(id).then(res => {
                return resolve(res);
            })
                .catch(e => {
                    return reject(e);
                })
        })
    }

    public static postOrder(body: I4_2): Promise<IPostResponse> {
        return new Promise((resolve, reject) => {
            let order = new ongoingorders(body);
            order.save().then(data => {
                let uid = body.OrderId.split("?")[0]
                for (let x of body.itemsList) {
                    let productid = x.itemId.split("?")[2]
                    this.findpickupadd(productid).then(res => {
                        this.findfarmer(productid).then(ress => {
                            this.findname(ress.uid).then(data => {
                                this.findname(uid).then(dataa => {

                                    let lorder = new logisticsorders({ ItemsId: x.itemId, productId: productid, quantity: x.quantity, tracking: x.tracking, deliveryaddress: body.deliveryaddress, pickupaddress: res.pickupaddress, farmername: data.name, consumername: dataa.name, total: x.total, discount: x.discount })
                                    lorder.save().then(res => {
                                        this.deleteCart(uid).then(res => {
                                            this.findproduct(productid).then(res => {
                                                let pr: Number = Number(res.productRemaining) - Number(x.quantity);
                                                let nousers: Number = res.noOfUsers + 1;

                                                if(pr == 0){
                                                    this.deleteproduct(productid).then(res => {
                                                        return resolve({ "statusCode": 0, "message": "Order Placed" })
                                                    })
                                                        .catch(e => {
                                                            console.log(e)
                                                            return reject({ "statusCode": 2, "message": e });
                                                        })
                                                }

                                                else{
                                                    product.updateOne({ _id: productid }, { "productRemaining": pr, "noOfUsers": nousers }).then(res => {
                                                        return resolve({ "statusCode": 0, "message": "Order Placed" })
                                                    })
                                                        .catch(e => {
                                                            console.log(e)
                                                            return reject({ "statusCode": 2, "message": e });
                                                        })
                                                }    
                                            })
                                                .catch(e => {
                                                    console.log(e)
                                                    return reject({ "statusCode": 2, "message": e });
                                                })


                                        })
                                            .catch(e => {
                                                console.log(e)
                                                return reject({ "statusCode": 2, "message": e });
                                            })
                                    })
                                        .catch(e => {
                                            return reject({ "statusCode": 2, "message": e });
                                        })

                                })
                                    .catch(e => {
                                        return reject({ "statusCode": 2, "message": e });
                                    })
                            })
                                .catch(e => {
                                    return reject({ "statusCode": 2, "message": e });
                                })
                        })
                            .catch(e => {
                                return reject({ "statusCode": 2, "message": e });
                            })
                    })
                        .catch(e => {
                            return reject({ "statusCode": 2, "message": e });
                        })
                }
            }).catch(e => {
                return reject({ "statusCode": 2, "message": e });
            })
        })
    }

    public static getOrders(id: String, type: String): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {
            if (type == "ongoing") {
                ongoingorders.find({ "OrderId": { "$regex": id, "$options": "i" } }).then(res => {
                    return resolve({ "statusCode": 0, "message": "User Ongoing Orders", "payload": res });
                })
                    .catch(e => {
                        return reject({ "statusCode": 2, "message": e, "payload": "" });
                    })
            }
            else if (type == "past") {
                pastorders.findOne({ uid: id }).then(res => {
                    return resolve({ "statusCode": 0, "message": "User Past Orders", "payload": res });
                })
                    .catch(e => {
                        return reject({ "statusCode": 2, "message": e, "payload": "" });
                    })
            }
        })

    }
}
export let consumermodel = new ConsumerModel();