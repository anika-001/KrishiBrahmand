import * as mongoose from 'mongoose';


class LogisticsPickup {
    public LogisticsPickupSchema = new mongoose.Schema({
        ReqId: {
            type: String
        },

        ProductId: {
            type: String
        },

        quantity: {
            type: Number
        },

        status: {
            type: String
        },

        pickupDate: {
            type: Date
        },

        pickupPerson: {
            type: String
        },

        pickupaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        },
    });
}

let lp = new LogisticsPickup();
export let logisticspickup = mongoose.model("LogisticsPickup", lp.LogisticsPickupSchema);