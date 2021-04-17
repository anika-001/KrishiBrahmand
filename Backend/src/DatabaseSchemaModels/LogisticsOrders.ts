import * as mongoose from 'mongoose';


class LogisticsOrders {
    public LogisticsOrdersSchema = new mongoose.Schema({
        ItemsId: {
            type: String
        },

        productId:{
            type: String
        },

        quantity: {
            type: Number
        },

        tracking: {
            type: String
        },

        deliveryaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        },

        payment: {
            type: String
        },

        DeliveryBy: {
            type: Date
        },

        DeliveryPerson: {
            type: String
        },

        pickupaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        },

        farmername: {
            type: String
        },

        consumername: {
            type: String
        },

        total: {
            type: Number
        },

        discount: {
            type: Number
        }
    });
}

let lo = new LogisticsOrders();
export let logisticsorders = mongoose.model("LogisticsOrders", lo.LogisticsOrdersSchema);